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

import React, { useEffect, useState } from 'react'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import {
  type VideoType,
  type VideoValue
} from './video'
import _ from 'lodash'
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
  const [value, setValue] = useState<VideoValue>(props.value ?? { type: firstType, data: null })
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      type: value.type,
      data: value.data
    })
    if (value.type === 'asset') {
      form.setFieldsValue({
        title: value.title,
        description: value.description,
        poster: value.poster
      })
    }
  }, [value])

  useEffect(() => {
    setValue(props.value ?? { type: firstType, data: null })
  }, [props.value])

  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const handleOk = (): void => {
    const sanitizedValue = sanitizeVideoIds(value)
    setValue(sanitizedValue)
    props.onSave?.(sanitizedValue)
    setIsModalVisible(false)
  }

  const handleCancel = (): void => {
    setIsModalVisible(false)
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

  const handleValuesChange = (changedValues: any, allValues: VideoValue): void => {
    setValue(allValues)
  }

  const getVideoTypeOptions = (): Array<{ value: VideoType, label: string }> => {
    const allowedVideoTypes = props.allowedVideoTypes ?? ['asset', 'youtube', 'vimeo', 'dailymotion']
    return allowedVideoTypes.map(type => {
      return {
        value: type,
        label: t(`video.type.${type}`)
      }
    })
  }

  return (
    <>
      <ButtonGroup
        items={ [
          <Tooltip
            key="empty"
            title={ t('empty') }
          >
            <IconButton
              disabled={ _.isEmpty(props.value) || props.disabled }
              icon={ { value: 'trash' } }
              onClick={ props.emptyValue }
            />
          </Tooltip>,
          <Tooltip
            key="edit"
            title={ t('edit') }
          >
            <IconButton
              icon={ { value: 'edit' } }
              onClick={ showModal }
            />
          </Tooltip>
        ] }
        noSpacing
      />
      <WindowModal
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
          onValuesChange={ handleValuesChange }
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
                onChange={ newType => { setValue({ type: newType, data: null }) } }
                options={ getVideoTypeOptions() }
              />
            </FormItem>

            <FormItem
              label={ t(value.type === 'asset' ? 'video.path' : 'video.id') }
              name="data"
            >
              { value.type === 'asset'
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
            { value.type === 'asset' && (
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
