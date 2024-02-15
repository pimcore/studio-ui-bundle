import React from 'react'
import { useStyle } from '@Pimcore/components/toolbar/toolbar.styles'
import { Tabs, type TabsProps } from 'antd'

interface ToolbarProps {
  items: TabsProps['items']
  defaultActiveKey?: string
  showLabelIfActive?: boolean
}

export const Toolbar = ({ defaultActiveKey, showLabelIfActive, items }: ToolbarProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <Tabs
      className={`${styles.toolbar} ${(showLabelIfActive === true) ? styles.onlyActiveLabel : ''}`}
      defaultActiveKey={defaultActiveKey}
      items={items}
    />
  )
}
