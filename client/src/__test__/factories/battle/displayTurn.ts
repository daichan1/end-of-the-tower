import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import turnReducer from '../../../redux/slice/turnSlice'

export type PreloadedState = {
  turn: boolean
}

// テストデータ
const initialState: PreloadedState = {
  turn: true
}

// display turn component用のテスト用のstore
export const displayTurnStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        turn: turnReducer,
      },
      preloadedState
    }
  )
}
