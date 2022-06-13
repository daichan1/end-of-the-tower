import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import { EnemyType, CardType, PlayerType } from '../types/model/index'
import { CardEffectProps } from '../types/battle/cardEffect'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { updatePlayerStatus } from '../redux/slice/playerSlice'
import { updateEnemyStatus } from '../redux/slice/fightEnemiesSlice'
import { displayGameTitle } from '../redux/slice/gameTitleSlice'
import { displayRootSelect } from '../redux/slice/rootSelectSlice'
import { disableBattle } from '../redux/slice/battleSlice'
import { playerTurn } from '../redux/slice/turnSlice'
import { setPlayerDamage, resetPlayerDamage } from '../redux/slice/playerDamageSlice'
import { setEnemyDamage, resetEnemyDamage } from '../redux/slice/enemyDamageSlice'
import { resetChoiceEnemyNumber } from '../redux/slice/choiceEnemySlice'
import { drawButtonNotDisabled } from '../redux/slice/drawButtonSlice'
import { incrementPlayerActionCount, resetPlayerActionCount } from '../redux/slice/playerActionCountSlice'
import Header from './battle/header'
import DisplayTurn from './battle/displayTurn'
import Player from './battle/player'
import Enemy from './battle/enemy'
import Energy from './battle/energy'
import DrawButton from './battle/drawButton'
import TurnEndButton from './battle/turnEndButton'
import Deck from './battle/deck'
import Cemetery from './battle/cemetery'
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
  const [open, setOpen] = useState<boolean>(false)
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
    executionCount: 1,
    effectType: ""
  })

  const player = useAppSelector((state) => state.player)
  const fightEnemies = useAppSelector((state) => state.fightEnemies)
  const battle = useAppSelector((state) => state.battle)
  const turn = useAppSelector((state) => state.turn)
  const choiceEnemyNumber = useAppSelector((state) => state.choiceEnemy)
  const drawButton = useAppSelector((state) => state.drawButton)
  const playerActionCount = useAppSelector((state) => state.playerActionCount)
  const dispatch = useAppDispatch()

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

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
    dispatch(resetPlayerActionCount())
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
      if (card.executionCount > 1) { dispatch(incrementPlayerActionCount()) }
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
    if (card.effectType === "oneAttack") {
      const props: CardEffectProps = {
        type: "oneAttack",
        player: playerObj,
        enemy: enemies[choiceEnemyNumber],
        card: card,
        setDamage: setDamage
      }
      cardEffect.execution(props)
    }
    if (card.effectType === "guard") {
      const props: CardEffectProps = {
        type: "guard",
        player: playerObj,
        card: card
      }
      cardEffect.execution(props)
    }
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
    dispatch(drawButtonNotDisabled())
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
    dispatch(drawButtonNotDisabled())
    dispatch(resetPlayerActionCount())
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
    dispatch(drawButtonNotDisabled())
    dispatch(resetPlayerActionCount())
    setEnemyActionCount(0)
    dispatch(disableBattle())
    dispatch(displayGameTitle())
  }

  useEffect((): void => {
    if (drawButton) { dispatch(resetPlayerDamage()) }
  }, [drawButton])

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
            <DrawButton />
          </Grid>
          <Grid item xs={6} className='turn-end'>
            <TurnEndButton />
          </Grid>
        </Grid>

        <Grid container className='card-list'>
          <Deck />
          { displayNameplate() }
          <Cemetery />
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
