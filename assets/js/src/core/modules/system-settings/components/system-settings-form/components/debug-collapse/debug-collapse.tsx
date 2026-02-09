import { CollapseItem } from "@Pimcore/components/collapse/collapse"
import { Form } from "@Pimcore/components/form/form"
import { Input } from "@Pimcore/components/input/input"
import { Switch } from "@sdk/components"
import React from "react"
import { useTranslation } from "react-i18next"

export const DebugCollapse = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <CollapseItem
      label={t('system-settings.collapse.debug')}
      forceRender
    >
      <Form.Item
        label={t('system-settings.form.debug.field.enable-debug')}
        name={['general', 'debug_admin_translations']}
      >
        <Switch />
      </Form.Item>

      <Form.Item
        label={t('system-settings.form.debug.field.email-addresses')}
      //name={['general', 'debug_admin_translations']}
      >
        <Input disabled />
      </Form.Item>
    </CollapseItem>
  )
}