/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { isNull, isNil } from 'lodash'
import { type AreaType, type AreablockEditableConfig } from '../areablock-editable'
import { type AreablockManager } from '../utils/areablock-manager'
import { configUtils } from '../utils/areablock-utils'
import { useEnhancedAreablockSorting } from './use-enhanced-areablock-sorting'
import { EmptyStateAreablockToolbar } from '../components/empty-state-areablock-toolbar/empty-state-areablock-toolbar'
import { useContext } from 'react'
import { isEmpty } from 'lodash'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'

export interface UseEnhancedAreablockControlsParams {
  areablockManager: AreablockManager
  areaTypes: AreaType[]
  config?: AreablockEditableConfig
  onAddArea: (element: HTMLElement | null, areaType?: string) => Promise<void>
  onRemoveArea: (element: HTMLElement) => void
  onMoveAreaUp: (element: HTMLElement) => void
  onMoveAreaDown: (element: HTMLElement) => void
  onMoveArea: (fromIndex: number, toIndex: number) => void
}

export interface UseEnhancedAreablockControlsReturn {
  activeId: string | null
  handleDragStart: (event: any) => void
  handleDragOver: (event: any) => void
  handleDragEnd: (event: any) => void
  dropzonePortals: React.ReactPortal[]
  dragOverlayTitle: string
  refreshDropzones: () => void
  updateControls: (element: HTMLElement, limitReached: boolean) => void
  initializeControls: () => void
  emptyStatePortal: React.ReactPortal | null
}

export const useEnhancedAreablockControls = ({
  areablockManager,
  areaTypes,
  config,
  onAddArea,
  onRemoveArea,
  onMoveAreaUp,
  onMoveAreaDown,
  onMoveArea
}: UseEnhancedAreablockControlsParams): UseEnhancedAreablockControlsReturn => {
  const { id: documentId } = useContext(DocumentContext)
  const limitReachedRef = useRef<boolean>(false)
  const [emptyStatePortal, setEmptyStatePortal] = useState<React.ReactPortal | null>(null)

  // Create the addAreaAtIndex function for dropzone integration
  const addAreaAtIndex = useCallback(async (areaType: string, index: number) => {
    const limit = configUtils.getEffectiveLimit(config)
    const currentElements = areablockManager.queryElements()
    
    if (configUtils.isLimitReached(currentElements.length, limit)) return
    if (!configUtils.isTypeAllowed(config, areaType)) return

    const nextKey = areablockManager.calculateNextKey()

    try {
      // Create placeholder element
      const placeholderElement = document.createElement('div')
      placeholderElement.className = 'pimcore-areablock-placeholder'
      placeholderElement.setAttribute('data-placeholder-key', nextKey.toString())
      placeholderElement.style.display = 'none'

      const container = areablockManager.getContainer()
      if (!isNil(container)) {
        if (isEmpty(currentElements)) {
          container.appendChild(placeholderElement)
        } else if (index > 0 && !isNil(currentElements[index - 1])) {
          currentElements[index - 1].insertAdjacentElement('afterend', placeholderElement)
        } else if (!isNil(currentElements[index])) {
          currentElements[index].insertAdjacentElement('beforebegin', placeholderElement)
        } else {
          container.appendChild(placeholderElement)
        }
      }

      const saveData = areablockManager.getAreablockValue()
      saveData.splice(index, 0, {
        key: nextKey,
        type: areaType,
        hidden: false
      })

      const response = await fetch('/admin/page/areabrick-render-index-editmode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          documentId: documentId.toString(),
          name: areablockManager.getEditableName(),
          realName: areablockManager.getEditableName(),
          index: index.toString(),
          blockStateStack: config?.blockStateStack ?? JSON.stringify([{ blocks: [], indexes: [] }]),
          areablockConfig: JSON.stringify(config ?? {}),
          areablockData: JSON.stringify(saveData)
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!isNil(result.htmlCode) && !isNil(placeholderElement.parentNode)) {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = result.htmlCode
        const newElement = tempDiv.firstElementChild

        if (!isNil(newElement)) {
          placeholderElement.parentNode.replaceChild(newElement, placeholderElement)
          areablockManager.setElementKey(newElement as HTMLElement, nextKey.toString())
          areablockManager.setElementType(newElement as HTMLElement, areaType)
        }
      }
    } catch (error) {
      console.error('Error adding area at index:', error)
    }
  }, [areablockManager, config, documentId])

  const {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals,
    dragOverlayTitle,
    refreshDropzones
  } = useEnhancedAreablockSorting({
    areablockManager,
    areaTypes,
    config,
    onMoveArea,
    onAddAreaAtIndex: addAreaAtIndex
  })

  const handleAddArea = useCallback(async (element: HTMLElement | null, areaType?: string) => {
    await onAddArea(element, areaType)
    refreshDropzones()
  }, [onAddArea, refreshDropzones])

  const handleRemoveArea = useCallback((element: HTMLElement) => {
    onRemoveArea(element)
    refreshDropzones()
  }, [onRemoveArea, refreshDropzones])

  const handleMoveAreaUp = useCallback((element: HTMLElement) => {
    onMoveAreaUp(element)
    refreshDropzones()
  }, [onMoveAreaUp, refreshDropzones])

  const handleMoveAreaDown = useCallback((element: HTMLElement) => {
    onMoveAreaDown(element)
    refreshDropzones()
  }, [onMoveAreaDown, refreshDropzones])

  const updateControls = useCallback((element: HTMLElement, limitReached: boolean) => {
    const buttonsContainer = element.querySelector('.pimcore_area_buttons')

    if (isNull(buttonsContainer)) {
      return
    }

    limitReachedRef.current = limitReached

    const buttonElements = buttonsContainer.querySelectorAll('.pimcore_area_plus, .pimcore_area_minus, .pimcore_area_up, .pimcore_area_down, .pimcore_area_type')
    buttonElements.forEach(button => {
      (button as HTMLElement).style.display = 'none'
    })
  }, [])

  const initializeControls = useCallback((): void => {
    const container = areablockManager.getContainer()
    if (isNull(container)) return

    if (emptyStatePortal !== null) return

    const emptyStateToolbar = (
      <EmptyStateAreablockToolbar
        areaTypes={ areaTypes }
        config={ config }
        onClick={ async (areaType) => {
          setEmptyStatePortal(null)
          await handleAddArea(null, areaType)
        } }
      />
    )

    const portal = ReactDOM.createPortal(emptyStateToolbar, container)
    setEmptyStatePortal(portal)
  }, [areablockManager, areaTypes, config, handleAddArea, emptyStatePortal])

  return {
    activeId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    dropzonePortals,
    dragOverlayTitle,
    refreshDropzones,
    updateControls,
    initializeControls,
    emptyStatePortal
  }
}
