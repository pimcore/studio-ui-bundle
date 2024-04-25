import { Image, type ImageProps, Spin } from 'antd'
import React, { useContext } from 'react'
import { useStyle } from '@Pimcore/components/pimcore-image/pimcore-image.styles'
import { ZoomContext } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/preview-container'

interface PimcoreImageProps extends ImageProps {
}

export const PimcoreImage = (props: PimcoreImageProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { zoom } = useContext(ZoomContext)

  return (
    <Image
      className={ styles.image }
      placeholder={
        <div className={ styles['loading-div'] }>
          <Spin size="small" />
        </div>
          }
      preview={ false }
      style={ {
        transform: `scale(${zoom * 0.01})`
      } }
      { ...props }
    />
  )
}
