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
import cn from 'classnames'
import { Card } from '@Pimcore/components/card/card'
import {
  HotspotImageFooter
} from './footer'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { useTranslation } from 'react-i18next'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import type { DragAndDropInfo } from '@sdk/components'
import type {
  ImageValue
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/image/image'
import type {
  Hotspot,
  Marker
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/hotspot-types'
import type {
  CropSettings
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import {
  HotspotImagePreview
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/image-preview'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import {
  hasValueData
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/utils/value-data'
import _, { isNil } from 'lodash'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './hotspot-image.styles'
import { useCropModal } from '@Pimcore/modules/element/components/crop-modal/hooks/use-crop-modal'
import { useHotspotMarkersModal } from '@Pimcore/modules/element/components/hotspot-markers-modal/hooks/use-hotspot-markers-modal'
import { fromIHotspots, toIHotspots } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'

export interface HotspotImageValue {
  image: ImageValue | null
  hotspots: Hotspot[]
  marker: Marker[]
  crop: CropSettings
}

export interface HotspotImageProps {
  width: string | number | null
  height: string | number | null
  disabled?: boolean
  value?: HotspotImageValue | null
  onChange?: (value: HotspotImageValue | null) => void
  className?: string
}

export const HotspotImage = (props: HotspotImageProps): React.JSX.Element => {
  const imageValue = props.value ?? null

  const { confirm } = useFormModal()
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { openModal: openCropModal } = useCropModal({
    disabled: props.disabled,
    onChange: (crop) => {
      if (!isNil(imageValue?.image?.id)) {
        const newValue: HotspotImageValue = {
          ...imageValue,
          crop: crop ?? {}
        }
        handleChange(newValue)
      }
    }
  })

  const { openModal: openHotspotMarkersModal } = useHotspotMarkersModal({
    disabled: props.disabled,
    onChange: (hotspots) => {
      if (!isNil(imageValue?.image?.id)) {
        const { hotspots: newHotspots, marker: newMarkers } = fromIHotspots(hotspots)
        const newValue: HotspotImageValue = {
          ...imageValue,
          hotspots: newHotspots,
          marker: newMarkers
        }
        handleChange(newValue)
      }
    }
  })

  const handleChange = (newValue: HotspotImageValue | null): void => {
    if (!_.isEqual(newValue, imageValue)) {
      props.onChange?.(newValue)
    }
  }

  const clearValue = (): void => {
    props.onChange?.(null)
  }

  const width = toCssDimension(props.width, 300)
  const height = toCssDimension(props.height, 150)

  const replaceImage = (newImage: ImageValue): void => {
    if (hasValueData(imageValue)) {
      confirm({
        title: t('hotspots.clear-data'),
        content: t('hotspots.clear-data.dnd-message'),
        okText: t('yes'),
        cancelText: t('no'),
        onOk: () => {
          setImage(newImage, true)
        },
        onCancel: () => {
          setImage(newImage, false)
        }
      })
    } else {
      setImage(newImage, true)
    }
  }

  const setImage = (image: ImageValue, replaceValueData: boolean): void => {
    let newValue: HotspotImageValue = imageValue === null ? { image: null, hotspots: [], marker: [], crop: {} } : { ...imageValue }

    if (replaceValueData) {
      newValue = { image, hotspots: [], marker: [], crop: {} }
    } else {
      newValue = { ...newValue, image }
    }

    handleChange(newValue)
  }

  const handleOpenCropModal = (): void => {
    if (!isNil(imageValue?.image?.id)) {
      openCropModal(imageValue.image.id, imageValue.crop)
    }
  }

  const handleOpenHotspotMarkersModal = (): void => {
    if (!isNil(imageValue?.image?.id)) {
      const hotspots = toIHotspots(imageValue.hotspots ?? [], imageValue.marker ?? [])
      openHotspotMarkersModal(imageValue.image.id, hotspots, imageValue.crop)
    }
  }

  return (
    <Card
      className={ cn('max-w-full', styles.image, props.className) }
      fitContent
      footer={ (
        <HotspotImageFooter
          disabled={ props.disabled }
          emptyValue={ clearValue }
          key="image-footer"
          replaceImage={ replaceImage }
          setCropModalOpen={ handleOpenCropModal }
          setMarkerModalOpen={ handleOpenHotspotMarkersModal }
          setValue={ handleChange }
          value={ imageValue }
        />)
      }
    >
      <Droppable
        isValidContext={ (info: DragAndDropInfo) => props.disabled !== true }
        isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
        onDrop={ (info: DragAndDropInfo) => {
          const newImage: ImageValue = { type: 'asset', id: info.data.id as number }
          replaceImage(newImage)
        } }
        variant="outline"
      >
        { // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          imageValue !== null && imageValue?.image !== null
            ? (
              <HotspotImagePreview
                assetId={ imageValue.image.id }
                disabled={ props.disabled }
                height={ height! }
                markerModalOpen={ false }
                onChange={ handleChange }
                setMarkerModalOpen={ openHotspotMarkersModal }
                value={ imageValue }
                width={ width! }
              />
              )
            : (
              <AssetTarget
                dndIcon={ props.disabled !== true }
                height={ height }
                title={ t(props.disabled !== true ? 'image.dnd-target' : 'empty-image') }
                width={ width }
              />
              ) }
      </Droppable>
    </Card>
  )
}
