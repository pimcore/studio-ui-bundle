import { BorderNode, type TabNode } from 'flexlayout-react'
import React, { useState } from 'react'
import { BorderTitleView } from './border-title-view'
import { TabTitleView } from './tab-title-view'

interface TabTitleContainerProps {
  node: TabNode
}

export const TabTitleContainer = ({ node }: TabTitleContainerProps): React.JSX.Element => {
  const [isBorderNode] = useState(node.getParent() instanceof BorderNode)
  const [icon] = useState(node.getIcon() ?? 'widget-default')

  if (isBorderNode) {
    return <BorderTitleView icon={icon} title={node.getName()} />
  }

  return (
    <TabTitleView icon={icon} title={node.getName()} />
  )
}
