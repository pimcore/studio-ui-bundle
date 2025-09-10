import React from 'react'
import { FormKit } from "@Pimcore/components/form/form-kit"
import { useTranslation } from 'react-i18next'
import { Form } from '@Pimcore/components/form/form'
import { TextArea } from '@Pimcore/components/textarea/textarea'

export const FilterPanel = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <FormKit.Panel
      title={t('widget-editor.widget-form.filters.title')}
      collapsible
      collapsed={false}
    >
      <Form.Item
        name="pql"
        label={t('widget-editor.widget-form.filters.pql')}
      >
        <TextArea />
      </Form.Item>
    </FormKit.Panel>
  )
}