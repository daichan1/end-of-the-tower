import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardType } from '../../types/model'

export type Reward = {
  disabled: boolean
  displayCards: CardType[]
  cards: CardType[]
}

const initialState: Reward = {
  disabled: true,
  displayCards: [],
  cards: []
}

export const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    disableReward: (state) => {
      state.disabled = true
    },
    displayReward: (state) => {
      state.disabled = false
    },
    setDisplayRewardCards: (state, action: PayloadAction<CardType[]>) => {
      state.displayCards = action.payload
    },
    setRewardCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload
    }
  }
})

export const { disableReward, displayReward, setDisplayRewardCards, setRewardCards} = rewardSlice.actions

export default rewardSlice.reducer
