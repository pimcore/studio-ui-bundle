import { useContext } from 'react'
import { PerspectiveEditorContext } from '../perspective-editor-provider'

export const usePerspectiveEditorContext = (): PerspectiveEditorContext => {
  const context = useContext(PerspectiveEditorContext)

  if (context === undefined) {
    throw new Error('usePerspectiveEditorContext must be used within a PerspectiveEditorProvider')
  }

  return context
}
