/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */
import { useArea } from '@Pimcore/modules/field-definitions/components/editor/area-provider'
import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { buildTree } from '@Pimcore/modules/field-definitions/utils/layout-helpers'
import { type Layout, type FieldDefinition, type StructureNode } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { serviceIds, useInjection } from '@sdk/app'
import { TreeElement, type ITreeElementProps, Content, HotspotDroppable, Icon, type DragAndDropInfo, Draggable, type TreeDataItem, Button, Space } from '@sdk/components'
import { Divider } from 'antd'
import { isEqual, isUndefined } from 'lodash'
import React, { useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { detailView, setDetailView } = useItems()
  const { t } = useTranslation()

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

  // Function to get all keys from tree structure that have children
  const getAllKeys = (node: StructureNode): string[] => {
    const keys: string[] = []
    if (node.children.length > 0) {
      keys.push(node.id)
      node.children.forEach(child => {
        keys.push(...getAllKeys(child))
      })
    }
    return keys
  }

  // Calculate all available keys from current structure (nodes with children)
  const allAvailableKeys = useMemo(() => {
    if (isUndefined(structure)) {
      return []
    }
    return getAllKeys(structure)
  }, [structure])

  // Controlled state for expanded keys
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])

  // Track if we've set initial keys
  const hasInitializedRef = React.useRef(false)

  // Set initial expanded keys once when data arrives
  useEffect(() => {
    if (!hasInitializedRef.current && allAvailableKeys.length > 0) {
      setExpandedKeys(allAvailableKeys)
      expandedKeysRef.current = allAvailableKeys
      hasInitializedRef.current = true
    }
  }, [allAvailableKeys])

  // Ref for expanded keys (needed in sorting-bottom isValidContext)
  const expandedKeysRef = React.useRef<string[]>(expandedKeys)
  const structureRef = React.useRef(structure)

  // Update structure ref whenever structure changes
  React.useEffect(() => {
    structureRef.current = structure
  }, [structure])

  // Helper to find current path to a node in the structure
  const findCurrentPath = (nodeId: string): string[] | undefined => {
    if (isUndefined(structureRef.current)) return undefined

    const findPath = (node: StructureNode, targetId: string, currentPath: string[] = []): string[] | undefined => {
      const newPath = [...currentPath, node.id]
      if (node.id === targetId) {
        return newPath
      }
      for (const child of node.children) {
        const found = findPath(child, targetId, newPath)
        if (found !== undefined) {
          return found
        }
      }
      return undefined
    }

    return findPath(structureRef.current, nodeId)
  }

  // Handle expand/collapse from user interactions
  const handleExpand = (keys: string[]): void => {
    setExpandedKeys(keys)
    expandedKeysRef.current = keys
  }

  // Helper to expand a node after dropping into it
  const expandNode = (nodeId: string): void => {
    setExpandedKeys(prev => {
      if (prev.includes(nodeId)) {
        return prev
      }
      const newKeys = [...prev, nodeId]
      expandedKeysRef.current = newKeys
      return newKeys
    })
  }

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

  const titleRender: ITreeElementProps['titleRender'] = (node, initialComponent) => {
    const titleComponent = initialComponent
    const currentFieldDefinition = fieldDefinitions[node.key as string]

    if (currentFieldDefinition === undefined) {
      return titleComponent
    }

    if (currentFieldDefinition.name !== 'pimcore_root') {
      const treeNode = node as TreeDataItem
      const currentPath = Array.isArray(treeNode.meta?.currentPath) ? treeNode.meta.currentPath as string[] : []
      const layout = getLayout({ startNode: node.key.toString() })
      if (layout === undefined) {
        return <></>
      }

      const currentDynType = fieldDefinitionRegistry.getDynamicType(currentFieldDefinition.fieldtype, false)

      const info: FieldDefinitionDragDropInfo = {
        type: 'field-definition',
        icon: (currentDynType !== undefined) ? {...currentDynType.getIcon(), iconColorGroup: ['fieldDefinition_' + currentDynType.id, 'fieldDefinition']} : { value: 'unknown' },
        title: currentFieldDefinition.name,
        data: {
          area,
          internal: {
            id: node.key as string,
            fieldDefinition: currentFieldDefinition,
            path: currentPath
          },
          external: layout
        }
      }

      return (
        <Draggable info={ info }>
          <HotspotDroppable
            hotspots={ [
              {
                id: 'sorting-top',
                className: 'dnd__sorting dnd__sorting--top',
                position: { x: 0, y: 0, width: '100%', height: '30%' },
                isValidContext: (info: FieldDefinitionDragDropInfo) => {
                  if (info.type !== 'field-definition') return false
                  const currentPath = findCurrentPath(node.key as string) ?? []
                  const parentPath = currentPath.slice(0, -1)
                  if (isEqual((info).data.area, area)) {
                    const draggedCurrentPath = findCurrentPath(info.data.internal.id) ?? []
                    return isValidChildFieldDefinition(parentPath, draggedCurrentPath)
                  }
                  const externalLayout = (info).data.external
                  return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(parentPath, externalLayout)
                },
                onDrop: (info: FieldDefinitionDragDropInfo) => {
                  const currentPath = findCurrentPath(node.key as string) ?? []
                  const ctx = resolveParentAndIndexFromPath(structureRef.current, currentPath)
                  if (!isUndefined(ctx)) {
                    const { parentId, index: targetIndex } = ctx

                    if (isEqual(info.data.area, area)) {
                      const draggedCurrentPath = findCurrentPath(info.data.internal.id) ?? []
                      const draggedCtx = resolveParentAndIndexFromPath(structureRef.current, draggedCurrentPath)
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
                  const targetPath = findCurrentPath(node.key as string) ?? []
                  if (isEqual((info as FieldDefinitionDragDropInfo).data.area, area)) {
                    const draggedCurrentPath = findCurrentPath((info as FieldDefinitionDragDropInfo).data.internal.id) ?? []
                    return isValidChildFieldDefinition(targetPath, draggedCurrentPath)
                  }
                  const externalLayout = (info as FieldDefinitionDragDropInfo).data.external
                  return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(targetPath, externalLayout)
                },
                onDrop: (info) => {
                  const targetNodeId = node.key.toString()
                  if (isEqual(info.data.area, area)) {
                    moveFieldDefinition(info.data.internal.id as string, targetNodeId, 0)
                  } else {
                    addExternalFieldDefinition(targetNodeId, info.data.external as Layout, 0)
                  }
                  expandNode(targetNodeId)
                }
              },
              {
                id: 'sorting-bottom',
                position: { x: 0, y: '70%', width: '100%', height: '30%' },
                isValidContext: (info) => {
                  if (expandedKeysRef.current.includes(node.key as string)) return false
                  if (info.type !== 'field-definition') return false
                  const currentPath = findCurrentPath(node.key as string) ?? []
                  const parentPath = currentPath.slice(0, -1)
                  if (isEqual((info as FieldDefinitionDragDropInfo).data.area, area)) {
                    const draggedCurrentPath = findCurrentPath((info as FieldDefinitionDragDropInfo).data.internal.id) ?? []
                    return isValidChildFieldDefinition(parentPath, draggedCurrentPath)
                  }
                  const externalLayout = (info as FieldDefinitionDragDropInfo).data.external
                  return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(parentPath, externalLayout)
                },
                onDrop: (info) => {
                  const currentPath = findCurrentPath(node.key as string) ?? []
                  const ctx = resolveParentAndIndexFromPath(structureRef.current, currentPath)
                  if (!isUndefined(ctx)) {
                    const { parentId, index: targetIndex, siblingsCount } = ctx
                    let insertIndex = Math.min(targetIndex + 1, siblingsCount)

                    if (isEqual(info.data.area, area)) {
                      const draggedCurrentPath = findCurrentPath(info.data.internal.id as string) ?? []
                      const draggedCtx = resolveParentAndIndexFromPath(structureRef.current, draggedCurrentPath)
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
          ]
        }
      }
    })

    return [treeItems]
  }, [structure, fieldDefinitions, invalidFieldDefinitionIds, copiedPath, isValidChildFieldDefinition])

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
      expandNode(nodeKey)
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
    setDetailView('layout')
  }

  return (
    <Content
      padded
      padding={ { y: 'small', x: 'mini' } }
    >
      <Content 
        padded={ true } 
        style={ { height: 'fit-content' } }
        padding={{ top: 'none', x: 'extra-small'}}
      >
        <Space className='w-full' direction='vertical' size='none'>
          <Button
            className='w-full'
            type={ detailView === 'general' ? 'link' : 'text' }
            onClick={ () => { setDetailView('general') } }
            style={{justifyContent: 'flex-start'}}
          >
            <div style={ { paddingLeft: '16px' } }>
              {t('field-definitions.general-settings')}
            </div>
          </Button>
          
          <Divider style={{margin: "0"}} />
        </Space>
      </Content>


      <TreeElement
        defaultExpandedKeys={ expandedKeys }
        onActionsClick={ onActionsClick }
        onExpand={ handleExpand }
        onSelected={ onSelected }
        selectedKeys={ currentFieldDefinitionId !== null ? [currentFieldDefinitionId] : [] }
        titleRender={ titleRender }
        treeData={ items }
      />
    </Content>
  )
}
