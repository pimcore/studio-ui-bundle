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

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'antd'
import { Form, type FormProps } from '@Pimcore/components/form/form'
import { Select } from '@Pimcore/components/select/select'

export interface CSVFormValues {
  delimiter: string
  header: 'name' | 'title' | 'no_header'
}

export interface CreateCSVFormProps extends FormProps {}

export const CreateCSVForm = ({ ...props }: CreateCSVFormProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Form
      layout='vertical'
      { ...props }
    >
      <Form.Item
        label={ t('export-csv-form.form-field.delimiter') }
        name={ 'delimiter' }
        rules={ [{ required: true, message: t('form.validation.required') }] }
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={ t('export-csv-form.form-field.header') }
        name={ 'header' }
        rules={ [{ required: true, message: t('form.validation.required') }] }
      >
        <Select
          options={
            [
              { value: 'name', label: t('export-csv-form.form-field.header.option.name') },
              { value: 'title', label: t('export-csv-form.form-field.header.option.title') },
              { value: 'no_header', label: t('export-csv-form.form-field.header.option.no-header') }
            ]
          }
        />
      </Form.Item>
    </Form>
  )
}
