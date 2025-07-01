/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import React from 'react'
import { EditablesRenderer } from '../components/editables-renderer/editables-renderer'
import { GlobalProvider } from '@Pimcore/modules/app/global-provider'
import { DocumentProvider } from '@Pimcore/modules/document/document-provider'
import { isNaN, isNil, isNumber } from 'lodash'
import { Alert } from '@Pimcore/components/alert/alert'

export interface DocumentEditorIframeWindow extends Window {
  editableDefinitions?: AbstractDocumentEditableDefinition[]
  clipboardData?: any
}

export const DocumentEditorIframeAppView = (): React.JSX.Element => {
  const editableDefinitions: AbstractDocumentEditableDefinition[] = (window as DocumentEditorIframeWindow).editableDefinitions ?? []
  
  // Extract document ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const documentIdParam = urlParams.get('documentId')

  const documentId = isNil(documentIdParam) ? undefined : parseInt(documentIdParam, 10)

  if (isNil(documentId) || !isNumber(documentId) || isNaN(documentId) || documentId <= 0) {
    return (
      <Alert
        message="Error: Invalid Document ID"
        description="A valid documentId parameter is required in the URL."
        type="error"
        showIcon
      />
    )
  }

  return (
    <GlobalProvider>
      <DocumentProvider id={ documentId }>
          <EditablesRenderer editableDefinitions={ editableDefinitions } />
      </DocumentProvider>
    </GlobalProvider>
  )
}
