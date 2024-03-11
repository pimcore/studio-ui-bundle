import React from 'react'
import { EditorTabs as EditorTabsView } from '@Pimcore/components/editor-tabs/editor-tabs'
import { assetEditorTabManager } from '@Pimcore/modules/asset/editor-tabs'
import { useTranslation } from 'react-i18next'

export const EditorTabsContainer = (): React.JSX.Element => {
  const { t } = useTranslation()

  const tabs = assetEditorTabManager.getTabs()
  const preparedTabs = tabs.map((tab, index) => {
    return {
      ...tabs[index],
      title: t(tab.label)
    }
  })

  return (
    <EditorTabsView
      defaultActiveKey={'1'}
      items={preparedTabs}
      showLabelIfActive={true}
    />
  )
}
