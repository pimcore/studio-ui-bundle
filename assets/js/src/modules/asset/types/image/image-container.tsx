import { EditorTabsContainer } from '@Pimcore/modules/asset/editor-tabs/editor-tabs-container'
import { TabsToolbarView } from '@Pimcore/modules/element-editor/layouts/tabs-toolbar-view'
import React from 'react'

const ImageContainer = (): React.JSX.Element => {
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

export { ImageContainer }
