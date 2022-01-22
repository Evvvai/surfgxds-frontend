/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { serverHandle } from 'utils/graphql'
import { MAPS } from 'types/graphql/quary'
import { Maps } from '../../types/index'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const [maps, mapsErrors] = await serverHandle(ctx, MAPS, {})

  return getServerSideSitemap(ctx, [
    ...maps.map((val: Maps) => {
      return {
        loc: process.env.SITE_URL + '/tricks/' + val.name,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.9,
      }
    }),
    ...maps.map((val: Maps) => {
      return {
        loc: process.env.SITE_URL + '/suggested/' + val.name,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.85,
      }
    }),
    ...maps.map((val: Maps) => {
      return {
        loc: process.env.SITE_URL + '/triggers/' + val.name,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.8,
      }
    }),
    ...maps.map((val: Maps) => {
      return {
        loc: process.env.SITE_URL + '/leaderboard/' + val.name,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 0.75,
      }
    }),
  ])
}

export default () => {}
