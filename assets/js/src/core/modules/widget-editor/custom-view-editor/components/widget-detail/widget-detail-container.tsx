import { Content, ContentLayout, IconButton, Tabs, Toolbar } from "@sdk/components"
import React from "react"
import { useWidgetEditorContext } from "../../context/hooks/use-widget-editor-context"
import { useTranslation } from "react-i18next"
import { WidgetDetailTab } from "./tabs/widget-detail-tab/widget-detail-tab"

export const WidgetDetailContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { widgets, activeTabId, setActiveTabId } = useWidgetEditorContext()

  console.log('widgets', widgets)

  return (
    <ContentLayout
      renderToolbar={(
        <Toolbar justify="space-between">
          <IconButton
            icon={{ value: 'refresh' }}
            title={t('refresh')}
          />
        </Toolbar>
      )}
    >
      <Tabs
        activeKey={activeTabId}
        items={widgets.map((widget) => ({
          key: widget.id,
          label: widget.name,
          children: <WidgetDetailTab widget={widget} />
        }))}
        onChange={(key) => {
          setActiveTabId(key)
        }}
      />
    </ContentLayout>
  )
}