import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EnemyList } from '../../types/data/enemy'

// Stateの初期値
const initialState: EnemyList = {
  stage1: [],
  stage2: [],
  stage3: [],
  stage4: [],
  stage5: [],
  stage6: []
}

// State, Action, Reducersの管理
export const enemyListSlice = createSlice({
  name: 'enemyList',
  initialState,
  reducers: {
    setEnemyList: (state, action: PayloadAction<EnemyList>) => action.payload
  }
})

export const { setEnemyList } = enemyListSlice.actions

export default enemyListSlice.reducer
