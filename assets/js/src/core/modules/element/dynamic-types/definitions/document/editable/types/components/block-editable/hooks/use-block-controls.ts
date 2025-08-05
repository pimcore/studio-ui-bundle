/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback } from 'react'
import { useBlockEditableStyles } from '../block-editable.styles'

export interface UseBlockControlsParams {
  editableName: string
  onAddBlock: (element: HTMLElement | null) => void
  onRemoveBlock: (element: HTMLElement) => void
  onMoveBlockUp: (element: HTMLElement) => void
  onMoveBlockDown: (element: HTMLElement) => void
  getElementIndex: (element: HTMLElement) => number
  queryDOMElements: () => HTMLElement[]
  getBlockContainer: () => HTMLElement | null
}

export const useBlockControls = ({
  editableName,
  onAddBlock,
  onRemoveBlock,
  onMoveBlockUp,
  onMoveBlockDown,
  getElementIndex,
  queryDOMElements,
  getBlockContainer
}: UseBlockControlsParams) => {
  const { styles } = useBlockEditableStyles()

  const createButton = useCallback((text: string, title: string, clickHandler: () => void, isDisabled = false) => {
    const button = document.createElement('button')
    button.textContent = text
    button.title = title
    button.className = `${styles.button} ${isDisabled ? styles.buttonDisabled : ''} ${text === '−' ? 'danger' : ''}`
    
    if (!isDisabled) {
      button.addEventListener('click', clickHandler)
    }
    
    return button
  }, [styles.button, styles.buttonDisabled])

  const applyButtonsContainerStyles = useCallback((container: HTMLElement) => {
    container.className = `${container.className} ${styles.buttonsContainer}`
  }, [styles.buttonsContainer])

  const applyAmountDisplayStyles = useCallback((element: HTMLElement) => {
    element.className = styles.amountDisplay
  }, [styles.amountDisplay])

  const applyPlusElementStyles = useCallback((element: HTMLElement) => {
    element.className = styles.plusElement
  }, [styles.plusElement])

  const refreshControls = useCallback((element: HTMLElement, limitReached: boolean) => {
    const elementIndex = getElementIndex(element)
    const elements = queryDOMElements()
    
    // Look for existing buttons container or create one
    let buttonsContainer = element.querySelector('.pimcore_block_buttons') as HTMLElement
    
    if (!buttonsContainer) {
      // Create a new buttons container and insert it at the beginning of the block entry
      buttonsContainer = document.createElement('div')
      buttonsContainer.className = 'pimcore_block_buttons'
      
      // Insert the buttons container as the first child of the block entry
      element.insertBefore(buttonsContainer, element.firstChild)
    }
    
    // Clear existing content but preserve amount display if it exists
    const amountDisplay = buttonsContainer.querySelector('.pimcore_block_amount')
    buttonsContainer.innerHTML = ''
    
    // Re-add the amount display if it existed
    if (amountDisplay) {
      buttonsContainer.appendChild(amountDisplay)
    } else {
      // Create new amount display if none existed
      const newAmountDisplay = document.createElement('div')
      newAmountDisplay.className = 'pimcore_block_amount'
      buttonsContainer.appendChild(newAmountDisplay)
    }
    
    // Apply styles only if not already applied to prevent accumulation
    if (!buttonsContainer.className.includes(styles.buttonsContainer)) {
      applyButtonsContainerStyles(buttonsContainer)
    }
    
    // Add control buttons in the correct order
    const currentAmountDisplay = buttonsContainer.querySelector('.pimcore_block_amount')
    
    if (!limitReached) {
      const plusButton = createButton('+', 'Add block entry', () => onAddBlock(element))
      buttonsContainer.insertBefore(plusButton, currentAmountDisplay)
    }
    
    const minusButton = createButton('−', 'Remove block entry', () => onRemoveBlock(element))
    buttonsContainer.insertBefore(minusButton, currentAmountDisplay)
    
    const isFirst = elementIndex === 0
    const upButton = createButton('↑', isFirst ? 'Cannot move up' : 'Move up', () => onMoveBlockUp(element), isFirst)
    buttonsContainer.insertBefore(upButton, currentAmountDisplay)
    
    const isLast = elementIndex === elements.length - 1
    const downButton = createButton('↓', isLast ? 'Cannot move down' : 'Move down', () => onMoveBlockDown(element), isLast)
    buttonsContainer.insertBefore(downButton, currentAmountDisplay)
    
    // Update the amount display text
    if (currentAmountDisplay) {
      const htmlAmountDisplay = currentAmountDisplay as HTMLElement
      htmlAmountDisplay.textContent = `${elementIndex + 1}/${elements.length}`
      applyAmountDisplayStyles(htmlAmountDisplay)
    }
  }, [getElementIndex, queryDOMElements, onAddBlock, onRemoveBlock, onMoveBlockUp, onMoveBlockDown, applyButtonsContainerStyles, createButton, applyAmountDisplayStyles, styles.buttonsContainer])

  const createInitialControls = useCallback(() => {
    const container = getBlockContainer()
    if (!container) return
    
    const amountEl = document.createElement('div')
    amountEl.className = 'pimcore_block_amount'
    amountEl.setAttribute('data-name', editableName)
    
    const plusEl = document.createElement('div')
    plusEl.className = 'pimcore_block_plus'
    plusEl.setAttribute('data-name', editableName)
    plusEl.textContent = '+ Add Block Entry'
    
    const clearEl = document.createElement('div')
    clearEl.className = 'pimcore_block_clear'
    clearEl.setAttribute('data-name', editableName)
    
    container.appendChild(amountEl)
    container.appendChild(plusEl)
    container.appendChild(clearEl)
    
    applyPlusElementStyles(plusEl)
    
    plusEl.addEventListener('click', () => onAddBlock(null))
    
    container.className += ' pimcore_block_limitnotreached pimcore_block_buttons'
  }, [getBlockContainer, editableName, onAddBlock, applyPlusElementStyles])

  return {
    refreshControls,
    createInitialControls
  }
}