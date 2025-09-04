/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Form } from '@Pimcore/components/form/form'
import { Input, Select } from '@sdk/components'
import { type FormInstance, type InputRef } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

enum WidgetTypes {
  ElementTree = 'element_tree'
}

export interface WidgetForm {
  name: string
  widgetType: WidgetTypes
}

interface CreateWidgetFormProps {
  form: FormInstance<WidgetForm>
  inputRef?: React.RefObject<InputRef>
  initialValues?: Partial<WidgetForm>
}

export const CreateWidgetForm = ({ form, initialValues, inputRef }: CreateWidgetFormProps): React.JSX.Element => {
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
        <Input ref={ inputRef } />
      </Form.Item>

      <Form.Item
        label={ t('widget-editor.create-form.widgetType') }
        name="widgetType"
      >
        <Select
          options={ [
            {
              label: t(`widget-editor.create-form.widgetType.${WidgetTypes.ElementTree}`),
              value: WidgetTypes.ElementTree
            }
          ] }
        />
      </Form.Item>
    </Form>
  )
}
