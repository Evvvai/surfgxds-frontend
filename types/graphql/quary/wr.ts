import { gql } from 'graphql-request'

export const SWR = gql`
  query ($trickId: Int!) {
    swr(trickId: $trickId) {
      id
      speed
      time
      dateAdd
      player {
        id
        steamid64
        nick
        profileurl
        avatarfull
        avatarCustom
      }
    }
  }
`

export const TWR = gql`
  query ($trickId: Int!) {
    twr(trickId: $trickId) {
      id
      speed
      time
      dateAdd
      player {
        id
        steamid64
        nick
        profileurl
        avatarfull
        avatarCustom
      }
    }
  }
`
export const LOST_NOTIFY = gql`
  query ($mapId: Int!, $steamid64: String!) {
    lostNotify(mapId: $mapId, steamid64: $steamid64) {
      type
      nowSpeed
      beforeSpeed
      nowSpeed
      nowTime
      beforeTime
      nowDate
      beforeDate
      trickName
      player {
        steamid64
        nick
        avatarfull
        avatarCustom
      }
    }
  }
`
