import React from 'react'
import { EditorTabsContainer } from './editor-tabs/editor-tabs-container'
import { TabsToolbarView } from '@Pimcore/modules/element-editor/layouts/tabs-toolbar-view'

const FolderContainer = (): React.JSX.Element => {
  return (
    <TabsToolbarView
      renderTabbar={
        <EditorTabsContainer />
      }

      renderToolbar={
        <div>Toolbar</div>
      }
    />
  )
}

export { FolderContainer }
