/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Content } from '@Pimcore/components/content/content'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Form } from '@Pimcore/components/form/form'
import { Button } from '@Pimcore/components/button/button'
import { Portal } from '@Pimcore/components/portal/portal'
import type { MediaQuery, BackendMediasFormat } from '../../types/media-query.types'
import { MediaQueriesPanel } from '../media-queries-panel/media-queries-panel'
import { convertToBackendFormat, convertFromBackendFormat, DEFAULT_MEDIA_QUERY_ID, createDefaultMediaQuery } from '../../utils/media-query-helpers'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { useThumbnailImageGetByNameQuery, useThumbnailImageUpdateMutation } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { isNil, isNull, isEqual, isEmpty, has } from 'lodash'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
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
  const [currentThumbnailId, setCurrentThumbnailId] = useState<string | null>(null)

  const [initialFormData, setInitialFormData] = useState<ThumbnailFormData | null>(null)
  const [currentFormData, setCurrentFormData] = useState<ThumbnailFormData | null>(null)
  const [mediaQueries, setMediaQueries] = useState<MediaQuery[]>([])

  const { data: configData, isLoading } = useThumbnailImageGetByNameQuery(
    { name: selectedThumbnail?.name ?? '' },
    { skip: selectedThumbnail?.name == null }
  )

  const [updateThumbnail, { isLoading: isSaving, error: updateError }] = useThumbnailImageUpdateMutation()

  useEffect(() => {
    if (!isNil(updateError)) {
      trackError(new ApiError(updateError))
    }
  }, [updateError])

  const isDirty = useMemo(() => {
    if (isNull(initialFormData) || isNull(currentFormData)) return false
    return !isEqual(initialFormData, currentFormData)
  }, [initialFormData, currentFormData])

  useEffect(() => {
    if (selectedThumbnail?.id !== currentThumbnailId && !isEmpty(configData?.settings) && selectedThumbnail !== null) {
      setCurrentThumbnailId((selectedThumbnail?.id === '' ? null : selectedThumbnail?.id) ?? null)

      const formData: ThumbnailFormData = {
        name: (configData.settings.name === '' ? '' : configData.settings.name) ?? '',
        description: configData.settings.description ?? '',
        format: (['', 'source'].includes((configData.settings.format ?? '').toLowerCase()) ? 'auto' : configData.settings.format) ?? 'auto',
        group: configData.settings.group ?? '',
        quality: (configData.settings.quality === 0 ? 85 : configData.settings.quality) ?? 85,
        highResolution: configData.settings.highResolution ?? null,
        preserveColor: configData.settings.preserveColor ?? false,
        forceProcessICCProfiles: configData.settings.forceProcessICCProfiles ?? false,
        preserveMetaData: configData.settings.preserveMetaData ?? false,
        rasterizeSVG: configData.settings.rasterizeSVG ?? false,
        useCropBox: configData.settings.useCropBox ?? false,
        downloadable: configData.settings.downloadable ?? false,
        preserveAnimation: configData.settings.preserveAnimation ?? false,
        mediaQueries: (() => {
          const fromBackend = convertFromBackendFormat((configData.medias ?? {}) as BackendMediasFormat, {})
          const hasDefault = fromBackend.some(mq => mq.id === DEFAULT_MEDIA_QUERY_ID)
          return hasDefault ? fromBackend : [createDefaultMediaQuery(), ...fromBackend]
        })()
      }

      setInitialFormData({ ...formData })
      setCurrentFormData({ ...formData })
      setMediaQueries(formData.mediaQueries)

      form.setFieldsValue(formData)
    }
  }, [selectedThumbnail?.id, currentThumbnailId, configData?.settings, form])

  useEffect(() => {
    onChange?.(isDirty)
  }, [isDirty, onChange])

  const onValuesChange = useCallback((changedValues: Partial<ThumbnailFormData>, allValues: ThumbnailFormData): void => {
    setCurrentFormData(prev => prev === null ? null : { ...prev, ...allValues })
  }, [])

  const handleMediaQueriesChange = useCallback((updatedMediaQueries: MediaQuery[]): void => {
    setMediaQueries(updatedMediaQueries)
    setCurrentFormData(prev =>
      prev === null ? null : { ...prev, mediaQueries: updatedMediaQueries }
    )
  }, [])

  const handleSave = useCallback((): void => {
    if (isEmpty(selectedThumbnail) || currentFormData === null) return

    form.validateFields().then(async (values: ThumbnailFormData) => {
      const updatedSettings = {
        name: values.name,
        description: values.description,
        format: values.format,
        group: (values.group === '' ? '' : values.group) ?? '',
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

      const result = await updateThumbnail({
        name: selectedThumbnail.name,
        updateThumbnailConfig: {
          settings: updatedSettings,
          medias,
          mediaOrder
        }
      })

      if (has(result, 'error')) {
        return
      }

      setInitialFormData({ ...currentFormData })

      void messageApi.success(t('save-success'))
    }).catch(() => {
      trackError(new GeneralError('Validation failed'))
    })
  }, [selectedThumbnail, currentFormData, updateThumbnail, form, messageApi, t])

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
        <BasicFormFields isNameDisabled />
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
