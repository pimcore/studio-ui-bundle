/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
