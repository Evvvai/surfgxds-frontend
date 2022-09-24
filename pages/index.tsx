import { Fragment, useEffect } from 'react'
import Head from 'next/head'

// Components

// Utils

// Styles
import styles from '../styles/home/Home.module.scss'
import { useRouter } from 'next/router'
const { home } = styles

interface Props {}

/////////////////////////////////////////////////////////////////////////////////////
const Home = (props: Props) => {
  const router = useRouter()

  useEffect(() => {
    router.push({
      pathname: '/tricks/ski2',
    })
  }, [])

  return (
    <Fragment>
      <Head>
        <title>SurfGxds</title>
        <meta name="description" content="SurfGxds" />
      </Head>
      <div className={home}></div>
    </Fragment>
  )
}

export default Home
