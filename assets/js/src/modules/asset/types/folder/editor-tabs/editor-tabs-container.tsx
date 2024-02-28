import React from 'react'
import { folderEditorTabManager } from '..'
import { EditorTabs as EditorTabsView } from '@Pimcore/components/editor-tabs/editor-tabs'

const EditorTabsContainer = (): React.JSX.Element => {
  const tabs = folderEditorTabManager.getTabs()

  return <EditorTabsView key={1} items={tabs} />
}

export { EditorTabsContainer }
