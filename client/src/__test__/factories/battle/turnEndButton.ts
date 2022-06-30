import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import turnReducer from '../../../redux/slice/turnSlice'

export type PreloadedState = {
  turn: boolean
}

// テストデータ
const initialState: PreloadedState = {
  turn: true
}

// turn end button component用のテスト用のstore
export const turnEndButtonStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        turn: turnReducer,
      },
      preloadedState
    }
  )
}
