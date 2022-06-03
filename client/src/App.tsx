import { useEffect } from 'react'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ResPlayer, ResEnemies, ResCard } from './types/api/response'
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { setPlayer, initialDeck } from './redux/slice/playerSlice'
import { setEnemies } from './redux/slice/enemiesSlice'
import { setCards } from './redux/slice/cardsSlice'
import GameTitle from './components/gameTitle'
import RootSelect from './components/rootSelect'
import Battle from './components/battle'
import { initializeDeck } from './battle/deck'

const App = (): JSX.Element => {
  const cards = useAppSelector((state) => state.cards)
  const dispatch = useAppDispatch()

  const axiosClient = axios.create({ baseURL: process.env.REACT_APP_API_URL_BROWSER })
  axiosRetry(axiosClient, { retries: 3 })

  const getEnemies = async (): Promise<void> => {
    await axiosClient.get('/v1/enemies')
    .then(res => {
      const resEnemies: ResEnemies[] = res.data
      dispatch(setEnemies(resEnemies))
    })
    .catch(error => {
      console.log("敵の取得に失敗しました")
    })
  }

  const getPlayer = async (): Promise<void> => {
    await axiosClient.get('/v1/players')
    .then(res => {
      const resPlayer: ResPlayer = res.data
      dispatch(setPlayer(resPlayer))
    })
    .catch(error => {
      console.log("プレイヤーの取得に失敗しました")
    })
  }

  const getCards = async (): Promise<void> => {
    await axiosClient.get('/v1/cards')
    .then(res => {
      const resCards: ResCard[] = res.data
      dispatch(setCards(resCards))
    })
    .catch(error => {
      console.log("カードの取得に失敗しました")
    })
  }

  useEffect((): void => {
    getEnemies()
    getPlayer()
    getCards()
  }, [])

  useEffect((): void => {
    const defaultDeck = initializeDeck(cards)
    dispatch(initialDeck(defaultDeck))
  }, [cards])

  return (
    <div>
      <GameTitle />
      <RootSelect />
      <Battle />
    </div>
  )
}

export default App
