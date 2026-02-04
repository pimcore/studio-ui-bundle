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
import { Layout, type FieldDefinition } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { serviceIds, useInjection } from '@sdk/app'
import { TreeElement, type ITreeElementProps, Content, HotspotDroppable, Icon, DragAndDropInfo, Draggable } from '@sdk/components'
import { isEqual } from 'lodash'
import React, { useMemo } from 'react'
import { type StructureNode } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { isUndefined } from 'lodash'

export interface DetailSidebarProps {
  allowExternalDrop?: boolean
}

export interface FieldDefinitionDragDropInfo extends DragAndDropInfo {
  type: 'field-definition'
  data: {
    area: string[]
    internal: {
      id: string
      fieldDefinition: FieldDefinition
      path: string[]
    }
    external: Layout
  }
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
    addExternalFieldDefinition,
    updateFieldDefinition,
    setCurrentFieldDefinitionIdPath,
    setCurrentFieldDefinitionId,
    moveFieldDefinition,
    removeFieldDefinition,
    removeChildren,
    cloneFieldDefinition,
    isValidChildFieldDefinition,
    isValidExternalChildFieldDefinition,
    copyFieldDefinition,
    pasteFieldDefinition,
    getLayout
  } = useLayout()

  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

  const titleRender: ITreeElementProps['titleRender'] = useMemo(() => {
    const resolveParentAndIndexFromPath = (root: StructureNode | undefined, path: string[]): { parentId: string, index: number, siblingsCount: number } | undefined => {
      if (isUndefined(root) || path.length < 2) return undefined

      let cursor: StructureNode | undefined = root
      // Walk down following the path up to the parent
      for (let i = 0; i < path.length - 1; i++) {
        if (isUndefined(cursor)) return undefined
        if (cursor.id !== path[i]) {
          cursor = cursor.children.find((c) => c.id === path[i])
        }
      }

      if (isUndefined(cursor)) return undefined

      const targetId = path[path.length - 1]
      const index = cursor.children.findIndex((c) => c.id === targetId)
      return { parentId: cursor.id, index: Math.max(index, 0), siblingsCount: cursor.children.length }
    }

    return (node, initialComponent) => {
      let titleComponent = initialComponent;
      const currentFieldDefinition = fieldDefinitions[node.key as string]

      if (currentFieldDefinition === undefined) {
        return titleComponent
      }

      if (currentFieldDefinition.name !== 'pimcore_root') {
        const info: FieldDefinitionDragDropInfo = {
          type: 'field-definition',
          icon: { ...currentFieldDefinition.icon },
          title: currentFieldDefinition.title || currentFieldDefinition.name,
          data: {
            area,
            internal: {
              id: node.key as string,
              fieldDefinition: currentFieldDefinition,
              path: ((node as any).meta?.currentPath as string[]) ?? []
            },
            external: getLayout({ startNode: node.key.toString() })!
          }
        }

        return (
          <Draggable info={info}>
            <HotspotDroppable
              hotspots={ [
                {
                  id: 'sorting-top',
                  className: 'dnd__sorting dnd__sorting--top',
                  position: { x: 0, y: 0, width: '100%', height: '30%' },
                  isValidContext: (info) => {
                    if (info.type !== 'field-definition') return false
                    const currentPath = ((node as any).meta?.currentPath as string[]) ?? []
                    const parentPath = currentPath.slice(0, -1)
                    if (isEqual((info as FieldDefinitionDragDropInfo).data.area, area)) {
                      return isValidChildFieldDefinition(parentPath, (info as FieldDefinitionDragDropInfo).data.internal.path)
                    }
                    const externalLayout = (info as FieldDefinitionDragDropInfo).data.external
                    return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(parentPath, externalLayout)
                  },
                  onDrop: (info: FieldDefinitionDragDropInfo) => {
                    const currentPath = ((node as any).meta?.currentPath as string[]) ?? []
                    const ctx = resolveParentAndIndexFromPath(structure, currentPath)
                    if (!isUndefined(ctx)) {
                      const { parentId, index: targetIndex } = ctx

                      if (isEqual(info.data.area, area)) {
                        const draggedCtx = resolveParentAndIndexFromPath(structure, (info.data.internal.path ?? []))
                        const sameParent = !isUndefined(draggedCtx) && draggedCtx.parentId === parentId
                        const insertIndex = sameParent && !isUndefined(draggedCtx)
                          ? (draggedCtx.index < targetIndex ? Math.max(targetIndex - 1, 0) : targetIndex)
                          : targetIndex

                        moveFieldDefinition(info.data.internal.id, parentId, insertIndex)
                        return
                      }

                      addExternalFieldDefinition(parentId, info.data.external, targetIndex)
                    }
                  }
                },
                {
                  id: 'drop-middle',
                  position: { x: '0', y: '30%', width: '100%', height: '40%' },
                  isValidContext: (info) => {
                    if (info.type !== 'field-definition') return false
                    const targetPath = ((node as any).meta?.currentPath as string[]) ?? []
                    if (isEqual((info as FieldDefinitionDragDropInfo).data.area, area)) {
                      return isValidChildFieldDefinition(targetPath, (info as FieldDefinitionDragDropInfo).data.internal.path)
                    }
                    const externalLayout = (info as FieldDefinitionDragDropInfo).data.external
                    return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(targetPath, externalLayout)
                  },
                  onDrop: (info) => {
                    if (isEqual(info.data.area, area)) {
                      moveFieldDefinition(info.data.internal.id, node.key.toString(), 0)
                      return;
                    }

                    addExternalFieldDefinition(node.key.toString(), info.data.external, 0)
                  }
                },
                {
                  id: 'sorting-bottom',
                  position: { x: 0, y: '70%', width: '100%', height: '30%' },
                  isValidContext: (info) => {
                    if (info.type !== 'field-definition') return false
                    const currentPath = ((node as any).meta?.currentPath as string[]) ?? []
                    const parentPath = currentPath.slice(0, -1)
                    if (isEqual((info as FieldDefinitionDragDropInfo).data.area, area)) {
                      return isValidChildFieldDefinition(parentPath, (info as FieldDefinitionDragDropInfo).data.internal.path)
                    }
                    const externalLayout = (info as FieldDefinitionDragDropInfo).data.external
                    return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(parentPath, externalLayout)
                  },
                  onDrop: (info) => {
                    const currentPath = ((node as any).meta?.currentPath as string[]) ?? []
                    const ctx = resolveParentAndIndexFromPath(structure, currentPath)
                    if (!isUndefined(ctx)) {
                      const { parentId, index: targetIndex, siblingsCount } = ctx
                      let insertIndex = Math.min(targetIndex + 1, siblingsCount)

                      if (isEqual(info.data.area, area)) {
                        const draggedCtx = resolveParentAndIndexFromPath(structure, (info as FieldDefinitionDragDropInfo).data.internal.path ?? [])
                        const sameParent = !isUndefined(draggedCtx) && draggedCtx.parentId === parentId
                        if (sameParent && !isUndefined(draggedCtx)) {
                          insertIndex = draggedCtx.index < targetIndex ? targetIndex : Math.min(targetIndex + 1, siblingsCount)
                        }

                        moveFieldDefinition((info as FieldDefinitionDragDropInfo).data.internal.id, parentId, insertIndex)
                        return
                      }

                      addExternalFieldDefinition(parentId, (info as FieldDefinitionDragDropInfo).data.external, insertIndex)
                    }
                  }
                }
              ] }
            >
              {titleComponent}
            </HotspotDroppable>
          </Draggable>
        )
      }

      return titleComponent
    }
  }, [allowExternalDrop, fieldDefinitions, structure, area, moveFieldDefinition, addExternalFieldDefinition, isValidChildFieldDefinition, isValidExternalChildFieldDefinition, getLayout])

  const items: ITreeElementProps['treeData'] = React.useMemo(() => {
    if (structure === undefined) {
      return []
    }

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
        onActionsClick={ onActionsClick }
        onSelected={ onSelected }
        selectedKeys={ currentFieldDefinitionId !== null ? [currentFieldDefinitionId] : [] }
        titleRender={ titleRender }
        treeData={ items }
      />
    </Content>
  )
}
