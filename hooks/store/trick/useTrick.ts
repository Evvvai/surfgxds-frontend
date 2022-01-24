import ActionCreators from '../../../stores/trick.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { Maps } from '@types'
import { clientHandle } from 'utils/graphql'
import { TRICKS_STATS, TRIGGERS } from 'types/graphql/quary'
import { UPDATE_TRIGGER } from '../../../types/graphql/mutation/triggers'

// Trick Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useTrick = () => {
  const dispatch = useDispatch()

  const { loadedTricks, filtered, updatedTrigger } = bindActionCreators(
    ActionCreators.actions,
    dispatch
  )
  const { tricks, filteredTricks, triggers } = useTypesSelector(
    (state) => state.trick
  )

  const loadTricks = useCallback(
    async (map: Maps, steamid64: string | null) => {
      const [tricks, tricksErrors] = await clientHandle(TRICKS_STATS, {
        mapId: map.id,
        steamId: steamid64,
      })
      const [triggers, triggersErrors] = await clientHandle(TRIGGERS, {
        mapId: map.id,
      })
      // console.log('mounted', tricks, triggers, map)
      loadedTricks({ tricks, triggers })
      return { tricks, triggers }
    },
    []
  )

  const filteringTriggers = (term: string) => {
    filtered(
      [...tricks].filter((val) =>
        val.name.toLowerCase().includes(term.toLowerCase())
      )
    )
  }

  const updatingTrigger = async (name: string, id: number, src: string) => {
    const [trigger, triggerErrors] = await clientHandle(UPDATE_TRIGGER, {
      id,
      name,
      src,
    })

    updatedTrigger(trigger)
  }

  return {
    updatingTrigger,
    tricks,
    filteredTricks,
    triggers,
    loadedTricks,
    loadTricks,
    filteringTriggers,
  }
}
