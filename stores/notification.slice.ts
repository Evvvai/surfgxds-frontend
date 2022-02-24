import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NewsNotify, NotificationState, TrickLostNotify } from '@store'
import { ApiStatus } from '@types'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: NotificationState = {
  isNotificationStatus: ApiStatus.NONE,
  isNotificationOpen: false,

  tricksLost: [],
  news: [],
}

// Slice
////////////////////////////////////////////////////////////////////////
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    loadedNotification: (
      state,
      {
        payload,
      }: PayloadAction<{ tricksLost: TrickLostNotify[]; news: NewsNotify[] }>
    ) => {
      state.isNotificationStatus = ApiStatus.FULFILLED
      state.tricksLost = payload.tricksLost
      state.news = payload.news
    },
    openNotification: (state) => {
      state.isNotificationOpen = true
    },
    closeNotification: (state) => {
      state.isNotificationOpen = false
    },
    resetNotification: (state) => {
      state.isNotificationStatus = ApiStatus.NONE
      state.tricksLost = []
      state.news = []
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.notification,
      }
    },
  },
})

export const { resetNotification } = notificationSlice.actions
export default notificationSlice

// Action
