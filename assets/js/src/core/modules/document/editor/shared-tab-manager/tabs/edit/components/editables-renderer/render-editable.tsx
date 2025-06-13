/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext } from 'react'
import { Alert, DragAndDropContextProvider } from '@sdk/components'
import { type AbstractDocumentEditableDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-abstract'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { serviceIds, useInjection } from '@sdk/app'
import { isNil } from 'lodash'
import { ElementSelectorProvider, FieldWidthProvider } from '@sdk/modules/element'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { useDocumentDraft } from '@Pimcore/modules/document/hooks/use-document-draft'

interface RenderEditableProps {
  editableDefinition: AbstractDocumentEditableDefinition
}

export const RenderEditable = ({ editableDefinition }: RenderEditableProps): React.JSX.Element => {
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  const editableType = documentEditableRegistry.hasDynamicType(editableDefinition.type) ? documentEditableRegistry.getDynamicType(editableDefinition.type) : undefined
  const {id} = useContext(DocumentContext)
  const {document, markDocumentEditablesAsModified}= useDocumentDraft(id)

  
  if (isNil(editableType)) {
    return (
      <Alert
        message={ (<>Editable type &quot;{editableDefinition.type}&quot; not found:<p>{JSON.stringify(editableDefinition)}</p></>) }
        type="warning"
      />
    )
  }

  return (
        <FieldWidthProvider fieldWidthValues={{large: 9999}}>
          {
              React.cloneElement(
                editableType.getEditableDataComponent(editableDefinition),
                {
                  value: editableDefinition.data,
                  onChange: (newValue) => {
                    // TODO: handle the change logic here
                    console.log(`Editable ${editableDefinition.id} changed to`, newValue, document)
                    markDocumentEditablesAsModified()
                  }
                }
              )
          }
        </FieldWidthProvider>
  )
}
