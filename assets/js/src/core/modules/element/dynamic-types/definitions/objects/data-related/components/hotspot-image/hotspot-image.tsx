/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback } from 'react'
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
  hasHotspotsOrMarkers
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/hotspot-image/utils/value-data'
import _, { isEmpty, isNil } from 'lodash'
import { toCssDimension } from '@Pimcore/utils/css'
import { useStyles } from './hotspot-image.styles'
import { useCropModal } from '@Pimcore/modules/element/components/crop-modal/hooks/use-crop-modal'
import { useHotspotMarkersModal } from '@Pimcore/modules/element/components/hotspot-markers-modal/hooks/use-hotspot-markers-modal'
import { type DataTemplates } from '@Pimcore/modules/element/components/hotspot-markers-modal/hotspot-markers-modal'
import { fromIHotspots, toIHotspots } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'
import { InlineUpload } from '@Pimcore/components/inline-upload'
import { useUploadModal } from '@Pimcore/components/modal-upload/hooks/use-upload-modal'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'

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
  predefinedDataTemplates?: DataTemplates | string | null
  ratioX?: number
  ratioY?: number
  uploadPath?: string
}

export const HotspotImage = (props: HotspotImageProps): React.JSX.Element => {
  const imageValue = props.value ?? null

  const { confirm } = useFormModal()
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { triggerUpload } = useUploadModal({})

  const { openModal: openCropModal } = useCropModal({
    disabled: props.disabled,
    ratioX: props.ratioX,
    ratioY: props.ratioY,
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
    predefinedDataTemplates: props.predefinedDataTemplates,
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

  const { open: openElementSelector } = useElementSelector({
    selectionType: SelectionType.Single,
    areas: {
      asset: true,
      object: false,
      document: false
    },
    config: {
      assets: {
        allowedTypes: ['image']
      }
    },
    onFinish: (event) => {
      if (!isEmpty(event.items)) {
        const newImage: ImageValue = { type: 'asset', id: event.items[0].data.id }
        replaceImage(newImage)
      }
    }
  })

  const handleUpload = useCallback(() => {
    triggerUpload({
      targetFolderPath: props.uploadPath ?? '',
      accept: 'image/*',
      multiple: false,
      maxItems: 1,
      onSuccess: async (assets) => {
        if (assets.length > 0) {
          const newImage: ImageValue = { type: 'asset', id: assets[0].id as number }
          replaceImage(newImage)
        }
      }
    })
  }, [triggerUpload])

  const handleFileSystemUpload = async (asset: any): Promise<void> => {
    const newImage: ImageValue = { type: 'asset', id: asset.id as number }
    replaceImage(newImage)
  }

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
    if (hasHotspotsOrMarkers(imageValue)) {
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

  const setImage = (image: ImageValue, replaceHotspotsMarkers: boolean): void => {
    let newValue: HotspotImageValue = imageValue === null ? { image: null, hotspots: [], marker: [], crop: {} } : { ...imageValue }

    if (replaceHotspotsMarkers) {
      newValue = { image, hotspots: [], marker: [], crop: {} }
    } else {
      newValue = { ...newValue, crop: {}, image }
    }
    handleChange(newValue)
  }

  const handleOpenCropModal = (): void => {
    if (!isNil(imageValue?.image?.id)) {
      openCropModal(
        imageValue.image.id,
        imageValue.crop
      )
    }
  }

  const handleOpenHotspotMarkersModal = (): void => {
    if (!isNil(imageValue?.image?.id)) {
      const hotspots = toIHotspots(imageValue.hotspots ?? [], imageValue.marker ?? [])
      openHotspotMarkersModal(imageValue.image.id, hotspots, imageValue.crop)
    }
  }

  const handleDroppableDrop = (info): void => {
    const newImage: ImageValue = { type: 'asset', id: info.data.id as number }
    replaceImage(newImage)
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
          onSearch={ openElementSelector }
          onUpload={ handleUpload }
          replaceImage={ replaceImage }
          setCropModalOpen={ handleOpenCropModal }
          setMarkerModalOpen={ handleOpenHotspotMarkersModal }
          setValue={ handleChange }
          value={ imageValue }
        />)
      }
    >
      <InlineUpload
        accept="image/*"
        assetType="image"
        disabled={ props.disabled }
        onSuccess={ handleFileSystemUpload }
        targetFolderPath={ props.uploadPath ?? '' }
      >
        <Droppable
          isValidContext={ (info: DragAndDropInfo) => props.disabled !== true }
          isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
          onDrop={ handleDroppableDrop }
          variant="outline"
        >
          { imageValue !== null && imageValue?.image !== null
            ? (
              <HotspotImagePreview
                assetId={ imageValue.image.id }
                disabled={ props.disabled }
                height={ height! }
                markerModalOpen={ false }
                onChange={ handleChange }
                ratioX={ !isNil(props.ratioX) ? Number(props.ratioX) : undefined }
                ratioY={ !isNil(props.ratioY) ? Number(props.ratioY) : undefined }
                setMarkerModalOpen={ openHotspotMarkersModal }
                value={ imageValue }
                width={ width! }
              />
              )
            : (
              <AssetTarget
                dndIcon={ props.disabled !== true }
                height={ height }
                onSearch={ openElementSelector }
                onUpload={ handleUpload }
                title={ t(props.disabled === true ? 'empty-image' : 'image.upload.add.and.dnd') }
                width={ width }
              />
              ) }
        </Droppable>
      </InlineUpload>
    </Card>
  )
}
