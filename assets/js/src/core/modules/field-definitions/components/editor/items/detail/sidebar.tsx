/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useArea } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { type FieldDefinition, useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { type DynamicTypeFieldDefinitionAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { buildTree } from '@Pimcore/modules/field-definitions/utils/layout-helpers'
import { serviceIds, useInjection } from '@sdk/app'
import { TreeElement, type ITreeElementProps, Content, Draggable, Droppable } from '@sdk/components'
import React, { useMemo } from 'react'

export interface DetailSidebarProps {
  allowExternalDrag?: boolean
  allowExternalDrop?: boolean
}

export const DetailSidebar = (props: DetailSidebarProps): React.JSX.Element => {
  const {
    allowExternalDrag = false,
    allowExternalDrop = false
  } = props

  const { area } = useArea()

  const {
    structure,
    fieldDefinitions,
    invalidFieldDefinitionIds,
    currentFieldDefinitionId,
    addFieldDefinition,
    setCurrentFieldDefinitionIdPath,
    setCurrentFieldDefinitionId,
    moveFieldDefinition,
    removeFieldDefinition,
    cloneFieldDefinition
  } = useLayout()

  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

  const titleRender: ITreeElementProps['titleRender'] = useMemo(() => {
    /* eslint-disable react/display-name */
    if (allowExternalDrag) {
      return (node, initialComponent) => (
        <Draggable info={ {
          type: 'field-definition',
          data: fieldDefinitions[node.key.toString()],
          // @todo icon
          icon: { value: 'folder' },
          title: node.title as string
        } }
        >
          {initialComponent}
        </Draggable>
      )
    }

    if (allowExternalDrop) {
      return (node, initialComponent) => (
        <Droppable
          isValidContext={ () => true }
          onDrop={ (info) => {
            addFieldDefinition(node.key.toString(), info.data as FieldDefinition)
          } }
        >
          {initialComponent}
        </Droppable>
      )
    }

    return undefined
  }, [allowExternalDrag, fieldDefinitions])

  const items: ITreeElementProps['treeData'] = React.useMemo(() => {
    if (structure === undefined) {
      return []
    }

    const treeItems = buildTree({
      structure,
      fieldDefinitions,
      itemCallback: ({ fieldDefinition, initialTreeItem }) => {
        const actions: ITreeElementProps['treeData'][0]['actions'] = []
        let dynType: undefined | DynamicTypeFieldDefinitionAbstract
        const currentPath = initialTreeItem.meta!.currentPath!

        if (fieldDefinitionRegistry.hasDynamicType(fieldDefinition.fieldtype)) {
          dynType = fieldDefinitionRegistry.getDynamicType(fieldDefinition.fieldtype)
        }

        if (fieldDefinition.name !== 'pimcore_root') {
          if (dynType !== undefined) {
            const allowedChildTags = dynType.getValidDropdownTags({ area, path: currentPath, fieldDefinitions })
            fieldDefinitionRegistry.getTypesByTags(allowedChildTags, { area, path: currentPath, fieldDefinitions }).forEach((type) => {
              actions.push({ key: `add-${type.id}`, icon: type.getIcon().value })
            })
          }

          actions.push({ key: 'clone', icon: 'clone' })
          actions.push({ key: 'delete', icon: 'delete' })
        } else {
          fieldDefinitionRegistry.getTypesByTags(['group:root'], { area, path: currentPath, fieldDefinitions }).forEach((type) => {
            actions.push({ key: `add-${type.id}`, icon: type.getIcon().value })
          })
        }

        return {
          ...initialTreeItem,
          className: invalidFieldDefinitionIds.includes(initialTreeItem.key as string) ? 'tree-element-item--danger' : undefined,
          actions,
          allowDrag (params) {
            // Prevent dragging of root node
            if (fieldDefinition.name === 'pimcore_root') {
              return false
            }

            return true
          },
          allowDrop: ({ dropNode, dragNode }) => {
            const dragFieldDef = fieldDefinitions[dragNode.key as string]
            let isValid = false

            if (fieldDefinition.name === 'pimcore_root') {
              fieldDefinitionRegistry.getTypesByTags(['group:root'], { area, path: currentPath, fieldDefinitions }).forEach((type) => {
                if (type.id === dragFieldDef.fieldtype) {
                  isValid = true
                }
              })
            }

            if (dynType !== undefined) {
              const allowedChildTags = dynType.getValidChildTags({ area, path: currentPath, fieldDefinitions })
              fieldDefinitionRegistry.getTypesByTags(allowedChildTags, { area, path: currentPath, fieldDefinitions }).forEach((type) => {
                if (type.id === dragFieldDef.fieldtype) {
                  isValid = true
                }
              })
            }

            return isValid
          }
        }
      }
    })

    return [treeItems]
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

      const newFieldDefData = type.getDefaultData({ area, path: node.meta?.currentPath ?? [], fieldDefinitions })
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
        draggable={ !allowExternalDrag }
        onActionsClick={ onActionsClick }
        onDragAndDrop={ ({ node, dragNode, dropPosition }) => {
          moveFieldDefinition(dragNode.key as string, node.key as string, dropPosition)
        } }
        onSelected={ onSelected }
        selectedKeys={ currentFieldDefinitionId !== null ? [currentFieldDefinitionId] : [] }
        titleRender={ titleRender }
        treeData={ items }
      />
    </Content>
  )
}
