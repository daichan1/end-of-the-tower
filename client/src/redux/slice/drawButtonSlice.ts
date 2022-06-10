import { createSlice } from '@reduxjs/toolkit'

// Stateの初期値
const initialState = false

// State, Action, Reducersの管理
export const drawButtonSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    drawButtonDisabled: (state) => true,
    drawButtonNotDisabled: (state) => false
  }
})

export const { drawButtonDisabled, drawButtonNotDisabled } = drawButtonSlice.actions

export default drawButtonSlice.reducer
