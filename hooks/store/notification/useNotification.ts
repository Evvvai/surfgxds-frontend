import ActionCreators from '../../../stores/notification.slice'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useTypesSelector } from '../useTypesSelector'
import { useCallback } from 'react'
import { usePlayer } from '../player/usePlayer'
import { useApp } from '../app/useApp'
import { clientHandle } from '../../../utils/graphql/index'
import { LOST_NOTIFY } from 'types/graphql/quary'

// Notification Hook Selector / Dispatch
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const useNotification = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, playerInfo } = usePlayer()
  const { currentMap } = useApp()

  const { openNotification, closeNotification, loadedNotification } =
    bindActionCreators(ActionCreators.actions, dispatch)

  const { isNotificationStatus, isNotificationOpen, tricksLost, news } =
    useTypesSelector((state) => state.notification)

  const loadNotification = useCallback(async () => {
    let [dataTricksLost, dataTricksLostErrors] = [[], []]

    if (isLoggedIn) {
      ;[dataTricksLost, dataTricksLostErrors] = await clientHandle(
        LOST_NOTIFY,
        {
          steamid64: playerInfo.steamid64,
          mapId: currentMap.id,
        }
      )
    }

    // const [dataTricksLost, dataTricksLostErrors] = await clientHandle(
    //   LOST_NOTIFY,
    //   {
    //     steamid64: playerInfo.steamid64,
    //     mapId: currentMap.id,
    //   }
    // )

    loadedNotification({ news: [], tricksLost: dataTricksLost })
  }, [currentMap.id, isLoggedIn])

  return {
    loadNotification,
    openNotification,
    closeNotification,
    isNotificationStatus,
    isNotificationOpen,
    tricksLost,
    news,
  }
}
