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
import { playerAction } from '../battle/index'
import playerImg from '../images/player.png'
import enemyImg from '../images/enemy.png'
import '../styles/battle/style.scss'

type Props = {
  disable: boolean
  enemies: EnemyType[]
  player: PlayerType
}

const ENERGY_MAX = 3
const HP_MIN = 0
const HP_MAX = 80
const hpAdjustment = (value: number): number => ((value - HP_MIN) * 100) / (HP_MAX - HP_MIN)

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
  const { disable, enemies, player } = props
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

  const cardDraw = (): void => {
    const nameplate: CardType[] = []
    player.deck.forEach((card, i) => {
      if (i < 5) {
        nameplate.push(card)
      }
    })
    player.deck.splice(0, 5)
    player.nameplate = player.nameplate.concat(nameplate)
    setDrawButtonDisable(true)
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
  }

  const selectCard = (card: CardType): void => {
    setConfirmCard(card)
    handleOpen()
  }

  const actionCard = (card: CardType): void => {
    playerAction(player, enemies, card)
    handleClose()
  }

  const isBlankEnemies = (): boolean => {
    return enemies.length === 0 ? true : false
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
            <CustomLinearProgress variant="determinate" value={hpAdjustment(player.hp)}/>
            <Typography variant="subtitle1" component="div">
              {player && player.hp}/{HP_MAX}
            </Typography>
          </Grid>
          <Grid item xs={6} className='enemy'>
            <img src={enemyImg} alt='敵' className='enemy-img' />
            <CustomLinearProgress variant="determinate" value={hpAdjustment(isBlankEnemies() ? 0 : enemies[0].hp)}/>
            <Typography variant="subtitle1" component="div">
              {isBlankEnemies() ? 0 : enemies[0].hp}/{isBlankEnemies() ? 0 : enemies[0].hp}
            </Typography>
          </Grid>
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
              onClick={cardDraw}
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
