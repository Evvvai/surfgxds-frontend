import React, { Fragment, useState, useEffect } from 'react'

// Styles
import styles from './TricksItem.module.scss'

// Components

// Custom hooks
import { usePlayer } from '../../../hooks/store/player/usePlayer'

// Utils
import cn from 'classnames'
import { Trick, TrickWR, Trigger } from '@store'
import { SWR, TWR } from 'types/graphql/quary'
import { clientHandle } from 'utils/graphql'

interface Props {
  trick: Trick
  triggers: Trigger[]
}

///////////////////////////////////////////////////////////////////////////////////////////
export default function TricksItem({ trick, triggers }: Props): JSX.Element {
  const { isLoggedIn } = usePlayer()

  const [isActive, setIsActive] = useState<boolean>(false)
  const [route, setRoute] = useState<Trigger[] | null>(null)
  const [wr, setWr] = useState<{ swr: TrickWR; twr: TrickWR }>({
    swr: {} as TrickWR,
    twr: {} as TrickWR,
  })

  const handleClick = (trick: Trick) => (e: any) => {
    if (!route) {
      setRoute(
        trick.routeIds
          .split(',')
          .map(
            (id) => triggers.find((val) => val.id === +id) as Trigger
          ) as Trigger[]
      )
      loadWR(trick)
    }
    setIsActive(!isActive)
  }

  const loadWR = async (trick: Trick) => {
    const [swr, swrErrors] = await clientHandle(SWR, {
      trickId: trick.id,
    })

    const [twr, twrErrors] = await clientHandle(TWR, {
      trickId: trick.id,
    })

    setWr({ swr, twr })
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
          <div className={styles.record}>
            <div className={styles.recordItem}>
              {wr.swr?.id ? (
                <Fragment>
                  <div className={styles.recordTitle}>Speed</div>
                  <div className={styles.recordPlayer}>
                    <img
                      src={
                        wr.swr.player.avatarCustom !== null
                          ? wr.swr.player.avatarCustom
                          : wr.swr.player.avatarfull
                          ? wr.swr.player.avatarfull
                          : process.env.AVATAR_NULL
                      }
                    ></img>
                    <div>{wr.swr.player.nick}</div>
                  </div>
                  <div className={styles.recordRes}>{wr.swr.speed}</div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className={styles.recordTitle}>Speed</div>
                  <div className={styles.recordLoad}>
                    data records Loading...
                  </div>
                </Fragment>
              )}
            </div>
            <div className={styles.recordItem}>
              {wr.twr?.id ? (
                <Fragment>
                  <div className={styles.recordTitle}>Time</div>
                  <div className={styles.recordPlayer}>
                    <img
                      src={
                        wr.twr.player.avatarCustom !== null
                          ? wr.twr.player.avatarCustom
                          : wr.twr.player.avatarfull
                          ? wr.twr.player.avatarfull
                          : process.env.AVATAR_NULL
                      }
                    ></img>
                    <div>{wr.twr.player.nick}</div>
                  </div>
                  <div className={styles.recordRes}>{wr.twr.time}</div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className={styles.recordTitle}>Time</div>
                  <div className={styles.recordLoad}>
                    data records Loading...
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
