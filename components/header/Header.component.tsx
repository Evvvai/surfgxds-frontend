import React, { Fragment, useState } from 'react'

// Styles
import styles from './Header.module.scss'
const { header, headerNav, headerNavFirst, headerUl, headerLi } = styles

// Components
import MapSelect from './map-select/MapSelect.component'
import Modal from 'components/UI/Modal/Modal.component'

// Custom hooks
import { useApp } from 'hooks/store/app'

// Utils
import { Portal } from 'utils/portal'
import { FC } from 'react'

///////////////////////////////////////////////////////////////////////////////////////////
const Header: FC = () => {
  const { currentMap } = useApp()

  const [isMapOpen, setIsMapOpen] = useState<boolean>(false)

  const handleClickMap = () => {
    setIsMapOpen(!isMapOpen)
  }

  return (
    <Fragment>
      <header className={header}>
        <nav className={headerNav}>
          <div className={headerNavFirst}>
            <ul className={headerUl}>
              <li className={headerLi}>
                <span onClick={handleClickMap} className={styles.map}>
                  {currentMap.alternativeName}
                </span>
                <Portal selector="#modal">
                  <Modal isOpen={isMapOpen} setOpen={setIsMapOpen}>
                    <MapSelect />
                  </Modal>
                </Portal>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </Fragment>
  )
}

export default React.memo(Header)
