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
import { AreablockEditable, type AreablockEditableConfig, type AreablockValue, type AreaType } from '../components/areablock-editable/areablock-editable'
import { AreablockManager } from '../components/areablock-editable/utils/areablock-manager'
import { configUtils } from '../components/areablock-editable/utils/areablock-utils'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'
import { type AreablockGroupedTypes } from '@Pimcore/modules/document/document-editor-slice'
import { isNil, isArray } from 'lodash'

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
      const areablockEditables = editableDefinitions.filter(editable => editable.type === this.id)
      const { document: documentApi } = getPimcoreStudioApi()

      if (areablockEditables.length > 0) {
        const allGroupedTypes: AreablockGroupedTypes = {}
        
        const createAreaTypeEntry = (editable: AbstractDocumentEditableDefinition, type: AreaType) => ({
          areablockName: editable.name,
          type: type.type,
          name: type.name,
          description: type.description,
          icon: type.icon
        })

        const addTypesToGroup = (groupName: string, types: AreaType[], editable: AbstractDocumentEditableDefinition) => {
          if (isNil(allGroupedTypes[groupName])) {
            allGroupedTypes[groupName] = []
          }
          types.forEach(type => {
            allGroupedTypes[groupName].push(createAreaTypeEntry(editable, type))
          })
        }

        const hasGroupedAreablocks = areablockEditables.some(editable => {
          const config = editable.config as AreablockEditableConfig | undefined
          const groupedTypes = configUtils.getGroupedAreaTypes(config)
          return !isArray(groupedTypes)
        })

        areablockEditables.forEach(editable => {
          const config = editable.config as AreablockEditableConfig | undefined
          const groupedTypes = configUtils.getGroupedAreaTypes(config)

          if (isArray(groupedTypes)) {
            // Areablock has no custom grouping - add to default or uncategorized group
            const groupName = hasGroupedAreablocks ? UNCATEGORIZED_AREABLOCK_GROUP : DEFAULT_AREABLOCK_GROUP
            addTypesToGroup(groupName, groupedTypes, editable)
          } else {
            Object.entries(groupedTypes).forEach(([groupName, types]) => {
              addTypesToGroup(groupName, types, editable)
            })
          }
        })

        documentApi.notifyAreablockTypes(documentId, allGroupedTypes)
      } else {
        documentApi.notifyAreablockTypes(documentId, {})
      }
    } catch (error) {
      console.warn('Could not notify parent about areablock types:', error)
    }
  }
}
