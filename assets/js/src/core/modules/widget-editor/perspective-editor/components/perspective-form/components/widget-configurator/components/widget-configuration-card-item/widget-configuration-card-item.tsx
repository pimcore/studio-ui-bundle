import { Flex } from "@Pimcore/components/flex/flex"
import { Icon } from "@Pimcore/components/icon/icon"
import { WidgetConfig } from "@Pimcore/modules/perspectives/perspectives-slice.enhanced"
import { isNil } from "lodash"
import React from "react"

interface WidgetConfigurationCardItemProps {
  widget?: WidgetConfig
}

export const WidgetConfigurationCardItem = ({ widget }: WidgetConfigurationCardItemProps): React.JSX.Element => {
  if (isNil(widget)) {
    return <></>
  }

  return (
    <Flex gap={8} align="center">
      <Icon {...widget.icon} />
      <span>{widget.name}</span>
    </Flex>
  )
}