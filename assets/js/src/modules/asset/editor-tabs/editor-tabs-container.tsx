import React from 'react'
import { EditorTabs as EditorTabsView } from '@Pimcore/components/editor-tabs/editor-tabs'
import { assetEditorTabManager } from '@Pimcore/modules/asset/editor-tabs'

export const EditorTabsContainer = (): React.JSX.Element => {
  const tabs = assetEditorTabManager.getTabs()

  return (
    <EditorTabsView
      defaultActiveKey={'1'}
      items={tabs}
      showLabelIfActive={true}
    />
  )
}
