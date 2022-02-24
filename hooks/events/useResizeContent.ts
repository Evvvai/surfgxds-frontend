import { MutableRefObject, useEffect, useState } from 'react'

export const useResizeContent = (ref: MutableRefObject<any>) => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: ref?.current?.clientWidth,
    height: ref?.current?.clientHeight,
  })

  const handleResizeWindow = (e: any): void =>
    setSize({
      width: ref?.current?.clientWidth,
      height: ref?.current?.clientHeight,
    })

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow)

    return (): void => {
      window.removeEventListener('resize', handleResizeWindow)
    }
  }, [])

  useEffect(() => {
    setSize({
      width: ref?.current?.clientWidth,
      height: ref?.current?.clientHeight,
    })
  }, [ref])

  return { width: size.width, height: size.height, setSize }
}
