import ActionCreators from '../../../stores/trick.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { Maps } from '@types'
import { clientHandle } from 'utils/graphql'
import { TRICKS_STATS, TRIGGERS } from 'types/graphql/quary'

// Trick Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useTrick = () => {
  const dispatch = useDispatch()

  const { loadedTricks } = bindActionCreators(ActionCreators.actions, dispatch)
  const { tricks, triggers } = useTypesSelector((state) => state.trick)

  const loadTricks = useCallback(
    async (map: Maps, steamid64: string | null) => {
      const [tricks, tricksErrors] = await clientHandle(TRICKS_STATS, {
        mapId: map.id,
        steamId: steamid64,
      })
      const [triggers, triggersErrors] = await clientHandle(TRIGGERS, {
        mapId: map.id,
      })
      loadedTricks({ tricks, triggers })
      return { tricks, triggers }
    },
    []
  )

  return { tricks, triggers, loadedTricks, loadTricks }
}
