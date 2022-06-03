import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slice/playerSlice'
import enemiesReducer from './slice/enemiesSlice'
import cardsReducer from './slice/cardsSlice'
import fightEnemiesReducer from './slice/fightEnemiesSlice'
import gameTitleReducer from './slice/gameTitleSlice'
import rootSelectReducer from './slice/rootSelectSlice'
import battleReducer from './slice/battleSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    enemies: enemiesReducer,
    cards: cardsReducer,
    fightEnemies: fightEnemiesReducer,
    gameTitle: gameTitleReducer,
    rootSelect: rootSelectReducer,
    battle: battleReducer
  }
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
