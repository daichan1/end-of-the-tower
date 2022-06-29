import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { CardType } from "../../types/model"
import cardsReducer from '../../redux/slice/cardsSlice'
import gameTitleReducer from '../../redux/slice/gameTitleSlice'
import rootSelectReducer from '../../redux/slice/rootSelectSlice'

type PreloadedState = {
  cards: CardType[]
  gameTitle: boolean
  rootSelect: boolean
}

// テストデータ
const initialState: PreloadedState = {
  cards: [],
  gameTitle: false,
  rootSelect: true
}

// gameTitle用のテスト用のstore
export const gameTitleStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        cards: cardsReducer,
        gameTitle: gameTitleReducer,
        rootSelect: rootSelectReducer
      },
      preloadedState
    }
  )
}
