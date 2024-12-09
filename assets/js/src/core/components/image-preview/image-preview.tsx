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

import React, { type CSSProperties, forwardRef, type MutableRefObject, useEffect, useRef, useState } from 'react'
import { useStyle } from './image-preview.styles'
import cn from 'classnames'
import { toCssDimension } from '@Pimcore/utils/css'
import { Image } from 'antd'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { ImagePreviewDropdown } from '@Pimcore/components/image-preview/components/dropdown/dropdown'

interface ImagePreviewProps {
  src?: string
  assetId?: number
  className?: string
  width: number | string
  height: number | string
  style?: CSSProperties
  bordered?: boolean
  dropdownItems?: DropdownProps['menu']['items']
}

export const ImagePreview = forwardRef(function ImagePreview ({ src, assetId, width, height, className, style, dropdownItems, bordered = false }: ImagePreviewProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const previewImageWrapperRef = useRef<HTMLDivElement>(null)
  const [key, setKey] = React.useState(0)
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()

  const createPreviewSrc = (): string | undefined => {
    if (assetId !== undefined && dimensions.width > 0 && dimensions.height > 0) {
      return `${getPrefix()}/assets/${assetId}/image/stream/custom?${new URLSearchParams({
        mimeType: 'JPEG',
        resizeMode: 'scaleByWidth',
        contain: 'true',
        width: dimensions.width.toString(),
        height: dimensions.height.toString()
      }).toString()}`
    }
    return undefined
  }

  const imageSrc: string | undefined = assetId !== undefined
    ? createPreviewSrc()
    : src

  useEffect(() => {
    if (previewImageWrapperRef?.current !== null) {
      const { width: previewWidth, height: previewHeight } = previewImageWrapperRef.current.getBoundingClientRect()
      setDimensions({ width: previewWidth, height: previewHeight })
    }
  }, [previewImageWrapperRef.current])

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
      className={ cn(className, styles.imagePreviewContainer, bordered ? 'image-preview-bordered' : undefined, ...getStateClasses()) }
      ref={ ref }
      style={ {
        ...style,
        height: toCssDimension(height),
        width: toCssDimension(width)
      } }
    >
      <div
        className="w-full h-full"
        ref={ previewImageWrapperRef }
      >
        { imageSrc !== undefined && (
          <Image
            className="w-full"
            fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
            key={ key }
            placeholder={ loadingSpinner }
            preview={ false }
            src={ imageSrc }
          />
        )}
      </div>

      <ImagePreviewDropdown dropdownItems={ dropdownItems } />
    </div>
  )
})
