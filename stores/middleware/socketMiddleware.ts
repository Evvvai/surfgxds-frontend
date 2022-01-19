import { Dispatch } from 'redux'
import { RootState } from 'stores/rootReducer'

import SocketsActions from './combineSocketsActions'
import SocketsOn from './combineSocketsOn'

const INIT_KEY = 'user/setPlayerSetting'

// Interface
interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: () => RootState
}

// Middleware
///////////////////////////////////////////////////////////////////////////////////////////////////////////
const socketMiddleware = (socket: any) => {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params
    const { type, payload } = action

    // Init
    if (type === INIT_KEY) {
      socket.connect()
      SocketsOn(socket, dispatch)
      return next(action)
    }

    // Split actions
    const actions = type.split('/')
    const socketAction = SocketsActions[actions[0]]
    if (typeof socketAction === 'function') {
      socketAction(actions[1], socket, payload, dispatch)
    }

    return next(action)
  }
}

export default socketMiddleware
