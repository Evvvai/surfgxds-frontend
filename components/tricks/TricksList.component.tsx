import React from 'react'

// Styles
import styles from './TricksList.module.scss'

// Components
import TricksItem from './tricks-item/TricksItem.component'
import TricksListHeader from './tricks-header/TricksListHeader.component'

// Custom hooks

// Utils
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
