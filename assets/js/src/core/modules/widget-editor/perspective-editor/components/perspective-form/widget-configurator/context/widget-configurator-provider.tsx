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
  onAdd: (widget: any) => void
}

export const WidgetConfiguratorContext = createContext<WidgetConfiguratorContextProps | undefined>(undefined)

export const WidgetConfiguratorProvider = ({ children, formChange, value }: WidgetConfiguratorProviderProps): React.JSX.Element => {
  const [widgetConfigs, setWidgetConfigs] = useState<WidgetConfig[]>(value)

  const onAdd = (widget: any): void => {
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


  const contextValue: WidgetConfiguratorContextProps = useMemo(() => ({
    widgetConfigs,
    onAdd,
    onRemove
  }), [widgetConfigs])

  return (
    <WidgetConfiguratorContext.Provider value={contextValue}>
      {children}
    </WidgetConfiguratorContext.Provider>
  )
}