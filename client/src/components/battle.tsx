import { createTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Card from '../components/battle/card'
import { PlayerType, EnemyType, CardType } from '../types/model'
import playerImg from '../images/player.png'
import enemyImg from '../images/enemy.png'
import '../styles/battle/style.scss'

type Props = {
  disable: boolean
  enemies: EnemyType[]
  player: PlayerType
  deck: CardType[]
}

const ENERGY_MAX = 3
const HP_MIN = 0
const HP_MAX = 80
const hpAdjustment = (value: number): number => ((value - HP_MIN) * 100) / (HP_MAX - HP_MIN)

const theme = createTheme()

const CustomAppBar = styled(AppBar)({
  backgroundColor: "black"
})

const CustomTypography = styled(Typography)({
  marginRight: `${theme.spacing(3)}`
})

const CustomLinearProgress = styled(LinearProgress)({
  width: 100,
  margin: "auto"
})


const Battle = (props: Props): JSX.Element => {
  const { disable, enemies, player, deck } = props

  const nameplate = (): JSX.Element[] => {
    return deck.map((card, index) =>
      <Grid item xs={2} key={index}>
        <Card card={card} />
      </Grid>
    )
  }

  return (
    <div style={{ display: disable ? 'none' : '' }}>
      <CustomAppBar position='static'>
        <Toolbar>
          <CustomTypography variant="h6">プレイヤー</CustomTypography>
          <Typography variant="h6">{player.name}</Typography>
        </Toolbar>
      </CustomAppBar>

      <Container fixed>

        <Grid container className='character'>
          <Grid item xs={6} className='player'>
            <img src={playerImg} alt='プレイヤー' className='player-img' />
            <CustomLinearProgress variant="determinate" value={hpAdjustment(player.hp)}/>
            <Typography variant="subtitle1" component="div">
              {player.hp}/{HP_MAX}
            </Typography>
          </Grid>
          <Grid item xs={6} className='enemy'>
            <img src={enemyImg} alt='敵' className='enemy-img' />
            <CustomLinearProgress variant="determinate" value={hpAdjustment(enemies[0].hp)}/>
            <Typography variant="subtitle1" component="div">
              {enemies[0].hp}/{enemies[0].hp}
            </Typography>
          </Grid>
        </Grid>

        <Grid container className='energy'>
          <Grid item xs={12}>
            {player.energy}/{ENERGY_MAX}
          </Grid>
        </Grid>

        <Grid container className='card-list'>
          <Grid item xs={1}>
            <div className='deck'></div>
          </Grid>
          { nameplate() }
          <Grid item xs={1}>
            <div className='cemetery'></div>
          </Grid>
        </Grid>

      </Container>
    </div>
  )
}

export default Battle
