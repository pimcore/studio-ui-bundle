import { ConfigLayout } from "@Pimcore/components/predefined-layouts/config/config-layout"
import { ContentLayout } from "@sdk/components"
import React from "react"
import { WidgetDetailContainer } from "./components/perspective-detail/perspective-detail-container"
import { TreeContainer } from "./components/tree/tree-container"

export const PerspectiveEditorContainerInner = (): React.JSX.Element => {
  const [expandedKeys, setExpandedKeys] = React.useState<any[]>([0])

  const sidebar = {
    id: 'widget-editor.perspective-editor.sidebar',
    minSize: 170,
    children: [
      <TreeContainer
        expandedKeys={expandedKeys}
        key="widget-editor.perspective-editor.sidebar"
        onSetExpandedKeys={(keys) => {
          setExpandedKeys(keys)
        }}
      />
    ]
  }

  const main = {
    id: 'widget-editor.perspective-editor.main',
    minSize: 600,
    children: [
      <WidgetDetailContainer />
    ]
  }

  return (
    <ContentLayout>
      <ConfigLayout
        leftItem={sidebar}
        rightItem={main}
      />
    </ContentLayout>
  )
}