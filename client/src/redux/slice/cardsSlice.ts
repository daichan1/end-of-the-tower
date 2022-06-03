import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardBaseType } from '../../types/model/index'
import { ResCard } from '../../types/api/response'

// Stateの初期値
const initialState: CardBaseType[] = []

// State, Action, Reducersの管理
export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<ResCard[]>) => {
      action.payload.forEach((resCard) => {
        const card: CardBaseType = {
          name: resCard.name,
          description: resCard.description,
          imageUrl: resCard.image_url,
          cost: resCard.cost,
          cardType: resCard.card_type,
          attack: resCard.attack,
          defense: resCard.defense,
          actionName: resCard.action_name
        }
        state.push(card)
      })
    }
  }
})

export const { setCards } = cardsSlice.actions

export default cardsSlice.reducer
