import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EnemyType } from '../../types/model/index'

// Stateの初期値
const initialState: EnemyType[] = []

// State, Action, Reducersの管理
export const fightEnemiesSlice = createSlice({
  name: "fightEnemies",
  initialState,
  reducers: {
    setFightEnemies: (state, action: PayloadAction<EnemyType[]>) => {
      action.payload.forEach((enemy) => {
        state.push(enemy)
      })
    },
    resetDamage: (state) => {
      state.forEach(enemy => enemy.damage = -1)
    },
    resetDamaged: (state) => {
      state.forEach(enemy => enemy.isDamaged = false)
    },
    updateEnemyStatus: (state, action: PayloadAction<EnemyType[]>) => action.payload
  }
})

export const { setFightEnemies, resetDamage, resetDamaged, updateEnemyStatus } = fightEnemiesSlice.actions

export default fightEnemiesSlice.reducer
