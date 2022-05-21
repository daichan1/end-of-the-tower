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
import Card from '../components/battle/card'
import playerImg from '../images/player.png'
import enemyImg from '../images/enemy.png'
import '../styles/battle/style.scss'

type Props = {
  disable: boolean
}

type Enemy = {
  id: number
  name: string
  imageUrl: string
  hp: number
  attack: number
  defense: number
}

type Player = {
  name: string
  imageUrl: string
  hp: number
  attack: number
  defense: number
  energy: number
}

type CardType = {
  name: string
  description: string
  imageUrl: string
  cost: number
  cardType: string
  attack: number
  defense: number
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
  const [enemies, setEnemies] = useState<Enemy[]>([{
    id: 0,
    name: "",
    imageUrl: "",
    hp: 0,
    attack: 0,
    defense: 0
  }])
  const [player, setPlayer] = useState<Player>({
    name: "",
    imageUrl: "",
    hp: 0,
    attack: 0,
    defense: 0,
    energy: 0
  })
  const [cards, setCards] = useState<CardType[]>([{
    name: "",
    description: "",
    imageUrl: "",
    cost: 0,
    cardType: "",
    attack: 0,
    defense: 0
  }])

  const getEnemies = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL_BROWSER}/v1/enemies`)
    .then(res => {
      const resEnemies = res.data
      setEnemies(resEnemies.map((enemy: { id: number; name: string; image_url: string; hp: number; attack: number; defense: number }) => {
        return {
          id: enemy.id,
          name: enemy.name,
          imageUrl: enemy.image_url,
          hp: enemy.hp,
          attack: enemy.attack,
          defense: enemy.defense
        }
      }))
    })
    .catch(error => {
      console.log("敵の取得に失敗しました")
    })
  }

  const getPlayer = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL_BROWSER}/v1/players`)
    .then(res => {
      const resPlayer = res.data
      setPlayer({
        name: resPlayer.name,
        imageUrl: resPlayer.image_url,
        hp: resPlayer.hp,
        attack: resPlayer.attack,
        defense: resPlayer.defense,
        energy: resPlayer.energy
      })
    })
    .catch(error => {
      console.log("プレイヤーの取得に失敗しました")
    })
  }

  const getCards = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL_BROWSER}/v1/cards`)
    .then(res => {
      const resCards = res.data
      setCards(resCards.map((card: { name: string, description: string, image_url: string, cost: number, card_type: string, attack: number, defense: number }) => {
        return {
          name: card.name,
          description: card.description,
          imageUrl: card.image_url,
          cost: card.cost,
          cardType: card.card_type,
          attack: card.attack,
          defense: card.defense
        }
      }))
    })
  }

  const nameplate = (): JSX.Element[] => {
    return cards.map((card, index) =>
      <Grid item xs={2} key={index}>
        <Card card={card} />
      </Grid>
    )
  }

  useEffect(() => {
    getEnemies()
    getPlayer()
    getCards()
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
