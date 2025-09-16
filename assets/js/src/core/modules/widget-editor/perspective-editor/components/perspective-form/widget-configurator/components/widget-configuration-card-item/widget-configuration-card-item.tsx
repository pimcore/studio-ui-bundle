import { Flex } from "@Pimcore/components/flex/flex"
import { Icon } from "@Pimcore/components/icon/icon"
import React from "react"

export const WidgetConfigurationCardItem = (): React.JSX.Element => {
  return (
    <Flex gap={8} align="center">
      <Icon value="data-object" />
      <span>Data Objects</span>
    </Flex>
  )
}