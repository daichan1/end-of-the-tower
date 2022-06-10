import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Stateの初期値
const initialState = -1

// State, Action, Reducersの管理
export const enemyDamageSlice = createSlice({
  name: 'enemyDamage',
  initialState,
  reducers: {
    setEnemyDamage: (state, action: PayloadAction<number>) => action.payload,
    resetEnemyDamage: (state) => -1
  }
})

export const { setEnemyDamage, resetEnemyDamage } = enemyDamageSlice.actions

export default enemyDamageSlice.reducer
