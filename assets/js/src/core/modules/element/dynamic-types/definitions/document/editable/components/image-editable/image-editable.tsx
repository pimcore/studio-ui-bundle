/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { AssetTarget } from '@Pimcore/components/asset-target/asset-target'
import { DocumentHotspotImagePreview } from './hotspot-image-preview'
import { Droppable } from '@Pimcore/components/drag-and-drop/droppable'
import { type DragAndDropInfo } from '@Pimcore/components/drag-and-drop/droppable'
import { isNil } from 'lodash'
import { useCropModal } from '@Pimcore/modules/element/components/crop-modal/hooks/use-crop-modal'
import { useHotspotMarkersModal } from '@Pimcore/modules/element/components/hotspot-markers-modal/hooks/use-hotspot-markers-modal'
import { type CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { toIHotspots, fromIHotspots } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/utils/hotspot-converter'
import { type Hotspot, type Marker } from '../../../../objects/data-related/helpers/hotspot-image/types/hotspot-types'
import { useElementSelector } from '@Pimcore/modules/element/element-selector/provider/element-selector/use-element-selector'
import { SelectionType } from '@Pimcore/modules/element/element-selector/provider/element-selector/element-selector-provider'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import useElementResize from '@Pimcore/utils/hooks/use-element-resize'
import { useUploadModal } from '@Pimcore/components/modal-upload/hooks/use-upload-modal'
import { InlineUpload } from '@Pimcore/components/inline-upload'

const MIN_IMAGE_WIDTH = 150
const MIN_IMAGE_HEIGHT = 100
const DEFAULT_HEIGHT = 100

export interface ImageEditableValue {
  id?: number
  alt?: string
  title?: string
  hotspots?: Hotspot[]
  marker?: Marker[]
  crop?: CropSettings
}

export interface ImageEditableConfig {
  width?: number
  height?: number
  title?: string
  reload?: boolean
  imgAttributes?: Record<string, string>
  focal_point_context_menu_item?: boolean
  uploadPath?: string
  disableInlineUpload?: boolean
}

interface HotspotImageValue {
  image: { type: 'asset', id: number } | null
  hotspots: Hotspot[]
  marker: Marker[]
  crop: CropSettings
}

interface DocumentImageEditableProps {
  value?: ImageEditableValue
  config?: ImageEditableConfig
  onChange?: (value: ImageEditableValue) => void
  disabled?: boolean
  containerRef?: React.RefObject<HTMLDivElement>
}

export const DocumentImageEditable = (props: DocumentImageEditableProps): React.JSX.Element => {
  const { t } = useTranslation()

  const imageValue = props.value
  const width = props.config?.width
  const height = props.config?.height

  const lastImageDimensionsRef = useRef<{ width: number, height: number } | null>(null)

  const needsContainerWidth = isNil(width) && isNil(height)
  const containerWidth = useElementResize(needsContainerWidth ? props.containerRef ?? { current: null } : { current: null })

  const { triggerUpload } = useUploadModal({})

  const handleImageResize = useCallback((dimensions: { width: number, height: number }) => {
    const minWidth = Math.max(dimensions.width, MIN_IMAGE_WIDTH)
    const minHeight = Math.max(dimensions.height, MIN_IMAGE_HEIGHT)
    console.log(`Image resized to: ${minWidth}x${minHeight}`)
    lastImageDimensionsRef.current = { width: minWidth, height: minHeight }
  }, [])

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
        replaceImage(event.items[0].data.id)
      }
    }
  })

  const handleSearch = useCallback(() => {
    openElementSelector()
  }, [openElementSelector])

  const handleLocateInTree = useCallback(() => {
    if (!isNil(imageValue?.id)) {
      const studioApi = getPimcoreStudioApi()
      studioApi.element.locateInTree(imageValue.id, 'asset')
    }
  }, [imageValue?.id])

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

  const emptyValue = useCallback(() => {
    // Don't clear preserved dimensions when emptying - keep the last image size for the asset target
    props.onChange?.({
      id: undefined,
      alt: '',
      title: '',
      hotspots: [],
      marker: [],
      crop: {}
    })
  }, [props])

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

  const handleOpenCropModal = useCallback(() => {
    if (!isNil(imageValue?.id)) {
      const cropSettings: CropSettings | null = imageValue.crop! ?? null
      openCropModal(imageValue.id, cropSettings)
    }
  }, [imageValue, openCropModal])

  const handleOpenHotspotMarkersModal = useCallback(() => {
    if (!isNil(imageValue?.id)) {
      const hotspots = toIHotspots(imageValue.hotspots ?? [], imageValue.marker ?? [])
      const cropSettings: CropSettings | null = imageValue.crop! ?? null
      openHotspotMarkersModal(imageValue.id, hotspots, cropSettings)
    }
  }, [imageValue, openHotspotMarkersModal])

  const handleUpload = useCallback(() => {
    if (props.config?.disableInlineUpload === true) return

    triggerUpload({
      targetFolderPath: props.config?.uploadPath,
      accept: 'image/*',
      multiple: false,
      maxItems: 1,
      onSuccess: async (assets) => {
        if (assets.length > 0) {
          replaceImage(assets[0].id)
        }
      }
    })
  }, [props.config?.disableInlineUpload, props.config?.uploadPath, triggerUpload, replaceImage])

  const handleFileSystemUpload = useCallback(async (asset: any) => {
    replaceImage(asset.id)
  }, [replaceImage])

  const renderDroppableContent = useCallback((children: React.ReactNode) => {
    // Determine the shape based on whether an image is selected
    const droppableShape = !isNil(imageValue?.id) ? "angular" : "round"
    
    // Don't enable file system drag and drop if inline upload is disabled
    if (props.config?.disableInlineUpload === true || props.disabled === true) {
      return (
        <Droppable
          isValidContext={() => props.disabled !== true}
          isValidData={(info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image'}
          onDrop={(info: DragAndDropInfo) => {
            replaceImage(info.data.id as number)
          }}
          variant="outline"
          shape={droppableShape}
        >
          {children}
        </Droppable>
      )
    }

    return (
      <InlineUpload
        targetFolderPath={props.config?.uploadPath}
        accept="image/*"
        onSuccess={handleFileSystemUpload}
        disabled={props.disabled}
        fullWidth={isNil(lastImageDimensionsRef.current?.width ?? width)}
      >
        <Droppable
          isValidContext={() => props.disabled !== true}
          isValidData={(info: DragAndDropInfo) => info.type === 'asset' && info.data.type === 'image'}
          onDrop={(info: DragAndDropInfo) => {
            replaceImage(info.data.id as number)
          }}
          variant="outline"
          shape={droppableShape}
        >
          {children}
        </Droppable>
      </InlineUpload>
    )
  }, [props.config?.disableInlineUpload, props.config?.uploadPath, props.disabled, handleFileSystemUpload, replaceImage, imageValue?.id])

  return renderDroppableContent(
    !isNil(imageValue?.id)
      ? (
        <DocumentHotspotImagePreview
          assetId={ imageValue.id }
          containerWidth={ containerWidth }
          disabled={ props.disabled }
          disableInlineUpload={ props.config?.disableInlineUpload }
          emptyValue={ emptyValue }
          focalPointContextMenuItem={ props.config?.focal_point_context_menu_item }
          handleLocateInTree={ handleLocateInTree }
          handleSearch={ handleSearch }
          handleUpload={ handleUpload }
          height={ height }
          imgAttributes={ props.config?.imgAttributes }
          key={ imageValue.id }
          lastImageDimensions={ lastImageDimensionsRef.current }
          onChange={ handleHotspotImageChange }
          onImageResize={ handleImageResize }
          setCropModalOpen={ handleOpenCropModal }
          setMarkerModalOpen={ handleOpenHotspotMarkersModal }
          value={ convertToHotspotImageValue() }
          width={ width }
        />
        )
      : (
        <AssetTarget
          dndIcon
          height={ lastImageDimensionsRef.current?.height ?? height ?? DEFAULT_HEIGHT }
          onSearch={ handleSearch }
          onUpload={ props.config?.disableInlineUpload === true ? undefined : handleUpload }
          title={ props.config?.title ?? t('image.dnd-target') }
          width={ lastImageDimensionsRef.current?.width ?? width ?? '100%' }
        />
        )
  )
}
