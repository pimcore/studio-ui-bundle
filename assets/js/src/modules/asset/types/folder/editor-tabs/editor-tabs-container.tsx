import React from 'react'
import { folderEditorTabManager } from '..'
import { EditorTabs as EditorTabsView } from '@Pimcore/components/editor-tabs/editor-tabs'

const tabs = folderEditorTabManager.getTabs()

const EditorTabsContainer = (): React.JSX.Element => {
  return <EditorTabsView defaultActiveKey='list' items={tabs} showLabelIfActive />
}

export { EditorTabsContainer }
