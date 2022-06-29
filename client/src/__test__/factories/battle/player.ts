import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { PlayerType } from "../../../types/model"
import playerReducer from '../../../redux/slice/playerSlice'
import playerDamageReducer from '../../../redux/slice/playerDamageSlice'

export type PreloadedState = {
  player: PlayerType
  playerDamage: number
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
  playerDamage: 0,
}

// player component用のテスト用のstore
export const playerStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
        playerDamage: playerDamageReducer,
      },
      preloadedState
    }
  )
}
