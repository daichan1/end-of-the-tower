import { configureStore, EnhancedStore } from "@reduxjs/toolkit"
import { PlayerType, EnemyType, CardType } from "../../types/model"
import playerReducer from '../../redux/slice/playerSlice'
import fightEnemiesReducer from '../../redux/slice/fightEnemiesSlice'
import battleReducer from '../../redux/slice/battleSlice'
import turnReducer from '../../redux/slice/turnSlice'
import choiceEnemyReducer from '../../redux/slice/choiceEnemySlice'
import drawButtonReducer from '../../redux/slice/drawButtonSlice'
import playerActionCountReducer from '../../redux/slice/playerActionCountSlice'
import rewardReducer, { Reward } from '../../redux/slice/rewardSlice'
import enemyDefeatedReducer from '../../redux/slice/enemyDefeatedSlice'

type PreloadedState = {
  player: PlayerType
  fightEnemies: EnemyType[]
  battle: boolean
  turn: boolean
  choiceEnemy: number
  drawButton: boolean
  playerActionCount: number
  reward: Reward
  enemyDefeated: boolean
}

// テストデータ
export const enemies: EnemyType[] = [
  {
    id: 1,
    name: "スライム",
    imageUrl: "none",
    hp: 10,
    maxHp: 10,
    attack: 4,
    defense: 0,
    damage: 0,
    floorNumber: 1,
    isBoss: false
  }
]

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
  },
  {
    id: 4,
    name: "モールクロー",
    description: "14ダメージを与える",
    imageUrl: "none",
    cost: 2,
    cardType: "アタック",
    attack: 14,
    defense: 0,
    actionName: "moleclaw",
    executionCount: 1,
    effectType: "oneAttack"
  },
  {
    id: 5,
    name: "マンティス",
    description: "5ダメージを与える",
    imageUrl: "none",
    cost: 1,
    cardType: "アタック",
    attack: 5,
    defense: 0,
    actionName: "mantis",
    executionCount: 1,
    effectType: "allAttack"
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
  },
  fightEnemies: enemies,
  battle: false,
  turn: true,
  choiceEnemy: 0,
  drawButton: false,
  playerActionCount: 0,
  reward: {
    disabled: false,
    displayCards: [],
    cards: cards
  },
  enemyDefeated: false
}

// battle component用のテスト用のstore
export const battleStore = (preloadedState: PreloadedState = initialState): EnhancedStore => {
  return configureStore(
    {
      reducer: {
        player: playerReducer,
        fightEnemies: fightEnemiesReducer,
        battle: battleReducer,
        turn: turnReducer,
        choiceEnemy: choiceEnemyReducer,
        drawButton: drawButtonReducer,
        playerActionCount: playerActionCountReducer,
        reward: rewardReducer,
        enemyDefeated: enemyDefeatedReducer
      },
      preloadedState
    }
  )
}
