import { createSlice } from '@reduxjs/toolkit'

// Stateの初期値
const initialState = 0

// State, Action, Reducersの管理
export const playerActionCountSlice = createSlice({
  name: 'playerActionCount',
  initialState,
  reducers: {
    incrementPlayerActionCount: (state) => state + 1,
    resetPlayerActionCount: (state) => 0
  }
})

export const { incrementPlayerActionCount, resetPlayerActionCount } = playerActionCountSlice.actions

export default playerActionCountSlice.reducer
