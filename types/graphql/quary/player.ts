import { gql } from 'graphql-request'

export const PLAYER = gql`
  query ($steamid64: String!) {
    findOneBySteamid64(steamid64: $steamid64) {
      id
      steamid64
      nick
      profileurl
      avatarfull
      avatarCustom
      dashboard
      dateJoined
      lastLoginSite
      lastLoginServer
      role
    }
  }
`

export const PLAYER_BY_STEAMIDS = gql`
  query ($steamids64: [String!]!) {
    playersBySteamids(steamids64: $steamids64) {
      id
      steamid64
      profileurl
      avatarfull
      avatarCustom
      nick
      lastLoginSite
      lastLoginServer
      role
    }
  }
`
