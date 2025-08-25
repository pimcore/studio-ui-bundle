import { ConfigLayout } from "@Pimcore/components/predefined-layouts/config/config-layout"
import { ContentLayout } from "@sdk/components"
import React from "react"
import { WidgetDetailContainer } from "./components/perspective-detail/perspective-detail-container"
import { TreeContainer } from "./components/tree/tree-container"
import { PerspectiveEditorProvider } from "./context/perspective-editor-provider"

export const PerspectiveEditorContainerInner = (): React.JSX.Element => {
  const [expandedKeys, setExpandedKeys] = React.useState<any[]>([0])

  const sidebar = {
    id: 'widget-editor.sidebar',
    minSize: 170,
    children: [
      <TreeContainer
        expandedKeys={expandedKeys}
        key="widget-editor--sidebar"
        onSetExpandedKeys={(keys) => {
          setExpandedKeys(keys)
        }}
      />
    ]
  }

  const main = {
    id: 'widget-editor--main',
    minSize: 600,
    children: [
      <WidgetDetailContainer />
    ]
  }

  return (
    <ContentLayout>
      <PerspectiveEditorProvider>
        <ConfigLayout
          leftItem={sidebar}
          rightItem={main}
        />
      </PerspectiveEditorProvider>
    </ContentLayout>
  )
}