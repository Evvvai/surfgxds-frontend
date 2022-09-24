import React, { FC, useState } from 'react'
import cn from 'classnames'

//~ Styles
import styles from './RankedHeader.module.scss'

//~ Icons
import {
  GiBalloonDog,
  GiBattleMech,
  GiBrutalHelm,
  GiChicken,
  GiDevilMask,
  GiPig,
} from 'react-icons/gi'

//~ Components

//~ Custom Hooks

//~ Utils
import dayjs from 'dayjs'

import Image from 'next/image'

//~ Interface
interface Props {}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function RankedHeader(props: Props): JSX.Element {
  return (
    <div className={styles.rankedHeader}>
      <img
        src={process.env.RANKED_BACK as string}
        className={styles.rankedBack}
      />
      <div className={styles.rankedBackUp} />
      <div className={styles.rankedBackDown} />

      <div className={styles.rankedList}>
        <div className={styles.rank}>
          <GiPig />
          <div>0</div>
        </div>
        <div className={styles.rank}>
          <GiBalloonDog />
          <div>1500</div>
        </div>
        <div className={styles.rank}>
          <GiChicken />
          <div>2800</div>
        </div>
        <div className={styles.rank}>
          <GiBattleMech />
          <div>4200</div>
        </div>
        <div className={styles.rank}>
          <GiBrutalHelm />
          <div>7000</div>
        </div>
        <div className={styles.rank}>
          <GiDevilMask />
          <div>TOP 10</div>
        </div>
      </div>
    </div>
  )
}
