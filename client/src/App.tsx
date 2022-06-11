import { useEffect } from 'react'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { ResEnemies, ResCard } from './types/api/response'
import { useAppDispatch } from './redux/hooks'
import { setEnemies } from './redux/slice/enemiesSlice'
import { setCards } from './redux/slice/cardsSlice'
import GameTitle from './components/gameTitle'
import RootSelect from './components/rootSelect'
import Battle from './components/battle'

const App = (): JSX.Element => {
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
    getCards()
  }, [])

  return (
    <div>
      <GameTitle />
      <RootSelect />
      <Battle />
    </div>
  )
}

export default App
