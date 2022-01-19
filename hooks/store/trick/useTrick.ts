import ActionCreators from '../../../stores/trick.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'

// Trick Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useTrick = () => {
  const dispatch = useDispatch()

  const { loadedTricks } = bindActionCreators(ActionCreators.actions, dispatch)
  const { tricks } = useTypesSelector((state) => state.trick)

  return { tricks, loadedTricks }
}
