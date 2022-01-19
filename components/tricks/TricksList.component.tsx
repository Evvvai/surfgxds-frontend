import React, { Fragment, useState } from 'react'

// Styles
import styles from './TricksList.module.scss'

// Components
import MyImage from '../UI/MyImage/MyImage.component'
import TricksItem from './tricks-item/TricksItem.component'
import TricksListHeader from './tricks-header/TricksListHeader.component'

// Custom hooks
import { usePlayer } from '../../hooks/store/player/usePlayer'

// Utils
import { useRouter } from 'next/dist/client/router'
import cn from 'classnames'
import dayjs from 'dayjs'
import { Trick } from '@store'

interface Props {
  tricks: Trick[]
}

///////////////////////////////////////////////////////////////////////////////////////////
export default function TricksList(props: Props): JSX.Element {
  return (
    <div className={styles.list}>
      <TricksListHeader />
      {props?.tricks?.map((trick) => {
        return <TricksItem key={trick.id} trick={trick} />
      })}
    </div>
  )
}
