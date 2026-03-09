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
import { VideoMediaQueriesPanel } from '../media-queries-panel/media-queries-panel'
import { convertToBackendFormat, convertFromBackendFormat, generateMediaQueryId } from '../../utils/media-query-helpers'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { useThumbnailVideoGetByNameQuery, useThumbnailVideoUpdateMutation } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { isNil, isNull, isEqual, isEmpty } from 'lodash'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { BasicFormFields } from './basic-form-fields'

interface VideoThumbnailsEditorProps {
  selectedThumbnail: ThumbnailConfigurationData | null
  isActive?: boolean
  onChange?: (isDirty: boolean) => void
}

interface VideoThumbnailFormData {
  name: string
  description: string
  group: string
  videoBitrate: number | null
  audioBitrate: number | null
  presetting?: string
  mediaSegments: MediaQuery[]
}

const PRESETTING_BITRATES: Record<string, { videoBitrate: number, audioBitrate: number }> = {
  average: { videoBitrate: 400, audioBitrate: 128 },
  good: { videoBitrate: 600, audioBitrate: 128 },
  best: { videoBitrate: 800, audioBitrate: 196 }
}

const SAVE_BUTTON_PORTAL_ID = 'video-thumbnails-save-button'

export const VideoThumbnailsEditor = ({ selectedThumbnail, isActive = true, onChange }: VideoThumbnailsEditorProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const messageApi = useMessage()
  const modificationDateRef = useRef<number | null>(null)
  const [currentThumbnailId, setCurrentThumbnailId] = useState<string | null>(null)

  const [initialFormData, setInitialFormData] = useState<VideoThumbnailFormData | null>(null)
  const [currentFormData, setCurrentFormData] = useState<VideoThumbnailFormData | null>(null)
  const [mediaSegments, setMediaSegments] = useState<MediaQuery[]>([])

  const { data: configData, isLoading } = useThumbnailVideoGetByNameQuery(
    { name: selectedThumbnail?.name ?? '' },
    { skip: selectedThumbnail?.name == null }
  )

  const [updateThumbnail, { isLoading: isSaving, error: updateError }] = useThumbnailVideoUpdateMutation()

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

      const backedMedias = (configData.medias ?? {}) as BackendMediasFormat
      const loaded = convertFromBackendFormat(backedMedias, {})
      const segments: MediaQuery[] = loaded.length > 0
        ? loaded
        : [{
            id: generateMediaQueryId(),
            query: 'Default',
            displayName: t('video-thumbnails.editor.media-segments.default'),
            transformations: [],
            order: 0
          }]

      const formData: VideoThumbnailFormData = {
        name: configData.settings.name ?? '',
        description: configData.settings.description ?? '',
        group: configData.settings.group ?? '',
        videoBitrate: configData.settings.videoBitrate ?? null,
        audioBitrate: configData.settings.audioBitrate ?? null,
        mediaSegments: segments
      }

      setInitialFormData({ ...formData })
      setCurrentFormData({ ...formData })
      setMediaSegments(segments)

      form.setFieldsValue(formData)

      modificationDateRef.current = configData.settings.modificationDate ?? Date.now()
    }
  }, [selectedThumbnail?.id, currentThumbnailId, configData?.settings, form])

  useEffect(() => {
    onChange?.(isDirty)
  }, [isDirty, onChange])

  const onValuesChange = useCallback((changedValues: Partial<VideoThumbnailFormData>, allValues: VideoThumbnailFormData): void => {
    setCurrentFormData(prev => prev === null
      ? null
      : {
          ...prev,
          ...allValues,
          mediaSegments: prev.mediaSegments
        })
  }, [])

  const handleMediaSegmentsChange = useCallback((updatedSegments: MediaQuery[]): void => {
    setMediaSegments(updatedSegments)
    setCurrentFormData(prev => prev === null ? null : { ...prev, mediaSegments: updatedSegments })
  }, [])

  const handlePresettingChange = useCallback((preset: string): void => {
    const bitrates = PRESETTING_BITRATES[preset]
    if (bitrates != null) {
      form.setFieldsValue({
        videoBitrate: bitrates.videoBitrate,
        audioBitrate: bitrates.audioBitrate
      })
      setCurrentFormData(prev => prev === null
        ? null
        : {
            ...prev,
            videoBitrate: bitrates.videoBitrate,
            audioBitrate: bitrates.audioBitrate
          })
    }
  }, [form])

  const handleSave = useCallback((): void => {
    if (isNil(selectedThumbnail) || currentFormData === null) return

    form.validateFields().then(async (values: VideoThumbnailFormData) => {
      const updatedSettings = {
        name: values.name,
        description: values.description,
        group: (values.group === '' ? '' : values.group) ?? '',
        videoBitrate: values.videoBitrate,
        audioBitrate: values.audioBitrate
      }

      const { medias, mediaOrder } = convertToBackendFormat([], currentFormData.mediaSegments ?? [])

      const result = await updateThumbnail({
        name: selectedThumbnail.name,
        updateThumbnailConfig: {
          settings: updatedSettings,
          medias,
          mediaOrder
        }
      })

      if ('error' in result) {
        return
      }

      if (result.data?.settings?.modificationDate != null) {
        modificationDateRef.current = result.data.settings.modificationDate
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
          {t('video-thumbnails.editor.select-thumbnail')}
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
          <BasicFormFields
            onPresettingChange={ handlePresettingChange }
          />
          <VideoMediaQueriesPanel
            mediaQueries={ mediaSegments }
            onChange={ handleMediaSegmentsChange }
          />
        </FormKit>
      )}
      {renderSaveButton()}
    </Content>
  )
}
