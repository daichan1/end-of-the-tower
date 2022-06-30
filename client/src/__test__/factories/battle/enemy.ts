import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { EnemyType } from "../../../types/model"
import fightEnemiesReducer from '../../../redux/slice/fightEnemiesSlice'
import choiceEnemyReducer from '../../../redux/slice/choiceEnemySlice'

export type PreloadedState = {
  fightEnemies: EnemyType[]
  choiceEnemy: number
}

// テストデータ
const initialState: PreloadedState = {
  fightEnemies: [
    {
      id: 1,
      name: "スライム",
      imageUrl: "none",
      hp: 20,
      maxHp: 20,
      attack: 4,
      defense: 0,
      damage: 0,
      floorNumber: 1,
      isBoss: false
    }
  ],
  choiceEnemy: 0
}

// enemy component用のテスト用のstore
export const enemyStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        fightEnemies: fightEnemiesReducer,
        choiceEnemy: choiceEnemyReducer
      },
      preloadedState
    }
  )
}
