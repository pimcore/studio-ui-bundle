import React from "react"
import { WidgetEditorProvider } from "./context/widget-editor-provider"
import { WidgetEditorContainerInner } from "./widget-editor-container-inner"

export const WidgetEditorContainer = (): React.JSX.Element => {
  return (
    <WidgetEditorProvider>
      <WidgetEditorContainerInner />
    </WidgetEditorProvider>
  )
}