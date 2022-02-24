import {
  Fragment,
  useEffect,
  useState,
  useRef,
  createRef,
  forwardRef,
  FC,
} from 'react'

// Style
import styles from './TriggerImage.module.scss'

// Utils
import cn from 'classnames'
import NextImage from 'next/image'
import { useResizeContent } from 'hooks/events'

// Interface
interface Props {
  photo: Photo
  style?: any
}

interface Photo {
  src: string | null
}

// Component
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const TriggerImage: FC<Props> = (props: Props) => {
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const [heightImage, setHeightImage] = useState<number>(0)
  const [mounted, setMounted] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement | null>(null)

  const src = props.photo?.src || (process.env.NOT_TRIGGER as string)
  const { height } = useResizeContent(ref)

  useEffect(() => {
    if (!mounted) setMounted(true)
    else {
      if (src !== (process.env.NOT_TRIGGER as string)) {
        const image = new Image()
        image.src = src
        image.onload = () => setIsLoad(true)
      } else {
        setIsLoad(true)
      }
    }
  }, [mounted])

  useEffect(() => {
    setHeightImage(height)
  }, [height])

  return (
    <div ref={ref} className={styles.content}>
      {!isLoad && mounted ? (
        <div
          className={styles.isLoading}
          style={{ width: heightImage + 'px', height: heightImage + 'px' }}
        />
      ) : (
        <NextImage
          className={styles.image}
          src={src}
          width={heightImage}
          height={heightImage}
          objectFit={'cover'}
        />

        // <img
        //   className={styles.image}
        //   src={src}
        //   alt="."
        //   style={{ width: ref?.current?.clientHeight }}
        // />
      )}
    </div>
  )
}

export default TriggerImage
