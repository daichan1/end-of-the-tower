import { createSlice } from '@reduxjs/toolkit'

// Stateの初期値
const initialState = false

// State, Action, Reducersの管理
export const enemyDefeatedSlice = createSlice({
  name: 'enemyDefeated',
  initialState,
  reducers: {
    enemyDefeated: (state) => true,
    notEnemyDefeated: (state) => false
  }
})

export const { enemyDefeated, notEnemyDefeated } = enemyDefeatedSlice.actions

export default enemyDefeatedSlice.reducer
