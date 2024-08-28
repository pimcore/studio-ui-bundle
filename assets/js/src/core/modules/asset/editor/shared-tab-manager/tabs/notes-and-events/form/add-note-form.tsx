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
import { Form, type FormProps, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'
import {
  useNoteElementGetTypeCollectionQuery
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice.gen'
import {ElementType} from "types/element-type.d";

export interface AddNoteFormValues {
  type: string
  title: string
  description: string
}

export interface AddNoteFormProps extends FormProps {
  elementType: ElementType
}

export const AddNoteForm = ({ elementType, ...props }: AddNoteFormProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { isLoading, data: noteTypesResponse } = useNoteElementGetTypeCollectionQuery({
    elementType
  })

  if (isLoading) {
    return <div>Loading ...</div>
  }

  const noteTypeOptions = noteTypesResponse?.items?.map((noteType) => ({ value: noteType.id, label: t('notes-and-events.' + noteType.id) }))

  return (
    <Form
      layout="vertical"
      { ...props }
    >
      <Form.Item
        label={ t('type') }
        name="type"
      >
        <Select
          options={ noteTypeOptions }
          placeholder={ t('select') }
        />
      </Form.Item>
      <Form.Item
        label={ t('title') }
        name="title"
        rules={ [{ required: true, message: t('form.validation.required') }] }
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={ t('description') }
        name="description"
      >
        <TextArea
          autoSize={ { minRows: 3 } }
        />
      </Form.Item>
    </Form>
  )
}
