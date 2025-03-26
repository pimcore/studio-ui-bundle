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
import { Form, type FormProps, Input } from 'antd'
import { TextArea } from '@Pimcore/components/textarea/textarea'
import {
  useNoteElementGetTypeCollectionQuery
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/notes-and-events/notes-and-events-api-slice-enhanced'
import { Content } from '@Pimcore/components/content/content'
import { Select } from '@Pimcore/components/select/select'
import { type ElementType } from '../../../../../../../types/enums/element/element-type'

export interface AddNoteFormProps extends FormProps {
  elementType: ElementType
}

export const AddNoteForm = ({ elementType, ...props }: AddNoteFormProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { isLoading, data: noteTypesResponse } = useNoteElementGetTypeCollectionQuery({
    elementType
  })

  if (isLoading) {
    return <Content loading />
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
        <TextArea autoSize={ { minRows: 3 } } />
      </Form.Item>
    </Form>
  )
}
