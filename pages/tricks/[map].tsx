import { Fragment, useEffect, useRef, useState } from 'react'
import Head from 'next/head'

// Styles
import styles from '../../styles/tricks/Tricks.module.scss'

// Icons
import { GiAbstract007 } from 'react-icons/gi'

// Components
import TricksListHeader from '../../components/tricks/tricks-header/TricksListHeader.component'
import TricksList from '../../components/tricks/TricksList.component'

// Custom hook
import { useTrick } from '../../hooks/store/trick/useTrick'
import { useApp } from 'hooks/store/app'

// Utils
import { useRouter } from 'next/dist/client/router'
import { TRICKS_STATS } from 'types/graphql/quary/tricks'
import { loadedTricks } from 'stores/trick.slice'
import { serverHandle } from 'utils/graphql'
import { changedMap } from 'stores/app.slice'
import { Maps } from '@types'
import { usePlayer } from '../../hooks/store/player/usePlayer'
import MyInput from '../../components/UI/MyInput/MyInput.component'
import { Trick } from '@store'
import { TRIGGERS } from 'types/graphql/quary'

interface Props {}

/////////////////////////////////////////////////////////////////////////////////////
const Tricks = (props: Props) => {
  const router = useRouter()

  const { currentMap } = useApp()
  const { filteringTriggers, triggers, tricks, filteredTricks, loadTricks } =
    useTrick()
  const { playerInfo } = usePlayer()

  const [term, setTerm] = useState<string>('')

  const mounted = useRef<boolean | null>(null)
  useEffect(() => {
    !mounted.current
      ? (mounted.current = true)
      : loadTricks(currentMap, playerInfo?.steamid64)

    router.push(
      {
        pathname: '/tricks/' + currentMap?.name,
      },
      undefined,
      { shallow: true }
    )
  }, [currentMap])

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
        <div className={styles.content}>
          <div className={styles.control}>
            <MyInput
              label={'write term'}
              model={{ value: term, setValue: setTerm }}
              type={'text'}
              name={'search'}
              callback={filteringTriggers}
              debounce={350}
            />
            <div className={styles.controlFilters}>
              <GiAbstract007 />
            </div>
          </div>
          <TricksList tricks={filteredTricks} triggers={triggers} />
        </div>
      </section>
    </Fragment>
  )
}

export default Tricks

Tricks.getInitialProps = async ({ query, store, res }) => {
  const isLoad = store.getState().trick.isLoad

  if (!isLoad) {
    const currentMap = store.getState().app.currentMap
    const [triggers, triggersErrors] = await serverHandle(res, TRIGGERS, {
      mapId: currentMap.id,
    })
    const [tricks, errorsTricks] = await serverHandle(res, TRICKS_STATS, {
      mapId: currentMap.id,
      steamId: store.getState().player.playerInfo?.steamid64,
    })
    store.dispatch(loadedTricks({ tricks, triggers }))
  }
}
