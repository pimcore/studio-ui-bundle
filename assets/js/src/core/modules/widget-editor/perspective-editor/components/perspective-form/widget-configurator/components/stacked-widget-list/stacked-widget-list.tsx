import { ButtonGroup } from "@Pimcore/components/button-group/button-group"
import { IconButton } from "@Pimcore/components/icon-button/icon-button"
import { StackList } from "@Pimcore/components/stack-list/stack-list"
import { StackListItemProps } from "@Pimcore/components/stack-list/stack-list-item"
import React, { useEffect, useState } from "react"
import { WidgetConfigurationCardItem } from "../widget-configuration-card-item/widget-configuration-card-item"
import { useWidgetConfiguratorContext } from "../../context/hooks/use-widget-configurator-context"
import { WidgetConfig } from "@sdk/api/perspectives"

interface StackedWidgetListProps {
  values?: Array<any>  //TODO: remove
}

export const StackedWidgetList = ({ values = [] }: StackedWidgetListProps): React.JSX.Element => {
  const [parsedValues, setParsedValues] = useState<StackListItemProps[]>([])
  const { onReorder, widgetConfigs, onRemove } = useWidgetConfiguratorContext()

  const RightToolbar = ({ widget }: { widget: WidgetConfig }): React.JSX.Element => {
    return (
      <ButtonGroup
        noSpacing
        items={[
          <IconButton
            theme="secondary"
            icon={{ value: 'eye-off' }}
          />,

          <IconButton
            theme="secondary"
            icon={{ value: 'trash' }}
            onClick={() => onRemove(widget.id)}
          />
        ]}
      />
    )
  }

  useEffect(() => {
    setParsedValues(widgetConfigs.map((value, index) => {
      return {
        id: value.id,
        sortable: true,
        renderRightToolbar: <RightToolbar widget={value} />,
        children: <WidgetConfigurationCardItem
          widget={value}
        />,
      }
    }))
  }, [widgetConfigs])

  return (
    <StackList
      items={parsedValues}
      sortable={true}
      onItemsChange={onReorder}
    />
  )
}