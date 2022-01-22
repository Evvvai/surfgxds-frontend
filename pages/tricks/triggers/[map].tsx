import { Fragment, useEffect, useRef, useState } from 'react'
import Head from 'next/head'

// Styles
import styles from '../../../styles/tricks/Triggers.module.scss'

// Icons
import { VscGitPullRequestCreate } from 'react-icons/vsc'

// Components
import Modal from 'components/UI/Modal/Modal.component'
import MyInput from '../../../components/UI/MyInput/MyInput.component'
import CreateTrigger from '../../../components/triggers/create-trigger/CreateTrigger.component'

// Custom hook
import { useTrickEditor } from 'hooks/store/trick-editor'
import { useApp } from 'hooks/store/app'
import { useRouter } from 'next/router'

// Utils
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import cn from 'classnames'
import { serverHandle } from 'utils/graphql'
import { TRIGGERS } from 'types/graphql/quary'
import { Maps } from '@types'
import { loadedTrickEditor } from 'stores/trick-editor.slice'
import { changedMap } from 'stores/app.slice'
import { Trigger } from '@store'
import { Portal } from 'utils/portal'

interface Props {}

/////////////////////////////////////////////////////////////////////////////////////
const Triggers = (props: Props) => {
  const router = useRouter()
  const { triggers, loadTrickEditor } = useTrickEditor()
  const { currentMap } = useApp()

  const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false)

  const [term, setTerm] = useState<string>('')
  const [filteredTriggers, setFilteredTriggers] = useState<Trigger[]>(triggers) // Need migrate into store

  const filteringTriggers = (term: string) => {
    setFilteredTriggers([...triggers].filter((val) => val.name.includes(term)))
  }

  const mounted = useRef<boolean | null>(null)
  useEffect(() => {
    !mounted.current ? (mounted.current = true) : loadTrickEditor(currentMap)

    router.push(
      {
        pathname: '/tricks/triggers/' + currentMap?.name,
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
      </Head>
      <section className={styles.triggers}>
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
            <div
              className={styles.controlFilters}
              onClick={(e) => setIsCreatorOpen(true)}
            >
              <VscGitPullRequestCreate />
              <Portal selector="#modal">
                <Modal isOpen={isCreatorOpen} setOpen={setIsCreatorOpen}>
                  <CreateTrigger />
                </Modal>
              </Portal>
            </div>
          </div>

          <div className={styles.list}>
            {filteredTriggers.map((triggerItem) => {
              const matches = match(triggerItem.name, term)
              const parts = parse(triggerItem.name, matches)

              return (
                <div key={triggerItem.id} className={styles.listItem}>
                  <div
                    className={cn(styles.listItemInner, {
                      [styles.listItemInnerActive]: false,
                    })}
                  >
                    <div className={styles.listItemTitle}>
                      {parts.map((part, key) => (
                        <span
                          key={key}
                          style={{
                            fontWeight: part.highlight ? 700 : 400,
                            color: part.highlight
                              ? 'var(--color-highlight)'
                              : 'var(--color-text)',
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                    <div className={styles.listItemImg}>
                      <img
                        className={styles.listItemImgInner}
                        src={triggerItem?.src || ''}
                        alt="none"
                      ></img>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Triggers

Triggers.getInitialProps = async ({ query, store, res }) => {
  const isLoad = store.getState().trickEditor.isLoad

  if (!isLoad) {
    const currentMap = store.getState().app.currentMap
    const [data, errors] = await serverHandle(res, TRIGGERS, {
      mapId: currentMap.id,
    })
    store.dispatch(loadedTrickEditor(data))
  }
}
