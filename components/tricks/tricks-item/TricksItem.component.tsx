import React, { useState } from 'react'

// Styles
import styles from './TricksItem.module.scss'

// Components
import MyImage from '../../UI/MyImage/MyImage.component'

// Custom hooks
import { usePlayer } from '../../../hooks/store/player/usePlayer'

// Utils
import { useRouter } from 'next/dist/client/router'
import cn from 'classnames'
import { Trick } from '@store'

interface Props {
  trick: Trick
}

///////////////////////////////////////////////////////////////////////////////////////////
export default function TricksItem(props: Props): JSX.Element {
  const { isLoggedIn } = usePlayer()
  const router = useRouter()

  const [isActive, setIsActive] = useState<boolean>(false)

  const handleClick = (trick: Trick) => (e: any) => {
    setIsActive(!isActive)
  }

  return (
    <div
      onClick={handleClick(props.trick)}
      key={props.trick.id}
      className={cn([styles.content], {
        [styles.contentActive]: isActive,
      })}
    >
      <div className={styles.contentInner}>
        <div className={cn(styles.item, styles.itemInd)}>
          <div>{props.trick.index}</div>
        </div>

        <div
          className={cn(styles.item, styles.itemTn, {
            [styles.itemTnNone]: isLoggedIn
              ? props.trick.myCompletes === '0'
              : props.trick.completes === '0',
          })}
        >
          <div>{props.trick.name}</div>
        </div>

        <div className={cn(styles.item, styles.itemTp)}>
          <div>{props.trick.point}</div>
        </div>

        <div className={cn(styles.item, styles.itemTc)}>
          <div>{props.trick.completes}</div>
        </div>

        {isLoggedIn && (
          <div className={cn(styles.item, styles.itemMc)}>
            <div>{props.trick.myCompletes}</div>
          </div>
        )}

        <div className={cn(styles.item, styles.itemTl)}>
          <div>{props.trick.len}</div>
        </div>
      </div>
      {isActive && (
        <div onClick={(e) => e.stopPropagation()} className={styles.info}>
          <div className={styles.route}>
            {props.trick.route.map((trigger, key) => {
              return (
                <div key={key} className={styles.routeItem}>
                  <div className={styles.routeContent}>
                    <div className={styles.routeTitle}>{trigger.name}</div>
                    <div className={styles.routeImg}>
                      <img
                        src={trigger.src || ''}
                        className={styles.routeImgInner}
                      ></img>
                      {/* 
                      <MyImage
                        photo={{
                          src: trigger.src || '',
                        }}
                        style={styles.routeImgInner}
                      /> */}
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
