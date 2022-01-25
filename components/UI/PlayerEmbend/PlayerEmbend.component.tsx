import React, { FC, useEffect, useState } from 'react'

// Style
import styles from './PlayerEmbend.module.scss'

// Utils
import cn from 'classnames'
import { Player } from '@store'
import Link from 'next/link'

// Interface
interface Props {
  player: Player
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PlayerEmbend: FC<Props> = ({ player }: Props) => {
  const [isLoad, setIsLoad] = useState<boolean>(false)

  const src =
    player.avatarCustom !== null
      ? player.avatarCustom
      : player.avatarfull
      ? player.avatarfull
      : (process.env.AVATAR_NULL as string)

  useEffect(() => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      setIsLoad(true)
    }
  }, [])

  return (
    <Link href={'/' + player.steamid64}>
      <a>
        <div className={styles.player}>
          <img
            className={cn(styles.playerImg, { [styles.isLoading]: !isLoad })}
            src={src}
          ></img>
          <div className={styles.playerNick}>{player.nick}</div>
        </div>
      </a>
    </Link>
  )
}

export default React.memo(PlayerEmbend)
