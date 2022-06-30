import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { PlayerType, CardType } from "../../../types/model"
import playerReducer from '../../../redux/slice/playerSlice'

export type PreloadedState = {
  player: PlayerType
}

// テストデータ
const cards: CardType[] = [
  {
    id: 1,
    name: "ストライク",
    description: "6ダメージを与える",
    imageUrl: "none",
    cost: 1,
    cardType: "アタック",
    attack: 6,
    defense: 0,
    actionName: "strike",
    executionCount: 1,
    effectType: "oneAttack"
  },
  {
    id: 2,
    name: "ぼうぎょ",
    description: "5ブロックを得る",
    imageUrl: "none",
    cost: 1,
    cardType: "スキル",
    attack: 0,
    defense: 5,
    actionName: "protection",
    executionCount: 1,
    effectType: "guard"
  }
]

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
    deck: cards,
    nameplate: [],
    cemetery: []
  }
}

// deck component用のテスト用のstore
export const deckStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
      },
      preloadedState
    }
  )
}
