/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@Pimcore/components/card/card'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { DocumentHotspotImagePreview } from './hotspot-image-preview'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { DocumentImageEditableFooter } from './footer/footer'
import { isNil, isNumber } from 'lodash'
import { createStyles } from 'antd-style'
import { useCropModal } from '@Pimcore/modules/element/components/crop-modal/hooks/use-crop-modal'
import { useHotspotMarkersModal } from '@Pimcore/modules/element/components/hotspot-markers-modal/hooks/use-hotspot-markers-modal'
import { type CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { toIHotspots, fromIHotspots } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'

// Create styles hook inline since we had import issues
const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    `
  }
})

export interface ImageEditableValue {
  id?: number
  alt?: string
  title?: string
  hotspots?: any[]
  marker?: any[]
  crop?: any
}

export interface ImageEditableConfig {
  width?: number
  height?: number
  title?: string
  reload?: boolean
}

interface HotspotImageValue {
  image: { type: 'asset', id: number } | null
  hotspots: any[]
  marker: any[]
  crop: any
}

interface DocumentImageEditableProps {
  value?: ImageEditableValue
  config?: ImageEditableConfig
  onChange?: (value: ImageEditableValue) => void
  disabled?: boolean
}

export const DocumentImageEditable = (props: DocumentImageEditableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const imageValue = props.value
  const width = isNumber(props.config?.width) ? String(props.config.width) : '200'
  const height = isNumber(props.config?.height) ? String(props.config.height) : '200'

  const { openModal: openCropModal } = useCropModal({
    disabled: props.disabled,
    onChange: (crop) => {
      if (!isNil(imageValue?.id)) {
        const newValue: ImageEditableValue = {
          id: imageValue.id,
          alt: imageValue?.alt ?? '',
          title: imageValue?.title ?? '',
          hotspots: imageValue?.hotspots ?? [],
          marker: imageValue?.marker ?? [],
          crop: crop ?? {}
        }
        props.onChange?.(newValue)
      }
    }
  })

  const { openModal: openHotspotMarkersModal } = useHotspotMarkersModal({
    disabled: props.disabled,
    onChange: (hotspots) => {
      if (!isNil(imageValue?.id)) {
        const { hotspots: newHotspots, marker: newMarkers } = fromIHotspots(hotspots)
        const newValue: ImageEditableValue = {
          id: imageValue.id,
          alt: imageValue?.alt ?? '',
          title: imageValue?.title ?? '',
          hotspots: newHotspots,
          marker: newMarkers,
          crop: imageValue?.crop ?? {}
        }
        props.onChange?.(newValue)
      }
    }
  })

  const replaceImage = useCallback((assetId: number) => {
    let newValue: ImageEditableValue = imageValue ?? {
      id: undefined,
      alt: '',
      title: '',
      hotspots: [],
      marker: [],
      crop: {}
    }

    newValue = {
      ...newValue,
      id: assetId
    }

    props.onChange?.(newValue)
  }, [imageValue, props])

  const handleHotspotImageChange = useCallback((value: HotspotImageValue) => {
    if (!isNil(imageValue?.id)) {
      const newValue: ImageEditableValue = {
        id: imageValue.id,
        alt: imageValue?.alt ?? '',
        title: imageValue?.title ?? '',
        hotspots: value.hotspots,
        marker: value.marker,
        crop: value.crop
      }
      props.onChange?.(newValue)
    }
  }, [imageValue, props])

  const convertToHotspotImageValue = (): HotspotImageValue => {
    if (isNil(imageValue?.id)) {
      return {
        image: null,
        hotspots: [],
        marker: [],
        crop: {}
      }
    }

    return {
      image: {
        type: 'asset',
        id: imageValue.id
      },
      hotspots: imageValue.hotspots ?? [],
      marker: imageValue.marker ?? [],
      crop: imageValue.crop ?? {}
    }
  }

  const emptyValue = useCallback(() => {
    props.onChange?.({
      id: undefined,
      alt: '',
      title: '',
      hotspots: [],
      marker: [],
      crop: {}
    })
  }, [props])

  const handleOpenCropModal = useCallback(() => {
    if (!isNil(imageValue?.id)) {
      const cropSettings: CropSettings | null = imageValue.crop as CropSettings ?? null
      openCropModal(imageValue.id, cropSettings)
    }
  }, [imageValue, openCropModal])

  const handleOpenHotspotMarkersModal = useCallback(() => {
    if (!isNil(imageValue?.id)) {
      const hotspots = toIHotspots(imageValue.hotspots ?? [], imageValue.marker ?? [])
      const cropSettings: CropSettings | null = imageValue.crop as CropSettings ?? null
      openHotspotMarkersModal(imageValue.id, hotspots, cropSettings)
    }
  }, [imageValue, openHotspotMarkersModal])

  return (
    <Card
      bodyStyle={ { padding: 0 } }
      style={ { width, height } }
    >
      <Droppable
        isValidContext={ () => props.disabled !== true }
        isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
        onDrop={ (info: DragAndDropInfo) => {
          replaceImage(info.data.id as number)
        } }
        variant="outline"
      >
        <div
          className={ styles.container }
          style={ { width, height } }
        >
          {!isNil(imageValue?.id)
            ? (
              <DocumentHotspotImagePreview
                assetId={ imageValue.id }
                disabled={ props.disabled }
                height={ Number(height) }
                onChange={ handleHotspotImageChange }
                setMarkerModalOpen={ handleOpenHotspotMarkersModal }
                value={ convertToHotspotImageValue() }
                width={ Number(width) }
              />
              )
            : (
              <AssetTarget
                height={ Number(height) }
                onSearch={ () => {
                  // Will be handled by footer component
                } }
                title={ props.config?.title ?? t('document.editable.image.drop-message') }
                width={ Number(width) }
              />
              )}
        </div>
      </Droppable>

      <DocumentImageEditableFooter
        config={ props.config }
        disabled={ props.disabled }
        emptyValue={ emptyValue }
        replaceImage={ replaceImage }
        setCropModalOpen={ handleOpenCropModal }
        setMarkerModalOpen={ handleOpenHotspotMarkersModal }
        setValue={ props.onChange ?? (() => {}) }
        value={ props.value }
      />
    </Card>
  )
}
