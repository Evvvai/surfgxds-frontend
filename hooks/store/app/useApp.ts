import ActionCreatorsApp from '../../../stores/app.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { clientHandle } from 'utils/graphql'
import { AUTH } from 'types/graphql/mutation'

// Application Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useApp = () => {
  const dispatch = useDispatch()
  const { appLoaded } = bindActionCreators(ActionCreatorsApp.actions, dispatch)
  const { isLoad, currentMap, availableMaps } = useTypesSelector(
    (state) => state.app
  )

  return { currentMap, availableMaps, isLoad, appLoaded }
}
