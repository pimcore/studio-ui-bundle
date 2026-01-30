/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type AbstractDocumentEditableDefinition, DynamicTypeDocumentEditableAbstract } from '../dynamic-type-document-editable-abstract'
import { ScheduledblockEditable, type ScheduledblockValue } from '../components/scheduledblock-editable/scheduledblock-editable'
import { ScheduledblockManager } from '../components/scheduledblock-editable/utils/scheduledblock-manager'
import { scheduledblockValueUtils } from '../components/scheduledblock-editable/utils/scheduledblock-utils'
import { isNil } from 'lodash'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

export interface ScheduledblockEditableDefinition extends AbstractDocumentEditableDefinition {
}

// Track operation types for different editables
const operationTracker = new Map<string, 'modify' | 'add' | 'delete'>()

export const setScheduledblockOperation = (editableName: string, operationType: 'modify' | 'add' | 'delete' | null): void => {
  if (!isNil(operationType)) {
    operationTracker.set(editableName, operationType)
  } else {
    operationTracker.delete(editableName)
  }
}

export class DynamicTypeDocumentEditableScheduledblock extends DynamicTypeDocumentEditableAbstract {
  id: string = 'scheduledblock'

  getEditableDataComponent (props: ScheduledblockEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <ScheduledblockEditable
        containerRef={ props.containerRef }
        disabled={ props.inherited }
        editableName={ props.name }
        inherited={ props.inherited }
        onChange={ (newValue) => props.onChange?.(newValue) }
        value={ props.value }
      />
    )
  }

  transformValue (value: any, props: ScheduledblockEditableDefinition): ScheduledblockValue {
    const scheduledblockManager = new ScheduledblockManager(props.name, props.containerRef)
    const elements = scheduledblockManager.queryElements()
    return scheduledblockValueUtils.elementsToScheduledblockValue(elements)
  }

  onDocumentReady (documentId: number, editableDefinitions: AbstractDocumentEditableDefinition[]): void {
    const hasScheduledBlock = editableDefinitions.some(editable => editable.type === this.id)

    try {
      const { document: documentApi } = getPimcoreStudioApi()
      documentApi.notifyTimeSliderVisible(documentId, hasScheduledBlock)
    } catch (error) {
      console.warn('Could not notify parent about time slider visibility:', error)
    }
  }

  reloadOnChange (props: ScheduledblockEditableDefinition): boolean {
    // Check if there's an active operation type for this specific editable
    const operationType = operationTracker.get(props.name)

    if (!isNil(operationType)) {
      // Clear the operation type after checking
      operationTracker.delete(props.name)

      // Only reload for add/delete operations, not for modify operations
      if (operationType === 'modify') {
        return false
      }

      // For add/delete operations, always reload since we're using reload-only mode
      if (operationType === 'add' || operationType === 'delete') {
        return true
      }
    }

    // Default behavior - always reload since we're using reload-only mode
    return true
  }
}
