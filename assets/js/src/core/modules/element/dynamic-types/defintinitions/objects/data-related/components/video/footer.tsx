/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { type ReactElement, useEffect, useState } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import {
  type VideoType,
  type VideoValue
} from './video'
import { useTranslation } from 'react-i18next'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { Form } from '@Pimcore/components/form/form'
import FormItem from 'antd/es/form/FormItem'
import { Space } from '@Pimcore/components/space/space'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { Input } from '@Pimcore/components/input/input'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Select } from '@Pimcore/components/select/select'
import { ManyToOneRelation } from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/many-to-one-relation/many-to-one-relation'
import { WindowModal } from '@Pimcore/components/modal/window-modal/window-modal'
import { parseVideoIdFromUrl } from '@Pimcore/utils/video-url-parser'
import { isEmpty } from 'lodash'

interface VideoFooterProps {
  emptyValue?: () => void
  disabled?: boolean
  value?: VideoValue | null
  onSave?: (value: VideoValue) => void
  allowedVideoTypes?: VideoType[]
}

export const VideoFooter = (props: VideoFooterProps): React.JSX.Element => {
  const { t } = useTranslation()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const firstType = props.allowedVideoTypes?.[0] ?? 'asset'
  const [type, setType] = useState<VideoType>(props.value?.type ?? firstType)
  const [form] = Form.useForm()

  useEffect(() => {
    fillFormWithPropValue()
  }, [props.value])

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

  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const handleOk = (): void => {
    const sanitizedValue = sanitizeVideoIds(form.getFieldsValue() as VideoValue)
    props.onSave?.(sanitizedValue)
    setIsModalVisible(false)
  }

  const handleCancel = (): void => {
    setIsModalVisible(false)
  }

  const handleAfterOpenChange = (open: boolean): void => {
    if (!open) {
      fillFormWithPropValue()
    }
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

  const buttons: ReactElement[] = []

  if (props.disabled !== true) {
    buttons.push((
      <Tooltip
        key="empty"
        title={ t('empty') }
      >
        <IconButton
          disabled={ isEmpty(props.value) || props.disabled }
          icon={ { value: 'trash' } }
          onClick={ props.emptyValue }
        />
      </Tooltip>
    ))

    buttons.push((
      <Tooltip
        key="edit"
        title={ t('edit') }
      >
        <IconButton
          icon={ { value: 'edit' } }
          onClick={ showModal }
        />
      </Tooltip>
    ))
  }

  if (props.disabled === true) {
    buttons.push((
      <Tooltip
        key="details"
        title={ t('details') }
      >
        <IconButton
          icon={ { value: 'info-circle' } }
          onClick={ showModal }
        />
      </Tooltip>
    ))
  }

  return (
    <>
      <ButtonGroup
        items={ buttons }
        noSpacing
      />
      <WindowModal
        afterOpenChange={ handleAfterOpenChange }
        footer={ props.disabled === true ? <span></span> : undefined }
        okText={ t('save') }
        onCancel={ handleCancel }
        onOk={ handleOk }
        open={ isModalVisible }
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
            <FormItem
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
            </FormItem>

            <FormItem
              label={ t(type === 'asset' ? 'video.path' : 'video.id') }
              name="data"
            >
              { type === 'asset'
                ? (
                  <ManyToOneRelation
                    allowedAssetTypes={ ['video'] }
                    assetsAllowed
                    disabled={ props.disabled }
                    onOpenElement={ () => { setIsModalVisible(false) } }
                  />
                  )
                : (
                  <Input placeholder={ t('video.url') } />
                  )}
            </FormItem>
            { type === 'asset' && (
            <>
              <FormItem
                label={ t('video.poster') }
                name="poster"
              >
                <ManyToOneRelation
                  allowedAssetTypes={ ['image'] }
                  assetsAllowed
                  disabled={ props.disabled }
                  onOpenElement={ () => { setIsModalVisible(false) } }
                />
              </FormItem>
              <FormItem
                label={ t('title') }
                name="title"
              >
                <Input disabled={ props.disabled } />
              </FormItem>
              <FormItem
                label={ t('description') }
                name="description"
              >
                <TextArea
                  autoSize={ { minRows: 3 } }
                  disabled={ props.disabled }
                />
              </FormItem>
            </>
            ) }
          </Space>
        </Form>
      </WindowModal>
    </>
  )
}
