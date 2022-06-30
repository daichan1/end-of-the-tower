import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { PlayerType } from "../../../types/model"
import playerReducer from '../../../redux/slice/playerSlice'
import drawButtonReducer from '../../../redux/slice/drawButtonSlice'

export type PreloadedState = {
  player: PlayerType
  drawButton: boolean
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
  drawButton: false
}

// draw button component用のテスト用のstore
export const drawButtonStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
        drawButton: drawButtonReducer
      },
      preloadedState
    }
  )
}
