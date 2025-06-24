/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { isEmpty, isEqual } from 'lodash'
import { Tooltip } from 'antd'
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { type ImageValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image/image'
import { Flex } from '@Pimcore/components/flex/flex'
import { ImageGalleryImageTarget } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-target/image-target'
import { Card } from '@Pimcore/components/card/card'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { ImageGallerySortableItem } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/sortable-item/sortable-item'
import { type Hotspot, type Marker } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import { HotspotMarkersModalContainer, type HotspotMarkersModalContainerRef } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal-container'
import { type CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { uuid } from '@Pimcore/utils/uuid'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './image-gallery.styles'

export interface ImageGalleryProps {
  value?: ImageGalleryValue | null
  onChange?: (value: ImageGalleryValue | null) => void
  disabled?: boolean
  className?: string
  width: string | number | null
  height: string | number | null
}

export type ImageGalleryValue = ImageGalleryValueItem[]

export interface ImageGalleryValueItem {
  image: ImageValue | null
  hotspots: Hotspot[]
  marker: Marker[]
  crop: CropSettings
  key?: string
}

const addKeys = (value: ImageGalleryValue | null | undefined): ImageGalleryValue => {
  return (value ?? []).map((item) => ({
    ...item,
    key: item.key ?? uuid()
  }))
}

const removeKeys = (items: ImageGalleryValue): ImageGalleryValue => {
  return items.map((item) => {
    const { key, ...rest } = item
    return rest
  })
}

export const ImageGallery = (props: ImageGalleryProps): React.JSX.Element => {
  const initialValue = useMemo(() => addKeys(props.value), [])

  const [internalValue, setInternalValue] = useState<ImageGalleryValue>(initialValue)
  const { t } = useTranslation()
  const { styles } = useStyles()

  const width = toCssDimension(props.width, 200)
  const height = toCssDimension(props.height, 100)

  useEffect(() => {
    setInternalValue(prev => {
      const newValue = addKeys(props.value)

      if (!isEqual(removeKeys(prev), removeKeys(newValue))) {
        return newValue
      }

      return prev
    })
  }, [props.value])

  const handleChange = (newValue: ImageGalleryValue): void => {
    const updatedValue = addKeys(newValue)

    if (!isEqual(updatedValue, internalValue)) {
      setInternalValue(updatedValue)

      const changedValue = removeKeys(updatedValue.filter(item => item.image !== null))
      props.onChange?.(changedValue.length > 0 ? changedValue : null)
    }
  }

  const hotspotMarkersModalContainerRef = useRef<HotspotMarkersModalContainerRef>(null)

  return (
    <Card
      className={ cn(styles.imageGallery, props.className) }
      footer={ props.disabled === true
        ? undefined
        : (
          <Tooltip
            key="empty"
            title={ t('empty') }
          >
            <IconButton
              disabled={ isEmpty(props.value) }
              icon={ { value: 'trash' } }
              onClick={ () => { handleChange([]) } }
            />
          </Tooltip>
          ) }
    >
      <Flex
        gap="small"
        wrap
      >
        <SortableContext
          disabled={ props.disabled }
          items={ internalValue.map((item) => ({ id: String(item.key) })) }
          strategy={ rectSortingStrategy }
        >
          { internalValue.map((item, index) => (
            <ImageGallerySortableItem
              disabled={ props.disabled }
              height={ height! }
              hotspotMarkersModalContainer={ hotspotMarkersModalContainerRef }
              id={ String(item.key) }
              index={ index }
              item={ item }
              key={ item.key }
              setValue={ handleChange }
              value={ internalValue }
              width={ width! }
            />
          )) }
        </SortableContext>
        { (props.disabled !== true || isEmpty(internalValue)) && (
          <ImageGalleryImageTarget
            disabled={ props.disabled }
            height={ height! }
            index={ internalValue.length }
            setValue={ handleChange }
            value={ internalValue }
            width={ width! }
          />
        ) }
      </Flex>
      <HotspotMarkersModalContainer
        ref={ hotspotMarkersModalContainerRef }
      />
    </Card>
  )
}
