import { ContentLayout, IconButton, Tabs, Toolbar } from "@sdk/components"
import React from "react"
import { usePerspectiveEditorContext } from "../../context/hooks/use-perspective-editor-context"
import { PerspectiveDetailTab } from "./tabs/perspective-detail-tab/perspective-detail-tab"

export const WidgetDetailContainer = (): React.JSX.Element => {
  const { perspectives, activeTabId, setActiveTabId } = usePerspectiveEditorContext()

  return (
    <ContentLayout
      renderToolbar={(
        <Toolbar justify="space-between">
          <IconButton
            icon={{ value: 'refresh' }}
            title="Refresh"
          />
        </Toolbar>
      )}
    >
      <Tabs
        activeKey={activeTabId}
        items={perspectives.map((perspective) => ({
          key: perspective.id,
          label: perspective.name,
          children: <PerspectiveDetailTab id={perspective.id} />
        }))}
        onChange={(key) => {
          setActiveTabId(key)
        }}
      />
    </ContentLayout>
  )
}