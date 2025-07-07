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
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { RenderEditable } from './render-editable'
import { isNull, isUndefined } from 'lodash'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useDocumentEditor } from '../../hooks/use-document-editor'

export interface EditablesRendererProps {
  editableDefinitions: AbstractDocumentEditableDefinition[]
}

export const EditablesRenderer = ({ editableDefinitions }: EditablesRendererProps): React.JSX.Element => {
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  const apiInitialized = useRef(false)
  const { initializeData } = useDocumentEditor()

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

  if (!apiInitialized.current) {
    initializeData(getInitialData(editableDefinitions))
    apiInitialized.current = true
  }

  return (
    <>
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
    </>
  )
}
