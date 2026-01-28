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
    copiedPath,
    addFieldDefinition,
    updateFieldDefinition,
    setCurrentFieldDefinitionIdPath,
    setCurrentFieldDefinitionId,
    moveFieldDefinition,
    removeFieldDefinition,
    removeChildren,
    cloneFieldDefinition,
    isValidChildFieldDefinition,
    copyFieldDefinition,
    pasteFieldDefinition
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

    console.log('rerender sidebar')

    const treeItems = buildTree({
      structure,
      fieldDefinitions,
      itemCallback: ({ fieldDefinition, initialTreeItem }) => {
        const currentPath = initialTreeItem.meta!.currentPath!

        const actions: ITreeElementProps['treeData'][0]['actions'] = fieldDefinitionRegistry.getDropdownActions({ area, path: currentPath, fieldDefinitions })
        const isCustomLayout = area.includes('custom-layout')

        return {
          ...initialTreeItem,
          ...(fieldDefinition.name === 'pimcore_root' ? { title: 'Base', icon: <Icon value="folder" /> } : {}),
          className: 'ant-tree-node--has-drag-and-drop ' + (invalidFieldDefinitionIds.includes(initialTreeItem.key as string) ? 'tree-element-item--danger' : undefined),
          actions: [
            ...(actions ?? []),

            ...(fieldDefinition.name !== 'pimcore_root' && !isCustomLayout
              ? [
                  {
                    key: 'copy',
                    icon: 'copy'
                  }
                ]
              : []),

            ...(!isCustomLayout && copiedPath !== undefined && isValidChildFieldDefinition(currentPath as string[], copiedPath)
              ? [{
                  key: 'paste',
                  icon: 'paste'
                }]
              : []),

            ...(fieldDefinition.name !== 'pimcore_root'
              ? [
                  {
                    key: 'delete',
                    icon: 'trash'
                  }
                ]
              : [])
          ],
          allowDrag (params) {
            // Prevent dragging of root node
            if (fieldDefinition.name === 'pimcore_root') {
              return false
            }

            return true
          },
          allowDrop: ({ dropNode, dragNode, dropPosition }) => {
            console.log({ title: dropNode.title, dropPosition })
            const dragFieldDef = fieldDefinitions[dragNode.key as string]
            let isValid = false

            if (dropPosition === -1) {
              return false
            }

            if (fieldDefinition.name === 'pimcore_root') {
              fieldDefinitionRegistry.getTypesByTags(['group:root'], { area, path: currentPath, fieldDefinitions }).forEach((type) => {
                if (type.id === dragFieldDef.fieldtype) {
                  isValid = true
                }
              })
            }

            if (dropPosition === 0 && isValidChildFieldDefinition(dropNode.meta?.currentPath as string[] ?? [], dragNode.meta?.currentPath as string[] ?? [])) {
              isValid = true
            }

            const parentPath = [...(dropNode.meta?.currentPath as string[] ?? [])].slice(0, -1)

            if (dropPosition === 1 && parentPath.length !== 0 && isValidChildFieldDefinition(parentPath, dragNode.meta?.currentPath as string[] ?? [])) {
              isValid = true
            }

            return isValid
          }
        }
      }
    })

    return [treeItems]
  }, [structure, fieldDefinitions, invalidFieldDefinitionIds, copiedPath])

  const onActionsClick: ITreeElementProps['onActionsClick'] = (nodeKey, actionKey, node) => {
    if (actionKey === 'clone') {
      cloneFieldDefinition(nodeKey)
    }

    if (actionKey === 'delete') {
      removeFieldDefinition(nodeKey)
    }

    if (actionKey === 'copy') {
      copyFieldDefinition(node.meta?.currentPath as string[] ?? [])
    }

    if (actionKey === 'paste') {
      pasteFieldDefinition(node.meta?.currentPath as string[] ?? [])
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

      setCurrentFieldDefinitionId(nodeKey)
      setCurrentFieldDefinitionIdPath(node.meta?.currentPath as string[] ?? null)
      updateFieldDefinition(nodeKey, mergedData, true)
      removeChildren(nodeKey)
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
        onDragAndDrop={ ({ node, dragNode, dropPosition, dropToGap }) => {
          console.log({ title: node.title, dropPosition, dropToGap })
          let nodeId = node.key as string

          if (dropToGap) {
            nodeId = node.meta!.currentPath!.at(-2)!
          }

          moveFieldDefinition(dragNode.key as string, nodeId, dropToGap ? dropPosition : 0)
        } }
        onSelected={ onSelected }
        selectedKeys={ currentFieldDefinitionId !== null ? [currentFieldDefinitionId] : [] }
        titleRender={ titleRender }
        treeData={ items }
      />
    </Content>
  )
}
