import { useContext } from "react";
import { WidgetEditorContext } from "../widget-editor-provider";

export const useWidgetEditorContext = (): WidgetEditorContext => {
  const context = useContext(WidgetEditorContext)

  if (context === undefined) {
    throw new Error('useWidgetEditorContext must be used within a WidgetEditorProvider')
  }

  return context
}