import React from 'react'
import { EditorTabs as EditorTabsView } from '@Pimcore/components/editor-tabs/editor-tabs'
import { useTranslation } from 'react-i18next'
import { container } from '@Pimcore/app/depency-injection'
import { type FolderTabManager } from './folder-tab-manager'
import { serviceIds } from '@Pimcore/app/config/services'

const TabsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const folderEditorTabManager = container.get<FolderTabManager>(serviceIds['Asset/Editor/FolderTabManager'])

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

export { TabsContainer }
