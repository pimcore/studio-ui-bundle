import { BorderNode, type TabNode } from 'flexlayout-react'
import React, { useState } from 'react'
import { WidgetBorderTitle } from '../components/widget-border-title'
import { WidgetTabTitle as WidgetTabTitleView } from '../components/widget-tab-title'

interface WidgetTabTitleProps {
  node: TabNode
}

export const WidgetTabTitle = ({ node }: WidgetTabTitleProps): React.JSX.Element => {
  const [isBorderNode] = useState(node.getParent() instanceof BorderNode)
  const [icon] = useState(node.getIcon() ?? 'widget-default')

  if (isBorderNode) {
    return <WidgetBorderTitle icon={icon} title={node.getName()} />
  }

  return (
    <WidgetTabTitleView icon={icon} title={node.getName()} />
  )
}
