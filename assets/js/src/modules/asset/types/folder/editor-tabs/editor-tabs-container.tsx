import React from 'react'
import { folderEditorTabManager } from '..'
import { EditorTabs as EditorTabsView } from '@Pimcore/components/editor-tabs/editor-tabs'
import { useTranslation } from 'react-i18next'

const EditorTabsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()

  const tabs = folderEditorTabManager.getTabs()
  const preparedTabs = tabs.map((tab, index) => {
    return {
      ...tabs[index],
      label: t(tab.label)
    }
  })

  return (
    <EditorTabsView
      defaultActiveKey='preview'
      items={ preparedTabs }
      showLabelIfActive
    />
  )
}

export { EditorTabsContainer }
