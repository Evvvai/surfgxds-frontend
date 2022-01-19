import { Maps } from '@types'

export interface AppState {
  isLoad: boolean

  currentMap: Maps | null
  availableMaps: Maps[]

  isMenuOpen: boolean
}
