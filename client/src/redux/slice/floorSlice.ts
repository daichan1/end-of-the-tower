import { createSlice } from '@reduxjs/toolkit'

// Stateの初期値
const initialState = 1

// State, Action, Reducersの管理
export const floorSlice = createSlice({
  name: "floor",
  initialState,
  reducers: {
    incrementFloor: (state) => {
      state = state + 1
    },
    resetFloor: (state) => 1
  }
})

export const { incrementFloor, resetFloor } = floorSlice.actions

export default floorSlice.reducer
