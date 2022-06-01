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
import { PlayerType, EnemyType, CardType } from '../types/model/index'
import Card from '../components/battle/card'
import ModalCard from '../components/battle/modalCard'
import { sleep, isRemainsHp } from '../common/battle'
import {
  playerAction,
  cardDraw,
  recoveryEnergy,
  resetPlayerStatus,
  returnCardToDeck
} from '../battle/player'
import { enemyAction, checkRemainingHp, isExistEnemy } from '../battle/enemy'
import playerImg from '../images/player.png'
import enemyImg from '../images/enemy.png'
import '../styles/battle/style.scss'

type Props = {
  disable: boolean
  enemies: EnemyType[]
  player: PlayerType
  victory: () => void
  lose: () => void
}

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

const Battle = (props: Props): JSX.Element => {
  const { disable, enemies, player, victory, lose } = props
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

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  const hpAdjustment = (value: number, maxHp: number, minHp: number): number => {
    return ((value - minHp) * 100) / (maxHp - minHp)
  }

  const onClickDraw = (): void => {
    cardDraw(player, 5)
    setDrawButtonDisable(true)
  }

  const displayEnemies = (): JSX.Element[] => {
    const maxGridSize = 6
    const gridSize = maxGridSize / enemies.length
    return enemies.map((enemy, index) =>
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

  const turnEnd = (): void => {
    setIsPlayerTurn(false)
    player.cemetery = player.cemetery.concat(player.nameplate)
    player.nameplate = []
    enemyTurn()
  }

  const selectCard = (card: CardType): void => {
    setConfirmCard(card)
    handleOpen()
  }

  const actionCard = (card: CardType): void => {
    playerAction(player, enemies, card)
    checkRemainingHp(enemies)
    if (!isExistEnemy(enemies)) {
      setIsPlayerTurn(true)
      setDrawButtonDisable(false)
      recoveryEnergy(player, ENERGY_MAX)
      returnCardToDeck(player)
      victory()
    }
    handleClose()
  }

  const enemyTurn = async (): Promise<void> => {
    await sleep(2000)
    enemyAction(player, enemies)
    if (!isRemainsHp(player)) { lose() }
    enemyTurnEnd()
  }

  const enemyTurnEnd = (): void => {
    setIsPlayerTurn(true)
    setDrawButtonDisable(false)
    recoveryEnergy(player, ENERGY_MAX)
    resetPlayerStatus(player)
  }

  return (
    <div style={{ display: disable ? 'none' : '' }}>
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
