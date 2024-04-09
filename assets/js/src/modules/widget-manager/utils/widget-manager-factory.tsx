import React, { type ReactNode } from 'react'
import { type TabNode } from 'flexlayout-react'
import { getWidget } from './widget-registry'
import { WidgetContainer } from '@Pimcore/modules/widget-manager/widget/widget-container'
import { WidgetManagerInnerContainer } from '../widget-manager-inner-container'

export const widgetManagerFactory = (node: TabNode): ReactNode | undefined => {
  if (node.getComponent() === 'inner-widget-manager') {
    return <WidgetManagerInnerContainer />
  }

  const widgetName = node.getComponent()

  if (widgetName === undefined) {
    return undefined
  }

  const widget = getWidget(widgetName)

  if (widget === undefined) {
    throw new Error(`Widget ${widgetName} not found`)
  }

  const { component } = widget

  return (
    <WidgetContainer
      component={ component }
      node={ node }
    />
  )
}
