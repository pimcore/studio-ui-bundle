/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { DocumentHotspotImagePreview } from './hotspot-image-preview'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { isNil, isBoolean } from 'lodash'
import { useCropModal } from '@Pimcore/modules/element/components/crop-modal/hooks/use-crop-modal'
import { useHotspotMarkersModal } from '@Pimcore/modules/element/components/hotspot-markers-modal/hooks/use-hotspot-markers-modal'
import { type CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { toIHotspots, fromIHotspots } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'
import { type Hotspot, type Marker } from '../../../../objects/data-related/helpers/hotspot-image/types/hotspot-types'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import useElementResize from '@Pimcore/utils/hooks/use-element-resize'
import { useUploadModal } from '@Pimcore/components/modal-upload/hooks/use-upload-modal'
import { InlineUpload } from '@Pimcore/components/inline-upload'
import { useImageValueUpdates } from './hooks/use-image-value-updates'
import { type IHotspot } from '@Pimcore/components/hotspot-image/hotspot-image'
import { DEFAULT_HEIGHT, MIN_WIDTH } from '../../helpers/responsive-asset-preview/image-dimensions'
import { locateElementInTree } from '@Pimcore/modules/element/utils/tree-utils'
import { useAssetDimensions } from '../../helpers/responsive-asset-preview/hooks/use-asset-dimensions'
import { InheritanceOverlay } from '../inheritance-overlay/inheritance-overlay'
import { isValidElementType } from '@Pimcore/modules/element/utils/element-type'
import { type ImageEditableConfig, type ImageEditableValue } from '../../types/image-editable-types'
export { type ImageEditableConfig, type ImageEditableValue } from '../../types/image-editable-types'

interface HotspotImageValue {
  image: { type: 'asset', id: number } | null
  hotspots: Hotspot[]
  marker: Marker[]
  crop: CropSettings
}

export interface ImageEditableProps {
  value?: ImageEditableValue
  config?: ImageEditableConfig
  onChange?: (value: ImageEditableValue) => void
  disabled?: boolean
  inherited?: boolean
  containerRef?: React.RefObject<HTMLDivElement>
}

export const ImageEditable = (props: ImageEditableProps): React.JSX.Element => {
  const { t } = useTranslation()

  const imageValue = props.value
  const width = props.config?.width
  const height = props.config?.height
  const hasImage = !isNil(imageValue?.id)
  const isInherited = isBoolean(props.inherited) && props.inherited
  const disabled = props.disabled === true || isInherited

  const handleOverwrite = (): void => {
    props.onChange?.(props.value ?? {})
  }

  const { getSmartDimensions, handlePreviewResize: handleImageResize, handleAssetTargetResize } = useAssetDimensions()
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const smartDimensions = getSmartDimensions(imageValue?.id)
  const { width: containerWidth } = useElementResize(props.containerRef ?? { current: null })

  const { triggerUpload } = useUploadModal({})
  const {
    handleCropChange,
    handleHotspotsChange,
    handleReplaceImage,
    handleEmptyValue,
    handleAltTextChange
  } = useImageValueUpdates({ value: imageValue, onChange: props.onChange })

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
      if (event.items.length > 0) {
        handleReplaceImage(event.items[0].data.id)
      }
    }
  })

  const handleLocateInTree = (): void => {
    locateElementInTree('asset', imageValue?.id)
  }

  const { openModal: openCropModal } = useCropModal({
    disabled,
    onChange: handleCropChange,
    ratioX: !isNil(props.config?.ratioX) ? Number(props.config?.ratioX) : undefined,
    ratioY: !isNil(props.config?.ratioY) ? Number(props.config?.ratioY) : undefined
  })

  const { openModal: openHotspotMarkersModal } = useHotspotMarkersModal({
    disabled,
    predefinedDataTemplates: props.config?.predefinedDataTemplates,
    onChange: (hotspots) => {
      if (!isNil(imageValue?.id)) {
        const { hotspots: newHotspots, marker: newMarkers } = fromIHotspots(hotspots)
        handleHotspotsChange(newHotspots, newMarkers)
      }
    }
  })

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

  const handleOpenCropModal = (): void => {
    if (!isNil(imageValue?.id)) {
      const cropSettings: CropSettings | null = imageValue.crop! ?? null
      openCropModal(
        imageValue.id,
        cropSettings
      )
    }
  }

  const handleOpenHotspotMarkersModal = (): void => {
    if (!isNil(imageValue?.id)) {
      const hotspots = toIHotspots(imageValue.hotspots ?? [], imageValue.marker ?? [])
      const cropSettings: CropSettings | null = imageValue.crop! ?? null
      openHotspotMarkersModal(imageValue.id, hotspots, cropSettings)
    }
  }

  const handleUpload = useCallback(() => {
    if (props.config?.disableInlineUpload === true) return

    triggerUpload({
      targetFolderPath: props.config?.uploadPath,
      accept: 'image/*',
      multiple: false,
      maxItems: 1,
      onSuccess: async (assets) => {
        if (assets.length > 0) {
          handleReplaceImage(Number(assets[0].id))
        }
      }
    })
  }, [props.config?.disableInlineUpload, props.config?.uploadPath, triggerUpload, handleReplaceImage])

  const handleFileSystemUpload = async (asset: any): Promise<void> => {
    handleReplaceImage(Number(asset.id))
  }

  const handleDroppableDrop = useCallback((info: DragAndDropInfo) => {
    handleReplaceImage(info.data.id as number)
  }, [handleReplaceImage])

  const renderDroppableContent = useCallback((children: React.ReactNode): React.JSX.Element => {
    // Determine the shape based on whether an image is selected
    const droppableShape = !isNil(imageValue?.id) ? 'angular' : 'round'

    // Don't enable file system drag and drop if inline upload is disabled
    if (props.config?.disableInlineUpload === true) {
      return (
        <Droppable
          disabled={ disabled }
          dropClass={ props.config?.dropClass }
          isValidContext={ (info: DragAndDropInfo) => isValidElementType(info.type) }
          isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
          onDrop={ handleDroppableDrop }
          shape={ droppableShape }
          variant="outline"
        >
          {children}
        </Droppable>
      )
    }

    return (
      <InlineUpload
        accept="image/*"
        assetType="image"
        disabled={ disabled }
        fullWidth={ isNil(smartDimensions?.width ?? width) }
        onSuccess={ handleFileSystemUpload }
        targetFolderPath={ props.config?.uploadPath }
      >
        <Droppable
          disabled={ disabled }
          dropClass={ props.config?.dropClass }
          isValidContext={ (info: DragAndDropInfo) => isValidElementType(info.type) }
          isValidData={ (info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image' }
          onDrop={ handleDroppableDrop }
          shape={ droppableShape }
          variant="outline"
        >
          {children}
        </Droppable>
      </InlineUpload>
    )
  }, [props.config?.disableInlineUpload, props.config?.uploadPath, disabled, handleFileSystemUpload, handleDroppableDrop, imageValue?.id, smartDimensions?.width, width])

  const handleHotspotImageChange = (value: HotspotImageValue): void => {
    const { hotspots, marker } = fromIHotspots(value.hotspots as unknown as IHotspot[])
    handleHotspotsChange(hotspots, marker)
  }

  return (
    <InheritanceOverlay
      display={ !isNil(smartDimensions?.width ?? width) || hasImage ? 'inline-block' : 'block' }
      hideButtons
      isInherited={ isInherited }
      onOverwrite={ handleOverwrite }
      style={ { minWidth: MIN_WIDTH } }
    >
      {renderDroppableContent(
        hasImage
          ? (
            <DocumentHotspotImagePreview
              altText={ imageValue.alt }
              assetId={ imageValue.id! }
              className="studio-image-editable"
              containerWidth={ containerWidth }
              disableInlineUpload={ props.config?.disableInlineUpload }
              disabled={ disabled }
              dropClass={ props.config?.dropClass }
              emptyValue={ handleEmptyValue }
              focalPointContextMenuItem={ props.config?.focal_point_context_menu_item }
              handleLocateInTree={ handleLocateInTree }
              handleSearch={ openElementSelector }
              handleUpload={ handleUpload }
              height={ smartDimensions?.height ?? height }
              hideAltTextInput={ props.config?.hidetext }
              imgAttributes={ props.config?.imgAttributes }
              isImageLoaded={ isImageLoaded }
              lastImageDimensions={ smartDimensions }
              onAltTextChange={ handleAltTextChange }
              onChange={ handleHotspotImageChange }
              onImageLoadedChange={ setIsImageLoaded }
              onResize={ handleImageResize }
              setCropModalOpen={ handleOpenCropModal }
              setMarkerModalOpen={ handleOpenHotspotMarkersModal }
              thumbnailConfig={ props.config?.thumbnail }
              value={ convertToHotspotImageValue() }
              width={ smartDimensions?.width ?? width }
            />
            )
          : (
            <AssetTarget
              className="studio-image-editable"
              dndIcon
              dropClass={ props.config?.dropClass }
              height={ smartDimensions?.height ?? height ?? DEFAULT_HEIGHT }
              onResize={ handleAssetTargetResize }
              onSearch={ openElementSelector }
              onUpload={ props.config?.disableInlineUpload === true ? undefined : handleUpload }
              title={ props.config?.title ?? t('image.upload.add.and.dnd') }
              width={ smartDimensions?.width ?? width ?? '100%' }
            />
            )
      )}
    </InheritanceOverlay>
  )
}
