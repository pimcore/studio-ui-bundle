import { Image as AntImage } from 'antd'
import React from 'react'
import { useStyles } from './image-view.styles'

interface ImageViewProps {
  src: string
}

const ImageView = (props: ImageViewProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={styles.image}>
      <AntImage src={props.src} />
    </div>
  )
}

export { ImageView }
