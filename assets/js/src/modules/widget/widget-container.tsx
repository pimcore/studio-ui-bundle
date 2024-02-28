import React, { type ComponentType } from 'react'
import { BorderNode, type TabNode } from 'flexlayout-react'
import { WidgetView } from '@Pimcore/modules/widget/widget-view'

interface WidgetContainerProps {
  node: TabNode
  component: ComponentType
}

const WidgetContainer = (props: WidgetContainerProps): React.JSX.Element => {
  const { node, component: Component } = props
  const isBorderNode = node.getParent() instanceof BorderNode

  return (
    <WidgetView icon={node.getIcon() ?? 'widget-default'} title={node.getName()} showTitle={isBorderNode}>
      <Component {...node.getConfig()} />
    </WidgetView>
  )
}

export { WidgetContainer }
