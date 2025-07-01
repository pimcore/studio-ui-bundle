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
import { SaveProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider'

export interface DocumentEditorIframeWindow extends Window {
  editableDefinitions?: AbstractDocumentEditableDefinition[]
  clipboardData?: any
}

export const DocumentEditorIframeAppView = (): React.JSX.Element => {
  const editableDefinitions: AbstractDocumentEditableDefinition[] = (window as DocumentEditorIframeWindow).editableDefinitions ?? []

  return (
    <GlobalProvider>
      <DocumentProvider id={ 38 }>
        <SaveProvider>
          <EditablesRenderer editableDefinitions={ editableDefinitions } />
        </SaveProvider>
      </DocumentProvider>
    </GlobalProvider>
  )
}
