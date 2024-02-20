import React, { type ComponentType } from 'react'
import { BorderNode, type TabNode } from 'flexlayout-react'
import { Widget as WidgetView } from '@Pimcore/modules/widget/components/widget'

interface WidgetProps {
  node: TabNode
  component: ComponentType
}

const Widget = (props: WidgetProps): React.JSX.Element => {
  const { node, component: Component } = props
  const isBorderNode = node.getParent() instanceof BorderNode

  return (
    <WidgetView icon={node.getIcon() ?? 'widget-default'} title={node.getName()} showTitle={isBorderNode}>
      <Component {...node.getConfig()} />
    </WidgetView>
  )
}

export { Widget }
