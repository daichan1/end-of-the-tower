import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Modal from '@mui/material/Modal'
import { EnemyType, CardType, PlayerType } from '../types/model/index'
import { CardEffectProps } from '../types/battle/cardEffect'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { cardDraw, recoveryDeck, moveAllNameplateToCemetery, updatePlayerStatus } from '../redux/slice/playerSlice'
import { resetDamaged, updateEnemyStatus } from '../redux/slice/fightEnemiesSlice'
import { displayGameTitle } from '../redux/slice/gameTitleSlice'
import { displayRootSelect } from '../redux/slice/rootSelectSlice'
import { disableBattle } from '../redux/slice/battleSlice'
import { enemyTurn, playerTurn } from '../redux/slice/turnSlice'
import { setPlayerDamage, resetPlayerDamage } from '../redux/slice/playerDamageSlice'
import { setEnemyDamage, resetEnemyDamage } from '../redux/slice/enemyDamageSlice'
import { resetChoiceEnemyNumber } from '../redux/slice/choiceEnemySlice'
import Header from './battle/header'
import DisplayTurn from './battle/displayTurn'
import Player from './battle/player'
import Enemy from './battle/enemy'
import Energy from './battle/energy'
import Card from '../components/battle/card'
import ModalCard from '../components/battle/modalCard'
import { sleep, isRemainsHp, calcDamage, subtractHp } from '../common/battle'
import {
  isRemainsEnergy, recoveryEnergy, nextBattleUpdatePlayerStatus,
  resetDefense, subtractEnergy, moveUsedCardToCemetery,
  initialPlayerStatus, searchCardEffect
} from '../battle/player'
import { isExistEnemy } from '../battle/enemy'
import '../styles/battle/style.scss'

const ENERGY_MAX = 3

const Battle = (): JSX.Element => {
  const [drawButtonDisable, setDrawButtonDisable] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [playerActionCount, setPlayerActionCount] = useState<number>(0)
  const [enemyActionCount, setEnemyActionCount] = useState<number>(0)
  const [isEnemyDefeated, setIsEnemyDefeated] = useState<boolean>(false)
  const [confirmCard, setConfirmCard] = useState<CardType>({
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    cost: 0,
    cardType: "",
    attack: 0,
    defense: 0,
    actionName: "",
    executionCount: 1
  })

  const player = useAppSelector((state) => state.player)
  const fightEnemies = useAppSelector((state) => state.fightEnemies)
  const battle = useAppSelector((state) => state.battle)
  const turn = useAppSelector((state) => state.turn)
  const choiceEnemyNumber = useAppSelector((state) => state.choiceEnemy)
  const dispatch = useAppDispatch()

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  const onClickDraw = (): void => {
    const drawNum = 5
    if (player.deck.length < drawNum) {
      dispatch(recoveryDeck())
    }
    dispatch(cardDraw(drawNum))
    setDrawButtonDisable(true)
  }

  const setDamage = (damage: number): void => {
    dispatch(setEnemyDamage(damage))
  }

  const displayEnemies = (): JSX.Element[] => {
    const maxGridSize = 6
    const gridSize = maxGridSize / fightEnemies.length
    return fightEnemies.map((enemy, index) =>
      <Grid item xs={gridSize} className='enemy' key={index}>
        <Enemy enemy={enemy} index={index} />
      </Grid>
    )
  }

  const displayNameplate = (): JSX.Element[] => {
    return player.nameplate.map((card, index) =>
      <Grid item xs={1} key={index}>
        <Card
          card={card}
          isModal={false}
          clickCard={selectCard}
        />
      </Grid>
    )
  }

  const selectCard = (card: CardType): void => {
    setConfirmCard(card)
    dispatch(resetEnemyDamage())
    setPlayerActionCount(0)
    handleOpen()
  }

  const actionCard = (card: CardType): void => {
    if (isRemainsEnergy(player, card) || playerActionCount > 0) {
      const playerObj: PlayerType = JSON.parse(JSON.stringify(player))
      const enemiesObj: EnemyType[] = JSON.parse(JSON.stringify(fightEnemies))
      playerAction(playerObj, enemiesObj, card)
      if (playerActionCount === 0) {
        subtractEnergy(playerObj, card.cost)
        moveUsedCardToCemetery(playerObj, card)
      }
      // 連続攻撃のカードの場合に更新
      if (card.executionCount > 1) { setPlayerActionCount(prev => prev + 1) }
      // 敵のHPチェック
      enemiesObj.forEach((enemy, index) => {
        if (!isRemainsHp(enemy)) {
          enemiesObj.splice(index, 1)
          setIsEnemyDefeated(true)
          dispatch(resetChoiceEnemyNumber())
        }
      })
      if (!isExistEnemy(enemiesObj)) {
        victory(playerObj)
      } else {
        dispatch(updatePlayerStatus(playerObj))
        dispatch(updateEnemyStatus(enemiesObj))
      }
    } else {
      console.log("エナジーが不足しています")
    }
    handleClose()
  }

  const playerAction = (playerObj: PlayerType, enemies: EnemyType[], card: CardType): void => {
    const cardEffect = searchCardEffect(card.actionName)
    if (cardEffect === null) {
      console.log("実行できるカード効果が見つかりませんでした")
      return
    }
    if (card.cardType === "アタック") {
      const props: CardEffectProps = {
        type: "oneAttack",
        player: playerObj,
        enemy: enemies[choiceEnemyNumber],
        card: card,
        setDamage: setDamage
      }
      cardEffect.execution(props)
    }
    if (card.cardType === "スキル") {
      const props: CardEffectProps = {
        type: "guardSkill",
        player: playerObj,
        card: card
      }
      cardEffect.execution(props)
    }
  }

  const turnEnd = (): void => {
    dispatch(resetEnemyDamage())
    setPlayerActionCount(0)
    dispatch(enemyTurn())
    dispatch(resetDamaged())
    dispatch(moveAllNameplateToCemetery())
  }

  const enemyAction = async (): Promise<void> => {
    await sleep(2000)
    const playerObj: PlayerType = JSON.parse(JSON.stringify(player))
    const enemiesObj: EnemyType[] = JSON.parse(JSON.stringify(fightEnemies))
    const damage = calcDamage(playerObj, enemiesObj[enemyActionCount].attack)
    subtractHp(playerObj, damage)
    dispatch(setPlayerDamage(damage))
    if (!isRemainsHp(playerObj)) {
      lose(playerObj)
    } else if ((enemyActionCount + 1) === enemiesObj.length) {
      enemyTurnEnd(playerObj, enemiesObj)
    } else {
      setEnemyActionCount(prev => prev + 1)
      dispatch(updatePlayerStatus(playerObj))
      dispatch(updateEnemyStatus(enemiesObj))
    }
  }

  const enemyTurnEnd = (playerObj: PlayerType, enemiesObj: EnemyType[]): void => {
    dispatch(playerTurn())
    setDrawButtonDisable(false)
    recoveryEnergy(playerObj, ENERGY_MAX)
    resetDefense(playerObj)
    setEnemyActionCount(0)
    dispatch(updatePlayerStatus(playerObj))
    dispatch(updateEnemyStatus(enemiesObj))
  }

  const victory = (playerObj: PlayerType): void => {
    // プレイヤーのステータスを更新
    nextBattleUpdatePlayerStatus(playerObj)
    dispatch(updatePlayerStatus(playerObj))
    dispatch(updateEnemyStatus([]))
    // 場面の更新
    dispatch(resetEnemyDamage())
    dispatch(resetPlayerDamage())
    dispatch(playerTurn())
    setDrawButtonDisable(false)
    setPlayerActionCount(0)
    setEnemyActionCount(0)
    setIsEnemyDefeated(false)
    dispatch(disableBattle())
    dispatch(displayRootSelect())
  }

  const lose = (playerObj: PlayerType): void => {
    // ステータスの初期化
    initialPlayerStatus(playerObj)
    dispatch(updatePlayerStatus(playerObj))
    dispatch(updateEnemyStatus([]))
    // 場面の初期化
    dispatch(resetEnemyDamage())
    dispatch(resetPlayerDamage())
    dispatch(playerTurn())
    setDrawButtonDisable(false)
    setPlayerActionCount(0)
    setEnemyActionCount(0)
    dispatch(disableBattle())
    dispatch(displayGameTitle())
  }

  useEffect((): void => {
    if (drawButtonDisable) { dispatch(resetPlayerDamage()) }
  }, [drawButtonDisable])

  useEffect((): void => {
    if (!turn) { enemyAction() }
  }, [turn])

  useEffect((): void => {
    if (enemyActionCount >= 1) { enemyAction() }
  }, [enemyActionCount])

  useEffect((): void => {
    async function continueAction() {
      if (playerActionCount > 0 && playerActionCount < confirmCard.executionCount) {
        if (isEnemyDefeated) {
          setIsEnemyDefeated(false)
        } else {
          await sleep(1000)
          actionCard(confirmCard)
        }
      }
    }
    continueAction()
  }, [playerActionCount])

  return (
    <div style={{ display: battle ? 'none' : '' }}>
      <Header />

      <Container fixed>

        <Grid container justifyContent="center" className='turn'>
          <Grid item>
            <DisplayTurn />
          </Grid>
        </Grid>

        <Grid container className='character'>
          <Grid item xs={6} className='player'>
            <Player />
          </Grid>
          { displayEnemies() }
        </Grid>

        <Grid container className='energy'>
          <Grid item xs={12}>
            <Energy />
          </Grid>
        </Grid>

        <Grid container className='draw-button'>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={onClickDraw}
              disabled={ drawButtonDisable ? true : false }
            >
              ドロー
            </Button>
          </Grid>
          <Grid item xs={6} className='turn-end'>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              onClick={turnEnd}
              disabled={ turn ? false : true }
            >
              ターン終了
            </Button>
          </Grid>
        </Grid>

        <Grid container className='card-list'>
          <div className='deck'>
            <Avatar className='deck-count'>{player.deck.length}</Avatar>
          </div>
          { displayNameplate() }
          <div className='cemetery'>
            <Avatar className='cemetery-count'>{player.cemetery.length}</Avatar>
          </div>
        </Grid>

      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <div id='modal-modal-title'>
          <ModalCard
            card={confirmCard}
            clickCard={actionCard}
          />
        </div>
      </Modal>

    </div>
  )
}

export default Battle
