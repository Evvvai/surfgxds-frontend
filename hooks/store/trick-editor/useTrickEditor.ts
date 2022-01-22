import ActionCreators from '../../../stores/trick-editor.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { Maps } from '@types'
import { TRIGGERS } from 'types/graphql/quary'
import { clientHandle } from 'utils/graphql'

// Trick Editor Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useTrickEditor = () => {
  const dispatch = useDispatch()

  const {
    setRouteTrick,
    setTriggerTrick,
    setPointsTrick,
    setNameTrick,
    clearTrickEditor,
    sendTrick,
    loadedTrickEditor,
  } = bindActionCreators(ActionCreators.actions, dispatch)

  const { name, points, route, trickEditingId, trigger, triggers, velocity } =
    useTypesSelector((state) => state.trickEditor)

  const loadTrickEditor = useCallback(async (map: Maps) => {
    const [data, errors] = await clientHandle(TRIGGERS, {
      mapId: map.id,
    })
    loadedTrickEditor(data)
  }, [])

  return {
    loadTrickEditor,
    sendTrick,
    clearTrickEditor,
    setPointsTrick,
    setNameTrick,
    setTriggerTrick,
    setRouteTrick,
    name,
    points,
    route,
    trickEditingId,
    trigger,
    triggers,
    velocity,
  }
}
