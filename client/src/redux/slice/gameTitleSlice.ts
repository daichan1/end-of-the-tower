import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const gameTitleSlice = createSlice({
  name: "gameTitle",
  initialState,
  reducers: {
    disableGameTitle: (state) => true,
    displayGameTitle: (state) => false
  }
})

export const { disableGameTitle, displayGameTitle } = gameTitleSlice.actions

export default gameTitleSlice.reducer
