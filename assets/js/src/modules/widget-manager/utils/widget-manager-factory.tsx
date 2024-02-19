import React, { type ReactNode } from 'react'
import { type TabNode } from 'flexlayout-react'
import { getWidget } from './widget-registry'
import { Widget } from '@Pimcore/modules/widget/containers/widget'

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

  return <Widget node={node} component={component} />
}
