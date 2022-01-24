import React, { useState } from 'react'

// Styles
import styles from './LeaderboardItem.module.scss'

// Components

// Custom hooks
import { usePlayer } from 'hooks/store/player'

// Utils
import { useRouter } from 'next/dist/client/router'
import cn from 'classnames'
import { Leaderboard } from '@store'
import { parseDigit } from 'utils/regex'

interface Props {
  stats: Leaderboard
}

///////////////////////////////////////////////////////////////////////////////////////////
export default function LeaderboardItem(props: Props): JSX.Element {
  const { playerInfo } = usePlayer()
  const router = useRouter()

  return (
    <div key={props.stats.place} className={styles.content}>
      <div className={styles.contentInner}>
        <div
          className={cn(styles.item, styles.itemInd, {
            [styles.My]: playerInfo?.id === props.stats.player.id,
          })}
        >
          <div>{props.stats.place}</div>
        </div>

        <div
          onClick={(e) => {
            router.push('/' + props.stats.player.steamid64)
          }}
          className={cn(styles.item, styles.itemPlayer)}
        >
          <img
            src={
              props.stats.player.avatarCustom !== null
                ? props.stats.player.avatarCustom
                : props.stats.player.avatarfull
                ? props.stats.player.avatarfull
                : process.env.AVATAR_NULL
            }
          ></img>
          <div>{props.stats.player.nick}</div>
          {/* <div>{changeDecode(props.stats.player.nick)}</div> */}
        </div>

        <div className={cn(styles.item, styles.itemAvg)}>
          <div>{props.stats.avg}</div>
        </div>

        <div className={cn(styles.item, styles.itemPc)}>
          <div>{props.stats.completesPercent.toString().substring(0, 5)}</div>
        </div>

        <div className={cn(styles.item, styles.itemData)}>
          <div>{parseDigit(props.stats.ac.toString())}</div>
        </div>

        <div className={cn(styles.item, styles.itemData)}>
          <div>{parseDigit(props.stats.acPlace.toString())}</div>
        </div>

        <div className={cn(styles.item, styles.itemData)}>
          <div>{parseDigit(props.stats.uc.toString())}</div>
        </div>

        <div className={cn(styles.item, styles.itemData)}>
          <div>{parseDigit(props.stats.ucPlace.toString())}</div>
        </div>
      </div>
    </div>
  )
}
