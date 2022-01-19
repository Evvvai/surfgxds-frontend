import React, { useEffect, useState } from 'react'

// Styles
import styles from './MenuAside.module.scss'
const { content, contentInner, Open, list, item } = styles

// Icons
import { FaRoute } from 'react-icons/fa'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { IoIosConstruct } from 'react-icons/io'
import { FaQuora } from 'react-icons/fa'

// Components
import ToolTip from '../UI/Tooltip/Tooltip.component'

// Custom hooks
import { useApp, useMenu } from 'hooks/store/app'

// Utils
import cn from 'classnames'
import { useRouter } from 'next/dist/client/router'
import dayjs from 'dayjs'
import Link from 'next/link'

///////////////////////////////////////////////////////////////////////////////////////////
export default function SectionMenuAside(): JSX.Element {
  const { currentMap } = useApp()
  const { isMenuOpen, closeMenu } = useMenu()

  const router = useRouter()

  const handleClickSection = () => {
    closeMenu()
  }

  return (
    <div className={content}>
      <div className={cn(contentInner, { [Open]: isMenuOpen })}>
        {/* <header className={title}>
          <h1>Friends</h1>
        </header> */}
        {/* <hr className={hrH} /> */}
        <ul onClick={handleClickSection} className={list}>
          <li>
            <Link href={'/tricks/' + currentMap?.name}>
              <a className={item}>
                <FaRoute className={styles.sectionIcon} />
                <div className={styles.sectionName}>Tricks</div>
              </a>
            </Link>
          </li>
          <li>
            <Link href={'/leaderboard/' + currentMap?.name}>
              <a className={item}>
                <MdOutlineLeaderboard className={styles.sectionIcon} />
                <div className={styles.sectionName}>Leaderboard</div>
              </a>
            </Link>
          </li>
          <li>
            <Link href={'/trick-creator/' + currentMap?.name}>
              <a className={item}>
                <IoIosConstruct className={styles.sectionIcon} />
                <div className={styles.sectionName}>Trick creator</div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/faq">
              <a className={item}>
                <FaQuora className={styles.sectionIcon} />
                <div className={styles.sectionName}>About server</div>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
