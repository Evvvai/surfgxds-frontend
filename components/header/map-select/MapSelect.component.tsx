import React, { FC, Fragment, useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import stylesModal from '../../../styles/modal/ModalSkelet.module.scss'
import styles from './MapSelect.module.scss'

// Icons
import { IoIosClose } from 'react-icons/io'
import Link from 'next/link'

// Components

// Custom Hooks
import { useApp } from 'hooks/store/app'

// Utils

// Interface
interface Props {
  close?: any
  isOpen?: any
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function MapSelect(props: Props): JSX.Element {
  const { availableMaps } = useApp()

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className={stylesModal.formContent}
    >
      <section className={stylesModal.formInner}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Choose map</h1>
            <hr />
          </div>
          <ul className={styles.list}>
            {availableMaps.map((map) => {
              return (
                <li onClick={() => props.close()} key={map.id}>
                  <Link
                    href={{
                      pathname: '/tricks/' + map.name,
                    }}
                  >
                    <a className={styles.item}>{map.name}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
      <div className={stylesModal.formClose} onClick={props.close}>
        <IoIosClose />
      </div>
    </form>
  )
}
