import { gql } from 'graphql-request'

export const TRICK = gql`
  query ($mapId: Int!, $id: Int!) {
    trick(input: { mapId: $mapId }, id: $id) {
      id
      name
      point
      velocity
      dateAdd
      authorId
      mapId
      route {
        id
        name
        alternativeName
        src
      }
    }
  }
`

export const TRICKS = gql`
  query ($mapId: Int!) {
    tricks(input: { mapId: $mapId }) {
      id
      name
      point
      velocity
      dateAdd
      authorId
      mapId
      route {
        id
        name
        alternativeName
        src
      }
    }
  }
`

export const TRICKS_STATS = gql`
  query ($mapId: Int!, $steamId: String) {
    tricksStats(input: { mapId: $mapId, steamid: $steamId }) {
      id
      name
      point
      velocity
      dateAdd
      author
      authorSteamid
      completes
      myCompletes
      len
      route {
        id
        name
        alternativeName
        src
        x
        y
        z
      }
    }
  }
`
