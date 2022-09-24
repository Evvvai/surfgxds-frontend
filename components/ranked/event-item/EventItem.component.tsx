import React, { FC, useState } from 'react'
import cn from 'classnames'

//~ Styles
import styles from './EventItem.module.scss'

//~ Icons
import {
  GiCrossedSwords,
  GiDevilMask,
  GiPig,
  GiSandsOfTime,
} from 'react-icons/gi'
import { MdLocationSearching, MdOutlineTimeline } from 'react-icons/md'

//~ Components

//~ Custom Hooks

//~ Utils
import dayjs from 'dayjs'

//~ Interface
interface Props {}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function EventItem(props: Props): JSX.Element {
  const [show, setShow] = useState<boolean>(false)

  const handleClickShow = () => setShow(!show)
  const handleClickJoin = (e) => {
    e.stopPropagation()
  }

  return (
    <div className={styles.event}>
      <div className={styles.eventInner} onClick={handleClickShow}>
        <img
          className={styles.eventImg}
          src={
            'https://user-images.githubusercontent.com/66115913/152721638-1a131c46-e450-428e-8b26-da56348e12a8.png'
          }
        />
        <div className={styles.eventHighrank}>
          <GiDevilMask />
        </div>
        <div className={styles.eventLowrank}>
          <GiPig />
        </div>
        <div className={styles.eventHeader}>
          <div>
            <span />
            <span>Tournament .1</span>
          </div>
          <div></div>
        </div>
        <div className={styles.eventFooter}>
          <div></div>
          <div>
            {/* <span>Footer</span> */}
            <span>{dayjs(new Date()).fromNow()}</span>
          </div>
        </div>

        {show && (
          <div>
            <div className={styles.eventBlur}>
              <div />
            </div>
            <div className={styles.eventInfo}>
              <div>{dayjs(new Date()).format('DD / MM / YY')}</div>
              <div className={styles.eventInfoContent}>
                <div className={styles.eventInfoItemHr}>points qouta</div>
                <div className={styles.eventInfoItem}>
                  <span>0</span>
                  <span>-</span>
                  <span>7000+</span>
                </div>
                <div className={styles.eventInfoItemHr}>time stage</div>
                <div className={styles.eventInfoItem}>
                  <span>
                    <MdLocationSearching />
                  </span>
                  <span className={styles.eventInfoItemTime}>5 min</span>
                  <span>
                    <span></span>
                  </span>
                </div>
                <div className={styles.eventInfoItem}>
                  <span>
                    <GiSandsOfTime />
                  </span>
                  <span className={styles.eventInfoItemTime}>15 min</span>
                  <span>
                    <span></span>
                  </span>
                </div>
                <div
                  className={cn(styles.eventInfoItem, {
                    [styles.eventInfoItemActive]: true,
                  })}
                >
                  <span>
                    <MdOutlineTimeline />
                  </span>
                  <span className={styles.eventInfoItemTime}>10 min</span>
                  <span>
                    <span></span>
                  </span>
                </div>
                <div className={styles.eventInfoItem}>
                  <span>
                    <GiCrossedSwords />
                  </span>
                  <span className={styles.eventInfoItemTime}>30 min</span>
                  <span>
                    <span></span>
                  </span>
                </div>
                <div className={styles.eventInfoItemHr}>players qouta</div>
                <div className={styles.eventInfoItem}>
                  <span> 5 </span>
                  <span> 3 </span>
                  <span> 32 </span>
                </div>
              </div>
              <button
                className={styles.eventInfoJoin}
                onClick={handleClickJoin}
              >
                Join
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
