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
import { Form, type FormProps } from '@Pimcore/components/form/form'
import { Select } from '@Pimcore/components/select/select'

export interface XLSXFormValues {
  header: 'name' | 'title' | 'no_header'
}

export interface CreateXLSXFormProps extends FormProps {}

export const CreateXLSXForm = ({ ...props }: CreateXLSXFormProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Form
      layout='vertical'
      { ...props }
    >
      <Form.Item
        label={ t('export-xlsx-form.form-field.header') }
        name={ 'header' }
        rules={ [{ required: true, message: t('form.validation.required') }] }
      >
        <Select
          options={
            [
              { value: 'name', label: t('export-xlsx-form.form-field.header.option.name') },
              { value: 'title', label: t('export-xlsx-form.form-field.header.option.title') },
              { value: 'no_header', label: t('export-xlsx-form.form-field.header.option.no-header') }
            ]
          }
        />
      </Form.Item>
    </Form>
  )
}
