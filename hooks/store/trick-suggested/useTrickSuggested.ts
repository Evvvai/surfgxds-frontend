import ActionCreators from '../../../stores/trick-suggested.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { clientHandle } from 'utils/graphql'
import { Pagination, TrickSuggested } from '@store'
import {
  PLAYER_RATE,
  SUGGESTED_TRICK,
} from 'types/graphql/quary/trick-suggested'
import { useApp } from '../app'
import { ACCEPT_TRICK, DECLINE_TRICK } from 'types/graphql/mutation/'
import { usePlayer } from '../player/usePlayer'
import { useTrick } from '../trick/useTrick'

// Trick suggested Editor Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useTrickSuggested = () => {
  const { isLoggedIn, playerInfo } = usePlayer()
  const { currentMap } = useApp()
  const { loadTricks } = useTrick()
  const dispatch = useDispatch()

  const { declinedTrick, acceptedTrick, loadedTrickSuggested } =
    bindActionCreators(ActionCreators.actions, dispatch)

  const { myRates, tricksSuggested, pagination } = useTypesSelector(
    (state) => state.trickSuggested
  )

  const changePagination = useCallback(
    async (pagination: Pagination) => {
      const [tricksSuggested, tricksSuggestedErrors] = await clientHandle(
        SUGGESTED_TRICK,
        {
          mapId: currentMap?.id,
          limit: pagination.limit,
          offset: pagination.offset,
        }
      )

      const [myRates, myRatesErrors] = isLoggedIn
        ? await clientHandle(PLAYER_RATE, {
            ids: tricksSuggested?.map((val: TrickSuggested) => val.id),
          })
        : [[], []]

      loadedTrickSuggested({ tricksSuggested, myRates, pagination })
    },
    [currentMap]
  )

  const acceptTrick = useCallback(async (trick: TrickSuggested) => {
    const [newTrick, errors] = await clientHandle(ACCEPT_TRICK, {
      trickId: trick.id,
    })
    loadTricks(currentMap, playerInfo.steamid64)
    acceptedTrick(trick)
  }, [])

  const declineTrick = useCallback(async (trick: TrickSuggested) => {
    const [newTrick, errors] = await clientHandle(DECLINE_TRICK, {
      trickId: trick.id,
    })
    declinedTrick(trick)
  }, [])

  return {
    myRates,
    loadedTrickSuggested,
    changePagination,
    pagination,
    tricksSuggested,
    acceptTrick,
    declineTrick,
  }
}
