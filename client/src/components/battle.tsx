import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Modal from '@mui/material/Modal'
import { EnemyType, CardType, PlayerType } from '../types/model/index'
import { CardEffectProps } from '../types/battle/cardEffect'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { updatePlayerStatus } from '../redux/slice/playerSlice'
import { updateEnemyStatus, resetDamage } from '../redux/slice/fightEnemiesSlice'
import { displayGameTitle } from '../redux/slice/gameTitleSlice'
import { disableBattle } from '../redux/slice/battleSlice'
import { playerTurn } from '../redux/slice/turnSlice'
import { setPlayerDamage, resetPlayerDamage } from '../redux/slice/playerDamageSlice'
import { resetChoiceEnemyNumber } from '../redux/slice/choiceEnemySlice'
import { drawButtonNotDisabled } from '../redux/slice/drawButtonSlice'
import { incrementPlayerActionCount, resetPlayerActionCount } from '../redux/slice/playerActionCountSlice'
import { displayReward, setDisplayRewardCards } from '../redux/slice/rewardSlice'
import { enemyDefeated, notEnemyDefeated } from '../redux/slice/enemyDefeatedSlice'
import { resetFloor } from '../redux/slice/floorSlice'
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
import { sleep, isRemainsHp, calcDamage, subtractHp } from '../common/battle'
import {
  isRemainsEnergy, recoveryEnergy, nextBattleUpdatePlayerStatus,
  resetDefense, subtractEnergy, moveUsedCardToCemetery,
  initialPlayerStatus, searchCardEffect
} from '../battle/player'
import { isExistEnemy } from '../battle/enemy'
import { getDisplayRewardCards } from '../common/reward'
import '../styles/battle/style.scss'

const ENERGY_MAX = 3

const Battle = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const [enemyActionCount, setEnemyActionCount] = useState<number>(0)
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
  const reward = useAppSelector((state) => state.reward)
  const isEnemyDefeated = useAppSelector((state) => state.enemyDefeated)
  const dispatch = useAppDispatch()

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

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
          width={125}
          height={175}
          cssClass="nameplate"
          card={card}
          clickCard={selectCard}
        />
      </Grid>
    )
  }

  const selectCard = (card: CardType): void => {
    setConfirmCard(card)
    dispatch(resetDamage())
    dispatch(resetPlayerActionCount())
    dispatch(notEnemyDefeated())
    handleOpen()
  }

  const actionCard = (card: CardType): void => {
    if (isRemainsEnergy(player, card) || playerActionCount > 0) {
      const playerObj: PlayerType = JSON.parse(JSON.stringify(player))
      let enemiesObj: EnemyType[] = JSON.parse(JSON.stringify(fightEnemies))
      playerAction(playerObj, enemiesObj, card)
      if (playerActionCount === 0) {
        subtractEnergy(playerObj, card.cost)
        moveUsedCardToCemetery(playerObj, card)
      }
      // 連続攻撃のカードの場合に更新
      if (card.executionCount > 1) { dispatch(incrementPlayerActionCount()) }
      // 敵のHPチェック
      enemiesObj.forEach(enemy => {
        if (!isRemainsHp(enemy)) {
          enemiesObj = enemiesObj.filter(enemy => enemy.hp > 0)
          dispatch(enemyDefeated())
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
        card: card
      }
      cardEffect.execution(props)
    }
    if (card.effectType === "allAttack") {
      const props: CardEffectProps = {
        type: "allAttack",
        player: playerObj,
        enemies: enemies,
        card: card
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
    await sleep(1000)
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
    dispatch(resetPlayerDamage())
    dispatch(playerTurn())
    dispatch(drawButtonNotDisabled())
    dispatch(resetPlayerActionCount())
    dispatch(resetChoiceEnemyNumber())
    setEnemyActionCount(0)
    // 報酬のカードを設定
    const rewardDisplayCards = getDisplayRewardCards(reward.cards)
    dispatch(setDisplayRewardCards(rewardDisplayCards))
    dispatch(disableBattle())
    dispatch(displayReward())
  }

  const lose = (playerObj: PlayerType): void => {
    // ステータスの初期化
    initialPlayerStatus(playerObj)
    dispatch(updatePlayerStatus(playerObj))
    dispatch(updateEnemyStatus([]))
    // 場面の初期化
    dispatch(resetPlayerDamage())
    dispatch(playerTurn())
    dispatch(drawButtonNotDisabled())
    dispatch(resetPlayerActionCount())
    dispatch(resetChoiceEnemyNumber())
    dispatch(resetFloor())
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
    // 連続攻撃2回目以降のアクション
    async function continueAction() {
      if (isEnemyDefeated) {
        dispatch(notEnemyDefeated())
      } else {
        await sleep(500)
        actionCard(confirmCard)
      }
    }
    if (playerActionCount > 0 && playerActionCount < confirmCard.executionCount) {
      continueAction()
    }
  }, [playerActionCount])

  return (
    <div style={{ display: battle ? 'none' : '' }} className='battle'>
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
          <Card
            width={150}
            height={200}
            cssClass="select-card"
            card={confirmCard}
            clickCard={actionCard}
          />
        </div>
      </Modal>

    </div>
  )
}

export default Battle
