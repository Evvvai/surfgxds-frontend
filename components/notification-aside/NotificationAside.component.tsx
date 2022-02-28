import React, { FC, useState, useEffect, useRef, Fragment } from 'react'

// Styles
import styles from './NotificationAside.module.scss'

// Components
import { BsSpeedometer2 } from 'react-icons/bs'
import { AiOutlineFieldTime } from 'react-icons/ai'

// Custom hooks
import { useNotification } from 'hooks/store/notification'

// Utils
import cn from 'classnames'
import { useRouter } from 'next/dist/client/router'
import dayjs from 'dayjs'
import Image from 'next/image'
import PlayerEmbend from '../UI/PlayerEmbend/PlayerEmbend.component'
import { usePlayer } from '../../hooks/store/player/usePlayer'
import { ApiStatus } from '@types'

///////////////////////////////////////////////////////////////////////////////////////////
const NotificationAside: FC = () => {
  const {
    isNotificationStatus,
    isNotificationOpen,
    loadNotification,
    news,
    tricksLost,
  } = useNotification()

  const [section, setSection] = useState<number>(1)

  const router = useRouter()

  const handleClickClose = () => {}
  const handleClickSwitch = (type: 0 | 1) => () => {
    setSection(type)
  }

  const mounted = useRef<boolean | null>(null)
  useEffect(() => {
    if (!mounted.current) mounted.current = true
    else if (isNotificationStatus === ApiStatus.NONE) {
      loadNotification()
    }
  }, [isNotificationOpen])

  if (isNotificationStatus !== ApiStatus.FULFILLED) {
    return (
      <div
        className={cn(styles.notificationAside, {
          [styles.Open]: isNotificationOpen,
        })}
      >
        <div className={styles.content}>
          <div className={styles.title}>
            <h1>Notifications</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(styles.notificationAside, {
        [styles.Open]: isNotificationOpen,
      })}
    >
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Notifications</h1>
        </div>

        <div className={styles.sections}>
          <div
            className={cn(styles.sectionsItem, {
              [styles.sectionsActive]: section === 0,
            })}
          >
            <span className={cn(styles.sectionsInfo, styles.sectionsInfoLeft)}>
              {news.length}
            </span>
            <button
              onClick={handleClickSwitch(0)}
              className={cn(styles.sectionsText)}
            >
              Updates
            </button>
          </div>
          <div
            className={cn(styles.sectionsItem, {
              [styles.sectionsActive]: section === 1,
            })}
          >
            <button
              onClick={handleClickSwitch(1)}
              className={cn(styles.sectionsText)}
            >
              Records
            </button>
            <span className={cn(styles.sectionsInfo, styles.sectionsInfoRight)}>
              {tricksLost?.length || 0}
            </span>
          </div>
        </div>
        <ul className={styles.list}>
          {section === 0 ? (
            news.length !== 0 ? (
              <div></div>
            ) : (
              <div className={styles.notFound}>
                <h1>No one needs you</h1>
                <Image
                  src={process.env.NOT_INVITES as string}
                  width={300}
                  height={300}
                />
              </div>
            )
          ) : (
            <></>
          )}

          {section === 1 ? (
            tricksLost?.length ? (
              tricksLost.map((val, index) => {
                return (
                  <Fragment>
                    {/* {index > 0 &&
                      tricksLost[index].nowDate !==
                        tricksLost[index - 1].nowDate && (
                        <div className={styles.trickHr}>
                          {dayjs(val.nowDate).format('DD / MM')}
                        </div>
                      )} */}
                    <div className={styles.item}>
                      <div className={styles.trickContent}>
                        {val.type === 'swr' ? (
                          <BsSpeedometer2 />
                        ) : (
                          <AiOutlineFieldTime />
                        )}

                        <div>{val.trickName}</div>
                        <div>
                          {val.type === 'swr'
                            ? '+' + (val.nowSpeed - val.beforeSpeed) + ' u/s'
                            : (val.beforeTime - val.nowTime).toFixed(2) + ' s'}
                        </div>
                      </div>
                      <div className={styles.trickFooter}>
                        <span>by</span>
                        <PlayerEmbend player={val.player} />
                        <div>{dayjs(val.nowDate).fromNow()}</div>
                      </div>
                    </div>
                  </Fragment>
                )
              })
            ) : (
              <div className={styles.notFound}>
                <h1>No one needs you</h1>
                <Image
                  src={process.env.NOT_INVITES as string}
                  width={300}
                  height={300}
                />
              </div>
            )
          ) : (
            <></>
          )}
        </ul>
      </div>
    </div>
  )
}

export default React.memo(NotificationAside)
