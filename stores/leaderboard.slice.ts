import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Leaderboard, LeaderboardState, Pagination } from '@store'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: LeaderboardState = {
  top: [],
  pagination: {} as Pagination,
}

// Slice
////////////////////////////////////////////////////////////////////////
const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    loadedLeaderboard: (
      state,
      { payload }: PayloadAction<{ top: Leaderboard[]; pagination: Pagination }>
    ) => {
      state.top = payload.top
      state.pagination = payload.pagination
    },
    changedPagination: (state, { payload }: PayloadAction<Pagination>) => {
      state.pagination = payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.leaderboard,
      }
    },
  },
})

export const { loadedLeaderboard } = leaderboardSlice.actions
export default leaderboardSlice

// Action
