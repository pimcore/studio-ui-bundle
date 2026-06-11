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
import { isNil, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@sdk/app'
import { api as assetApi, type Image } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useAlertModal } from '@Pimcore/components/modal/alert-modal/hooks/use-alert-modal'
import { type ImageEditableValue } from '../image-editable'
import { type CropSettings } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/hotspot-image/types/crop-types'
import { type Hotspot, type Marker } from '../../../../../objects/data-related/helpers/hotspot-image/types/hotspot-types'

interface UseImageValueUpdatesProps {
  value?: ImageEditableValue
  onChange?: (value: ImageEditableValue) => void
  minWidth?: number
  minHeight?: number
}

interface UseImageValueUpdatesReturn {
  handleCropChange: (crop: CropSettings | null) => void
  handleHotspotsChange: (hotspots: Hotspot[], marker: Marker[]) => void
  handleReplaceImage: (assetId: number) => void
  handleEmptyValue: () => void
  handleAltTextChange: (alt: string) => void
}

export const useImageValueUpdates = ({ value: imageValue, onChange, minWidth, minHeight }: UseImageValueUpdatesProps): UseImageValueUpdatesReturn => {
  const { t } = useTranslation()
  const { confirm } = useFormModal()
  const alertModal = useAlertModal()
  const dispatch = useAppDispatch()

  const createNewValue = useCallback((updates: Partial<ImageEditableValue>): ImageEditableValue => ({
    id: imageValue?.id,
    alt: imageValue?.alt ?? '',
    title: imageValue?.title ?? '',
    hotspots: imageValue?.hotspots ?? [],
    marker: imageValue?.marker ?? [],
    crop: imageValue?.crop ?? {},
    ...updates
  }), [
    imageValue?.id,
    imageValue?.alt,
    imageValue?.title,
    imageValue?.hotspots,
    imageValue?.marker,
    imageValue?.crop
  ])

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

  const handleEmptyValue = useCallback(() => {
    onChange?.({ id: undefined, alt: '', title: '', hotspots: [], marker: [], crop: {} })
  }, [onChange])

  const isImageTooSmall = useCallback(async (assetId: number): Promise<boolean> => {
    if (isNil(minWidth) && isNil(minHeight)) {
      return false
    }

    const { data } = await dispatch(assetApi.endpoints.assetGetById.initiate({ id: assetId }))
    const image = data as Image | undefined

    if (isNil(image?.width) || isNil(image?.height)) return false

    return (!isNil(minWidth) && image.width < minWidth) || (!isNil(minHeight) && image.height < minHeight)
  }, [minWidth, minHeight, dispatch])

  const handleReplaceImage = useCallback((assetId: number) => {
    void (async () => {
      if (await isImageTooSmall(assetId)) {
        handleEmptyValue()

        alertModal.error({ content: t('image.too-small') })

        return
      }

      const hasData = !isEmpty(imageValue?.hotspots) || !isEmpty(imageValue?.marker)

      if (hasData) {
        confirm({
          title: t('hotspots.clear-data'),
          content: t('hotspots.clear-data.dnd-message'),
          okText: t('yes'),
          cancelText: t('no'),
          onOk: () => {
            onChange?.({ id: assetId, alt: '', title: '', hotspots: [], marker: [], crop: {} })
          },
          onCancel: () => {
            onChange?.(createNewValue({ id: assetId, crop: {} }))
          }
        })
      } else {
        onChange?.({ id: assetId, alt: '', title: '', hotspots: [], marker: [], crop: {} })
      }
    })()
  }, [imageValue?.hotspots, imageValue?.marker, createNewValue, onChange, isImageTooSmall, handleEmptyValue, alertModal])

  const handleAltTextChange = useCallback((alt: string) => {
    if (!isNil(imageValue?.id)) {
      onChange?.(createNewValue({ alt }))
    }
  }, [imageValue?.id, createNewValue, onChange])

  return {
    handleCropChange,
    handleHotspotsChange,
    handleReplaceImage,
    handleEmptyValue,
    handleAltTextChange
  }
}
