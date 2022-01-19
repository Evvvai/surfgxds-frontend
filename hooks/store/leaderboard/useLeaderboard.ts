import ActionCreators from '../../../stores/leaderboard.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { Pagination } from '../../../types/store'
import { clientHandle } from 'utils/graphql'
import { LEADERBOARD } from 'types/graphql/quary'
import { useApp } from '../app'

// Leaderboard Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useLeaderboard = () => {
  const { currentMap } = useApp()
  const dispatch = useDispatch()

  const { loadedLeaderboard } = bindActionCreators(
    ActionCreators.actions,
    dispatch
  )

  const changePagination = useCallback(async (pagination: Pagination) => {
    const [data, errors] = await clientHandle(LEADERBOARD, {
      mapId: currentMap?.id,
      limit: pagination.limit,
      offset: pagination.offset,
    })

    loadedLeaderboard({ top: data, pagination })
  }, [])

  const { pagination, top } = useTypesSelector((state) => state.leaderboard)

  return { loadedLeaderboard, changePagination, pagination, top }
}
