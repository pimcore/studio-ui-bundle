/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type StackListItemProps } from '@Pimcore/components/stack-list/stack-list-item'
import { type ElementTreeWidget, type WidgetConfig } from '@sdk/api/perspectives'
import React, { createContext, useMemo, useState } from 'react'

export interface ExtendedWidgetConfig {
  expanded: string | null
  widgets: ElementTreeWidget[]
}

interface WidgetConfiguratorProviderProps {
  children?: React.ReactNode
  value?: ExtendedWidgetConfig
  formChange?: (values: ExtendedWidgetConfig) => void
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
      widgets: widgets as ElementTreeWidget[],
      expanded
    })
  }

  const onAdd = (widget: WidgetConfig): void => {
    if (widgetConfigs.findIndex((w) => w.id === widget.id) !== -1) {
      return
    }

    const newWidgets = [...widgetConfigs, widget]

    setWidgetConfigs(newWidgets)
    triggerFormUpdate(newWidgets, expandedWidget)
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
    }).filter((widget): widget is WidgetConfig => widget !== undefined)

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
    <WidgetConfiguratorContext.Provider value={ contextValue }>
      {children}
    </WidgetConfiguratorContext.Provider>
  )
}
