/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { forwardRef, type MutableRefObject, useEffect, useMemo, useState } from 'react'
import { useStyle } from './image-preview.styles'
import cn from 'classnames'
import { toCssDimension } from '@Pimcore/utils/css'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { ImagePreviewDropdown } from '@Pimcore/components/image-preview/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { Button } from '@Pimcore/components/button/button'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useTranslation } from 'react-i18next'
import { type ImageThumbnailSettings } from './utils/custom-image-thumbnail'
import { getAssetPreviewUrl } from './utils/get-asset-preview-url'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { isNil } from 'lodash'
import { Image } from 'antd'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'

interface ImagePreviewProps {
  src?: string
  assetId?: number
  assetType?: 'image' | 'video'
  width: number | string
  height: number | string
  className?: string
  style?: React.CSSProperties
  dropdownItems?: DropdownProps['menu']['items']
  bordered?: boolean
  onHotspotsDataButtonClick?: () => void
  thumbnailSettings?: ImageThumbnailSettings
  imgAttributes?: Record<string, string>
}

export const ImagePreview = forwardRef(function ImagePreview ({
  src,
  assetId,
  assetType,
  width,
  height,
  className,
  style,
  dropdownItems,
  bordered = false,
  onHotspotsDataButtonClick,
  thumbnailSettings,
  imgAttributes
}: ImagePreviewProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()
  const { t } = useTranslation()
  const [key, setKey] = useState(0)
  const [thumbnailDimensions, setThumbnailDimensions] = useState({ width: 0, height: 0 })
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const imageSrc = useMemo(() => {
    if (assetId === undefined) {
      return src
    }

    const defaultThumbnailSettings: ImageThumbnailSettings = {
      frame: false,
      ...thumbnailSettings
    }

    return getAssetPreviewUrl({
      assetId,
      assetType,
      width: thumbnailDimensions.width,
      height: thumbnailDimensions.height,
      thumbnailSettings: defaultThumbnailSettings
    })
  }, [assetId, src, thumbnailDimensions, assetType, thumbnailSettings])

  const isVisible = useElementVisible(wrapperRef)

  useEffect(() => {
    if (isVisible && wrapperRef?.current !== null && wrapperRef?.current !== undefined) {
      setThumbnailDimensions({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight
      })
    }
  }, [isVisible])

  useEffect(() => {
    setKey(key + 1)
  }, [imageSrc])

  const loadingSpinner = (
    <Flex
      align="center"
      justify="center"
      className="w-full h-full"
    >
      <Spin size="small" />
    </Flex>
  )

  return (
    <Dropdown
      disabled={ isNil(dropdownItems) || dropdownItems.length === 0 }
      menu={ { items: dropdownItems } }
      trigger={ ['contextMenu'] }
    >
      <div ref={ ref }>
        <div
          className={ cn(className, styles.imagePreviewContainer, bordered ? 'image-preview-bordered' : undefined, ...getStateClasses()) }
          ref={ wrapperRef }
          style={ {
            ...style,
            height: toCssDimension(height),
            width: toCssDimension(width)
          } }
        >
          { imageSrc !== undefined && (
            <Image
              className="w-full"
              fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
              key={ key }
              placeholder={ loadingSpinner }
              preview={ false }
              src={ imageSrc }
              { ...imgAttributes }
            />
          ) }

          <ImagePreviewDropdown dropdownItems={ dropdownItems } />

          { onHotspotsDataButtonClick !== undefined && (
            <Tooltip
              className={ styles.hotspotButton }
              title={ t('hotspots.has-hotspots-or-marker') }
            >
              <Button
                className={ styles.hotspotButton }
                icon={ <Icon
                  value="location-marker"
                       /> }
                onClick={ onHotspotsDataButtonClick }
                size="small"
              />
            </Tooltip>
          ) }
        </div>
      </div>
    </Dropdown>
  )
})

export * from './utils/custom-image-thumbnail'
