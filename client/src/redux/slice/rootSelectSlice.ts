import { createSlice } from '@reduxjs/toolkit'

const initialState = true

export const rootSelectSlice = createSlice({
  name: "rootSelect",
  initialState,
  reducers: {
    disableRootSelect: (state) => true,
    displayRootSelect: (state) => false
  }
})

export const { disableRootSelect, displayRootSelect } = rootSelectSlice.actions

export default rootSelectSlice.reducer
