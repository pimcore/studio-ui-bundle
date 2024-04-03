import React, { createContext, type ComponentType, useState, useMemo } from 'react'
import { BorderNode, type TabNode } from 'flexlayout-react'
import { WidgetView } from '@Pimcore/modules/widget-manager/widget/widget-view'

interface WidgetContainerProps {
  node: TabNode
  component: ComponentType
}

interface IWidgetContext {
  nodeId: string | null
}

export const WidgetContext = createContext<IWidgetContext>({ nodeId: null })

const WidgetContainer = (props: WidgetContainerProps): React.JSX.Element => {
  const { node, component: Component } = props
  const [nodeId] = useState(node.getId())
  const isBorderNode = node.getParent() instanceof BorderNode

  return useMemo(() => (
    <WidgetContext.Provider value={ { nodeId } }>
      <WidgetView
        icon={ node.getIcon() ?? 'widget-default' }
        showTitle={ isBorderNode }
        title={ node.getName() }
      >
        <Component { ...node.getConfig() } />
      </WidgetView>
    </WidgetContext.Provider>
  ), [nodeId, isBorderNode])
}

export { WidgetContainer }
