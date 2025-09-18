import { Flex } from "@Pimcore/components/flex/flex"
import { WidgetConfigurationCard } from "./components/widget-configuraton-card/widget-configuration-card"
import React from "react"
import { useTranslation } from "react-i18next"
import { Form } from "@Pimcore/components/form/form"

export const WidgetConfigurator = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Flex gap={10}>
      <Form.Item
        name="widgetsLeft"
        style={{ flexGrow: 1 }}
      >
        <WidgetConfigurationCard
          label={t('perspective-editor.system-widgets.left')}
        />
      </Form.Item>

      <Form.Item
        name="widgetsBottom"
        style={{ flexGrow: 1 }}
      >
        <WidgetConfigurationCard
          label={t('perspective-editor.system-widgets.bottom')}
          allowExpandControl={false}
        />
      </Form.Item>

      <Form.Item
        name="widgetsRight"
        style={{ flexGrow: 1 }}
      >
        <WidgetConfigurationCard
          label={t('perspective-editor.system-widgets.right')}
        />
      </Form.Item>
    </Flex>
  )
}