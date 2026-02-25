/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Content } from '@Pimcore/components/content/content'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Button } from '@Pimcore/components/button/button'
import { Portal } from '@Pimcore/components/portal/portal'
import type { MediaQuery, BackendMediasFormat } from '../../types/media-query.types'
import { MediaQueriesPanel } from '../media-queries-panel/media-queries-panel'
import { convertToBackendFormat, convertFromBackendFormat } from '../../utils/media-query-helpers'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { useThumbnailImageGetByNameQuery, useThumbnailImageUpdateMutation } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { isNil, isNull, isEqual } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useImageThumbnailsContext } from '../../providers/image-thumbnails-provider'
import { extractGroupsFromTree } from '../../utils/tree-helpers'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { BasicFormFields } from './basic-form-fields'
import { AdvancedSettingsPanel } from './advanced-settings-panel'

interface ImageThumbnailsEditorProps {
  selectedThumbnail: ThumbnailConfigurationData | null
  isActive?: boolean
  onChange?: (isDirty: boolean) => void
}

interface ThumbnailFormData {
  name: string
  description: string
  format: string
  group: string
  quality: number
  highResolution: number | null
  preserveColor: boolean
  forceProcessICCProfiles: boolean
  preserveMetaData: boolean
  rasterizeSVG: boolean
  useCropBox: boolean
  downloadable: boolean
  preserveAnimation: boolean
  mediaQueries: MediaQuery[]
}

const SAVE_BUTTON_PORTAL_ID = 'image-thumbnails-save-button'

export const ImageThumbnailsEditor = ({ selectedThumbnail, isActive = true, onChange }: ImageThumbnailsEditorProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const messageApi = useMessage()
  const modificationDateRef = useRef<number | null>(null)
  const [currentThumbnailId, setCurrentThumbnailId] = useState<string | null>(null)

  const { thumbnailsData } = useImageThumbnailsContext()

  const [initialFormData, setInitialFormData] = useState<ThumbnailFormData | null>(null)
  const [currentFormData, setCurrentFormData] = useState<ThumbnailFormData | null>(null)
  const [mediaQueries, setMediaQueries] = useState<MediaQuery[]>([])

  const { data: configData, isLoading } = useThumbnailImageGetByNameQuery(
    { name: selectedThumbnail?.name ?? '' },
    { skip: selectedThumbnail?.name == null }
  )

  const [updateThumbnail, { isLoading: isSaving, error: updateError }] = useThumbnailImageUpdateMutation()

  const groupOptions = useMemo(() => {
    if (thumbnailsData?.items == null) return []
    const groups = extractGroupsFromTree(thumbnailsData.items)
    return [{ value: '', label: t('image-thumbnails.editor.no-group') }, ...groups]
  }, [thumbnailsData, t])

  useEffect(() => {
    if (!isNil(updateError)) {
      trackError(new ApiError(updateError))
    }
  }, [updateError])

  const isDirty = React.useMemo(() => {
    if (isNull(initialFormData) || isNull(currentFormData)) return false
    return !isEqual(initialFormData, currentFormData)
  }, [initialFormData, currentFormData])

  useEffect(() => {
    if (selectedThumbnail?.id !== currentThumbnailId && configData?.settings != null && selectedThumbnail != null) {
      setCurrentThumbnailId((selectedThumbnail?.id !== '' ? selectedThumbnail?.id : null) ?? null)

      const formData: ThumbnailFormData = {
        name: (configData.settings.name !== '' ? configData.settings.name : '') ?? '',
        description: configData.settings.description ?? '',
        format: (configData.settings.format !== '' ? configData.settings.format : 'auto') ?? 'auto',
        group: configData.settings.group ?? '',
        quality: (configData.settings.quality !== 0 ? configData.settings.quality : 85) ?? 85,
        highResolution: configData.settings.highResolution ?? null,
        preserveColor: configData.settings.preserveColor ?? false,
        forceProcessICCProfiles: configData.settings.forceProcessICCProfiles ?? false,
        preserveMetaData: configData.settings.preserveMetaData ?? false,
        rasterizeSVG: configData.settings.rasterizeSVG ?? false,
        useCropBox: configData.settings.useCropBox ?? false,
        downloadable: configData.settings.downloadable ?? false,
        preserveAnimation: configData.settings.preserveAnimation ?? false,
        mediaQueries: convertFromBackendFormat((configData.medias ?? {}) as BackendMediasFormat, {})
      }

      setInitialFormData({ ...formData })
      setCurrentFormData({ ...formData })
      setMediaQueries(formData.mediaQueries)

      form.setFieldsValue(formData)

      modificationDateRef.current = configData.settings.modificationDate ?? Date.now()
    }
  }, [selectedThumbnail?.id, currentThumbnailId, configData?.settings, form])

  useEffect(() => {
    onChange?.(isDirty)
  }, [isDirty, onChange])

  const onValuesChange = useCallback((changedValues: Partial<ThumbnailFormData>, allValues: ThumbnailFormData): void => {
    setCurrentFormData(prev => !isNull(prev) ? { ...prev, ...allValues } : null)
  }, [])

  const handleMediaQueriesChange = useCallback((updatedMediaQueries: MediaQuery[]): void => {
    setMediaQueries(updatedMediaQueries)
    setCurrentFormData(prev =>
      !isNull(prev) ? { ...prev, mediaQueries: updatedMediaQueries } : null
    )
  }, [])

  const handleSave = useCallback((): void => {
    if (selectedThumbnail?.name == null || currentFormData == null) return

    form.validateFields().then(async (values: ThumbnailFormData) => {
      try {
        const updatedSettings = {
          name: values.name,
          description: values.description,
          format: values.format,
          group: (values.group !== '' ? values.group : '') ?? '',
          quality: values.quality,
          highResolution: values.highResolution,
          preserveColor: values.preserveColor ?? false,
          forceProcessICCProfiles: values.forceProcessICCProfiles ?? false,
          preserveMetaData: values.preserveMetaData ?? false,
          rasterizeSVG: values.rasterizeSVG ?? false,
          useCropBox: values.useCropBox ?? false,
          downloadable: values.downloadable ?? false,
          preserveAnimation: values.preserveAnimation ?? false
        }

        const { medias, mediaOrder } = convertToBackendFormat(currentFormData.mediaQueries ?? [])

        const { data: response } = await updateThumbnail({
          name: selectedThumbnail.name,
          updateThumbnailConfig: {
            settings: updatedSettings,
            medias,
            mediaOrder
          }
        })

        if (response?.settings?.modificationDate != null) {
          modificationDateRef.current = response.settings.modificationDate
        }

        setInitialFormData({ ...currentFormData })

        void messageApi.success(t('save-success'))
      } catch (error) {
        trackError(new ApiError(error))
      }
    }).catch((error) => {
      trackError(new ApiError(error))
    })
  }, [selectedThumbnail, configData, currentFormData, updateThumbnail, form, messageApi, t])

  const renderSaveButton = (): React.JSX.Element | null => {
    if (!isActive || selectedThumbnail == null) {
      return null
    }

    return (
      <Portal targetId={ SAVE_BUTTON_PORTAL_ID }>
        <Button
          disabled={ !isDirty }
          loading={ isSaving }
          onClick={ handleSave }
          type="primary"
        >
          {t('save')}
        </Button>
      </Portal>
    )
  }

  if (selectedThumbnail == null) {
    return (
      <Content padded>
        <div style={ { textAlign: 'center', color: '#999', marginTop: '50px' } }>
          {t('image-thumbnails.editor.select-thumbnail')}
        </div>
      </Content>
    )
  }

  return (
    <Content
      loading={ isLoading }
      padded
      padding={ { top: 'small', right: 'small', bottom: 'small', left: 'small' } }
    >
      {!isNull(currentFormData) && (
      <FormKit
        formProps={ {
          form,
          onValuesChange
        } }
        key={ selectedThumbnail?.id }
      >
        <BasicFormFields groupOptions={ groupOptions } />
        <AdvancedSettingsPanel />
        <MediaQueriesPanel
          mediaQueries={ mediaQueries }
          onChange={ handleMediaQueriesChange }
        />
      </FormKit>
      )}
      {renderSaveButton()}
    </Content>
  )
}
