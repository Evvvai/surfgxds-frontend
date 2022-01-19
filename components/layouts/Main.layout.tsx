import { FC, Fragment } from 'react'

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
const MainLayout: FC = ({ children }) => {
  return (
    <main className={layoutsMain}>
      {children}
      <MenuAside />
      <FriendAside />
      <NotificationAside />
    </main>
  )
}
export default MainLayout
