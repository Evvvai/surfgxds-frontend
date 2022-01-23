import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Trick, TrickState, Trigger } from '@store'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: TrickState = {
  isLoad: false,
  tricks: [],
  triggers: [],
}

// Slice
////////////////////////////////////////////////////////////////////////
const trickSlice = createSlice({
  name: 'trick',
  initialState,
  reducers: {
    loadedTricks: (
      state,
      { payload }: PayloadAction<{ tricks: Trick[]; triggers: Trigger[] }>
    ) => {
      state.isLoad = true
      state.tricks = payload.tricks
      state.triggers = payload.triggers
    },
    resetTricks: (state) => {
      state.isLoad = false
      state.tricks = []
      state.triggers = []
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.trick,
      }
    },
  },
})

export const { loadedTricks, resetTricks } = trickSlice.actions
export default trickSlice

// Action
