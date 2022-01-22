import { Player } from './player'
export interface TrickState {
  isLoad: boolean
  tricks: Trick[]
}

export interface Trick {
  index: number
  id: number
  name: string
  point: number
  velocity: number
  dateAdd: Date
  len: number | null
  authorSteamid: string | null
  completes: string | null
  myCompletes: string | null
  author: Player

  /////////////////////////////////////////////////////////////////////////////////
  // Relations

  route: Trigger[]
  // completes: Completes[];
  // swrs: Swr[];
  // author: Players;
  // twrs: Twr[];
  // map: Maps;
}

export interface Trigger {
  id: number
  name: string
  alternativeName: string
  src: string | null
  x: number | null
  y: number | null
  z: number | null
  mapId: number

  /////////////////////////////////////////////////////////////////////////////////
  // Relations

  // hopTriggers: HopTriggers[]
  // routes: Routes[]
  // triggersTimeSpeedTouches: TriggersTimeSpeedTouch[]
  // triggersTimeSpeedTouches2: TriggersTimeSpeedTouch[]
  // suggestedRoutes: SuggestedRoutes[]
  // map: Maps
}
