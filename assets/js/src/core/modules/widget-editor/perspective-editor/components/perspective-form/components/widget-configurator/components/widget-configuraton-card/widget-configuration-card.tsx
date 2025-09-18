import { Card } from "@Pimcore/components/card/card"
import { Flex } from "@sdk/components"
import React from "react"
import { ExtendedWidgetConfig, WidgetConfiguratorProvider } from "../../context/widget-configurator-provider"
import { AddWidgetDropdown } from "../add-widget-dropdown/add-widget-dropdown"
import { StackedWidgetList } from "../stacked-widget-list/stacked-widget-list"

interface WidgetConfigurationCardProps {
  label: string
  allowExpandControl?: boolean
  value?: ExtendedWidgetConfig
  onChange?: (value: any) => void
}

export const WidgetConfigurationCard = ({ label, value, onChange, allowExpandControl = true }: WidgetConfigurationCardProps): React.JSX.Element => {
  return (
    <WidgetConfiguratorProvider
      formChange={onChange}
      value={value}
    >
      <Card
        title={
          <Flex gap={8} align="center">
            <span>{label}</span>
            <AddWidgetDropdown />
          </Flex>
        }
        className="w-full"
      >
        <StackedWidgetList
          allowExpandControl={allowExpandControl}
        />
      </Card>
    </WidgetConfiguratorProvider>
  )
}