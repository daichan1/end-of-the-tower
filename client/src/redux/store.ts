import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './slice/playerSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer
  }
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
