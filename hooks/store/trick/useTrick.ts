import ActionCreators from '../../../stores/trick.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { Maps } from '@types'
import { clientHandle } from 'utils/graphql'
import { TRICKS_STATS } from 'types/graphql/quary'

// Trick Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useTrick = () => {
  const dispatch = useDispatch()

  const { loadedTricks } = bindActionCreators(ActionCreators.actions, dispatch)
  const { tricks } = useTypesSelector((state) => state.trick)

  const loadTricks = useCallback(
    async (map: Maps, steamid64: string | null) => {
      const [data, errors] = await clientHandle(TRICKS_STATS, {
        mapId: map.id,
        steamId: steamid64,
      })
      loadedTricks(data)
    },
    []
  )

  return { tricks, loadedTricks, loadTricks }
}
