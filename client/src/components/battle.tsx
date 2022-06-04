import { useState } from 'react'
import { createTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
import LinearProgress from '@mui/material/LinearProgress'
import { EnemyType, CardType, PlayerType } from '../types/model/index'
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { cardDraw, addDefense, recoveryDeck, updatePlayerStatus } from '../redux/slice/playerSlice'
import { updateEnemyStatus } from '../redux/slice/fightEnemiesSlice'
import { displayGameTitle } from '../redux/slice/gameTitleSlice'
import { displayRootSelect } from '../redux/slice/rootSelectSlice'
import { disableBattle } from '../redux/slice/battleSlice'
import Card from '../components/battle/card'
import ModalCard from '../components/battle/modalCard'
import { sleep, isRemainsHp, calcDamage, subtractHp } from '../common/battle'
import {
  isRemainsEnergy, moveAllNameplateToCemetery, returnCardToDeck,
  recoveryEnergy, resetDefense, subtractEnergy, moveUsedCardToCemetery,
  incrementStage, resetPlayerStatus
} from '../battle/player'
import { isExistEnemy } from '../battle/enemy'
import playerImg from '../images/player.png'
import enemyImg from '../images/enemy.png'
import '../styles/battle/style.scss'

const ENERGY_MAX = 3

const theme = createTheme()

const CustomAppBar = styled(AppBar)({
  backgroundColor: "black"
})

const PlayerTurn = styled(Paper)({
  backgroundColor: "#009688",
  padding: `${theme.spacing(1)}`,
  width: 160
})

const EnemyTurn = styled(Paper)({
  backgroundColor: "#d50000",
  padding: `${theme.spacing(1)}`,
  width: 160
})

const CustomTypography = styled(Typography)({
  marginRight: `${theme.spacing(3)}`
})

const CustomLinearProgress = styled(LinearProgress)({
  width: 100,
  margin: "auto"
})

const Battle = (): JSX.Element => {
  const [drawButtonDisable, setDrawButtonDisable] = useState<boolean>(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [confirmCard, setConfirmCard] = useState<CardType>({
    id: 0,
    name: "",
    description: "",
    imageUrl: "",
    cost: 0,
    cardType: "",
    attack: 0,
    defense: 0,
    actionName: ""
  })

  const player = useAppSelector((state) => state.player)
  const fightEnemies = useAppSelector((state) => state.fightEnemies)
  const battle = useAppSelector((state) => state.battle)
  const dispatch = useAppDispatch()

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  const hpAdjustment = (value: number, maxHp: number, minHp: number): number => {
    return ((value - minHp) * 100) / (maxHp - minHp)
  }

  const onClickDraw = (): void => {
    const drawNum = 5
    if (player.deck.length < drawNum) {
      dispatch(recoveryDeck())
    }
    dispatch(cardDraw(drawNum))
    setDrawButtonDisable(true)
  }

  const displayEnemies = (): JSX.Element[] => {
    const maxGridSize = 6
    const gridSize = maxGridSize / fightEnemies.length
    return fightEnemies.map((enemy, index) =>
      <Grid item xs={gridSize} className='enemy' key={index}>
        <img src={enemyImg} alt={enemy.name} className='enemy-img' />
        <CustomLinearProgress variant="determinate" value={hpAdjustment(enemy.hp, enemy.maxHp, 0)}/>
        <Typography variant="subtitle1" component="div">
          {enemy.hp}/{enemy.maxHp}
        </Typography>
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

  const DisplayTurn = (): JSX.Element => {
    if (isPlayerTurn) {
      return <PlayerTurn elevation={1} >プレイヤーのターン</PlayerTurn>
    } else {
      return <EnemyTurn elevation={1} >敵のターン</EnemyTurn>
    }
  }

  const selectCard = (card: CardType): void => {
    setConfirmCard(card)
    handleOpen()
  }

  const actionCard = (card: CardType): void => {
    if (isRemainsEnergy(player, card)) {
      const enemies: EnemyType[] = JSON.parse(JSON.stringify(fightEnemies))
      playerAction(enemies, card)
      checkRemainingHp(enemies)
      if (!isExistEnemy(enemies)) { victory() }
      dispatch(updateEnemyStatus(enemies))
    } else {
      console.log("エナジーが不足しています")
    }
    handleClose()
  }

  const playerAction = (enemies: EnemyType[], card: CardType): void => {
    const playerObj: PlayerType = JSON.parse(JSON.stringify(player))
    if (card.actionName === "strike") { enemies[0].hp -= card.attack }
    if (card.actionName === "protection") { dispatch(addDefense(card.defense)) }
    subtractEnergy(playerObj, card.cost)
    moveUsedCardToCemetery(playerObj, card)
    dispatch(updatePlayerStatus(playerObj))
  }

  const checkRemainingHp = (enemies: EnemyType[]): void => {
    enemies.forEach((enemy, index) => {
      if (!isRemainsHp(enemy)) { enemies.splice(index, 1) }
    })
  }

  const turnEnd = (): void => {
    const playerObj: PlayerType = JSON.parse(JSON.stringify(player))
    setIsPlayerTurn(false)
    moveAllNameplateToCemetery(playerObj)
    enemyTurn(playerObj)
  }

  const enemyTurn = async (playerObj: PlayerType): Promise<void> => {
    await sleep(2000)
    fightEnemies.forEach((enemy) => {
      const damage = calcDamage(enemy.attack, playerObj.defense)
      subtractHp(playerObj, damage)
    })
    if (!isRemainsHp(playerObj)) {
      lose(playerObj)
    } else {
      enemyTurnEnd(playerObj)
    }
  }

  const enemyTurnEnd = (playerObj: PlayerType): void => {
    setIsPlayerTurn(true)
    setDrawButtonDisable(false)
    recoveryEnergy(playerObj, ENERGY_MAX)
    resetDefense(playerObj)
    dispatch(updatePlayerStatus(playerObj))
  }

  const victory = (): void => {
    const playerObj: PlayerType = JSON.parse(JSON.stringify(player))
    recoveryEnergy(playerObj, ENERGY_MAX)
    incrementStage(playerObj)
    returnCardToDeck(playerObj)
    dispatch(updatePlayerStatus(playerObj))
    setIsPlayerTurn(true)
    setDrawButtonDisable(false)
    dispatch(disableBattle())
    dispatch(displayRootSelect())
  }

  const lose = (playerObj: PlayerType): void => {
    resetPlayerStatus(playerObj)
    dispatch(updatePlayerStatus(playerObj))
    dispatch(updateEnemyStatus([]))
    setIsPlayerTurn(true)
    setDrawButtonDisable(false)
    dispatch(disableBattle())
    dispatch(displayGameTitle())
  }

  return (
    <div style={{ display: battle ? 'none' : '' }}>
      <CustomAppBar position='static'>
        <Toolbar>
          <CustomTypography variant="h6">プレイヤー</CustomTypography>
          <Typography variant="h6">{player && player.name}</Typography>
        </Toolbar>
      </CustomAppBar>

      <Container fixed>

        <Grid container justifyContent="center" className='turn'>
          <Grid item>
            <DisplayTurn/>
          </Grid>
        </Grid>

        <Grid container className='character'>
          <Grid item xs={6} className='player'>
            <img src={playerImg} alt='プレイヤー' className='player-img' />
            <CustomLinearProgress variant="determinate" value={hpAdjustment(player.hp, player.maxHp, 0)}/>
            <Typography variant="subtitle1" component="div">
              {player && player.hp}/{player.maxHp}
            </Typography>
          </Grid>
          { displayEnemies() }
        </Grid>

        <Grid container className='energy'>
          <Grid item xs={12}>
            {player && player.energy}/{ENERGY_MAX}
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
              disabled={ isPlayerTurn ? false : true }
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
