import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Friend, FriendState, Trick, TrickState } from '@store'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: TrickState = {
  tricks: [],
}

// Slice
////////////////////////////////////////////////////////////////////////
const trickSlice = createSlice({
  name: 'trick',
  initialState,
  reducers: {
    loadedTricks: (state, { payload }: PayloadAction<Trick[]>) => {
      state.tricks = payload
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

export const { loadedTricks } = trickSlice.actions
export default trickSlice

// Action
