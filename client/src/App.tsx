import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import axiosClient from './api/axios'
import { ResEnemies, ResCard } from './types/api/response'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { setEnemies } from './redux/slice/enemiesSlice'
import { setCards } from './redux/slice/cardsSlice'
import { setEnemyList } from './redux/slice/enemyListSlice'
import GameTitle from './components/gameTitle'
import RootSelect from './components/rootSelect'
import Battle from './components/battle'
import Reward from './components/reward'
import { createEnemyList } from './data/enemyList'

const App = (): JSX.Element => {
  const enemies = useAppSelector((state) => state.enemies)
  const floor = useAppSelector((state) => state.floor)
  const dispatch = useAppDispatch()

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

  useEffect((): void => {
    dispatch(setEnemyList(createEnemyList(enemies, floor)))
  }, [enemies, floor])

  return (
    <div>
      <CssBaseline />
      <GameTitle />
      <RootSelect />
      <Battle />
      <Reward />
    </div>
  )
}

export default App
