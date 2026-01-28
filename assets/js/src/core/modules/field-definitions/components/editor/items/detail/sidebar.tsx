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
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { type DynamicTypeFieldDefinitionAbstract } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { buildTree } from '@Pimcore/modules/field-definitions/utils/layout-helpers'
import { type FieldDefinition } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { serviceIds, useInjection } from '@sdk/app'
import { TreeElement, type ITreeElementProps, Content, HotspotDroppable, Icon } from '@sdk/components'
import React, { useMemo } from 'react'

export interface DetailSidebarProps {
  allowExternalDrop?: boolean
}

export const DetailSidebar = (props: DetailSidebarProps): React.JSX.Element => {
  const { useLayout } = useSettings()

  const {
    allowExternalDrop = false
  } = props

  const { area } = useArea()

  const {
    structure,
    fieldDefinitions,
    invalidFieldDefinitionIds,
    currentFieldDefinitionId,
    addFieldDefinition,
    updateFieldDefinition,
    setCurrentFieldDefinitionIdPath,
    setCurrentFieldDefinitionId,
    moveFieldDefinition,
    removeFieldDefinition,
    cloneFieldDefinition
  } = useLayout()

  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

  const titleRender: ITreeElementProps['titleRender'] = useMemo(() => {
    /* eslint-disable react/display-name */
    if (allowExternalDrop) {
      return (node, initialComponent) => (
        <HotspotDroppable
          hotspots={ [
            {
              id: 'sorting-top',
              className: 'dnd__sorting dnd__sorting--top',
              position: { x: 0, y: 0, width: '100%', height: '30%' },
              isValidContext: true,
              onDrop: (info) => {
                addFieldDefinition(node.key.toString(), info.data as FieldDefinition)
              }
            },
            {
              id: 'drop-middle',
              position: { x: '0', y: '30%', width: '100%', height: '40%' },
              isValidContext: true,
              onDrop: (info) => {
                addFieldDefinition(node.key.toString(), info.data as FieldDefinition)
              }
            },
            {
              id: 'sorting-bottom',
              position: { x: 0, y: '70%', width: '100%', height: '30%' },
              isValidContext: true,
              isValidData: () => false,
              onDrop: (info) => {
                addFieldDefinition(node.key.toString(), info.data as FieldDefinition)
              }
            }
          ] }
        >
          {initialComponent}
        </HotspotDroppable>
      )
    }

    return undefined
  }, [allowExternalDrop, fieldDefinitions])

  const items: ITreeElementProps['treeData'] = React.useMemo(() => {
    if (structure === undefined) {
      return []
    }

    const treeItems = buildTree({
      structure,
      fieldDefinitions,
      itemCallback: ({ fieldDefinition, initialTreeItem }) => {
        let dynType: undefined | DynamicTypeFieldDefinitionAbstract
        const currentPath = initialTreeItem.meta!.currentPath!

        if (fieldDefinitionRegistry.hasDynamicType(fieldDefinition.fieldtype)) {
          dynType = fieldDefinitionRegistry.getDynamicType(fieldDefinition.fieldtype)
        }

        const actions: ITreeElementProps['treeData'][0]['actions'] = fieldDefinitionRegistry.getDropdownActions({ area, path: currentPath, fieldDefinitions })

        return {
          ...initialTreeItem,
          ...(fieldDefinition.name === 'pimcore_root' ? { title: 'Base', icon: <Icon value="folder" /> } : {}),
          className: 'ant-tree-node--has-drag-and-drop ' + (invalidFieldDefinitionIds.includes(initialTreeItem.key as string) ? 'tree-element-item--danger' : undefined),
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
      const newlyAddedFieldId = addFieldDefinition(nodeKey, newFieldDefData)
      setCurrentFieldDefinitionId(newlyAddedFieldId)
      setCurrentFieldDefinitionIdPath([...node?.meta?.currentPath ?? [], newlyAddedFieldId])
    }

    if (actionKey.startsWith('convert-')) {
      const typeId = actionKey.replace('convert-', '')
      const type = fieldDefinitionRegistry.getDynamicType(typeId)

      const existingFieldDef = fieldDefinitions[nodeKey]
      const convertibleData = type.getConvertibleData({ area, path: node.meta?.currentPath ?? [], fieldDefinitions, newTypeId: typeId })

      const defaultData = type.getDefaultData({ area, path: node.meta?.currentPath ?? [], fieldDefinitions })
      const newData: Partial<FieldDefinition> = {}

      for (const [key] of Object.entries(defaultData)) {
        if (key in existingFieldDef) {
          newData[key] = (existingFieldDef as any)[key]
        }
      }

      const mergedData: FieldDefinition = {
        ...defaultData,
        ...newData,
        ...convertibleData,
        fieldtype: typeId,
        children: []
      }

      if (existingFieldDef.children !== undefined) {
        for (const childId of existingFieldDef.children) {
          removeFieldDefinition(childId as string)
        }
      }

      setCurrentFieldDefinitionId(nodeKey)
      setCurrentFieldDefinitionIdPath(node.meta?.currentPath as string[] ?? null)
      updateFieldDefinition(nodeKey, mergedData, true)
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
        titleRender={ titleRender }
        treeData={ items }
      />
    </Content>
  )
}
