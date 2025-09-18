import { Card } from "@Pimcore/components/card/card"
import { Flex, IconButton } from "@sdk/components"
import React from "react"
import { ExpandedWidgetConfig, WidgetConfiguratorProvider } from "../../context/widget-configurator-provider"
import { AddWidgetDropdown } from "../add-widget-dropdown/add-widget-dropdown"
import { StackedWidgetList } from "../stacked-widget-list/stacked-widget-list"

interface WidgetConfigurationCardProps {
  label: string
  value?: ExpandedWidgetConfig
  onChange?: (value: any) => void
}

export const WidgetConfigurationCard = ({ label, value, onChange }: WidgetConfigurationCardProps): React.JSX.Element => {
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
        <StackedWidgetList />
      </Card>
    </WidgetConfiguratorProvider>
  )
}

/*
TODO: 
  -> wrap stacked list in custom component to handle the format (value) (include onChange)
  -> create provider in WidgetConfigurationCard -> handle onChange on highest lvl
  -> implement provider into RightToolbar
*/