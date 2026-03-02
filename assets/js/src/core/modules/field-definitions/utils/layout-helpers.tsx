/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinition, type ILayoutContext, type Layout, type StructureNode } from './layout-provider-factory'
import { type DynamicTypeFieldDefinitionAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { container, serviceIds } from '@sdk/app'
import { Icon, type ITreeElementProps } from '@sdk/components'
import { uuid } from '@sdk/utils'
import React from 'react'

export interface ReduceProps {
  layout: Layout
}

export interface ReduceReturn {
  structure: StructureNode
  fieldDefinitions: ILayoutContext['fieldDefinitions']
}

export const reduce = (props: ReduceProps): ReduceReturn | undefined => {
  if (props.layout === undefined) {
    return
  }

  const initialFieldDefinitions: ILayoutContext['fieldDefinitions'] = {}

  const buildStructure = (layoutItem: Layout): StructureNode => {
    const id = uuid()

    const node: StructureNode = {
      id,
      children: (layoutItem.children !== undefined && layoutItem.children !== null) ? layoutItem.children.map((child) => buildStructure(child as Layout)) : []
    }

    const { children, ...fieldDef } = layoutItem

    // For encryptedField: the backend returns delegate-specific properties (e.g. lat, lng, zoom,
    // width, height) nested inside a 'delegate' sub-object.  The form fields for the chosen
    // delegate type bind to top-level names, so we hoist those properties here so that
    // initialValues already contains them at the correct level.
    //
    // The backend inconsistently uses both 'fieldType' (getter-based, camelCase) and 'fieldtype'
    // (public property, lowercase). We check both, matching the same pattern used in the registry.
    const hoistedFieldDef = { ...fieldDef } as Record<string, unknown>
    const resolvedFieldType = (hoistedFieldDef.fieldType ?? hoistedFieldDef.fieldtype) as string | undefined
    if (
      resolvedFieldType === 'encryptedField' &&
      hoistedFieldDef.delegate !== null &&
      typeof hoistedFieldDef.delegate === 'object' &&
      !Array.isArray(hoistedFieldDef.delegate)
    ) {
      // Keys that belong to the encryptedField itself and must not be overwritten with
      // values from the delegate sub-object.
      const BASE_FIELD_KEYS = new Set(['fieldtype', 'fieldType', 'datatype', 'name', 'title', 'tooltip'])
      for (const [key, value] of Object.entries(hoistedFieldDef.delegate as Record<string, unknown>)) {
        if (!BASE_FIELD_KEYS.has(key) && hoistedFieldDef[key] === undefined) {
          hoistedFieldDef[key] = value
        }
      }
    }

    // @todo remove type conversion after fix of typo from backendSide (fieldtype vs. fieldType)
    initialFieldDefinitions[id] = hoistedFieldDef as unknown as FieldDefinition

    return node
  }

  const rootStructure = buildStructure(props.layout)

  return {
    structure: rootStructure,
    fieldDefinitions: initialFieldDefinitions
  }
}

export interface ItemCallbackProps {
  fieldDefinition: FieldDefinition
  initialTreeItem: ITreeElementProps['treeData'][0]
}

export interface BuildTreeProps {
  structure: StructureNode
  fieldDefinitions: ILayoutContext['fieldDefinitions']
  itemCallback?: (props: ItemCallbackProps) => ITreeElementProps['treeData'][0]
}

export const buildTree = (props: BuildTreeProps): ITreeElementProps['treeData'][0] => {
  const { fieldDefinitions, structure, itemCallback } = props

  const buildTreeItems = (node: StructureNode, parentPath: string[] = []): ITreeElementProps['treeData'][0] => {
    const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])
    const fieldDef = fieldDefinitions[node.id]
    let dynType: undefined | DynamicTypeFieldDefinitionAbstract

    if (fieldDefinitionRegistry.hasDynamicType(fieldDef.fieldtype)) {
      dynType = fieldDefinitionRegistry.getDynamicType(fieldDef.fieldtype)
    }

    const currentPath = [...parentPath, node.id]

    const item = {
      title: fieldDef?.name,
      icon: dynType !== undefined
        ? (
          <Icon
            { ...dynType.getIcon() }
            iconColorGroup={ ['fieldDefinition_' + dynType.id, 'fieldDefinition'] }
          />
          )
        : undefined,
      key: node.id,
      meta: { currentPath },
      children: node.children.map((child) => buildTreeItems(child, currentPath))
    }

    if (itemCallback !== undefined) {
      return itemCallback({ fieldDefinition: fieldDef, initialTreeItem: item })
    }

    return item
  }

  return buildTreeItems(structure)
}
