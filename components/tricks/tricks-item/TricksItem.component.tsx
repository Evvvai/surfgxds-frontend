import React, { useState } from 'react'

// Styles
import styles from './TricksItem.module.scss'

// Components

// Custom hooks
import { usePlayer } from '../../../hooks/store/player/usePlayer'

// Utils
import cn from 'classnames'
import { Trick, Trigger } from '@store'

interface Props {
  trick: Trick
  triggers: Trigger[]
}

///////////////////////////////////////////////////////////////////////////////////////////
export default function TricksItem({ trick, triggers }: Props): JSX.Element {
  const { isLoggedIn } = usePlayer()

  const [isActive, setIsActive] = useState<boolean>(false)
  const [route, setRoute] = useState<Trigger[] | null>(null)

  const handleClick = (trick: Trick) => (e: any) => {
    if (!route) {
      setRoute(
        trick.routeIds
          .split(',')
          .map(
            (id) => triggers.find((val) => val.id === +id) as Trigger
          ) as Trigger[]
      )
    }
    setIsActive(!isActive)
  }

  return (
    <div
      onClick={handleClick(trick)}
      key={trick.id}
      className={cn([styles.content], {
        [styles.contentActive]: isActive,
      })}
    >
      <div className={styles.contentInner}>
        <div className={cn(styles.item, styles.itemInd)}>
          <div>{trick.index}</div>
        </div>

        <div
          className={cn(styles.item, styles.itemTn, {
            [styles.itemTnNone]: isLoggedIn
              ? trick.myCompletes === '0'
              : trick.completes === '0',
          })}
        >
          <div>{trick.name}</div>
        </div>

        <div className={cn(styles.item, styles.itemTp)}>
          <div>{trick.point}</div>
        </div>

        <div className={cn(styles.item, styles.itemTc)}>
          <div>{trick.completes}</div>
        </div>

        {isLoggedIn && (
          <div className={cn(styles.item, styles.itemMc)}>
            <div>{trick.myCompletes}</div>
          </div>
        )}

        <div className={cn(styles.item, styles.itemTl)}>
          <div>{trick.len}</div>
        </div>
      </div>
      {isActive && route && (
        <div onClick={(e) => e.stopPropagation()} className={styles.info}>
          <div className={styles.route}>
            {route.map((trigger, key) => {
              return (
                <div key={key} className={styles.routeItem}>
                  <div className={styles.routeContent}>
                    <div className={styles.routeTitle}>{trigger.name}</div>
                    <div className={styles.routeImg}>
                      <img
                        src={trigger.src || ''}
                        className={styles.routeImgInner}
                      ></img>
                    </div>
                    <div className={styles.routeCount}>{key + 1}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
