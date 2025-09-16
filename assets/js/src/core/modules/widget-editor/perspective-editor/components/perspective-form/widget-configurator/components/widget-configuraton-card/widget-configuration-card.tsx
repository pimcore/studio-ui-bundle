import { ButtonGroup } from "@Pimcore/components/button-group/button-group"
import { Card } from "@Pimcore/components/card/card"
import { StackListItemProps } from "@Pimcore/components/stack-list/stack-list-item"
import { Flex, IconButton, StackList } from "@sdk/components"
import React, { useEffect } from "react"
import { AddWidgetDropdown } from "../../../../add-widget-dropdown/add-widget-dropdown"
import { WidgetConfigurationCardItem } from "../widget-configuration-card-item/widget-configuration-card-item"

interface WidgetConfigurationCardProps {
  label: string
}

export const WidgetConfigurationCard = ({ label }: WidgetConfigurationCardProps): React.JSX.Element => {
  const [items, setItems] = React.useState<StackListItemProps[]>([])

  const RightToolbar = (): React.JSX.Element => {
    return (
      <ButtonGroup
        noSpacing
        items={[
          <IconButton theme="secondary" icon={{ value: 'eye' }} />,
          <IconButton theme="secondary" icon={{ value: 'trash' }} />
        ]}
      />
    )
  }

  useEffect(() => {
    setItems([
      {
        id: 1,
        sortable: true,
        renderRightToolbar: <RightToolbar />,
        children: <WidgetConfigurationCardItem />,
      },
      {
        id: 2,
        sortable: true,
        renderRightToolbar: <RightToolbar />,
        children: <WidgetConfigurationCardItem />,
      }
    ])
  }, [])

  return (
    <Card
      title={
        <Flex gap={8} align="center">
          <span>{label}</span>
          <AddWidgetDropdown />
        </Flex>
      }
      extra={
        <IconButton
          icon={{ value: 'eye' }}
          type="default"
        />
      }
      className="w-full"
    >
      <StackList
        items={items}
        sortable={true}
      />
    </Card>
  )
}