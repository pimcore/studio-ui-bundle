/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form, type formInstanceType } from '@Pimcore/components/form/form'
import { Input } from '@sdk/components'
import { type InputRef } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { WidgetTypeSelect } from '../widget-type-select/widget-type-select'

export interface WidgetForm {
  name: string
  widgetType: string
}

interface CreateWidgetFormProps {
  form: formInstanceType<WidgetForm>
  inputRef?: React.RefObject<InputRef>
  initialValues?: Partial<WidgetForm>
  onPressEnter?: () => void
}

enum WidgetTypes {
  ElementTree = 'element_tree'
}

export const CreateWidgetForm = ({ form, initialValues, inputRef, onPressEnter }: CreateWidgetFormProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Form
      form={ form }
      initialValues={ {
        widgetType: WidgetTypes.ElementTree,
        ...initialValues
      } }
      layout="vertical"
    >
      <Form.Item
        label={ t('widget-editor.create-form.name') }
        name="name"
        rules={ [
          { required: true, message: t('widget-editor.create-form.name.required') }
        ] }
      >
        <Input
          onPressEnter={ onPressEnter }
          ref={ inputRef }
        />
      </Form.Item>

      <Form.Item
        label={ t('widget-editor.create-form.widgetType') }
        name="widgetType"
      >
        <WidgetTypeSelect />
      </Form.Item>
    </Form>
  )
}
