import { Image, type ImageProps, Spin } from 'antd'
import React from 'react'
import { useStyle } from '@Pimcore/components/pimcore-image/pimcore-image.styles'

interface PimcoreImageProps extends ImageProps {
}

export const PimcoreImage = (
  props: PimcoreImageProps
): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <Image
      placeholder={
        <div className={ styles['loading-div'] }>
          <Spin size="small" />
        </div>
          }
      preview={ false }
      { ...props }
    />
  )
}
