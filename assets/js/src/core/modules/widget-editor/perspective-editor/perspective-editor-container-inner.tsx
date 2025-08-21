import { ConfigLayout } from "@Pimcore/components/predefined-layouts/config/config-layout"
import { PerspectiveConfig } from "@sdk/api/perspectives"
import { ContentLayout, Icon, TreeDataItem } from "@sdk/components"
import React, { useEffect } from "react"
import { TreeContainer } from "./components/tree/tree-container"
import { WidgetDetailContainer } from "./components/widget-detail/widget-detail-container"
import { usePerspectiveEditorContext } from "./context/hooks/use-perspective-editor-context"
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