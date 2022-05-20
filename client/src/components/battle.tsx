import { useEffect, useState } from 'react'
import axios from 'axios'
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


const Battle: React.FC<Props> = (props) => {
  const { disable } = props
  const [player, setPlayer] = useState({
    name: "",
    imageUrl: "",
    hp: 0,
    attack: 0,
    defense: 0,
    energy: 0
  })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL_BROWSER}/v1/players`)
      .then(res => {
        const data = res.data
        setPlayer({
          name: data.name,
          imageUrl: data.image_url,
          hp: data.hp,
          attack: data.attack,
          defense: data.defense,
          energy: data.energy
        })
      })
  }, [])

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
            <CustomLinearProgress variant="determinate" value={hpAdjustment(100)}/>
          </Grid>
        </Grid>

        <Grid container className='energy'>
          <Grid item xs={12}>
            {player.energy}/{ENERGY_MAX}
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
