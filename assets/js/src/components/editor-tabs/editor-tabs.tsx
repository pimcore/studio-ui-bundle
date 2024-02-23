import React from 'react'
import { useStyle } from '@Pimcore/components/editor-tabs/editor-tabs.styles'
import { Tabs, type TabsProps } from 'antd'

interface EditorTabsProps {
  items: TabsProps['items']
  defaultActiveKey?: string
  showLabelIfActive?: boolean
}

export const EditorTabs = ({ defaultActiveKey, showLabelIfActive, items }: EditorTabsProps): React.JSX.Element => {
  const { styles } = useStyle()

  return (
    <Tabs
      className={`${styles.editorTabs} ${(showLabelIfActive === true) ? styles.onlyActiveLabel : ''}`}
      defaultActiveKey={defaultActiveKey}
      items={items}
    />
  )
}
