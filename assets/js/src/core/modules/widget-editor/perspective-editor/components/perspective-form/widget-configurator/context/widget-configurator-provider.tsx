import { StackListItemProps } from "@Pimcore/components/stack-list/stack-list-item"
import { WidgetConfig } from "@sdk/api/perspectives"
import React, { createContext, useMemo, useState } from "react"

interface WidgetConfiguratorProviderProps {
  children?: React.ReactNode
  value: WidgetConfig[]
  formChange?: (values: Array<any>) => void
}

export interface WidgetConfiguratorContextProps {
  widgetConfigs: WidgetConfig[]
  onRemove: (widgetId: string) => void
  onAdd: (widget: WidgetConfig) => void
  onReorder: (newOrder: StackListItemProps[]) => void
}

export const WidgetConfiguratorContext = createContext<WidgetConfiguratorContextProps | undefined>(undefined)

export const WidgetConfiguratorProvider = ({ children, formChange, value }: WidgetConfiguratorProviderProps): React.JSX.Element => {
  const [widgetConfigs, setWidgetConfigs] = useState<WidgetConfig[]>(value)

  const onAdd = (widget: WidgetConfig): void => {
    console.log('onAdd', widget)
    setWidgetConfigs((prevConfigs) => [...prevConfigs, widget])


    formChange?.([...widgetConfigs, widget])

    //TODO: trigger formChange -> add new widget to existing ones

    // This should be implemented to add the widget to the form
    // Similar to how field-filters-container adds filters
  }

  const onRemove = (widgetId: string): void => {
    console.log('onRemove', widgetId)
    setWidgetConfigs((prevConfigs) => prevConfigs.filter(widget => widget.id !== widgetId))

    formChange?.(widgetConfigs.filter(widget => widget.id !== widgetId))
  }

  const onReorder = (newOrder: StackListItemProps[]): void => {
    const newWidgetOrder = newOrder.map(item => {
      return widgetConfigs.find(widget => widget.id === item.id)
    }).filter((widget): widget is WidgetConfig => !!widget)

    setWidgetConfigs(newWidgetOrder)
    formChange?.(newWidgetOrder)
  }

  const contextValue: WidgetConfiguratorContextProps = useMemo(() => ({
    widgetConfigs,
    onAdd,
    onRemove,
    onReorder
  }), [widgetConfigs])

  return (
    <WidgetConfiguratorContext.Provider value={contextValue}>
      {children}
    </WidgetConfiguratorContext.Provider>
  )
}