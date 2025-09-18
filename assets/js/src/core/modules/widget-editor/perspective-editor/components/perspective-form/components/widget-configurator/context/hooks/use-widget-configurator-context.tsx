import { useContext } from "react"
import { WidgetConfiguratorContext, WidgetConfiguratorContextProps } from "../widget-configurator-provider"

export const useWidgetConfiguratorContext = (): WidgetConfiguratorContextProps => {
  const context = useContext(WidgetConfiguratorContext)

  if (context === undefined) {
    throw new Error('useWidgetConfiguratorContext must be used within a WidgetConfiguratorProvider')
  }

  return context
}