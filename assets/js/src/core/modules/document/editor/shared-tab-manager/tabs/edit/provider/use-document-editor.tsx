import { useContext } from 'react'
import { DocumentEditorContext, type DocumentEditorContextProps } from './document-editor-provider'

export const useDocumentEditor = (): DocumentEditorContextProps => {
  const context = useContext(DocumentEditorContext)
  if (context === undefined) {
    throw new Error('useDocumentEditor must be used within a DocumentEditorProvider')
  }
  return context
}
