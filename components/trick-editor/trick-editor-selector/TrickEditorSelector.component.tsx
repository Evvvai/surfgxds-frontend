import React, { useRef, useState } from 'react'

// Styles
import styles from './TrickEditorSelector.module.scss'

// Components

// Custom hooks
import { usePlayer } from '../../../hooks/store/player/usePlayer'
import { useOutsideClick } from 'hooks/events'

// Utils
import { useRouter } from 'next/dist/client/router'
import { useTrickEditor } from 'hooks/store/trick-editor'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import cn from 'classnames'
import { Trigger } from '@store'

///////////////////////////////////////////////////////////////////////////////////////////
export default function LeaderboardListHeader(): JSX.Element {
  const router = useRouter()
  const { setRouteTrick, setTriggerTrick, route, trigger, triggers } =
    useTrickEditor()

  const [term, setTerm] = useState<string>('')
  const [filteredTriggers, setFilteredTriggers] = useState<Trigger[]>([
    ...triggers,
  ])
  const [isSuggestOpen, setIsSuggestOpen] = useState<boolean>(false)

  const listRef = useRef(null)
  const inputRef = useRef(null)
  const handleOutsideClick = () => setIsSuggestOpen(false)
  useOutsideClick([listRef, inputRef], handleOutsideClick)

  const handleClickAddTrigger = (e: any) => {
    if (trigger && route?.length <= 25) setRouteTrick([...route, trigger])
    setTerm('')
    setFilteredTriggers([...triggers])
  }

  const handleClickSelectTrigger = (trigger: Trigger) => (e: any) => {
    setTriggerTrick(trigger)
  }

  const handleChangeTerm = (e: any) => {
    setFilteredTriggers(triggers.filter((x) => x.name.includes(e.target.value)))
    setTerm(e.target.value)
  }

  return (
    <div className={styles.content}>
      <div className={styles.contentInner}>
        <div className={styles.title}>Trigger Selector</div>

        <div ref={inputRef} className={styles.selector}>
          <input
            onFocus={(e) => setIsSuggestOpen(true)}
            // onBlur={(e) => setIsSuggestOpen(false)}
            value={term}
            placeholder={'write trigger name'}
            onChange={handleChangeTerm}
          />
        </div>
        <div className={styles.preview}>
          <img src={trigger?.src || ''} alt="none"></img>
        </div>
        <div
          className={cn(styles.list, { [styles.listActive]: isSuggestOpen })}
        >
          <div className={styles.listHeader}>
            <h1>Suggested triggers</h1>
            <hr />
          </div>
          <div ref={listRef} className={styles.listContent}>
            {filteredTriggers.map((triggerItem) => {
              const matches = match(triggerItem.name, term)
              const parts = parse(triggerItem.name, matches)

              return (
                <div
                  key={triggerItem.id}
                  onClick={handleClickSelectTrigger(triggerItem)}
                  className={styles.listItem}
                >
                  <div
                    className={cn(styles.listItemInner, {
                      [styles.listItemInnerActive]:
                        triggerItem.id === trigger.id,
                    })}
                  >
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
                    <img src={triggerItem?.src || ''} alt="none"></img>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.add} onClick={handleClickAddTrigger}>
          Add Trigger
        </div>
      </div>
    </div>
  )
}
