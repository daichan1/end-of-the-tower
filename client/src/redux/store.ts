import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slice/playerSlice'
import enemiesReducer from './slice/enemiesSlice'
import cardsReducer from './slice/cardsSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    enemies: enemiesReducer,
    cards: cardsReducer
  }
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
