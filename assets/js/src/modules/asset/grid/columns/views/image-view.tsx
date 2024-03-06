import React from 'react'
import { useStyles } from './image-view.styles'
import { PimcoreImage } from '@Pimcore/components/pimcore-image/pimcore-image'
import { type ImageProps } from 'antd'

interface ImageViewProps extends ImageProps {
  src: string
}

const ImageView = (props: ImageViewProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <div className={styles.image}>
      <PimcoreImage {...props} />
    </div>
  )
}

export { ImageView }
