import { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'

// Styles
import styles from '../../styles/tricks/Tricks.module.scss'

// Icons

// Components
import TricksList from '../../components/tricks/TricksList.component'

// Custom hook
import { useTrick } from '../../hooks/store/trick/useTrick'
import { useApp } from 'hooks/store/app'

// Utils

interface Props {}

/////////////////////////////////////////////////////////////////////////////////////
const Tricks = (props: Props) => {
  const { currentMap } = useApp()
  const { tricks } = useTrick()

  return (
    <Fragment>
      <Head>
        <title>SurfGxds</title>
        <meta name="description" property="og:description" content="SurfGxds" />
        <meta name="og:title" content="SurfGxds" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <link rel="canonical" />
      </Head>
      <section className={styles.tricks}>Tricks...</section>
    </Fragment>
  )
}

export default Tricks

// Tricks.getInitialProps = async ({ query, ctx, store, res }) => {

// }
