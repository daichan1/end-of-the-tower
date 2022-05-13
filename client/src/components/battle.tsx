import { createTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import playerImg from '../images/player.png'
import enemyImg from '../images/enemy.png'
import cardImg from '../images/card.png'
import '../styles/battle/style.scss'

type Props = {
  disable: boolean
}

const HP_MIN = 0
const HP_MAX = 1000
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


const Battle: React.FC<Props> = (props) => {
  const { disable } = props

  return (
    <div style={{ display: disable ? 'none' : '' }}>
      <CustomAppBar position='static'>
        <Toolbar>
          <CustomTypography variant="h6">プレイヤー</CustomTypography>
        </Toolbar>
      </CustomAppBar>
      <Container fixed>
        <Grid container className='character'>
          <Grid item xs={6} className='player'>
            <img src={playerImg} alt='プレイヤー' className='player-img' />
            <CustomLinearProgress variant="determinate" value={hpAdjustment(100)}/>
          </Grid>
          <Grid item xs={6} className='enemy'>
            <img src={enemyImg} alt='敵' className='enemy-img' />
            <CustomLinearProgress variant="determinate" value={hpAdjustment(100)}/>
          </Grid>
        </Grid>
        <Grid container className='card-list'>
          <Grid item xs={2}>
            <img src={cardImg} alt='カード1' className='card' />
          </Grid>
          <Grid item xs={2}>
            <img src={cardImg} alt='カード2' className='card' />
          </Grid>
          <Grid item xs={2}>
            <img src={cardImg} alt='カード3' className='card' />
          </Grid>
          <Grid item xs={2}>
            <img src={cardImg} alt='カード4' className='card' />
          </Grid>
          <Grid item xs={2}>
            <img src={cardImg} alt='カード5' className='card' />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Battle
