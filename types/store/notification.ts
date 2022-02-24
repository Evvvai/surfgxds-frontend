import { ApiStatus } from '@types'
import { Player } from './player'

export interface NotificationState {
  isNotificationStatus: ApiStatus
  isNotificationOpen: boolean

  tricksLost: TrickLostNotify[]
  news: NewsNotify[]
}

export interface TrickLostNotify {
  type: 'swr' | 'twr'
  nowSpeed: number
  beforeSpeed: number
  nowTime: number
  beforeTime: number
  nowDate: Date
  beforeDate: Date
  beforeSteamid64: number
  beforeNick: string
  trickId: number
  trickName: string
  player: Player
}

export interface NewsNotify {
  date: Date
}
