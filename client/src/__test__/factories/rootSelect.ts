import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { PlayerType } from "../../types/model"
import playerReducer from '../../redux/slice/playerSlice'
import rootSelectReducer from '../../redux/slice/rootSelectSlice'

type PreloadedState = {
  player: PlayerType
  rootSelect: boolean
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
  rootSelect: false
}

// gameTitle用のテスト用のstore
export const rootSelectStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
        rootSelect: rootSelectReducer
      },
      preloadedState
    }
  )
}
