/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { type VideoType, type VideoValue } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/video/video'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { Space } from '@Pimcore/components/space/space'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { ManyToOneRelation } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { parseVideoIdFromUrl } from '@Pimcore/utils/video-url-parser'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Flex } from '@Pimcore/components/flex/flex'

export interface VideoModalProps {
  open: boolean
  onCancel: () => void
  onOk: (value: VideoValue) => void
  value?: VideoValue | null
  allowedVideoTypes?: VideoType[]
  disabled?: boolean
}

export const VideoModal = (props: VideoModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const firstType = props.allowedVideoTypes?.[0] ?? 'asset'
  const [type, setType] = useState<VideoType>(props.value?.type ?? firstType)
  const [form] = Form.useForm()
  const { confirm } = useFormModal()

  useEffect(() => {
    fillFormWithPropValue()
  }, [props.value, props.open])

  const fillForm = (value: VideoValue): void => {
    form.setFieldsValue({
      type: value.type,
      data: checkData(value.type, value.data) ? value.data : null
    })
    if (value.type === 'asset') {
      form.setFieldsValue({
        title: value.title,
        description: value.description,
        poster: value.poster
      })
    }
  }

  const checkData = (type: VideoType, data: any): boolean => {
    if (type === 'asset') {
      return data !== null
    }
    return typeof data === 'string'
  }

  const fillFormWithPropValue = (): void => {
    setType(props.value?.type ?? firstType)
    fillForm(props.value ?? { type: firstType, data: null })
  }

  const handleOk = (): void => {
    const sanitizedValue = sanitizeVideoIds(form.getFieldsValue() as VideoValue)
    props.onOk(sanitizedValue)
  }

  const handleAfterOpenChange = (open: boolean): void => {
    if (!open) {
      fillFormWithPropValue()
    }
  }

  const emptyValue = (): void => {
    const emptyVideoValue: VideoValue = { type: firstType, data: null }
    props.onOk(emptyVideoValue)
  }

  const sanitizeVideoIds = (videoValue: VideoValue): VideoValue => {
    let { type, data } = videoValue

    if (type === 'asset') {
      return videoValue
    }

    if (typeof data === 'string' && data !== '') {
      const videoId = parseVideoIdFromUrl(data, type)
      data = videoId ?? data
    }

    return {
      type,
      data: data as string
    }
  }

  const getVideoTypeOptions = (): Array<{ value: VideoType, label: string }> => {
    const allowedVideoTypes: VideoType[] = props.allowedVideoTypes === undefined || props.allowedVideoTypes.length === 0 ? ['asset', 'youtube', 'vimeo', 'dailymotion'] : props.allowedVideoTypes
    return allowedVideoTypes.map(type => {
      return {
        value: type,
        label: t(`video.type.${type}`)
      }
    })
  }

  return (
    <WindowModal
      afterOpenChange={ handleAfterOpenChange }
      footer={ props.disabled === true
        ? <span></span>
        : (_, { OkBtn, CancelBtn }) => (
          <Flex
            className="w-100"
            justify="flex-end"
          >
            <ButtonGroup items={ [
              <IconTextButton
                icon={ { value: 'trash' } }
                key="empty"
                onClick={ () => confirm({
                  title: t('empty'),
                  content: t('empty.confirm'),
                  onOk: emptyValue
                }) }
              >
                {t('empty')}
              </IconTextButton>,
              <CancelBtn key="cancel" />,
              <OkBtn key="ok" />
            ] }
            />
          </Flex>
          ) }
      okText={ t('save') }
      onCancel={ props.onCancel }
      onOk={ handleOk }
      open={ props.open }
      size="M"
      title={ t('video.settings') }
    >
      <Form
        form={ form }
        layout="vertical"
      >
        <Space
          className='w-full'
          direction='vertical'
          size='small'
        >
          <Form.Item
            label={ t('video.type') }
            name="type"
          >
            <Select
              disabled={ props.disabled }
              onChange={ newType => {
                setType(newType as VideoType)
                fillForm({ type: newType, data: null })
              } }
              options={ getVideoTypeOptions() }
            />
          </Form.Item>

          <Form.Item
            key={ 'data-' + type }
            label={ t(type === 'asset' ? 'video.path' : 'video.id') }
            name="data"
          >
            { type === 'asset'
              ? (
                <ManyToOneRelation
                  allowedAssetTypes={ ['video'] }
                  assetsAllowed
                  disabled={ props.disabled }
                  onOpenElement={ props.onCancel }
                />
                )
              : (
                <Input placeholder={ t('video.url') } />
                )}
          </Form.Item>
          { type === 'asset' && (
          <>
            <Form.Item
              label={ t('video.poster') }
              name="poster"
            >
              <ManyToOneRelation
                allowedAssetTypes={ ['image'] }
                assetsAllowed
                disabled={ props.disabled }
                onOpenElement={ props.onCancel }
              />
            </Form.Item>
            <Form.Item
              label={ t('title') }
              name="title"
            >
              <Input disabled={ props.disabled } />
            </Form.Item>
            <Form.Item
              label={ t('description') }
              name="description"
            >
              <TextArea
                autoSize={ { minRows: 3 } }
                disabled={ props.disabled }
              />
            </Form.Item>
          </>
          ) }
        </Space>
      </Form>
    </WindowModal>
  )
}
