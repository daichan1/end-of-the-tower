import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { PlayerType } from "../../../types/model"
import playerReducer from '../../../redux/slice/playerSlice'

export type PreloadedState = {
  player: PlayerType
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
  }
}

// energy component用のテスト用のstore
export const energyStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
      },
      preloadedState
    }
  )
}
