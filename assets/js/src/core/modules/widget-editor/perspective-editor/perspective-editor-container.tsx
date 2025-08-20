import { ConfigLayout } from "@Pimcore/components/predefined-layouts/config/config-layout"
import React from "react"
import { TreeContainer } from "./components/tree/tree-container"
import { WidgetDetailContainer } from "./components/widget-detail/widget-detail-container"
import { ContentLayout } from "@sdk/components"

export const PerspectiveEditorContainer = (): React.JSX.Element => {
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
        treeData={[]}
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
      <ConfigLayout
        leftItem={sidebar}
        rightItem={main}
      />
    </ContentLayout>
  )
}