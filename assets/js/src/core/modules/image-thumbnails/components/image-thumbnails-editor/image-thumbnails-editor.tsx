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
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { Button } from '@Pimcore/components/button/button'
import { Portal } from '@Pimcore/components/portal/portal'
import { InputNumber } from '@Pimcore/components/input-number/input-number'
import { Switch } from '@Pimcore/components/switch/switch'
import { Panel } from '@Pimcore/components/panel/panel'
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { useThumbnailImageGetByNameQuery, useThumbnailImageUpdateMutation } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { isNil, isNull, isEqual } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useImageThumbnailsContext } from '../../providers/image-thumbnails-provider'
import { extractGroupsFromTree } from '../../utils/tree-helpers'
import { useMessage } from '@Pimcore/components/message/useMessage'

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
  // Advanced settings
  quality: number
  highResolution: number | null
  // Boolean configuration settings
  preserveColor: boolean
  forceProcessICCProfiles: boolean
  preserveMetaData: boolean
  rasterizeSVG: boolean
  useCropBox: boolean
  downloadable: boolean
  preserveAnimation: boolean
}

const formatOptions = [
  { 
    value: 'auto', 
    label: 'Auto (Web-optimized - recommended)'
  },
  { 
    value: 'original', 
    label: 'ORIGINAL' 
  },
  { 
    value: 'png', 
    label: 'PNG' 
  },
  { 
    value: 'gif', 
    label: 'GIF' 
  },
  { 
    value: 'jpeg', 
    label: 'JPEG' 
  },
  { 
    value: 'webp', 
    label: 'WebP' 
  },
  { 
    value: 'avif', 
    label: 'AVIF' 
  },
  { 
    value: 'tiff', 
    label: 'TIFF' 
  }
]

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
  
  const { data: configData, isLoading, error } = useThumbnailImageGetByNameQuery(
    { name: selectedThumbnail?.name ?? '' },
    { skip: !selectedThumbnail?.name }
  )

  const [updateThumbnail, { isLoading: isSaving, error: updateError }] = useThumbnailImageUpdateMutation()

  const groupOptions = useMemo(() => {
    if (!thumbnailsData?.items) return []
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
    if (selectedThumbnail?.id !== currentThumbnailId && configData?.settings && selectedThumbnail) {
      setCurrentThumbnailId(selectedThumbnail?.id || null)
      
      const formData: ThumbnailFormData = {
        name: configData.settings.name || '',
        description: configData.settings.description || '',
        format: configData.settings.format || 'auto',
        group: configData.settings.group || '',
        // Advanced settings with sensible defaults
        quality: configData.settings.quality || 85,
        highResolution: configData.settings.highResolution || null,
        // Boolean configuration settings with defaults from backend or false
        preserveColor: configData.settings.preserveColor || false,
        forceProcessICCProfiles: configData.settings.forceProcessICCProfiles || false,
        preserveMetaData: configData.settings.preserveMetaData || false,
        rasterizeSVG: configData.settings.rasterizeSVG || false,
        useCropBox: configData.settings.useCropBox || false,
        downloadable: configData.settings.downloadable || false,
        preserveAnimation: configData.settings.preserveAnimation || false
      }
      
      setInitialFormData({ ...formData })
      setCurrentFormData({ ...formData })
      
      form.setFieldsValue(formData)
      
      modificationDateRef.current = configData.settings.modificationDate || Date.now()
    }
  }, [selectedThumbnail?.id, currentThumbnailId, configData?.settings, form])

  useEffect(() => {
    onChange?.(isDirty)
  }, [isDirty, onChange])

  const onValuesChange = useCallback((changedValues: Partial<ThumbnailFormData>, allValues: ThumbnailFormData): void => {
    setCurrentFormData(prev => !isNull(prev) ? { ...prev, ...allValues } : null)
  }, [])

  const handleSave = useCallback((): void => {
    if (!selectedThumbnail?.name || !currentFormData) return

    form.validateFields().then(async (values: ThumbnailFormData) => {
      try {
        const updatedSettings = {
          name: values.name,
          description: values.description,
          format: values.format,
          group: values.group || '',
          // Include advanced settings
          quality: values.quality,
          highResolution: values.highResolution,
          // Include all boolean configuration settings
          preserveColor: values.preserveColor || false,
          forceProcessICCProfiles: values.forceProcessICCProfiles || false,
          preserveMetaData: values.preserveMetaData || false,
          rasterizeSVG: values.rasterizeSVG || false,
          useCropBox: values.useCropBox || false,
          downloadable: values.downloadable || false,
          preserveAnimation: values.preserveAnimation || false
        }

        const { data: response } = await updateThumbnail({
          name: selectedThumbnail.name,
          updateThumbnailConfig: {
            settings: updatedSettings,
            medias: configData?.medias || {},
            mediaOrder: {}
          }
        })

        if (!isNil(response?.settings?.modificationDate)) {
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
    if (!isActive || !selectedThumbnail) {
      return null
    }

    return (
      <Portal targetId={SAVE_BUTTON_PORTAL_ID}>
        <Button
          disabled={!isDirty}
          loading={isSaving}
          onClick={handleSave}
          type="primary"
        >
          {t('save')}
        </Button>
      </Portal>
    )
  }

  if (!selectedThumbnail) {
    return (
      <Content padded>
        <div style={{ textAlign: 'center', color: '#999', marginTop: '50px' }}>
          {t('image-thumbnails.editor.select-thumbnail')}
        </div>
      </Content>
    )
  }

  return (
    <Content
      loading={isLoading}
      padded
      padding={{ top: 'small', right: 'small', bottom: 'small', left: 'small' }}
    >
      {!isNull(currentFormData) && (
      <FormKit
        formProps={{
          form,
          onValuesChange
        }}
        key={selectedThumbnail?.id}
      >
        <FormKit.Panel
          contentPadding="extra-small"
        >
          <Form.Item
            label={t('image-thumbnails.editor.name')}
            name="name"
            rules={[{ required: true, message: t('image-thumbnails.editor.name-required') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t('image-thumbnails.editor.description')}
            name="description"
          >
            <TextArea
              rows={4}
              placeholder={t('image-thumbnails.editor.description-placeholder')}
            />
          </Form.Item>

          <Form.Item
            label={t('image-thumbnails.editor.group')}
            name="group"
          >
            <Select
              allowClear
              options={groupOptions}
              placeholder={t('image-thumbnails.editor.group-placeholder')}
            />
          </Form.Item>

          <Form.Item
            label={t('image-thumbnails.editor.format')}
            name="format"
            rules={[{ required: true, message: t('image-thumbnails.editor.format-required') }]}
          >
            <Select
              options={formatOptions}
              placeholder={t('image-thumbnails.editor.format-placeholder')}
            />
          </Form.Item>
        </FormKit.Panel>

        {/* Advanced Settings Panel */}
        <Panel
          title={t('image-thumbnails.editor.advanced')}
          collapsible={true}
          collapsed={true}
          border={true}
          theme="card-with-highlight"
          contentPadding="extra-small"
        >
          <Form.Item
            label={t('image-thumbnails.editor.quality')}
            name="quality"
            tooltip={t('image-thumbnails.editor.quality.tooltip')}
          >
            <InputNumber
              min={1}
              max={100}
              placeholder="85"
            />
          </Form.Item>

          <Form.Item
            label={t('image-thumbnails.editor.high-resolution')}
            name="highResolution"
            tooltip={t('image-thumbnails.editor.high-resolution.tooltip')}
          >
            <InputNumber
              min={1}
              max={10}
              step={0.1}
              placeholder="2.0"
            />
          </Form.Item>

          <Form.Item name="preserveColor" valuePropName="checked">
            <Switch
              labelRight={t('image-thumbnails.editor.preserve-color')}
              tooltip={t('image-thumbnails.editor.preserve-color.tooltip')}
            />
          </Form.Item>

          <Form.Item name="forceProcessICCProfiles" valuePropName="checked">
            <Switch
              labelRight={t('image-thumbnails.editor.force-process-icc')}
              tooltip={t('image-thumbnails.editor.force-process-icc.tooltip')}
            />
          </Form.Item>

          <Form.Item name="preserveMetaData" valuePropName="checked">
            <Switch
              labelRight={t('image-thumbnails.editor.preserve-metadata')}
              tooltip={t('image-thumbnails.editor.preserve-metadata.tooltip')}
            />
          </Form.Item>

          <Form.Item name="rasterizeSVG" valuePropName="checked">
            <Switch
              labelRight={t('image-thumbnails.editor.rasterize-svg')}
              tooltip={t('image-thumbnails.editor.rasterize-svg.tooltip')}
            />
          </Form.Item>

          <Form.Item name="useCropBox" valuePropName="checked">
            <Switch
              labelRight={t('image-thumbnails.editor.use-cropbox')}
              tooltip={t('image-thumbnails.editor.use-cropbox.tooltip')}
            />
          </Form.Item>

          <Form.Item name="downloadable" valuePropName="checked">
            <Switch
              labelRight={t('image-thumbnails.editor.downloadable')}
              tooltip={t('image-thumbnails.editor.downloadable.tooltip')}
            />
          </Form.Item>

          <Form.Item name="preserveAnimation" valuePropName="checked">
            <Switch
              labelRight={t('image-thumbnails.editor.preserve-animation')}
              tooltip={t('image-thumbnails.editor.preserve-animation.tooltip')}
            />
          </Form.Item>
        </Panel>
      </FormKit>
      )}
      {renderSaveButton()}
    </Content>
  )
}