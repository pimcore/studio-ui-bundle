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
import { formatOptions } from '../../constants/format-options'

interface BasicFormFieldsProps {
  isNameDisabled?: boolean
}

export const BasicFormFields = ({ isNameDisabled = false }: BasicFormFieldsProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel
      contentPadding="extra-small"
    >
      <Form.Item
        label={ t('image-thumbnails.editor.name') }
        name="name"
        rules={ [{ required: true, message: t('image-thumbnails.editor.name-required') }] }
      >
        <Input disabled={ isNameDisabled } />
      </Form.Item>

      <Form.Item
        label={ t('image-thumbnails.editor.description') }
        name="description"
      >
        <TextArea rows={ 4 } />
      </Form.Item>

      <Form.Item
        label={ t('image-thumbnails.editor.group') }
        name="group"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('image-thumbnails.editor.format') }
        name="format"
        rules={ [{ required: true, message: t('image-thumbnails.editor.format-required') }] }
      >
        <Select
          options={ formatOptions }
          placeholder={ t('image-thumbnails.editor.format-placeholder') }
        />
      </Form.Item>
    </FormKit.Panel>
  )
}
