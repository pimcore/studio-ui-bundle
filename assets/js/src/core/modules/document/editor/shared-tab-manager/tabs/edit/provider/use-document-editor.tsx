/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { DocumentEditorContext, type DocumentEditorContextProps } from './document-editor-provider'

export const useDocumentEditor = (): DocumentEditorContextProps => {
  const context = useContext(DocumentEditorContext)
  if (context === undefined) {
    throw new Error('useDocumentEditor must be used within a DocumentEditorProvider')
  }
  return context
}
