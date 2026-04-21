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
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { globalFieldDefinitionClipboard } from '@Pimcore/modules/field-definitions/utils/global-clipboard'
import { reduce } from '@Pimcore/modules/field-definitions/utils/layout-helpers'
import { type Layout as LayoutType } from '@sdk/api/class-definition'
import { uuid } from '@sdk/utils'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

export type Layout = LayoutType

export interface StructureNode {
  id: string
  children: StructureNode[]
}

export interface FieldDefinition extends Record<string, any> {
  fieldtype: string
}

export interface GetLayoutProps {
  startNode?: string
}

export interface ILayoutContext {
  structure: StructureNode | undefined
  fieldDefinitions: Record<string, FieldDefinition>
  copiedPath?: string[]
  currentFieldDefinitionId: StructureNode['id'] | null
  currentFieldDefinitionIdPath: string[] | null
  invalidFieldDefinitionIds: string[]
  setInvalidFieldDefinitionIds: (ids: string[]) => void
  setCurrentFieldDefinitionId: (id: StructureNode['id'] | null) => void
  setCurrentFieldDefinitionIdPath: (path: string[] | null) => void
  updateFieldDefinition: (structureNodeId: StructureNode['id'], updatedFieldDefinition: FieldDefinition, overwriteValues?: boolean) => void
  addFieldDefinition: (structureNodeId: StructureNode['id'], newFieldDefinition: FieldDefinition) => StructureNode['id']
  removeFieldDefinition: (structureNodeId: StructureNode['id']) => void
  removeChildren: (structureNodeId: StructureNode['id']) => void
  cloneFieldDefinition: (structureNodeId: StructureNode['id']) => StructureNode['id']
  moveFieldDefinition: (structureNodeId: StructureNode['id'], newParentId: StructureNode['id'], newIndex: number) => void
  copyFieldDefinition: (path: string[]) => void
  pasteFieldDefinition: (path: string[]) => void
  isValidChildFieldDefinition: (targetPath: string[], childPath: string[]) => boolean
  isValidExternalChildFieldDefinition: (targetPath: string[], externalLayout: Layout) => boolean
  getLayout: (props?: GetLayoutProps) => Layout | undefined
  addExternalFieldDefinition: (structureNodeId: StructureNode['id'], layout: Layout, insertIndex?: number) => StructureNode
}

export interface LayoutProviderProps {
  layout: Layout | undefined
  fieldDefinitionRegistry: DynamicTypeFieldDefinitionRegistry
  children: React.ReactNode
}

export interface LayoutProviderFactoryReturn {
  LayoutProvider: (props: LayoutProviderProps) => React.JSX.Element
  useLayout: () => ILayoutContext
}

export const create = (): LayoutProviderFactoryReturn => {
  const LayoutContext = createContext<ILayoutContext | undefined>(undefined)

  const findNode = (node: StructureNode, targetId: string): StructureNode | undefined => {
    if (node.id === targetId) {
      return node
    }

    for (const child of node.children) {
      const found = findNode(child, targetId)
      if (found !== undefined) return found
    }

    return undefined
  }

  const collectChildIds = (node: StructureNode): string[] => {
    let ids: string[] = []
    node.children.forEach((child) => {
      ids.push(child.id)
      ids = ids.concat(collectChildIds(child))
    })
    return ids
  }

  const collectAllIds = (node: StructureNode): string[] => {
    const ids: string[] = [node.id]
    node.children.forEach((child) => {
      ids.push(...collectAllIds(child))
    })
    return ids
  }

  const findPathToNode = (node: StructureNode, targetId: string, currentPath: string[] = []): string[] | undefined => {
    const newPath = [...currentPath, node.id]

    if (node.id === targetId) {
      return newPath
    }

    for (const child of node.children) {
      const found = findPathToNode(child, targetId, newPath)
      if (found !== undefined) return found
    }

    return undefined
  }

  const cloneNodeWithIdMapping = (node: StructureNode, idMap: Record<string, string>): StructureNode => {
    const newId = uuid()
    idMap[node.id] = newId

    return {
      id: newId,
      children: node.children.map(child => cloneNodeWithIdMapping(child, idMap))
    }
  }

  const getNextIndexedName = (baseName: string, siblingNames: string[]): string => {
    // Extract the base name and current number (if exists)
    const match = baseName.match(/^(.*?)(\d+)$/)
    const nameWithoutNumber = match !== null ? match[1] : baseName
    const currentNumber = match !== null ? parseInt(match[2], 10) : 0

    // Find the highest index among siblings with the same base name
    let maxIndex = currentNumber
    siblingNames.forEach(name => {
      const siblingMatch = name.match(/^(.*?)(\d+)$/)
      const siblingBase = siblingMatch !== null ? siblingMatch[1] : name
      const siblingNumber = siblingMatch !== null ? parseInt(siblingMatch[2], 10) : 0

      if (siblingBase === nameWithoutNumber && siblingNumber > maxIndex) {
        maxIndex = siblingNumber
      }
    })

    // Return the next number
    const nextNumber = maxIndex + 1
    return `${nameWithoutNumber}${nextNumber}`
  }

  const LayoutProvider = (props: LayoutProviderProps): React.JSX.Element => {
    const [structure, setStructure] = useState<ILayoutContext['structure']>(undefined)
    const [fieldDefinitions, setFieldDefinitions] = useState<ILayoutContext['fieldDefinitions']>({})
    const [currentFieldDefinitionId, setCurrentFieldDefinitionId] = useState<ILayoutContext['currentFieldDefinitionId']>(null)
    const [currentFieldDefinitionIdPath, setCurrentFieldDefinitionIdPath] = useState<ILayoutContext['currentFieldDefinitionIdPath']>(null)
    const [invalidFieldDefinitionIds, setInvalidFieldDefinitionIds] = useState<ILayoutContext['invalidFieldDefinitionIds']>([])
    const [copiedPath, setCopiedPath] = useState<ILayoutContext['copiedPath']>(undefined)
    const fieldDefinitionRegistry = props.fieldDefinitionRegistry
    const { area } = useArea()

    // Use refs to always access latest values in callbacks
    const structureRef = React.useRef(structure)
    const fieldDefinitionsRef = React.useRef(fieldDefinitions)
    const areaRef = React.useRef(area)
    const isInitializedRef = useRef(false)

    React.useEffect(() => {
      structureRef.current = structure
      fieldDefinitionsRef.current = fieldDefinitions
      areaRef.current = area
    }, [structure, fieldDefinitions, area])

    useEffect(() => {
      if (props.layout === undefined) {
        // Reset: layout cleared or switching away
        isInitializedRef.current = false
        setStructure(undefined)
        setFieldDefinitions({})
        setInvalidFieldDefinitionIds([])
        setCurrentFieldDefinitionId(null)
        setCurrentFieldDefinitionIdPath(null)
        setCopiedPath(undefined)
        return
      }

      if (isInitializedRef.current) {
        // Already initialized — ignore post-save refetches.
        // The explicit refresh button remounts the component via key increment,
        // which is the correct mechanism to re-sync from server.
        return
      }

      // First time we have a defined layout — initialize
      isInitializedRef.current = true
      const { structure: rootStructure, fieldDefinitions: initialFieldDefinitions } = reduce({ layout: props.layout })!

      setCurrentFieldDefinitionId(null)
      setCurrentFieldDefinitionIdPath(null)
      setInvalidFieldDefinitionIds([])
      setStructure(rootStructure)
      setFieldDefinitions(initialFieldDefinitions)
    }, [props.layout])

    const updateFieldDefinition = useCallback((structureNodeId: StructureNode['id'], updatedFieldDefinition: FieldDefinition, overwriteValues: boolean = false): void => {
      setFieldDefinitions((prevDefs) => ({
        ...prevDefs,
        [structureNodeId]: {
          ...(overwriteValues ? updatedFieldDefinition : { ...prevDefs[structureNodeId], ...updatedFieldDefinition })
        }
      }))
    }, [])

    const addFieldDefinition = useCallback((structureNodeId: StructureNode['id'], newFieldDefinition: FieldDefinition): StructureNode['id'] => {
      const newId = uuid()

      const addNodeRecursively = (node: StructureNode): StructureNode => {
        if (node.id === structureNodeId) {
          return {
            ...node,
            children: [...node.children, { id: newId, children: [] }]
          }
        }

        return {
          ...node,
          children: node.children.map(addNodeRecursively)
        }
      }

      setStructure((prevStructure) => prevStructure !== undefined ? addNodeRecursively(prevStructure) : prevStructure)
      setFieldDefinitions((prevDefs) => ({
        ...prevDefs,
        [newId]: newFieldDefinition
      }))

      return newId
    }, [])

    const removeFieldDefinition = useCallback((structureNodeId: StructureNode['id']): void => {
      const removeNodeRecursively = (node: StructureNode): StructureNode | undefined => {
        if (node.id === structureNodeId) {
          return undefined
        }

        const updatedChildren = node.children
          .map(removeNodeRecursively)
          .filter((child): child is StructureNode => child !== undefined)

        return {
          ...node,
          children: updatedChildren
        }
      }

      setCurrentFieldDefinitionId((prevId) => {
        if (prevId === structureNodeId) {
          setCurrentFieldDefinitionIdPath(null)
          setInvalidFieldDefinitionIds((prevIds) => prevIds.filter(id => id !== structureNodeId))
          return null
        }
        return prevId
      })

      setStructure((prevStructure) => prevStructure !== undefined ? removeNodeRecursively(prevStructure) : prevStructure)
      setFieldDefinitions((prevDefs) => {
        const { [structureNodeId]: _, ...rest } = prevDefs
        return rest
      })
    }, [])

    const removeChildren = useCallback((structureNodeId: StructureNode['id']): void => {
      const removeChildrenRecursively = (node: StructureNode): StructureNode => {
        if (node.id === structureNodeId) {
          return {
            ...node,
            children: []
          }
        }

        return {
          ...node,
          children: node.children.map(removeChildrenRecursively)
        }
      }

      setStructure((prevStructure) => {
        if (prevStructure === undefined) return prevStructure

        const updatedStructure = removeChildrenRecursively(prevStructure)

        setFieldDefinitions((prevDefs) => {
          const targetNode = findNode(prevStructure, structureNodeId)
          if (targetNode === undefined) return prevDefs

          const childIds = collectChildIds(targetNode)
          const newDefs = { ...prevDefs }

          childIds.forEach((id) => {
            /* eslint-disable @typescript-eslint/no-dynamic-delete */
            delete newDefs[id]
            /* eslint-enable @typescript-eslint/no-dynamic-delete */
          })

          return newDefs
        })

        return updatedStructure
      })
    }, [])

    const cloneFieldDefinition = useCallback((structureNodeId: StructureNode['id']): StructureNode['id'] => {
      const insertClonedNodeAsSibling = (node: StructureNode, targetId: string, clonedNode: StructureNode): StructureNode => {
        const childIndex = node.children.findIndex(child => child.id === targetId)

        if (childIndex !== -1) {
          const newChildren = [...node.children]
          newChildren.splice(childIndex + 1, 0, clonedNode)

          return {
            ...node,
            children: newChildren
          }
        }

        return {
          ...node,
          children: node.children.map(child => insertClonedNodeAsSibling(child, targetId, clonedNode))
        }
      }

      const findParentNode = (node: StructureNode, targetId: string): StructureNode | undefined => {
        for (const child of node.children) {
          if (child.id === targetId) {
            return node
          }
          const found = findParentNode(child, targetId)
          if (found !== undefined) return found
        }
        return undefined
      }

      let clonedId = structureNodeId

      setStructure((prevStructure) => {
        if (prevStructure === undefined) {
          return prevStructure
        }

        const nodeToClone = findNode(prevStructure, structureNodeId)

        if (nodeToClone === undefined) {
          return prevStructure
        }

        // Find parent to get sibling names
        const parentNode = findParentNode(prevStructure, structureNodeId) ?? prevStructure
        const siblingNames = parentNode.children.map(child => fieldDefinitionsRef.current[child.id]?.name ?? '').filter(name => name !== '')

        const oldToNewIdMap: Record<string, string> = {}
        const clonedNode = cloneNodeWithIdMapping(nodeToClone, oldToNewIdMap)
        clonedId = clonedNode.id

        setFieldDefinitions((prevDefs) => {
          const newDefs = { ...prevDefs }

          Object.entries(oldToNewIdMap).forEach(([oldId, newId]) => {
            const clonedDef = { ...prevDefs[oldId] }

            // Update the name with index only for the root cloned node
            if (oldId === structureNodeId && clonedDef.name !== undefined && typeof clonedDef.name === 'string') {
              clonedDef.name = getNextIndexedName(clonedDef.name, siblingNames as string[])
            }

            newDefs[newId] = clonedDef
          })

          return newDefs
        })

        return insertClonedNodeAsSibling(prevStructure, structureNodeId, clonedNode)
      })

      return clonedId
    }, [])

    const moveFieldDefinition = useCallback((structureNodeId: StructureNode['id'], newParentId: StructureNode['id'], newIndex: number): void => {
      const findAndRemoveNode = (node: StructureNode, targetId: string): { updatedNode: StructureNode | null, removedNode: StructureNode | null } => {
        if (node.id === targetId) {
          return { updatedNode: null, removedNode: node }
        }

        let removedNode: StructureNode | null = null
        const updatedChildren = node.children
          .map((child) => {
            const result = findAndRemoveNode(child, targetId)
            if (result.removedNode !== null) {
              removedNode = result.removedNode
            }
            return result.updatedNode
          })
          .filter((child): child is StructureNode => child !== null)

        return { updatedNode: { ...node, children: updatedChildren }, removedNode }
      }

      const insertNodeAtNewPosition = (node: StructureNode, targetParentId: string, nodeToInsert: StructureNode, index: number): StructureNode => {
        if (node.id === targetParentId) {
          const newChildren = [...node.children]
          newChildren.splice(index, 0, nodeToInsert)
          return { ...node, children: newChildren }
        }

        return {
          ...node,
          children: node.children.map((child) => insertNodeAtNewPosition(child, targetParentId, nodeToInsert, index))
        }
      }

      setStructure((prevStructure) => {
        if (prevStructure === undefined) return prevStructure

        const { updatedNode, removedNode } = findAndRemoveNode(prevStructure, structureNodeId)
        if (removedNode === null || updatedNode === null) return prevStructure

        return insertNodeAtNewPosition(updatedNode, newParentId, removedNode, newIndex)
      })
    }, [])

    const copyFieldDefinition = useCallback((path: string[]): void => {
      setCopiedPath(path)

      // Also write a Layout snapshot to the global clipboard so it can be
      // pasted into other editor instances (cross-configuration copy/paste).
      const nodeId = path[path.length - 1]
      const currentStructure = structureRef.current
      const currentFieldDefs = fieldDefinitionsRef.current

      if (currentStructure === undefined || nodeId === undefined) {
        return
      }

      const buildLayoutFromNode = (node: StructureNode): Layout => {
        const fieldDef = currentFieldDefs[node.id]
        const children = node.children.map(buildLayoutFromNode)
        const { id, ...restFieldDef } = fieldDef

        return {
          ...restFieldDef,
          children: (children.length > 0 ? children : null) as Layout['children']
        } as unknown as Layout
      }

      const targetNode = findNode(currentStructure, nodeId)
      if (targetNode !== undefined) {
        globalFieldDefinitionClipboard.set(buildLayoutFromNode(targetNode))
      }
    }, [])

    const pasteFieldDefinition = useCallback((path: string[]): void => {
      setCopiedPath((currentCopiedPath) => {
        if (currentCopiedPath === undefined) {
          return currentCopiedPath
        }

        const sourceId = currentCopiedPath[currentCopiedPath.length - 1]
        const targetId = path[path.length - 1]

        setStructure((prevStructure) => {
          if (prevStructure === undefined) {
            return prevStructure
          }

          const sourceNode = findNode(prevStructure, sourceId)

          if (sourceNode === undefined) {
            return prevStructure
          }

          const oldToNewIdMap: Record<string, string> = {}
          const clonedNode = cloneNodeWithIdMapping(sourceNode, oldToNewIdMap)

          const attachNodeRecursively = (node: StructureNode): StructureNode => {
            if (node.id === targetId) {
              return {
                ...node,
                children: [...node.children, clonedNode]
              }
            }

            return {
              ...node,
              children: node.children.map(attachNodeRecursively)
            }
          }

          setFieldDefinitions((prevDefs) => {
            const newDefs = { ...prevDefs }

            Object.entries(oldToNewIdMap).forEach(([oldId, newId]) => {
              if (prevDefs[oldId] !== undefined) {
                newDefs[newId] = { ...prevDefs[oldId] }
              }
            })

            return newDefs
          })

          return attachNodeRecursively(prevStructure)
        })

        return currentCopiedPath
      })
    }, [])

    const getLayout: ILayoutContext['getLayout'] = useCallback((props) => {
      const fromNodeId = props?.startNode
      let structureToConvert = structure

      if (fromNodeId !== undefined && structure !== undefined) {
        const fromNode = findNode(structure, fromNodeId)
        if (fromNode !== undefined) {
          structureToConvert = fromNode
        }
      }

      if (structureToConvert === undefined) {
        return undefined
      }

      const buildLayoutRecursively = (node: StructureNode): Layout => {
        const fieldDef = fieldDefinitions[node.id]
        const children = node.children.map(buildLayoutRecursively)

        const { id, ...restFieldDef } = fieldDef

        return {
          ...restFieldDef,
          children: (children.length > 0 ? children : null) as Layout['children']
        } as unknown as Layout
      }

      return buildLayoutRecursively(structureToConvert)
    }, [structure, fieldDefinitions])

    const getRecursiveChildrenIdsFromPath = useCallback((path: string[]): string[] => {
      if (structureRef.current === undefined) return []

      const targetNode = findNode(structureRef.current, path[path.length - 1])
      return targetNode !== undefined ? collectAllIds(targetNode) : []
    }, [])

    const isValidChildFieldDefinition = useCallback((targetPath: string[], childPath: string[]): boolean => {
      // Rebuild current paths from structure to handle moved nodes
      const currentStructure = structureRef.current
      if (currentStructure === undefined) {
        return false
      }

      const targetId = targetPath[targetPath.length - 1]
      const childId = childPath[childPath.length - 1]

      const currentTargetPath = findPathToNode(currentStructure, targetId)
      const currentChildPath = findPathToNode(currentStructure, childId)

      if (currentTargetPath === undefined || currentChildPath === undefined) {
        return false
      }

      // Check for circular reference using current paths
      if (currentTargetPath.includes(childId)) {
        return false
      }

      const fieldDefs = fieldDefinitionsRef.current
      const currentFieldDef = fieldDefs[targetId]
      const childFieldDef = fieldDefs[childId]

      if (currentFieldDef === undefined) {
        return false
      }

      const currentDynType = fieldDefinitionRegistry.getDynamicType(currentFieldDef.fieldtype, false)
      const childDynType = fieldDefinitionRegistry.getDynamicType(childFieldDef?.fieldtype, false)

      const isRoot = currentTargetPath.length === 1

      if ((childDynType === undefined) || (currentDynType === undefined && !isRoot)) {
        return false
      }

      const targetContext = {
        area: areaRef.current,
        fieldDefinitions: fieldDefs,
        path: currentTargetPath
      }

      const validChildTags = fieldDefinitionRegistry.resolveTags(
        !isRoot ? currentDynType?.getValidChildTags(targetContext) : ['group:root'],
        targetContext
      )

      if (!validChildTags.includes(childDynType.id)) {
        return false
      }

      const targetFieldDefinitions = currentTargetPath.map((id) => fieldDefs[id])
      let blockedChildTags: string[] = []

      for (const currentFieldDef of targetFieldDefinitions) {
        const dynType = fieldDefinitionRegistry.getDynamicType(currentFieldDef.fieldtype, false)

        if (dynType === undefined) {
          continue
        }

        blockedChildTags.push(...dynType.getDisallowedRecursiveChildTags({
          area: areaRef.current,
          fieldDefinitions: fieldDefs,
          path: currentTargetPath
        }))
      }

      blockedChildTags = fieldDefinitionRegistry.resolveTags(blockedChildTags, {
        area: areaRef.current,
        fieldDefinitions: fieldDefs,
        path: currentTargetPath
      })

      const childFieldDefinitions: FieldDefinition[] = []
      const childNodes = getRecursiveChildrenIdsFromPath(currentChildPath)

      for (const childNodeId of childNodes) {
        if (childNodeId === childId) {
          continue
        }

        const childFieldDef = fieldDefs[childNodeId]

        if (childFieldDef !== undefined) {
          childFieldDefinitions.push(childFieldDef)
        }
      }

      const childrenTags = childFieldDefinitions.map((def) => {
        return def.fieldtype
      })

      if (childrenTags.some((tag) => blockedChildTags.includes(tag))) {
        return false
      }

      return true
    }, [fieldDefinitionRegistry, getRecursiveChildrenIdsFromPath])

    const isValidExternalChildFieldDefinition = useCallback((targetPath: string[], externalLayout: Layout): boolean => {
      // Rebuild current path from structure to handle moved nodes
      const currentStructure = structureRef.current
      if (currentStructure === undefined) {
        return false
      }

      const targetId = targetPath[targetPath.length - 1]
      const currentTargetPath = findPathToNode(currentStructure, targetId)

      if (currentTargetPath === undefined) {
        return false
      }

      const fieldDefs = fieldDefinitionsRef.current
      const currentFieldDef = fieldDefs[targetId]

      if (currentFieldDef === undefined || externalLayout === undefined) {
        return false
      }

      const externalFieldtype: string | undefined = externalLayout.fieldtype

      if (externalFieldtype === undefined) {
        return false
      }

      const currentDynType = fieldDefinitionRegistry.getDynamicType(currentFieldDef.fieldtype, false)
      const childDynType = fieldDefinitionRegistry.getDynamicType(externalFieldtype, false)

      const isRoot = currentTargetPath.length === 1

      if ((childDynType === undefined) || (currentDynType === undefined && !isRoot)) {
        return false
      }

      const targetContext = {
        area: areaRef.current,
        fieldDefinitions: fieldDefs,
        path: currentTargetPath
      }

      const validChildTags = fieldDefinitionRegistry.resolveTags(
        !isRoot ? currentDynType?.getValidChildTags(targetContext) : ['group:root'],
        targetContext
      )

      if (!validChildTags.includes(childDynType.id)) {
        return false
      }

      return true
    }, [fieldDefinitionRegistry])

    const addExternalFieldDefinition: ILayoutContext['addExternalFieldDefinition'] = useCallback((structureNodeId, layout, insertIndex) => {
      const { structure: externalStructure, fieldDefinitions: externalFieldDefinitions } = reduce({ layout })!

      const addNodeRecursively = (node: StructureNode): StructureNode => {
        if (node.id === structureNodeId) {
          const newChildren = [...node.children]
          if (typeof insertIndex === 'number') {
            const clamped = Math.min(Math.max(insertIndex, 0), newChildren.length)
            newChildren.splice(clamped, 0, externalStructure)
          } else {
            newChildren.push(externalStructure)
          }

          return { ...node, children: newChildren }
        }

        return {
          ...node,
          children: node.children.map(addNodeRecursively)
        }
      }

      setStructure((prevStructure) => prevStructure !== undefined ? addNodeRecursively(prevStructure) : prevStructure)
      setFieldDefinitions((prevDefs) => ({
        ...prevDefs,
        ...externalFieldDefinitions
      }))

      return externalStructure
    }, [])

    return useMemo(() => (
      <LayoutContext.Provider
        value={
          {
            structure,
            fieldDefinitions,
            copiedPath,
            currentFieldDefinitionId,
            currentFieldDefinitionIdPath,
            invalidFieldDefinitionIds,
            setInvalidFieldDefinitionIds,
            setCurrentFieldDefinitionId,
            setCurrentFieldDefinitionIdPath,
            updateFieldDefinition,
            addFieldDefinition,
            addExternalFieldDefinition,
            removeFieldDefinition,
            removeChildren,
            copyFieldDefinition,
            pasteFieldDefinition,
            cloneFieldDefinition,
            moveFieldDefinition,
            isValidChildFieldDefinition,
            isValidExternalChildFieldDefinition,
            getLayout
          }
        }
      >
        {props.children}
      </LayoutContext.Provider>
    ), [
      structure,
      fieldDefinitions,
      copiedPath,
      currentFieldDefinitionId,
      currentFieldDefinitionIdPath,
      invalidFieldDefinitionIds,
      updateFieldDefinition,
      addFieldDefinition,
      addExternalFieldDefinition,
      removeFieldDefinition,
      removeChildren,
      copyFieldDefinition,
      pasteFieldDefinition,
      cloneFieldDefinition,
      moveFieldDefinition,
      isValidChildFieldDefinition,
      isValidExternalChildFieldDefinition,
      getLayout,
      props.children
    ])
  }

  const useLayout = (): ILayoutContext => {
    const context = useContext(LayoutContext)

    if (context === undefined) {
      throw new Error('useLayout must be used within a LayoutProvider')
    }

    return context
  }

  return {
    LayoutProvider,
    useLayout
  }
}
