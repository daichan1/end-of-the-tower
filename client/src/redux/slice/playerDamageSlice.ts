import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Stateの初期値
const initialState = -1

// State, Action, Reducersの管理
export const playerDamageSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerDamage: (state, action: PayloadAction<number>) => action.payload,
    resetPlayerDamage: (state) => -1
  }
})

export const { setPlayerDamage, resetPlayerDamage } = playerDamageSlice.actions

export default playerDamageSlice.reducer
