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
import React, { useRef, useEffect, useContext, useState } from 'react'
import { isUndefined } from 'lodash'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeDocumentEditableRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/document/editable/dynamic-type-document-editable-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { useDocumentEditor } from '../../hooks/use-document-editor'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import { EditablesRenderer } from './editables-renderer'

export interface EditablesLoaderProps {
  editableDefinitions: AbstractDocumentEditableDefinition[]
}

export const EditablesLoader = ({ editableDefinitions }: EditablesLoaderProps): React.JSX.Element => {
  const documentEditableRegistry = useInjection<DynamicTypeDocumentEditableRegistry>(serviceIds['DynamicTypes/DocumentEditableRegistry'])
  const apiInitialized = useRef(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const { initializeData, notifyReady, initializeInheritanceState } = useDocumentEditor()
  const { id: documentId } = useContext(DocumentContext)

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

  const getInitialInheritanceState = (editableDefinitions: AbstractDocumentEditableDefinition[]): Record<string, boolean> => {
    const inheritanceState: Record<string, boolean> = {}
    editableDefinitions.forEach((editable) => {
      inheritanceState[editable.name] = editable.inherited
    })
    return inheritanceState
  }

  useEffect(() => {
    if (!apiInitialized.current) {
      initializeData(getInitialData(editableDefinitions))
      initializeInheritanceState(getInitialInheritanceState(editableDefinitions))
      apiInitialized.current = true
      setIsInitialized(true)
    }
  }, [editableDefinitions, initializeData, initializeInheritanceState])

  useEffect(() => {
    if (apiInitialized.current) {
      notifyReady()

      try {
        documentEditableRegistry.notifyDocumentReady(documentId, editableDefinitions)
      } catch (error) {
        console.warn('Could not process document ready events:', error)
      }
    }
  }, [notifyReady, editableDefinitions, documentId, documentEditableRegistry])

  if (!isInitialized) {
    return <></>
  }

  return (
    <EditablesRenderer editableDefinitions={editableDefinitions} />
  )
}
