/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useEffect, useRef } from 'react'
import { isNull } from 'lodash'
import { useBlockEditableStyles } from '../block-editable.styles'
import { type BlockManager } from '../utils/block-manager'
import React from 'react'
import ReactDOM from 'react-dom'
import { ToolStrip } from '@Pimcore/components/toolstrip/tool-strip'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Split } from '@Pimcore/components/split/split'
import { Space } from 'antd'
import { useTranslation } from 'react-i18next'

export interface UseBlockControlsParams {
  editableName: string
  onAddBlock: (element: HTMLElement | null, amount?: number) => void
  onRemoveBlock: (element: HTMLElement) => void
  onMoveBlockUp: (element: HTMLElement) => void
  onMoveBlockDown: (element: HTMLElement) => void
}

export interface UseBlockControlsReturn {
  updateControls: (element: HTMLElement, limitReached: boolean) => void
  initializeControls: (blockManager: BlockManager) => void
  renderBlockToolbar: () => React.JSX.Element
  cleanupControls: () => void
}

export const useBlockControls = ({
  editableName,
  onAddBlock,
  onRemoveBlock,
  onMoveBlockUp,
  onMoveBlockDown
}: UseBlockControlsParams): UseBlockControlsReturn => {
  const { styles } = useBlockEditableStyles()
  const { t } = useTranslation()
  const portalContainersRef = useRef<Map<HTMLElement, HTMLElement>>(new Map())
  const limitReachedRef = useRef<boolean>(false)

  const createBlockToolbar = useCallback((buttonsContainer: HTMLElement, element: HTMLElement, limitReached: boolean): React.JSX.Element => {
    // Get element index and total elements for button state
    const elements = Array.from(element.parentElement?.querySelectorAll('.pimcore_block_entry[data-name="' + editableName + '"][key]') ?? [])
    const elementIndex = elements.indexOf(element)
    const isFirst = elementIndex === 0
    const isLast = elementIndex === elements.length - 1

    // Check which button divs exist to determine what buttons to show
    const hasPlus = !isNull(buttonsContainer.querySelector('.pimcore_block_plus'))
    const hasMinus = !isNull(buttonsContainer.querySelector('.pimcore_block_minus'))
    const hasUp = !isNull(buttonsContainer.querySelector('.pimcore_block_up'))
    const hasDown = !isNull(buttonsContainer.querySelector('.pimcore_block_down'))
    const amountDisplay = buttonsContainer.querySelector('.pimcore_block_amount')

    const buttons: React.ReactNode[] = []
    let deleteButton: React.ReactNode = null

    // Add buttons based on existing divs
    if (hasPlus && !limitReached) {
      buttons.push(
        <IconButton
          key="plus"
          icon={{ value: 'new' }}
          onClick={() => { onAddBlock(element, 1) }}
          title={t('add-block-entry')}
        />
      )
    }

    if (hasUp) {
      buttons.push(
        <IconButton
          key="up"
          icon={{ value: 'move-up' }}
          onClick={() => { onMoveBlockUp(element) }}
          title={isFirst ? t('cannot-move-up') : t('move-up')}
          disabled={isFirst}
        />
      )
    }

    if (hasDown) {
      buttons.push(
        <IconButton
          key="down"
          icon={{ value: 'move-down' }}
          onClick={() => { onMoveBlockDown(element) }}
          title={isLast ? t('cannot-move-down') : t('move-down')}
          disabled={isLast}
        />
      )
    }

    if (hasMinus) {
      deleteButton = (
        <IconButton
          key="minus"
          icon={{ value: 'trash' }}
          onClick={() => { onRemoveBlock(element) }}
          title={t('remove-block-entry')}
        />
      )
    }

    // Update amount display if it exists
    if (!isNull(amountDisplay)) {
      const htmlAmountDisplay = amountDisplay as HTMLElement
      htmlAmountDisplay.textContent = `${elementIndex + 1}/${elements.length}`
      htmlAmountDisplay.style.display = 'none' // Hide the original, we'll show it in the toolbar
    }

    return (
      <ToolStrip 
        key={`toolbar-${element.getAttribute('key')}`}
        className={styles.blockToolstrip}
      >
        <Split
          dividerSize="small"
          size="mini"
          theme="secondary"
        >
          <Space size="small">
            {buttons}
          </Space>
          {deleteButton}
        </Split>
      </ToolStrip>
    )
  }, [editableName, onAddBlock, onRemoveBlock, onMoveBlockUp, onMoveBlockDown, t])

  const updateControls = useCallback((element: HTMLElement, limitReached: boolean) => {
    console.log('updateControls called for element:', element)
    
    // Look for existing buttons container
    const buttonsContainer = element.querySelector('.pimcore_block_buttons')
    
    if (isNull(buttonsContainer)) {
      console.log('No buttons container found')
      return
    }

    console.log('Found buttons container:', buttonsContainer)

    // Store the limit state
    limitReachedRef.current = limitReached

    // Hide the original button elements but keep them for detection
    const buttonElements = buttonsContainer.querySelectorAll('.pimcore_block_plus, .pimcore_block_minus, .pimcore_block_up, .pimcore_block_down, .pimcore_block_amount')
    buttonElements.forEach(button => {
      (button as HTMLElement).style.display = 'none'
    })

    // Don't trigger re-render here - let the component handle it
    // setUpdateTrigger(prev => prev + 1)
  }, [])

  const initializeControls = useCallback((blockManager: BlockManager) => {
    const container = blockManager.getContainer()
    if (isNull(container)) return

    // Find and setup initial plus element
    const plusEl = container.querySelector('.pimcore_block_plus')
    if (!isNull(plusEl)) {
      // Hide the original element but keep it for detection
      (plusEl as HTMLElement).style.display = 'none'
      
      // Add click handler to the container for the main add functionality
      const handleContainerClick = (e: Event) => {
        if ((e.target as HTMLElement).closest('.pimcore_block_plus')) {
          onAddBlock(null, 1)
        }
      }
      container.addEventListener('click', handleContainerClick)
    }
  }, [onAddBlock])

  const renderBlockToolbar = useCallback((): React.JSX.Element => {
    const portals: React.ReactPortal[] = []
    
    console.log('renderBlockToolbar called, current containers:', portalContainersRef.current.size)
    
    // Get all current block entries from DOM to compare against our stored refs
    const currentBlockEntries = document.querySelectorAll('.pimcore_block_entry[data-name="' + editableName + '"][key]')
    const validContainerIds = new Set<string>()
    
    // Build a set of valid container IDs from current DOM
    currentBlockEntries.forEach(blockEntry => {
      const buttonsContainer = blockEntry.querySelector('.pimcore_block_buttons')
      if (buttonsContainer) {
        const containerId = (buttonsContainer as HTMLElement).dataset.containerId || Math.random().toString()
        if (!(buttonsContainer as HTMLElement).dataset.containerId) {
          (buttonsContainer as HTMLElement).dataset.containerId = containerId
        }
        validContainerIds.add(containerId)
      }
    })
    
    console.log('Valid container IDs from DOM:', validContainerIds)
    
    // Clear all previous containers and rebuild from current DOM state
    portalContainersRef.current.clear()
    
    // Create portals only for currently existing DOM elements
    currentBlockEntries.forEach(blockEntry => {
      const buttonsContainer = blockEntry.querySelector('.pimcore_block_buttons')
      if (buttonsContainer) {
        portalContainersRef.current.set(buttonsContainer as HTMLElement, blockEntry as HTMLElement)
        const toolbar = createBlockToolbar(buttonsContainer as HTMLElement, blockEntry as HTMLElement, limitReachedRef.current)
        const portal = ReactDOM.createPortal(toolbar, buttonsContainer)
        portals.push(portal)
        console.log('Created portal for current DOM container')
      }
    })
    
    console.log('Rebuilt containers, total:', portalContainersRef.current.size)

    return <>{portals}</>
  }, [createBlockToolbar, editableName])

  const cleanupControls = useCallback(() => {
    portalContainersRef.current.clear()
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupControls()
    }
  }, [cleanupControls])

  return {
    updateControls,
    initializeControls,
    renderBlockToolbar,
    cleanupControls
  }
}
