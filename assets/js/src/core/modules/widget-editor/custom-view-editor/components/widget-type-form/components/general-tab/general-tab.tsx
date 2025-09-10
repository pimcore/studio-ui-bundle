import { Form } from "@Pimcore/components/form/form"
import { FormKit } from "@Pimcore/components/form/form-kit"
import { Input } from '@Pimcore/components/input/input'
import React from 'react'
import { useTranslation } from "react-i18next"

export const GeneralTab = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel
      collapsible
      collapsed={false}
      title={t('widget-editor.widget-form.general.title')}
    >
      <Form.Item
        label={t('widget-editor.widget-form.general.name')}
        name="name"
      >
        <Input />
      </Form.Item>
    </FormKit.Panel>
  )
}