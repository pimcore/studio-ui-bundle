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

import React, { type CSSProperties, forwardRef, type MutableRefObject, useEffect } from 'react'
import { useStyle } from './image-preview.styles'
import cn from 'classnames'
import { toCssDimension } from '@Pimcore/utils/css'
import { Image } from 'antd'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'

interface ImagePreviewProps {
  src?: string
  assetId?: number
  className?: string
  width: number | string
  height: number | string
  style?: CSSProperties
}

export const ImagePreview = forwardRef(function ImagePreview ({ src, assetId, width, height, className, style }: ImagePreviewProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const [key, setKey] = React.useState(0)
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()

  const imageSrc = assetId !== undefined ? `${getPrefix()}/assets/${assetId}/image/stream/preview` : src

  useEffect(() => {
    setKey(key + 1)
  }, [imageSrc])

  const loadingSpinner = (
    <Flex
      align="center"
      className="h-full"
      justify="center"
    >
      <Spin size="small" />
    </Flex>
  )

  return (
    <div
      className={ cn(className, styles.imagePreviewContainer, ...getStateClasses()) }
      ref={ ref }
      style={ {
        ...style,
        height: toCssDimension(height),
        width: toCssDimension(width)
      } }
    >
      <Image
        className="w-full"
        fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
        key={ key }
        placeholder={ loadingSpinner }
        preview={ false }
        src={ imageSrc }
      />
    </div>
  )
})
