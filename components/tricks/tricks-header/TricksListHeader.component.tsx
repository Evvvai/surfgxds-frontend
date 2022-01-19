import React from 'react'

// Styles
import styles from './TricksListHeader.module.scss'

// Components

// Custom hooks
import { usePlayer } from '../../../hooks/store/player/usePlayer'

// Utils
import { useRouter } from 'next/dist/client/router'
import cn from 'classnames'
import dayjs from 'dayjs'

///////////////////////////////////////////////////////////////////////////////////////////
export default function TricksListHeader(): JSX.Element {
  const { isLoggedIn } = usePlayer()

  const router = useRouter()

  return (
    <div className={styles.content}>
      <div className={cn(styles.item, styles.itemInd)}>
        <div>#</div>
      </div>

      <div className={cn(styles.item, styles.itemTn)}>
        <div>trick</div>
        <div>Name</div>
      </div>

      <div className={cn(styles.item, styles.itemTp)}>
        <div>trick</div>
        <div>points</div>
      </div>

      <div className={cn(styles.item, styles.itemTc)}>
        <div>total</div>
        <div>completes</div>
      </div>

      {isLoggedIn && (
        <div className={cn(styles.item, styles.itemMc)}>
          <div>my</div>
          <div>completes</div>
        </div>
      )}

      <div className={cn(styles.item, styles.itemTl)}>
        <div>trick</div>
        <div>length</div>
      </div>
    </div>
  )
}
