import { StackListItemProps } from "@Pimcore/components/stack-list/stack-list-item"
import { WidgetConfig } from "@sdk/api/perspectives"
import React, { createContext, useMemo, useState } from "react"

export interface ExpandedWidgetConfig {
  expanded: string | null
  widgets: WidgetConfig[]
}

interface WidgetConfiguratorProviderProps {
  children?: React.ReactNode
  value?: ExpandedWidgetConfig
  formChange?: (values: ExpandedWidgetConfig) => void
}

export interface WidgetConfiguratorContextProps {
  widgetConfigs: WidgetConfig[]
  expandedWidget: string | null
  onRemove: (widgetId: string) => void
  onAdd: (widget: WidgetConfig) => void
  onReorder: (newOrder: StackListItemProps[]) => void
  setExpanded: (widgetId: string) => void
}

export const WidgetConfiguratorContext = createContext<WidgetConfiguratorContextProps | undefined>(undefined)

export const WidgetConfiguratorProvider = ({ children, formChange, value }: WidgetConfiguratorProviderProps): React.JSX.Element => {
  const [widgetConfigs, setWidgetConfigs] = useState<WidgetConfig[]>(value?.widgets ?? [])
  const [expandedWidget, setExpandedWidget] = useState<string | null>(value?.expanded ?? null)

  const triggerFormUpdate = (widgets: WidgetConfig[], expanded: string | null): void => {
    formChange?.({
      widgets,
      expanded
    })
  }

  const onAdd = (widget: WidgetConfig): void => {
    setWidgetConfigs((prevConfigs) => [...prevConfigs, widget])


    triggerFormUpdate(widgetConfigs, expandedWidget)
    //formChange?.([...widgetConfigs, widget])

    //TODO: trigger formChange -> add new widget to existing ones

    // This should be implemented to add the widget to the form
    // Similar to how field-filters-container adds filters
  }

  const onRemove = (widgetId: string): void => {
    const newWidgets = widgetConfigs.filter(widget => widget.id !== widgetId)
    const expandedWidgetId = expandedWidget === widgetId ? null : expandedWidget

    setWidgetConfigs(newWidgets)
    setExpandedWidget(expandedWidgetId)
    triggerFormUpdate(newWidgets, expandedWidgetId)
  }

  const onReorder = (newOrder: StackListItemProps[]): void => {
    const newWidgetOrder = newOrder.map(item => {
      return widgetConfigs.find(widget => widget.id === item.id)
    }).filter((widget): widget is WidgetConfig => !!widget)

    setWidgetConfigs(newWidgetOrder)
    triggerFormUpdate(newWidgetOrder, expandedWidget)
  }

  const setExpanded = (widgetId: string): void => {
    const expandedWidgetId = expandedWidget === widgetId ? null : widgetId

    setExpandedWidget(expandedWidgetId)
    triggerFormUpdate(widgetConfigs, expandedWidgetId)
  }

  const contextValue: WidgetConfiguratorContextProps = useMemo(() => ({
    widgetConfigs,
    expandedWidget,
    onAdd,
    onRemove,
    onReorder,
    setExpanded
  }), [widgetConfigs, expandedWidget])

  return (
    <WidgetConfiguratorContext.Provider value={contextValue}>
      {children}
    </WidgetConfiguratorContext.Provider>
  )
}