import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Friend, FriendState, Trick, TrickState } from '@store'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: TrickState = {
  isLoad: false,
  tricks: [],
}

// Slice
////////////////////////////////////////////////////////////////////////
const trickSlice = createSlice({
  name: 'trick',
  initialState,
  reducers: {
    loadedTricks: (state, { payload }: PayloadAction<Trick[]>) => {
      state.isLoad = true
      state.tricks = payload
    },
    resetTricks: (state) => {
      state.isLoad = false
      state.tricks = []
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
