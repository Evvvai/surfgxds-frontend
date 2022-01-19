import client, { clientHandle } from 'utils/graphql'
import { PLAYER } from 'types/graphql/quary'
import { NextPage } from 'next'

// Styles
import styles from '../styles/profile/Profile.module.scss'
const {
  profile,
  Dashboard,
  DashboardEdit,
  DashboardBack,
  info,
  Avatar,
  AvatarImage,
  AvatarBack,
  AvatarEdit,
  Name,
  wave,
  profileInner,
} = styles

// Components
import Icon from 'components/icon/Icon.component'
import FooterWaveIcon from '../assets/icon/FooterWave.svg'
import AvatarEditModal from 'components/profile/avatar-edit/AvatarEdit.component'
import DashboardEditModal from 'components/profile/dasboard-edit/DashboardEdit.component'

// Custom hooks
import { usePlayer } from '../hooks/store/player/usePlayer'

// Utils
import cn from 'classnames'
import { useState } from 'react'
import { Portal } from 'utils/portal'
import Modal from 'components/UI/Modal/Modal.component'
import { Player } from '@store'
import { changeDecode } from 'utils/changeDecode'

interface Props {
  playerData: Player
}

/////////////////////////////////////////////////////////////////////////////////////
const Profile: NextPage<Props> = ({ playerData }) => {
  const { playerInfo } = usePlayer()

  const [isAvatarEdit, setIsAvatarEdit] = useState<boolean>(false)
  const [isDashboardEdit, setIsDashboardEdit] = useState<boolean>(false)

  return (
    <>
      {/* <Head></Head> */}
      <div className={profile}>
        <div className={Dashboard}>
          <img
            src={
              playerData.dashboard !== null
                ? playerData.dashboard
                : process.env.DASHBOARD_NULL
            }
            alt="nope"
          ></img>
          <div className={DashboardBack} />

          {playerData.id === playerInfo?.id && (
            <div
              onClick={(e) => setIsDashboardEdit(true)}
              className={DashboardEdit}
            >
              <Icon asset={'Edit'} />
              <Portal selector="#modal">
                <Modal isOpen={isDashboardEdit} setOpen={setIsDashboardEdit}>
                  <DashboardEditModal />
                </Modal>
              </Portal>
            </div>
          )}
        </div>

        <div className={info}>
          <div className={Avatar}>
            <div className={AvatarBack}></div>
            <img
              className={AvatarImage}
              src={
                playerData.avatarCustom !== null
                  ? playerData.avatarCustom
                  : playerData.avatarfull
                  ? playerData.avatarfull
                  : process.env.AVATAR_NULL
              }
              alt="nope"
            ></img>
            {playerData.id === playerInfo?.id && (
              <div
                onClick={(e) => setIsAvatarEdit(true)}
                className={AvatarEdit}
              >
                <Icon asset={'Edit'} />
                <Portal selector="#modal">
                  <Modal isOpen={isAvatarEdit} setOpen={setIsAvatarEdit}>
                    <AvatarEditModal />
                  </Modal>
                </Portal>
              </div>
            )}
          </div>
          <span className={Name}>{playerData.nick}</span>
          {/* <span className={Name}>{changeDecode(playerData.nick)}</span> */}
        </div>
        <FooterWaveIcon className={wave} />
        <div className={profileInner}>
          <span>blank</span>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  try {
    const [data, errors] = await clientHandle(PLAYER, {
      steamid64: ctx.params.steamid,
    })

    if (!data || errors) {
      return {
        props: {},
        redirect: {
          destination: '/404',
          permanent: false,
        },
      }
    } else {
      return {
        props: {
          playerData: data,
        },
      }
    }
  } catch (err) {
    // console.log('err', err)
    return {
      props: {},
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }
}

export default Profile
