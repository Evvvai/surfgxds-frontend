export interface PlayerState {
  isLoggedIn: boolean
  playerInfo: Player
}

export interface Player {
  id: number
  nick: string
  steamid64: string
  avatarfull: string
  avatarCustom: string
  dashboard: string
  dateReg: Date
  lastLogin: Date
  role: Role
}

export enum Role {
  PLAYER = 'player',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}
