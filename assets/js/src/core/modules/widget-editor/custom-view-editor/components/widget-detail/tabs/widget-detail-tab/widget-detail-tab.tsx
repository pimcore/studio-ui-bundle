import { useWidgetEditorContext } from "@Pimcore/modules/widget-editor/custom-view-editor/context/hooks/use-widget-editor-context"
import { WidgetConfig } from "@sdk/api/perspectives"
import { Content } from "@sdk/components"
import React from "react"

interface WidgetDetailTabProps {
  widget: WidgetConfig
}

export const WidgetDetailTab = ({ widget }: WidgetDetailTabProps): React.JSX.Element => {
  return (
    <Content padded>
      <p>{`You opened the widget with id ${widget.id}`}</p>
    </Content>
  )
}