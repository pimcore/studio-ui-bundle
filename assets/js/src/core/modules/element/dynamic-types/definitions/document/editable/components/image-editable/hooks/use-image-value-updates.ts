/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import { isNil } from 'lodash'
import { type ImageEditableValue } from '../image-editable'
import { type CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { type Hotspot, type Marker } from '../../../../../objects/data-related/helpers/hotspot-image/types/hotspot-types'

interface UseImageValueUpdatesProps {
  value?: ImageEditableValue
  onChange?: (value: ImageEditableValue) => void
}

interface UseImageValueUpdatesReturn {
  handleCropChange: (crop: CropSettings | null) => void
  handleHotspotsChange: (hotspots: Hotspot[], marker: Marker[]) => void
  handleReplaceImage: (assetId: number) => void
  handleEmptyValue: () => void
}

export const useImageValueUpdates = ({ value: imageValue, onChange }: UseImageValueUpdatesProps): UseImageValueUpdatesReturn => {
  const createNewValue = useCallback((updates: Partial<ImageEditableValue>): ImageEditableValue => ({
    id: imageValue?.id,
    alt: imageValue?.alt ?? '',
    title: imageValue?.title ?? '',
    hotspots: imageValue?.hotspots ?? [],
    marker: imageValue?.marker ?? [],
    crop: imageValue?.crop ?? {},
    ...updates
  }), [imageValue])

  const handleCropChange = useCallback((crop: CropSettings | null) => {
    if (!isNil(imageValue?.id)) {
      onChange?.(createNewValue({ crop: crop ?? {} }))
    }
  }, [imageValue?.id, createNewValue, onChange])

  const handleHotspotsChange = useCallback((hotspots: Hotspot[], marker: Marker[]) => {
    if (!isNil(imageValue?.id)) {
      onChange?.(createNewValue({ hotspots, marker }))
    }
  }, [imageValue?.id, createNewValue, onChange])

  const handleReplaceImage = useCallback((assetId: number) => {
    onChange?.(createNewValue({ id: assetId }))
  }, [createNewValue, onChange])

  const handleEmptyValue = useCallback(() => {
    onChange?.({
      id: undefined,
      alt: '',
      title: '',
      hotspots: [],
      marker: [],
      crop: {}
    })
  }, [onChange])

  return {
    handleCropChange,
    handleHotspotsChange,
    handleReplaceImage,
    handleEmptyValue
  }
}
