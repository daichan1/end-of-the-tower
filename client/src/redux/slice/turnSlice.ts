import { createSlice } from '@reduxjs/toolkit'

// Stateの初期値
const initialState = true

// State, Action, Reducersの管理
export const turnSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    playerTurn: (state) => true,
    enemyTurn: (state) => false
  }
})

export const { playerTurn, enemyTurn } = turnSlice.actions

export default turnSlice.reducer
