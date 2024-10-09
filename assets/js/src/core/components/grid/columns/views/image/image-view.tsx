/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

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
    <div className={ [styles.image, 'image-cell', 'default-cell__content'].join(' ') }>
      <PimcoreImage { ...props } />
    </div>
  )
}

export { ImageView }
