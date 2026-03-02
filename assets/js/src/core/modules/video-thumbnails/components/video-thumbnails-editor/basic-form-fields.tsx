/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { InputNumber } from '@Pimcore/components/input-number/input-number'

interface BasicFormFieldsProps {
  groupOptions: Array<{ value: string, label: string }>
  onPresettingChange: (preset: string) => void
}

const PRESETTING_OPTIONS = [
  { value: 'average', label: 'Average' },
  { value: 'good', label: 'Good' },
  { value: 'best', label: 'Best' }
]

export const BasicFormFields = ({ groupOptions, onPresettingChange }: BasicFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel
      contentPadding="extra-small"
    >
      <Form.Item
        label={ t('video-thumbnails.editor.name') }
        name="name"
        rules={ [{ required: true, message: t('video-thumbnails.editor.name-required') }] }
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label={ t('video-thumbnails.editor.description') }
        name="description"
      >
        <TextArea
          placeholder={ t('video-thumbnails.editor.description-placeholder') }
          rows={ 4 }
        />
      </Form.Item>

      <Form.Item
        label={ t('video-thumbnails.editor.group') }
        name="group"
      >
        <Select
          allowClear
          options={ groupOptions }
          placeholder={ t('video-thumbnails.editor.group-placeholder') }
        />
      </Form.Item>

      <Form.Item
        label={ t('video-thumbnails.editor.presetting') }
        name="presetting"
      >
        <Select
          allowClear
          onChange={ onPresettingChange }
          options={ PRESETTING_OPTIONS }
          placeholder={ t('video-thumbnails.editor.presetting-placeholder') }
        />
      </Form.Item>

      <Form.Item
        label={ t('video-thumbnails.editor.video-bitrate') }
        name="videoBitrate"
      >
        <InputNumber
          addonAfter="kbps"
          min={ 0 }
        />
      </Form.Item>

      <Form.Item
        label={ t('video-thumbnails.editor.audio-bitrate') }
        name="audioBitrate"
      >
        <InputNumber
          addonAfter="kbps"
          min={ 0 }
        />
      </Form.Item>
    </FormKit.Panel>
  )
}
