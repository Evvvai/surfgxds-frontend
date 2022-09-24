import { FC, Fragment, PropsWithChildren } from 'react'

// Styles
import styles from '../../styles/layouts/Layouts.module.scss'
const { layoutsMain } = styles

// Component
import FriendAside from 'components/friend-aside/FriendAside.component'
import NotificationAside from 'components/notification-aside/NotificationAside.component'
import MenuAside from '../menu-aside/MenuAside.component'

// Custom hooks

// Utils

//////////////////////////////////////////////////////////////////////////////////////
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <MenuAside />
      <main className={layoutsMain}>
        {children}
        <FriendAside />
        <NotificationAside />
      </main>
    </Fragment>
  )
}
export default MainLayout
