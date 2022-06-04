import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlayerType, CardType } from '../../types/model/index'
import { ResPlayer } from '../../types/api/response'
import { deckShuffle } from '../../common/battle'

// Stateの初期値
const initialState: PlayerType = {
  name: "",
  imageUrl: "",
  hp: 0,
  maxHp: 0,
  attack: 0,
  defense: 0,
  energy: 0,
  stage: 0,
  deck: [],
  nameplate: [],
  cemetery: []
}

// State, Action, Reducersの管理
export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<ResPlayer>) => {
      const { name, image_url, hp, attack, defense, energy } = action.payload
      state.name = name
      state.imageUrl = image_url
      state.hp = hp
      state.maxHp = hp
      state.attack = attack
      state.defense = defense
      state.energy = energy
    },
    initialDeck: (state, action: PayloadAction<CardType[]>) => {
      state.deck = action.payload
    },
    cardDraw: (state, action: PayloadAction<number>) => {
      state.deck.forEach((card, i) => {
        if (i < action.payload) {
          state.nameplate.push(card)
        }
      })
      state.deck.splice(0, action.payload)
    },
    recoveryDeck: (state) => {
      state.deck = state.deck.concat(state.cemetery)
      state.deck = deckShuffle(state.deck)
      state.cemetery = []
    },
    updatePlayerStatus: (state, action: PayloadAction<PlayerType>) => action.payload
  }
})

export const {
  setPlayer,
  initialDeck,
  cardDraw,
  recoveryDeck,
  updatePlayerStatus
} = playerSlice.actions

export default playerSlice.reducer
