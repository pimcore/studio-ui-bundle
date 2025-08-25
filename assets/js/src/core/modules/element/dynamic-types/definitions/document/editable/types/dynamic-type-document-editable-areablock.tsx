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
import { AreablockEditable, type AreablockEditableConfig, type AreablockValue } from '../components/areablock-editable/areablock-editable'
import { AreablockManager } from '../components/areablock-editable/utils/areablock-manager'
import { configUtils } from '../components/areablock-editable/utils/areablock-utils'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { type AreablockGroupedTypes } from '@Pimcore/modules/document/document-editor-slice'
import { isNil } from 'lodash'

const DEFAULT_AREABLOCK_GROUP = 'Available Areas'
const UNCATEGORIZED_AREABLOCK_GROUP = 'Uncategorized'

export { DEFAULT_AREABLOCK_GROUP, UNCATEGORIZED_AREABLOCK_GROUP }

export interface AreablockEditableDefinition extends Omit<AbstractDocumentEditableDefinition, 'config'> {
  config?: AreablockEditableConfig
}

export class DynamicTypeDocumentEditableAreablock extends DynamicTypeDocumentEditableAbstract {
  id: string = 'areablock'

  getEditableDataComponent (props: AreablockEditableDefinition): React.ReactElement<AbstractDocumentEditableDefinition> {
    return (
      <AreablockEditable
        className={ props.config?.class }
        config={ props.config }
        containerRef={ props.containerRef }
        disabled={ props.inherited }
        editableName={ props.name }
      />
    )
  }

  transformValue (value: any, props: AreablockEditableDefinition): AreablockValue {
    const areablockManager = new AreablockManager(props.name, props.containerRef)
    return areablockManager.getAreablockValue()
  }

  onDocumentReady (documentId: number, editableDefinitions: AbstractDocumentEditableDefinition[]): void {
    try {
      // Get all areablock editables from the definitions
      const areablockEditables = editableDefinitions.filter(editable => editable.type === this.id)
      const { document: documentApi } = getPimcoreStudioApi()

      if (areablockEditables.length > 0) {
        // Collect all grouped types from all areablocks and merge them
        const allGroupedTypes: AreablockGroupedTypes = {}
        let hasGroupedAreablocks = false

        // First pass: check if any areablock has grouping defined
        areablockEditables.forEach(editable => {
          const config = editable.config as AreablockEditableConfig | undefined
          const groupedTypes = configUtils.getGroupedAreaTypes(config)

          if (!Array.isArray(groupedTypes)) {
            hasGroupedAreablocks = true
          }
        })

        // Second pass: process all areablocks with proper categorization
        areablockEditables.forEach(editable => {
          const config = editable.config as AreablockEditableConfig | undefined
          const groupedTypes = configUtils.getGroupedAreaTypes(config)

          if (Array.isArray(groupedTypes)) {
            // No grouping defined for this areablock - use shared group for all ungrouped areablocks
            const groupName = hasGroupedAreablocks ? UNCATEGORIZED_AREABLOCK_GROUP : DEFAULT_AREABLOCK_GROUP
            if (isNil(allGroupedTypes[groupName])) {
              allGroupedTypes[groupName] = []
            }

            groupedTypes.forEach(type => {
              allGroupedTypes[groupName].push({
                areablockName: editable.name,
                type: type.type,
                name: type.name,
                description: (type as any).description,
                icon: (type as any).icon
              })
            })
          } else {
            // Grouping is defined - share groups across areablocks instead of separating by areablock name
            Object.entries(groupedTypes).forEach(([groupName, types]) => {
              if (isNil(allGroupedTypes[groupName])) {
                allGroupedTypes[groupName] = []
              }

              types.forEach(type => {
                allGroupedTypes[groupName].push({
                  areablockName: editable.name,
                  type: type.type,
                  name: type.name,
                  description: (type as any).description,
                  icon: (type as any).icon
                })
              })
            })
          }
        })

        documentApi.notifyAreablockTypes(documentId, allGroupedTypes)
      } else {
        // No areablocks found - notify with empty object
        documentApi.notifyAreablockTypes(documentId, {})
      }
    } catch (error) {
      console.warn('Could not notify parent about areablock types:', error)
    }
  }
}
