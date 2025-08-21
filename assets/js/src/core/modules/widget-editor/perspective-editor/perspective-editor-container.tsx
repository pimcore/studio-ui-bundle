import React from "react"
import { PerspectiveEditorProvider } from "./context/perspective-editor-provider"
import { PerspectiveEditorContainerInner } from "./perspective-editor-container-inner"

export const PerspectiveEditorContainer = (): React.JSX.Element => {
  return (
    <PerspectiveEditorProvider>
      <PerspectiveEditorContainerInner />
    </PerspectiveEditorProvider>
  )
}