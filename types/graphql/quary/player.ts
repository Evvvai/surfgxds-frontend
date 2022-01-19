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
