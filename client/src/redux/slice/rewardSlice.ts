import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardBaseType } from '../../types/model'

type Reward = {
  disabled: boolean
  displayCards: CardBaseType[]
  cards: CardBaseType[]
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
    setDisplayRewardCards: (state, action: PayloadAction<CardBaseType[]>) => {
      state.displayCards = action.payload
    },
    setRewardCards: (state, action: PayloadAction<CardBaseType[]>) => {
      state.cards = action.payload
    }
  }
})

export const { disableReward, displayReward, setDisplayRewardCards, setRewardCards} = rewardSlice.actions

export default rewardSlice.reducer
