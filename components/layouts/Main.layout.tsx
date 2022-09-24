import { Fragment, PropsWithChildren } from 'react'

// Styles
import styles from '../../styles/layouts/Layouts.module.scss'
const { layoutsMain } = styles

// Custom hooks

// Utils

//////////////////////////////////////////////////////////////////////////////////////
const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <main className={layoutsMain}>{children}</main>
    </Fragment>
  )
}
export default MainLayout
