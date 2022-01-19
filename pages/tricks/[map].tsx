import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'

// Styles
import styles from '../../styles/tricks/Tricks.module.scss'

// Icons

// Components
import TricksListHeader from '../../components/tricks/tricks-header/TricksListHeader.component'
import TricksList from '../../components/tricks/TricksList.component'

// Custom hook
import { useTrick } from '../../hooks/store/trick/useTrick'
import { useApp } from 'hooks/store/app'

// Utils
import { useRouter } from 'next/dist/client/router'
import dayjs from 'dayjs'
import { TRICKS_STATS } from 'types/graphql/quary/tricks'
import { Trick } from '@store'
import { loadedTricks } from 'stores/trick.slice'
import { clientHandle } from 'utils/graphql'
import { changedMap } from 'stores/app.slice'
import { Maps } from '@types'
import Router from 'next/router'

interface Props {}

/////////////////////////////////////////////////////////////////////////////////////
const Tricks = (props: Props) => {
  const { currentMap } = useApp()
  const { tricks } = useTrick()

  // Valid param
  useEffect(() => {
    Router.push('/tricks/' + currentMap?.name)
  }, [])

  return (
    <Fragment>
      <Head>
        <title>SurfGxds</title>
        <meta name="description" property="og:description" content="SurfGxds" />
        <meta name="og:title" content="SurfGxds" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <link rel="canonical" />
      </Head>
      <section className={styles.tricks}>
        <div className={styles.tricksContent}>
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
          <TricksList tricks={tricks} />
        </div>
      </section>
    </Fragment>
  )
}

export default Tricks

Tricks.getInitialProps = async ({ query, ctx, store, res }) => {
  const isLoad = store.getState().trick.tricks.length
  const currentMap = store.getState().app.currentMap
  const queryMap: Maps =
    store.getState().app.availableMaps.find((map) => map.name === query.map) ||
    currentMap

  if (!isLoad || queryMap.id !== currentMap.id) {
    const [data, errors] = await clientHandle(TRICKS_STATS, {
      mapId: queryMap.id,
      steamId: store.getState().player.playerInfo.steamid64,
    })

    store.dispatch(loadedTricks(data))
    store.dispatch(changedMap(queryMap))
  }

  // res.writeHead(301, { Location: '/tricks/' + currentMap.name })
  // res.end()
}
