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

import React, { type CSSProperties } from 'react'
import { Flex } from '@Pimcore/components/flex/flex'
import { useStyle } from './image-preview.styles'
import cn from 'classnames'
import { toCssDimension } from '@Pimcore/utils/css'
import { Image } from 'antd'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'

interface ImagePreviewProps {
  src?: string
  assetId?: number
  className?: string
  width: number | string
  height: number | string
  style?: CSSProperties
}

export const ImagePreview = ({ src, assetId, width, height, className, style }: ImagePreviewProps): React.JSX.Element => {
  const { styles } = useStyle()

  const imageSrc = assetId !== undefined ? `${getPrefix()}/assets/${assetId}/image/stream/preview` : src

  return (
    <Flex
      align="center"
      className={ cn(className, styles.imagePreviewContainer) }
      justify="center"
      style={ {
        ...style,
        height: toCssDimension(height),
        width: toCssDimension(width)
      } }
    >
      <Image
        className="w-full"
        fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
        preview={ false }
        src={ imageSrc }
      />
    </Flex>
  )
}
