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
  const fieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

  const buildStructure = (layoutItem: Layout): StructureNode => {
    const id = uuid()

    const node: StructureNode = {
      id,
      children: (layoutItem.children !== undefined && layoutItem.children !== null) ? layoutItem.children.map((child) => buildStructure(child as Layout)) : []
    }

    const { children, ...fieldDef } = layoutItem

    const resolvedFieldType = ((fieldDef as Record<string, unknown>).fieldType ?? (fieldDef as Record<string, unknown>).fieldtype) as string | undefined
    let normalizedFieldDef: Record<string, unknown> = { ...fieldDef }
    if (resolvedFieldType !== undefined && fieldDefinitionRegistry.hasDynamicType(resolvedFieldType)) {
      normalizedFieldDef = fieldDefinitionRegistry.getDynamicType(resolvedFieldType).normalizeFieldDefinition(normalizedFieldDef)
    }

    initialFieldDefinitions[id] = normalizedFieldDef as unknown as FieldDefinition

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
  registry?: DynamicTypeFieldDefinitionRegistry
}

export const buildPathMap = (structure: StructureNode): Record<string, string[]> => {
  const map: Record<string, string[]> = {}
  const walk = (node: StructureNode, path: string[]): void => {
    const current = [...path, node.id]
    map[node.id] = current
    node.children.forEach(child => { walk(child, current) })
  }
  walk(structure, [])
  return map
}

export const getNamesInNamespace = (
  structure: StructureNode,
  fieldDefinitions: Record<string, FieldDefinition>,
  targetId: string,
  pathMap: Record<string, string[]>,
  registry: DynamicTypeFieldDefinitionRegistry = container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])
): string[] => {
  const isOpener = (id: string): boolean => {
    const def = fieldDefinitions[id]
    if (def === undefined) return false
    return registry.getDynamicType(def.fieldtype, false)?.opensNamespace() ?? false
  }

  const findNode = (node: StructureNode, id: string): StructureNode | undefined => {
    if (node.id === id) return node
    for (const child of node.children) {
      const found = findNode(child, id)
      if (found !== undefined) return found
    }
    return undefined
  }

  // Find innermost namespace-opener ancestor (skip tree root and target itself)
  const path = pathMap[targetId] ?? []
  let namespaceRootId: string | undefined
  for (const id of path.slice(1, -1)) {
    if (isOpener(id)) namespaceRootId = id
  }

  const namespaceRoot = namespaceRootId !== undefined
    ? findNode(structure, namespaceRootId)!
    : structure

  // Collect names, stop descending into nested namespace openers
  const names: string[] = []
  const collect = (node: StructureNode, isRoot: boolean): void => {
    if (!isRoot) {
      const name = fieldDefinitions[node.id]?.name as string | undefined
      if (name !== undefined && name !== '' && fieldDefinitions[node.id]?.datatype !== 'layout') names.push(name)
      if (isOpener(node.id)) return
    }
    node.children.forEach(child => { collect(child, false) })
  }
  collect(namespaceRoot, true)
  return names
}

export const buildTree = (props: BuildTreeProps): ITreeElementProps['treeData'][0] => {
  const { fieldDefinitions, structure, itemCallback } = props
  const fieldDefinitionRegistry = props.registry ?? container.get<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

  const buildTreeItems = (node: StructureNode, parentPath: string[] = []): ITreeElementProps['treeData'][0] => {
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
