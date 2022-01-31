import { useState } from 'react'
import { clientHandle } from 'utils/graphql'
import { PLAYER } from 'types/graphql/quary'

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

// Icons
import FooterWaveIcon from '../assets/icon/FooterWave.svg'
import { TiEdit } from 'react-icons/ti'

// Components
import AvatarEditModal from 'components/profile/avatar-edit/AvatarEdit.component'
import DashboardEditModal from 'components/profile/dasboard-edit/DashboardEdit.component'

// Custom hooks
import { usePlayer } from '../hooks/store/player/usePlayer'

// Utils
import { Portal } from 'utils/portal'
import Modal from 'components/UI/Modal/Modal.component'
import { Player } from '@store'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { changeDecode } from 'utils/changeDecode'

interface Props {
  playerData: Player
}

/////////////////////////////////////////////////////////////////////////////////////
const Profile = ({ playerData }: Props) => {
  const router = useRouter()
  const { playerInfo } = usePlayer()

  const [isAvatarEdit, setIsAvatarEdit] = useState<boolean>(false)
  const [isDashboardEdit, setIsDashboardEdit] = useState<boolean>(false)

  return (
    <>
      <Head>
        <title>{`${playerData.nick} | SurfGxds`}</title>
        <meta name="description" content={`Player profile with his stats`} />
      </Head>
      <div className={profile}>
        <div className={Dashboard}>
          <img
            src={
              playerData?.dashboard !== null
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
              {/* <Icon asset={'Edit'} /> */}
              <TiEdit />
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
                {/* <Icon asset={'Edit'} /> */}
                <TiEdit />
                <Portal selector="#modal">
                  <Modal isOpen={isAvatarEdit} setOpen={setIsAvatarEdit}>
                    <AvatarEditModal />
                  </Modal>
                </Portal>
              </div>
            )}
          </div>
          {/* <span className={Name}>{playerData.nick}</span> */}
          <span className={Name}>{changeDecode(playerData.nick)}</span>
        </div>
        <FooterWaveIcon className={wave} />
        <div className={profileInner}>
          <span>blank</span>
        </div>
      </div>
    </>
  )
}

Profile.getInitialProps = async ({ query, store, res }) => {
  try {
    const [playerData, errors] = await clientHandle(PLAYER, {
      steamid64: query.steamid,
    })

    if (!playerData || errors) throw new Error()

    return {
      playerData,
    }
  } catch (e) {
    res.writeHead(307, { Location: '/404' })
    res.end()
  }
}

export default Profile
