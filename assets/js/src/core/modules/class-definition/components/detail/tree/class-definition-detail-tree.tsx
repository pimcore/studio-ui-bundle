/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassDefinitionLayout } from '@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider'
import { type DynamicTypeFieldDefinitionAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { serviceIds, useInjection } from '@sdk/app'
import { TreeElement, type ITreeElementProps, Icon, Content } from '@sdk/components'
import React from 'react'

export const ClassDefinitionDetailTree = (): React.JSX.Element => {
  const { structure, fieldDefinitions, invalidFieldDefinitionIds, currentFieldDefinitionId, addFieldDefinition, setCurrentFieldDefinitionIdPath, setCurrentFieldDefinitionId, moveFieldDefinition, removeFieldDefinition, cloneFieldDefinition } = useClassDefinitionLayout()
  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

  const items: ITreeElementProps['treeData'] = React.useMemo(() => {
    if (structure === undefined) {
      return []
    }

    const buildTreeItems = (node: typeof structure, parentPath: string[] = []): ITreeElementProps['treeData'][0] => {
      const fieldDef = fieldDefinitions[node.id]
      const actions: ITreeElementProps['treeData'][0]['actions'] = []
      let dynType: undefined | DynamicTypeFieldDefinitionAbstract

      if (fieldDefinitionRegistry.hasDynamicType(fieldDef.fieldtype)) {
        dynType = fieldDefinitionRegistry.getDynamicType(fieldDef.fieldtype)
      }

      const currentPath = [...parentPath, node.id]

      if (fieldDef.name !== 'pimcore_root') {
        if (dynType !== undefined) {
          const allowedChildTags = dynType.getValidChildTags({ area: ['class'], path: currentPath, fieldDefinitions })
          fieldDefinitionRegistry.getTypesByTags(allowedChildTags, { area: ['class'], path: currentPath, fieldDefinitions }).forEach((type) => {
            actions.push({ key: `add-${type.id}`, icon: type.getIcon().value })
          })
        }

        actions.push({ key: 'clone', icon: 'clone' })
        actions.push({ key: 'delete', icon: 'delete' })
      } else {
        fieldDefinitionRegistry.getTypesByTags(['group:root'], { area: ['class'], path: currentPath, fieldDefinitions }).forEach((type) => {
          actions.push({ key: `add-${type.id}`, icon: type.getIcon().value })
        })
      }

      return {
        title: fieldDef?.name,
        icon: dynType !== undefined ? <Icon { ...dynType.getIcon() } /> : undefined,
        key: node.id,
        meta: { currentPath },
        className: invalidFieldDefinitionIds.includes(node.id) ? 'tree-element-item--danger' : undefined,
        children: node.children.map((child) => buildTreeItems(child, currentPath)),
        allowDrag (params) {
          // Prevent dragging of root node
          if (fieldDef.name === 'pimcore_root') {
            return false
          }

          return true
        },
        allowDrop: ({ dropNode, dragNode }) => {
          const dragFieldDef = fieldDefinitions[dragNode.key as string]
          let isValid = false

          if (fieldDef.name === 'pimcore_root') {
            fieldDefinitionRegistry.getTypesByTags(['group:root'], { area: ['class'], path: currentPath, fieldDefinitions }).forEach((type) => {
              if (type.id === dragFieldDef.fieldtype) {
                isValid = true
              }
            })
          }

          if (dynType !== undefined) {
            const allowedChildTags = dynType.getValidChildTags({ area: ['class'], path: currentPath, fieldDefinitions })
            fieldDefinitionRegistry.getTypesByTags(allowedChildTags, { area: ['class'], path: currentPath, fieldDefinitions }).forEach((type) => {
              if (type.id === dragFieldDef.fieldtype) {
                isValid = true
              }
            })
          }

          return isValid
        },
        actions
      }
    }

    return [buildTreeItems(structure)]
  }, [structure, fieldDefinitions, invalidFieldDefinitionIds])

  const onActionsClick: ITreeElementProps['onActionsClick'] = (nodeKey, actionKey, node) => {
    if (actionKey === 'clone') {
      cloneFieldDefinition(nodeKey)
    }

    if (actionKey === 'delete') {
      removeFieldDefinition(nodeKey)
    }

    if (actionKey.startsWith('add-')) {
      const typeId = actionKey.replace('add-', '')
      const type = fieldDefinitionRegistry.getDynamicType(typeId)

      const newFieldDefData = type.getDefaultData({ area: ['class'], path: node.meta?.currentPath ?? [], fieldDefinitions })
      addFieldDefinition(nodeKey, newFieldDefData)
    }
  }

  const onSelected: ITreeElementProps['onSelected'] = (key: string, node) => {
    const fieldDef = fieldDefinitions[key]

    if (fieldDef.name === 'pimcore_root') {
      setCurrentFieldDefinitionId(null)
      setCurrentFieldDefinitionIdPath(null)
      return
    }

    setCurrentFieldDefinitionId(key)
    setCurrentFieldDefinitionIdPath(node.meta?.currentPath as string[] ?? null)
  }

  return (
    <Content
      padded
      padding={ { y: 'small', x: 'mini' } }
    >
      <TreeElement
        defaultExpandAll
        draggable
        onActionsClick={ onActionsClick }
        onDragAndDrop={ ({ node, dragNode, dropPosition }) => {
          moveFieldDefinition(dragNode.key as string, node.key as string, dropPosition)
        } }
        onSelected={ onSelected }
        selectedKeys={ currentFieldDefinitionId !== null ? [currentFieldDefinitionId] : [] }
        treeData={ items }
      />
    </Content>
  )
}
