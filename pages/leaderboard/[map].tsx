import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'
import { clientHandle } from 'utils/graphql'
import { LEADERBOARD } from 'types/graphql/quary'
import { loadedLeaderboard } from 'stores/leaderboard.slice'

// Styles
import styles from '../../styles/leaderboard/Leaderboard.module.scss'

// Components
import LeaderboardListHeader from '../../components/leaderboard/leaderboard-heard/LeaderboardListHeader.component'
import LeaderboardList from '../../components/leaderboard/LeaderboardList.component'

// Custom hook
import { useLeaderboard } from 'hooks/store/leaderboard'

// Utils
import { changedMap } from 'stores/app.slice'
import { Maps } from '@types'
import Router, { useRouter } from 'next/router'

interface Props {}

/////////////////////////////////////////////////////////////////////////////////////
const Leaderboard = (props: Props) => {
  const router = useRouter()
  const { pagination, top } = useLeaderboard()

  // Sync
  useEffect(() => {
    router.query.limit = pagination.limit
    router.query.offset = pagination.offset
    router.push(router)
  }, [pagination])

  return (
    <Fragment>
      <Head>
        <title>SurfGxds</title>
        <meta name="description" property="og:description" content="SurfGxds" />
        <meta name="og:title" content="SurfGxds" />
        <meta name="robots" content="INDEX,FOLLOW" />
      </Head>
      <section className={styles.leaderboard}>
        <div className={styles.title}>
          <h1>Leaderboard</h1>
          {/* <hr /> */}
        </div>
        <div className={styles.leaderboardContent}>
          {/* <div className={search}>
            <MyInput
              label={'write term'}
              model={{ value: term, setValue: setTerm }}
              type={'text'}
          variables    name={'search'}
              callback={filteringFriends}
              debounce={350}
            />
          </div> */}
          <LeaderboardList top={top} />
        </div>
      </section>
    </Fragment>
  )
}

export default Leaderboard

Leaderboard.getInitialProps = async ({ query, ctx, store }) => {
  const limit = Math.abs(+query.limit) || 100
  const offset = Math.abs(+query.offset) || 0
  const isLoad = store.getState().leaderboard?.top?.length
  const currentMap = store.getState().app.currentMap
  const queryMap: Maps =
    store.getState().app.availableMaps.find((map) => map.name === query.map) ||
    currentMap

  if (!isLoad || queryMap.id !== currentMap.id) {
    const [data, errors] = await clientHandle(LEADERBOARD, {
      mapId: queryMap.id,
      limit: limit,
      offset: offset,
    })

    store.dispatch(
      loadedLeaderboard({
        top: data,
        pagination: {
          limit,
          offset,
        },
      })
    )
    store.dispatch(changedMap(queryMap))
  }
}
