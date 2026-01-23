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
import { reduce } from '@Pimcore/modules/field-definitions/utils/layout-helpers'
import { type Layout as LayoutType } from '@sdk/api/class-definition'
import { uuid } from '@sdk/utils'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type Layout = LayoutType

export interface StructureNode {
  id: string
  children: StructureNode[]
}

export interface FieldDefinition extends Record<string, any> {
  fieldtype: string
}

export interface ILayoutContext {
  structure: StructureNode | undefined
  fieldDefinitions: Record<string, FieldDefinition>
  currentFieldDefinitionId: StructureNode['id'] | null
  currentFieldDefinitionIdPath: string[] | null
  invalidFieldDefinitionIds: string[]
  setInvalidFieldDefinitionIds: (ids: string[]) => void
  setCurrentFieldDefinitionId: (id: StructureNode['id'] | null) => void
  setCurrentFieldDefinitionIdPath: (path: string[] | null) => void
  updateFieldDefinition: (structureNodeId: StructureNode['id'], updatedFieldDefinition: FieldDefinition) => void
  addFieldDefinition: (structureNodeId: StructureNode['id'], newFieldDefinition: FieldDefinition) => StructureNode['id']
  removeFieldDefinition: (structureNodeId: StructureNode['id']) => void
  cloneFieldDefinition: (structureNodeId: StructureNode['id']) => StructureNode['id']
  moveFieldDefinition: (structureNodeId: StructureNode['id'], newParentId: StructureNode['id'], newIndex: number) => void
  getLayout: () => Layout
}

export interface LayoutProviderProps {
  layout: Layout | undefined
  children: React.ReactNode
}

export interface LayoutProviderFactoryReturn {
  LayoutProvider: (props: LayoutProviderProps) => React.JSX.Element
  useLayout: () => ILayoutContext
}

export const create = (): LayoutProviderFactoryReturn => {
  const LayoutContext = createContext<ILayoutContext | undefined>(undefined)

  const LayoutProvider = (props: LayoutProviderProps): React.JSX.Element => {
    const [structure, setStructure] = useState<ILayoutContext['structure']>(undefined)
    const [fieldDefinitions, setFieldDefinitions] = useState<ILayoutContext['fieldDefinitions']>({})
    const [currentFieldDefinitionId, setCurrentFieldDefinitionId] = useState<ILayoutContext['currentFieldDefinitionId']>(null)
    const [currentFieldDefinitionIdPath, setCurrentFieldDefinitionIdPath] = useState<ILayoutContext['currentFieldDefinitionIdPath']>(null)
    const [invalidFieldDefinitionIds, setInvalidFieldDefinitionIds] = useState<ILayoutContext['invalidFieldDefinitionIds']>([])

    useEffect(() => {
      if (props.layout === undefined) {
        setStructure(undefined)
        setFieldDefinitions({})
        setInvalidFieldDefinitionIds([])
        setCurrentFieldDefinitionId(null)
        setCurrentFieldDefinitionIdPath(null)
        return
      }

      const { structure: rootStructure, fieldDefinitions: initialFieldDefinitions } = reduce({ layout: props.layout })!

      setCurrentFieldDefinitionId(null)
      setCurrentFieldDefinitionIdPath(null)
      setInvalidFieldDefinitionIds([])
      setStructure(rootStructure)
      setFieldDefinitions(initialFieldDefinitions)
    }, [props.layout])

    const updateFieldDefinition = (structureNodeId: StructureNode['id'], updatedFieldDefinition: FieldDefinition): void => {
      setFieldDefinitions((prevDefs) => ({
        ...prevDefs,
        [structureNodeId]: {
          ...prevDefs[structureNodeId],
          ...updatedFieldDefinition
        }
      }))
    }

    const addFieldDefinition = (structureNodeId: StructureNode['id'], newFieldDefinition: FieldDefinition): StructureNode['id'] => {
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
    }

    const removeFieldDefinition = (structureNodeId: StructureNode['id']): void => {
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

      if (currentFieldDefinitionId === structureNodeId) {
        setCurrentFieldDefinitionId(null)
        setCurrentFieldDefinitionIdPath(null)
        setInvalidFieldDefinitionIds((prevIds) => prevIds.filter(id => id !== structureNodeId))
      }

      setStructure((prevStructure) => prevStructure !== undefined ? removeNodeRecursively(prevStructure) : prevStructure)
      setFieldDefinitions((prevDefs) => {
        const { [structureNodeId]: _, ...rest } = prevDefs
        return rest
      })
    }

    const cloneFieldDefinition = (structureNodeId: StructureNode['id']): StructureNode['id'] => {
      const oldToNewIdMap: Record<string, string> = {}

      const cloneNodeRecursively = (node: StructureNode): StructureNode => {
        const newId = uuid()
        oldToNewIdMap[node.id] = newId

        return {
          id: newId,
          children: node.children.map(cloneNodeRecursively)
        }
      }

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

      if (structure === undefined) {
        return structureNodeId
      }

      const nodeToClone = findNode(structure, structureNodeId)

      if (nodeToClone === undefined) {
        return structureNodeId
      }

      const clonedNode = cloneNodeRecursively(nodeToClone)

      setStructure((prevStructure) =>
        prevStructure !== undefined ? insertClonedNodeAsSibling(prevStructure, structureNodeId, clonedNode) : prevStructure
      )

      setFieldDefinitions((prevDefs) => {
        const newDefs = { ...prevDefs }

        Object.entries(oldToNewIdMap).forEach(([oldId, newId]) => {
          newDefs[newId] = { ...prevDefs[oldId] }
        })

        return newDefs
      })

      return clonedNode.id
    }

    const moveFieldDefinition = (structureNodeId: StructureNode['id'], newParentId: StructureNode['id'], newIndex: number): void => {
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
    }

    const getLayout: ILayoutContext['getLayout'] = () => {
      const buildLayoutRecursively = (node: StructureNode): Layout => {
        const fieldDef = fieldDefinitions[node.id]
        const children = node.children.map(buildLayoutRecursively)

        const { id, ...restFieldDef } = fieldDef

        /* eslint-disable @typescript-eslint/consistent-type-assertions */
        return {
          ...restFieldDef,
          children: (children.length > 0 ? children : null) as Layout['children']
        } as unknown as Layout
        /* eslint-enable @typescript-eslint/consistent-type-assertions */
      }

      // @todo ensure structure is defined by injecting pimcore_root early on when necessary
      return buildLayoutRecursively(structure!)
    }

    return useMemo(() => (
      <LayoutContext.Provider
        value={
          {
            structure,
            fieldDefinitions,
            currentFieldDefinitionId,
            currentFieldDefinitionIdPath,
            invalidFieldDefinitionIds,
            setInvalidFieldDefinitionIds,
            setCurrentFieldDefinitionId,
            setCurrentFieldDefinitionIdPath,
            updateFieldDefinition,
            addFieldDefinition,
            removeFieldDefinition,
            cloneFieldDefinition,
            moveFieldDefinition,
            getLayout
          }
        }
      >
        {props.children}
      </LayoutContext.Provider>
    ), [structure, fieldDefinitions, currentFieldDefinitionId, invalidFieldDefinitionIds, props.children])
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
