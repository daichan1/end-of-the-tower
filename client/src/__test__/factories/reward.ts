import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { CardType, PlayerType } from "../../types/model"
import playerReducer from '../../redux/slice/playerSlice'
import rewardReducer, { Reward } from '../../redux/slice/rewardSlice'
import floorReducer from '../../redux/slice/floorSlice'

export type PreloadedState = {
  player: PlayerType
  reward: Reward
  floor: number
}

export const cards: CardType[] = [
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
  },
  {
    id: 3,
    name: "スコーピオン",
    description: "4ダメージを与える",
    imageUrl: "none",
    cost: 0,
    cardType: "アタック",
    attack: 4,
    defense: 0,
    actionName: "scorpion",
    executionCount: 1,
    effectType: "oneAttack"
  }
]

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
  reward: {
    disabled: false,
    displayCards: cards,
    cards: cards
  },
  floor: 0
}

// reward component用のテスト用のstore
export const rewardStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
        reward: rewardReducer,
        floor: floorReducer
      },
      preloadedState
    }
  )
}
