import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Stateの初期値
const initialState = 0

// State, Action, Reducersの管理
export const choiceEnemySlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setChoiceEnemyNumber: (state, action: PayloadAction<number>) => action.payload,
    resetChoiceEnemyNumber: (state) => 0
  }
})

export const { setChoiceEnemyNumber, resetChoiceEnemyNumber } = choiceEnemySlice.actions

export default choiceEnemySlice.reducer
