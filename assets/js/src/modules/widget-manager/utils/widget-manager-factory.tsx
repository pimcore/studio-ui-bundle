import React, { type ReactNode } from 'react'
import { type TabNode } from 'flexlayout-react'
import { getWidget } from './widget-registry'

export const widgetManagerFactory = (node: TabNode): ReactNode | undefined => {
  const widgetName = node.getComponent()

  if (widgetName === undefined) {
    return undefined
  }

  const widget = getWidget(widgetName)

  if (widget === undefined) {
    throw new Error(`Widget ${widgetName} not found`)
  }

  const { component } = widget
  const Component = component

  return <Component />
}
