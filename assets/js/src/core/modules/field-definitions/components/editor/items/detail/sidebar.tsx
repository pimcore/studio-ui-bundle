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
import { buildTree } from '@Pimcore/modules/field-definitions/utils/layout-helpers'
import { useGlobalFieldDefinitionClipboard } from '@Pimcore/modules/field-definitions/utils/global-clipboard'
import { type Layout, type FieldDefinition, type StructureNode } from '@Pimcore/modules/field-definitions/utils/layout-provider-factory'
import { TreeElement, type ITreeElementProps, Content, HotspotDroppable, Icon, type DragAndDropInfo, Draggable, type TreeDataItem, Button, Space } from '@sdk/components'
import { Divider, theme } from 'antd'
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
  const { token } = theme.useToken()

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

  const { fieldDefinitionRegistry } = useSettings()

  const { copiedLayout: globalCopiedLayout } = useGlobalFieldDefinitionClipboard()

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

  // Track cloned node IDs to expand them when they appear in structure
  const pendingClonedNodeIdRef = React.useRef<string | null>(null)

  // Set initial expanded keys once when data arrives
  useEffect(() => {
    if (!hasInitializedRef.current && allAvailableKeys.length > 0) {
      setExpandedKeys(allAvailableKeys)
      expandedKeysRef.current = allAvailableKeys
      hasInitializedRef.current = true
    }
  }, [allAvailableKeys])

  // Expand cloned nodes when they appear in structure
  useEffect(() => {
    if (pendingClonedNodeIdRef.current !== null && structure !== undefined) {
      const clonedNodeId = pendingClonedNodeIdRef.current
      const findNodeInStructure = (node: StructureNode, targetId: string): StructureNode | undefined => {
        if (node.id === targetId) return node
        for (const child of node.children) {
          const found = findNodeInStructure(child, targetId)
          if (found !== undefined) return found
        }
        return undefined
      }

      const clonedNode = findNodeInStructure(structure, clonedNodeId)
      if (clonedNode !== undefined) {
        const keysToExpand = getAllKeys(clonedNode)
        if (keysToExpand.length > 0) {
          setExpandedKeys(prev => {
            const newKeys = [...new Set([...prev, ...keysToExpand])]
            expandedKeysRef.current = newKeys
            return newKeys
          })
        }
        pendingClonedNodeIdRef.current = null
      }
    }
  }, [structure])

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

    if (node.key !== structure?.id) {
      const treeNode = node as TreeDataItem
      const currentPath = Array.isArray(treeNode.meta?.currentPath) ? treeNode.meta.currentPath as string[] : []
      const layout = getLayout({ startNode: node.key.toString() })
      if (layout === undefined) {
        return <></>
      }

      const currentDynType = fieldDefinitionRegistry.getDynamicType(currentFieldDefinition.fieldtype, false)

      const info: FieldDefinitionDragDropInfo = {
        type: 'field-definition',
        icon: (currentDynType !== undefined) ? { ...currentDynType.getIcon(), iconColorGroup: ['fieldDefinition_' + currentDynType.id, 'fieldDefinition'] } : { value: 'unknown' },
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

                    const newNode = addExternalFieldDefinition(parentId, info.data.external, targetIndex)
                    if (allowExternalDrop) {
                      const parentPath = currentPath.slice(0, -1)
                      const keysToExpand = getAllKeys(newNode)
                      setExpandedKeys(prev => {
                        const newKeys = [...new Set([...prev, ...keysToExpand])]
                        expandedKeysRef.current = newKeys
                        return newKeys
                      })
                      setCurrentFieldDefinitionId(newNode.id)
                      setCurrentFieldDefinitionIdPath([...parentPath, newNode.id])
                      setDetailView('layout')
                    }
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
                    const newNode = addExternalFieldDefinition(targetNodeId, info.data.external as Layout, 0)
                    if (allowExternalDrop) {
                      const targetPath = findCurrentPath(targetNodeId) ?? []
                      const keysToExpand = getAllKeys(newNode)
                      setExpandedKeys(prev => {
                        const newKeys = [...new Set([...prev, targetNodeId, ...keysToExpand])]
                        expandedKeysRef.current = newKeys
                        return newKeys
                      })
                      setCurrentFieldDefinitionId(newNode.id)
                      setCurrentFieldDefinitionIdPath([...targetPath, newNode.id])
                      setDetailView('layout')
                    }
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

                    const newNode = addExternalFieldDefinition(parentId, (info as FieldDefinitionDragDropInfo).data.external, insertIndex)
                    if (allowExternalDrop) {
                      const parentPath = currentPath.slice(0, -1)
                      const keysToExpand = getAllKeys(newNode)
                      setExpandedKeys(prev => {
                        const newKeys = [...new Set([...prev, ...keysToExpand])]
                        expandedKeysRef.current = newKeys
                        return newKeys
                      })
                      setCurrentFieldDefinitionId(newNode.id)
                      setCurrentFieldDefinitionIdPath([...parentPath, newNode.id])
                      setDetailView('layout')
                    }
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

    // Root node — not draggable, but accepts drops
    return (
      <HotspotDroppable
        hotspots={ [
          {
            id: 'drop-middle',
            position: { x: '0', y: '0', width: '100%', height: '100%' },
            isValidContext: (info) => {
              if (info.type !== 'field-definition') return false
              const rootPath = [structure.id]
              if (isEqual((info as FieldDefinitionDragDropInfo).data.area, area)) {
                const draggedCurrentPath = findCurrentPath((info as FieldDefinitionDragDropInfo).data.internal.id) ?? []
                return isValidChildFieldDefinition(rootPath, draggedCurrentPath)
              }
              const externalLayout = (info as FieldDefinitionDragDropInfo).data.external
              return allowExternalDrop && externalLayout !== undefined && isValidExternalChildFieldDefinition(rootPath, externalLayout)
            },
            onDrop: (info) => {
              const rootId = structure.id
              if (isEqual(info.data.area, area)) {
                moveFieldDefinition((info as FieldDefinitionDragDropInfo).data.internal.id, rootId, 0)
              } else {
                const newNode = addExternalFieldDefinition(rootId, (info as FieldDefinitionDragDropInfo).data.external, 0)
                if (allowExternalDrop) {
                  const keysToExpand = getAllKeys(newNode)
                  setExpandedKeys(prev => {
                    const newKeys = [...new Set([...prev, rootId, ...keysToExpand])]
                    expandedKeysRef.current = newKeys
                    return newKeys
                  })
                  setCurrentFieldDefinitionId(newNode.id)
                  setCurrentFieldDefinitionIdPath([rootId, newNode.id])
                  setDetailView('layout')
                }
              }
              expandNode(rootId)
            }
          }
        ] }
      >
        {titleComponent}
      </HotspotDroppable>
    )
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
          ...(initialTreeItem.key === structure?.id ? { title: t('field-definitions.base'), icon: <Icon value="folder" /> } : {}),
          className: 'ant-tree-node--has-drag-and-drop ' + (invalidFieldDefinitionIds.includes(initialTreeItem.key as string) ? 'tree-element-item--danger' : undefined),
          actions: [
            ...(actions ?? []),

            ...(initialTreeItem.key !== structure?.id && !isCustomLayout
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

            ...(!isCustomLayout && copiedPath === undefined && globalCopiedLayout !== undefined && isValidExternalChildFieldDefinition(currentPath as string[], globalCopiedLayout)
              ? [{
                  key: 'paste',
                  icon: 'paste'
                }]
              : []),

            ...(initialTreeItem.key !== structure?.id
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
  }, [structure, fieldDefinitions, invalidFieldDefinitionIds, copiedPath, isValidChildFieldDefinition, globalCopiedLayout, isValidExternalChildFieldDefinition])

  const onActionsClick: ITreeElementProps['onActionsClick'] = (nodeKey, actionKey, node) => {
    if (actionKey === 'clone') {
      const clonedNodeId = cloneFieldDefinition(nodeKey)
      pendingClonedNodeIdRef.current = clonedNodeId
    }

    if (actionKey === 'delete') {
      removeFieldDefinition(nodeKey)
    }

    if (actionKey === 'copy') {
      copyFieldDefinition(node.meta?.currentPath as string[] ?? [])
    }

    if (actionKey === 'paste') {
      if (copiedPath !== undefined) {
        pasteFieldDefinition(node.meta?.currentPath as string[] ?? [])
      } else if (globalCopiedLayout !== undefined) {
        const newNode = addExternalFieldDefinition(nodeKey, globalCopiedLayout)
        const keysToExpand = getAllKeys(newNode)
        if (keysToExpand.length > 0) {
          setExpandedKeys(prev => {
            const newKeys = [...new Set([...prev, ...keysToExpand])]
            expandedKeysRef.current = newKeys
            return newKeys
          })
        }
        expandNode(nodeKey)
        setCurrentFieldDefinitionId(newNode.id)
        setCurrentFieldDefinitionIdPath([...(node.meta?.currentPath as string[] ?? []), newNode.id])
        setDetailView('layout')
      }
    }

    if (actionKey.startsWith('add-')) {
      const typeId = actionKey.replace('add-', '')
      const type = fieldDefinitionRegistry.getDynamicType(typeId)

      const newFieldDefData = type.getDefaultData({ area, path: node.meta?.currentPath ?? [], fieldDefinitions })
      const newlyAddedFieldId = addFieldDefinition(nodeKey, newFieldDefData)
      setCurrentFieldDefinitionId(newlyAddedFieldId)
      setCurrentFieldDefinitionIdPath([...node?.meta?.currentPath ?? [], newlyAddedFieldId])
      setDetailView('layout')
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
    if (key === structure?.id) {
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
        padded
        padding={ { top: 'none', x: 'extra-small' } }
        style={ { height: 'fit-content', flexShrink: 0 } }
      >
        <Space
          className='w-full'
          direction='vertical'
          size='none'
        >
          <Button
            className='w-full'
            onClick={ () => {
              setDetailView('general')
              setCurrentFieldDefinitionId(null)
              setCurrentFieldDefinitionIdPath(null)
            } }
            style={ {
              backgroundColor: detailView === 'general' ? token.controlItemBgActive : undefined,
              borderRadius: token.borderRadiusSM,
              fontSize: token.fontSize,
              height: '24px',
              justifyContent: 'flex-start',
              padding: `0 ${token.paddingXS}px`,
              position: 'relative'
            } }
            type='text'
          >
            <div style={ { paddingLeft: '16px' } }>
              {t('field-definitions.general-settings')}
            </div>
            <div style={ { position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' } }>
              <Icon
                colorToken='colorPrimary'
                value='edit'
              />
            </div>
          </Button>

          <Divider style={ { margin: `${token.marginXS}px 0 0` } } />
        </Space>
      </Content>

      <Content
        overflow={ { x: 'hidden', y: 'auto' } }
        style={ { minHeight: 0, flex: 1 } }
      >
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
    </Content>
  )
}
