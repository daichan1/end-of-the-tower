import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { PlayerType } from "../../../types/model"
import playerReducer from '../../../redux/slice/playerSlice'

type PreloadedState = {
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

// header component用のテスト用のstore
export const headerStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
      },
      preloadedState
    }
  )
}
