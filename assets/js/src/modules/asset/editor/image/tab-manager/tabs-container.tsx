import React from 'react'
import { EditorTabs as EditorTabsView } from '@Pimcore/components/editor-tabs/editor-tabs'
import { useTranslation } from 'react-i18next'
import { imageTabManager } from '..'

export const TabsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()

  const tabs = imageTabManager.getTabs()
  const preparedTabs = tabs.map((tab, index) => {
    return {
      ...tabs[index],
      label: t(tab.label)
    }
  })

  return (
    <EditorTabsView
      defaultActiveKey={ '1' }
      items={ preparedTabs }
      showLabelIfActive
    />
  )
}
