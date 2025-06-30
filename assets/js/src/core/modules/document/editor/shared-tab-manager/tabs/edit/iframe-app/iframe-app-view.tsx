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
import ReactDOM from 'react-dom'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { RenderEditable } from '../components/editables-renderer/render-editable'
import { isNull, isUndefined } from 'lodash'
import { GlobalProvider } from '@Pimcore/modules/app/global-provider'
import { DocumentProvider } from '@Pimcore/modules/document/document-provider'
import { DocumentEditorProvider } from '../provider/document-editor-provider'
import { SaveProvider } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/tabs/edit/providers/save-provider/save-provider'

export interface DocumentEditorIframeWindow extends Window {
  editableDefinitions?: AbstractDocumentEditableDefinition[]
  clipboardData?: any
}

export const DocumentEditorIframeAppView = (): React.JSX.Element => {
  const editableDefinitions: AbstractDocumentEditableDefinition[] = (window as DocumentEditorIframeWindow).editableDefinitions ?? []
const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  
const getInitialData = (editableDefinitions: AbstractDocumentEditableDefinition[]): Record<string, { type: string, data: any }> => {
    const initialData: Record<string, any> = {}
    editableDefinitions.forEach((editable) => {
      const editableType = documentEditableRegistry.hasDynamicType(editable.type) ? documentEditableRegistry.getDynamicType(editable.type) : undefined

      initialData[editable.name] = {
        type: editable.type,
        data: isUndefined(editableType) ? (editable.data ?? null) : editableType.transformValue(editable.data, editable)
      }
    })
    return initialData
  }

  return (
    <GlobalProvider>
      <DocumentProvider id={ 38 }>
        <SaveProvider>
          <DocumentEditorProvider initialData={ getInitialData(editableDefinitions) }>
            {editableDefinitions.map(editable => {
          
              const targetElement = document.getElementById(editable.id)
              if (!isNull(targetElement)) {
                return ReactDOM.createPortal(
                  <RenderEditable editableDefinition={ editable } />,
                  targetElement
                )
              }
              return null
            })}
          </DocumentEditorProvider>
        </SaveProvider>
      </DocumentProvider>
    </GlobalProvider>
  )
}