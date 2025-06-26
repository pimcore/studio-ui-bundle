/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef, useState } from 'react'
import cn from 'classnames'
import {
  type ImageValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image/image'
import { Flex } from '@Pimcore/components/flex/flex'
import {
  ImageGalleryImageTarget
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/image-target/image-target'
import { Card } from '@Pimcore/components/card/card'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { isEmpty, isEqual } from 'lodash'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  ImageGallerySortableItem
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image-gallery/components/sortable-item/sortable-item'
import {
  rectSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'
import {
  type Hotspot, type Marker
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import {
  HotspotMarkersModalContainer,
  type HotspotMarkersModalContainerRef
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal-container'
import {
  type CropSettings
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { uuid } from '@Pimcore/utils/uuid'
import { useStyles } from './image-gallery.styles'
import { toCssDimension } from '@Pimcore/utils/css'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'

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

const addKeys = (value: ImageGalleryValue): ImageGalleryValue => {
  return value.map((item, index) => {
    if (item.key === undefined) {
      return { ...item, key: uuid() }
    }
    return item
  })
}

const removeKeys = (items: ImageGalleryValue): ImageGalleryValue => {
  return items.map((item) => {
    const { key, ...rest } = item
    return rest
  })
}

export const ImageGallery = (props: ImageGalleryProps): React.JSX.Element => {
  const [value, setValueState] = useState<ImageGalleryValue>(addKeys(props.value ?? []))
  const { t } = useTranslation()
  const { styles } = useStyles()

  const width = toCssDimension(props.width, 200)
  const height = toCssDimension(props.height, 100)

  const hotspotMarkersModalContainerRef = useRef<HotspotMarkersModalContainerRef>(null)

  const setValue = (newValue: ImageGalleryValue): void => {
    const updatedValue = addKeys(newValue)

    if (!isEqual(updatedValue, value)) {
      setValueState(updatedValue)
      const changedValue = removeKeys(updatedValue.filter(item => item.image !== null))
      props.onChange?.(changedValue.length > 0 ? changedValue : null)
    }
  }

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 5 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { distance: 5 } })

  const sensors = useSensors(mouseSensor, touchSensor)

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
              onClick={ () => { setValue([]) } }
            />
          </Tooltip>
          ) }
    >
      <Flex
        gap="small"
        wrap
      >
        <DndContext
        autoScroll={ false }
          sensors={ sensors }
          onDragEnd={ (event) => {
            const dragId = event.active.id
            const dropId = event.over?.id
            const newValue = [...value]
      
                      const dragValue = value[Number(dragId)]
                      const dropValue = value[Number(dropId)]
                      if (dragValue !== undefined && dropValue !== undefined) {
                        newValue.splice(Number(dragId), 1)
                        newValue.splice(Number(dropId), 0, dragValue)
                        setValue(newValue)
                      }
          }}
        >
          <SortableContext
            disabled={ props.disabled }
            items={ value.map((item, index) => ({ id: String(index) })) }
            strategy={ rectSortingStrategy }

          >
            { value.map((item, index) => (
              <ImageGallerySortableItem
                disabled={ props.disabled }
                height={ height! }
                hotspotMarkersModalContainer={ hotspotMarkersModalContainerRef }
                id={ String(index) }
                index={ index }
                item={ item }
                key={ item.key }
                setValue={ setValue }
                value={ value }
                width={ width! }
              />
            )) }
          </SortableContext>
        </DndContext>
        { (props.disabled !== true || isEmpty(value)) && (
          <ImageGalleryImageTarget
            disabled={ props.disabled }
            height={ height! }
            index={ value.length }
            setValue={ setValue }
            value={ value }
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
