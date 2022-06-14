import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EnemyType } from '../../types/model/index'
import { ResEnemies } from '../../types/api/response'

// Stateの初期値
const initialState: EnemyType[] = []

// State, Action, Reducersの管理
export const enemiesSlice = createSlice({
  name: 'enemies',
  initialState,
  reducers: {
    setEnemies: (state, action: PayloadAction<ResEnemies[]>) => {
      action.payload.forEach((resEnemy) => {
        const enemy: EnemyType = {
          id: resEnemy.id,
          name: resEnemy.name,
          imageUrl: resEnemy.image_url,
          hp: resEnemy.hp,
          maxHp: resEnemy.hp,
          attack: resEnemy.attack,
          defense: resEnemy.defense,
          damage: -1
        }
        state.push(enemy)
      })
    }
  }
})

export const { setEnemies } = enemiesSlice.actions

export default enemiesSlice.reducer
