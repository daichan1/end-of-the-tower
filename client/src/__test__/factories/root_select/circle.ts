import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { PlayerType } from '../../../types/model/index'
import { EnemyList } from '../../../types/data/enemy'
import playerReducer from '../../../redux/slice/playerSlice'
import enemyListReducer from '../../../redux/slice/enemyListSlice'
import battleReducer from '../../../redux/slice/battleSlice'
import rootSelectReducer from '../../../redux/slice/rootSelectSlice'

type PreloadedState = {
  player: PlayerType
  enemyList: EnemyList
  rootSelect: boolean
  battle: boolean
}

// テストデータ
const initialState: PreloadedState = {
  player: {
    name: "アタッカー",
    imageUrl: "none",
    hp: 80,
    maxHp: 80,
    attack: 0,
    defense: 0,
    energy: 3,
    stage: 0,
    deck: [],
    nameplate: [],
    cemetery: []
  },
  enemyList: {
    stage1: [],
    stage2: [],
    stage3: [],
    stage4: [],
    stage5: [],
    stage6: []
  },
  rootSelect: false,
  battle: true
}

// circle componentのテスト用のstore
export const circleStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
        enemyList: enemyListReducer,
        battle: battleReducer,
        rootSelect: rootSelectReducer
      },
      preloadedState
    }
  )
}
