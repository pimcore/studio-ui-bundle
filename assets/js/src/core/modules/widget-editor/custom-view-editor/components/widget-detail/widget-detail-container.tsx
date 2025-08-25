import { ContentLayout, IconButton, Toolbar } from "@sdk/components"
import { Tabs } from '@Pimcore/components/tabs/tabs'
import React from "react"
import { useTranslation } from "react-i18next"
import { useWidgetEditorContext } from "../../context/hooks/use-widget-editor-context"
import { WidgetDetailTab } from "./tabs/widget-detail-tab/widget-detail-tab"

export const WidgetDetailContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { widgets, activeTabId, setActiveTabId, closeWidget } = useWidgetEditorContext()

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
          closable: true,
          children: <WidgetDetailTab widget={widget} />
        }))}
        onChange={(key) => {
          setActiveTabId(key)
        }}
        onClose={(key) => {
          closeWidget(key)
        }}
      />
    </ContentLayout>
  )
}