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

import React, { useRef, useState } from 'react'
import cn from 'classnames'
import {
  type ImageValue
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image/image'
import { Flex } from '@Pimcore/components/flex/flex'
import {
  ImageGalleryImageTarget
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image-gallery/components/image-target/image-target'
import { Card } from '@Pimcore/components/card/card'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { isEmpty, isEqual } from 'lodash'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  ImageGallerySortableItem
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/image-gallery/components/sortable-item/sortable-item'
import {
  rectSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable'
import {
  type Hotspot, type Marker
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import {
  HotspotMarkersModalContainer,
  type HotspotMarkersModalContainerRef
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/hotspot-markers-modal-container'
import {
  type CropSettings
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { uuid } from '@Pimcore/utils/uuid'
import { useStyles } from './image-gallery.styles'

export interface ImageGalleryProps {
  value?: ImageGalleryValue | null
  onChange?: (value: ImageGalleryValue | null) => void
  disabled?: boolean
  className?: string
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

  const hotspotMarkersModalContainerRef = useRef<HotspotMarkersModalContainerRef>(null)

  const setValue = (newValue: ImageGalleryValue): void => {
    const updatedValue = addKeys(newValue)

    if (!isEqual(updatedValue, value)) {
      setValueState(updatedValue)
      const changedValue = removeKeys(updatedValue.filter(item => item.image !== null))
      props.onChange?.(changedValue.length > 0 ? changedValue : null)
    }
  }

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
        <SortableContext
          disabled={ props.disabled }
          items={ value.map((item, index) => ({ id: String(index) })) }
          strategy={ rectSortingStrategy }
        >
          { value.map((item, index) => (
            <ImageGallerySortableItem
              disabled={ props.disabled }
              hotspotMarkersModalContainer={ hotspotMarkersModalContainerRef }
              id={ String(index) }
              index={ index }
              item={ item }
              key={ item.key }
              setValue={ setValue }
              value={ value }
            />
          )) }
        </SortableContext>
        { (props.disabled !== true || isEmpty(value)) && (
          <ImageGalleryImageTarget
            disabled={ props.disabled }
            index={ value.length }
            setValue={ setValue }
            value={ value }
          />
        ) }
      </Flex>
      <HotspotMarkersModalContainer
        ref={ hotspotMarkersModalContainerRef }
      />
    </Card>
  )
}
