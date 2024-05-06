import React, { useContext } from 'react'
import { useStyle } from '@Pimcore/components/pimcore-video/pimcore-video.styles'
import { ZoomContext } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/preview-container'

interface VideoSourceType {
    src: string
    type: string
}

interface PimcoreVideoProps {
    src: VideoSourceType[]
    width?: number
    height?: number
    className?: string
}

export const PimcoreVideo = ({
    src,
    width,
    height,
    className
  }: PimcoreVideoProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
      <video width={width} height={height} controls className={className}>
        {src.map((source, index) => (
            <source key={index} src={source.src} type={source.type}/>
        ))}
        Your browser does not support the video tag.
      </video>
  )
}
