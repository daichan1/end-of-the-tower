import { createSlice } from '@reduxjs/toolkit'

const initialState = true

export const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    disableBattle: (state) => true,
    displayBattle: (state) => false
  }
})

export const { disableBattle, displayBattle } = battleSlice.actions

export default battleSlice.reducer
