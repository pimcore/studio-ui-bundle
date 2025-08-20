/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useRef, useMemo, useCallback, type ReactNode } from 'react'
import type { TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'
import type { Element } from '@Pimcore/modules/element/element-helper'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'

export type StoreNode = TreeNodeProps | Element | undefined

export interface TreeCopyPasteContextType {
  getStoredNode: () => StoreNode
  getStoredElementType: () => ElementType | undefined
  getNodeTask: () => 'copy' | 'cut' | undefined
  setStoredNode: (node: StoreNode, elementType: ElementType) => void
  setNodeTask: (task: 'copy' | 'cut' | undefined) => void
  copyNode: (node: TreeNodeProps | Element, elementType: ElementType) => void
  cutNode: (node: TreeNodeProps | Element, elementType: ElementType) => void
  clearCopyPaste: () => void
  isValidElementType: (targetElementType: ElementType) => boolean
}

const TreeCopyPasteContext = createContext<TreeCopyPasteContextType | undefined>(undefined)

export interface TreeCopyPasteProviderProps {
  children: ReactNode
}

export const TreeCopyPasteProvider = ({ children }: TreeCopyPasteProviderProps): React.JSX.Element => {
  const storedNodeRef = useRef<StoreNode>(undefined)
  const storedElementTypeRef = useRef<ElementType | undefined>(undefined)
  const nodeTaskRef = useRef<'copy' | 'cut' | undefined>(undefined)

  const messageApi = useMessage()
  const { t } = useTranslation()

  const getStoredNode = useCallback((): StoreNode => storedNodeRef.current, [])
  const getStoredElementType = useCallback((): ElementType | undefined => storedElementTypeRef.current, [])
  const getNodeTask = useCallback((): 'copy' | 'cut' | undefined => nodeTaskRef.current, [])

  const setStoredNodeWithType = useCallback((node: StoreNode, elementType: ElementType): void => {
    storedNodeRef.current = node
    storedElementTypeRef.current = elementType
  }, [])

  const setNodeTask = useCallback((task: 'copy' | 'cut' | undefined): void => {
    nodeTaskRef.current = task
  }, [])

  const getNodeName = (node: TreeNodeProps | Element): string => {
    if ('filename' in node && node.filename !== '') {
      return node.filename
    }
    if ('label' in node && node.label !== '') {
      return node.label
    }
    return String(node.id)
  }

  const copyNode = useCallback((node: TreeNodeProps | Element, elementType: ElementType): void => {
    storedNodeRef.current = node
    storedElementTypeRef.current = elementType
    nodeTaskRef.current = 'copy'

    void messageApi.success(t('element.tree.copy-success-description', {
      elementType: t(elementType),
      name: getNodeName(node)
    }))
  }, [messageApi, t])

  const cutNode = useCallback((node: TreeNodeProps | Element, elementType: ElementType): void => {
    storedNodeRef.current = node
    storedElementTypeRef.current = elementType
    nodeTaskRef.current = 'cut'

    void messageApi.success(t('element.tree.cut-success-description', {
      elementType: t(elementType),
      name: getNodeName(node)
    }))
  }, [messageApi, t])

  const clearCopyPaste = useCallback((): void => {
    storedNodeRef.current = undefined
    storedElementTypeRef.current = undefined
    nodeTaskRef.current = undefined
  }, [])

  const isValidElementType = useCallback((targetElementType: ElementType): boolean => {
    return storedElementTypeRef.current === undefined || storedElementTypeRef.current === targetElementType
  }, [])

  const value: TreeCopyPasteContextType = useMemo(() => ({
    getStoredNode,
    getStoredElementType,
    getNodeTask,
    setStoredNode: setStoredNodeWithType,
    setNodeTask,
    copyNode,
    cutNode,
    clearCopyPaste,
    isValidElementType
  }), [getStoredNode, getStoredElementType, getNodeTask, setStoredNodeWithType, setNodeTask, copyNode, cutNode, clearCopyPaste, isValidElementType])

  return (
    <TreeCopyPasteContext.Provider value={ value }>
      {children}
    </TreeCopyPasteContext.Provider>
  )
}

export const useTreeCopyPasteContext = (elementType?: ElementType): TreeCopyPasteContextType => {
  const context = useContext(TreeCopyPasteContext)
  if (context === undefined) {
    throw new Error('useTreeCopyPasteContext must be used within a TreeCopyPasteProvider')
  }

  if (elementType === undefined) {
    return context
  }

  const elementTypeMatches = (): boolean => {
    const storedElementType = context.getStoredElementType()
    return storedElementType === undefined || storedElementType === elementType
  }

  return {
    ...context,
    getStoredNode: () => elementTypeMatches() ? context.getStoredNode() : undefined,
    getStoredElementType: () => elementTypeMatches() ? context.getStoredElementType() : undefined,
    getNodeTask: () => elementTypeMatches() ? context.getNodeTask() : undefined
  }
}
