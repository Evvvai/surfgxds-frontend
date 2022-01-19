export enum Theme {
  default = 'default',
  light = 'light',
  dark = 'dark',
}

export interface GQLErrors {
  error: string
  message: string[]
  statusCode: number
}

export interface Maps {
  id: number
  name: string
  src: string | null
}
