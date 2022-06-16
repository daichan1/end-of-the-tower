import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CardType } from '../../types/model/index'
import { ResCard } from '../../types/api/response'

// Stateの初期値
const initialState: CardType[] = []

// State, Action, Reducersの管理
export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<ResCard[]>) => {
      action.payload.forEach((resCard) => {
        const card: CardType = {
          id: resCard.id,
          name: resCard.name,
          description: resCard.description,
          imageUrl: resCard.image_url,
          cost: resCard.cost,
          cardType: resCard.card_type,
          attack: resCard.attack,
          defense: resCard.defense,
          actionName: resCard.action_name,
          executionCount: resCard.execution_count,
          effectType: resCard.effect_type
        }
        state.push(card)
      })
    }
  }
})

export const { setCards } = cardsSlice.actions

export default cardsSlice.reducer
