import { Flex } from "@Pimcore/components/flex/flex"
import { WidgetConfigurationCard } from "./components/widget-configuraton-card/widget-configuration-card"
import React from "react"
import { useTranslation } from "react-i18next"

export const WidgetConfigurator = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Flex gap={10}>
      <WidgetConfigurationCard
        label={t('perspective-editor.system-widgets.left')}
      />

      <WidgetConfigurationCard
        label={t('perspective-editor.system-widgets.bottom')}
      />

      <WidgetConfigurationCard
        label={t('perspective-editor.system-widgets.right')}
      />
    </Flex>
  )
}