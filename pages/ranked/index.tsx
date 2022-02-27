import { Fragment } from 'react'
import Head from 'next/head'

//~ Layouts

//~ Styles
import styles from '../../styles/ranked/Ranked.module.scss'

//~ Icons

//~ Components
import EventItem from '../../components/ranked/event-item/EventItem.component'
import RankedHeader from '../../components/ranked/ranked-header/RankedHeader.component'

//~ Custom hook

//~ Utils

interface Props {}

/////////////////////////////////////////////////////////////////////////////////////
const Ranked = (props: Props) => {
  return (
    <Fragment>
      <Head>
        <title>SurfGxds ranked</title>
        <meta name="description" property="og:description" content="SurfGxds" />
        <meta name="og:title" content="SurfGxds" />
        <meta name="robots" content="INDEX,FOLLOW" />
      </Head>
      <section>
        <div className={styles.dev}>
          <span>IN DEVELOPMENT</span>
        </div>
        <RankedHeader />
        <div className={styles.section}></div>
        <div className={styles.events}>
          <div className={styles.eventsList}>
            {[...new Array(10)].map((x) => {
              return <EventItem />
            })}
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Ranked
