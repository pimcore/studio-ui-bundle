/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useState, useRef, useEffect } from 'react'
import { isNil } from 'lodash'
import { type ScheduledblockEditableConfig, type ScheduledblockValue } from '../scheduledblock-editable'
import { type ScheduledblockManager } from '../utils/scheduledblock-manager'
import {
  scheduledblockValueUtils
} from '../utils/scheduledblock-utils'

export interface UseScheduledblockEditableParams {
  scheduledblockManager: ScheduledblockManager
  value?: ScheduledblockValue
  onChange?: (value: ScheduledblockValue) => void
  config?: ScheduledblockEditableConfig
  disabled?: boolean
}

export interface UseScheduledblockEditableReturn {
  addBlock: (date: Date) => void
  removeBlock: (element: HTMLElement) => void
  activeElement: HTMLElement | null
  showElementByKey: (key: string) => void
  hideAllElements: () => void
  cleanupTimestamps: (allTimestamps: boolean) => void
}

export const useScheduledblockEditable = ({
  scheduledblockManager,
  value = [],
  onChange,
  config,
  disabled = false
}: UseScheduledblockEditableParams): UseScheduledblockEditableReturn => {
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)
  const reloadModeElementsRef = useRef<HTMLElement[]>(scheduledblockManager.queryElements())

  const handleReloadMode = useCallback((elementsUpdater: (elements: HTMLElement[]) => HTMLElement[]) => {
    const currentElements = reloadModeElementsRef.current
    const newElements = elementsUpdater([...currentElements])
    reloadModeElementsRef.current = newElements
    const newValue = scheduledblockValueUtils.elementsToScheduledblockValue(newElements)
    onChange?.(newValue)
  }, [onChange])

  const hideAllElements = useCallback(() => {
    const elements = scheduledblockManager.queryElements()
    elements.forEach(element => {
      element.style.display = 'none'
    })
    setActiveElement(null)
  }, [scheduledblockManager])

  const showElementByKey = useCallback((key: string) => {
    hideAllElements()
    const element = scheduledblockManager.findElementByKey(key)
    if (!isNil(element)) {
      element.style.display = 'block'
      setActiveElement(element)
    }
  }, [hideAllElements, scheduledblockManager])

  const addBlock = useCallback((date: Date) => {
    if (disabled) return

    const nextKey = scheduledblockManager.calculateNextKey()
    const timestamp = Math.floor(date.getTime() / 1000)

    handleReloadMode((elements) => {
      const placeholderElement = document.createElement('div')
      scheduledblockManager.setElementKey(placeholderElement, nextKey.toString())
      scheduledblockManager.setElementDate(placeholderElement, timestamp)
      return [...elements, placeholderElement]
    })
  }, [disabled, handleReloadMode, scheduledblockManager])

  const removeBlock = useCallback((element: HTMLElement) => {
    if (disabled) return

    const index = scheduledblockManager.findElementIndex(element)
    handleReloadMode((elements) => {
      const newElements = [...elements]
      newElements.splice(index, 1)
      return newElements
    })
  }, [disabled, handleReloadMode, scheduledblockManager])

  const cleanupTimestamps = useCallback((allTimestamps: boolean) => {
    if (disabled) return

    const currentTimestamp = Math.floor(Date.now() / 1000)
    let elementsToRemove: HTMLElement[] = []

    if (allTimestamps) {
      elementsToRemove = scheduledblockManager.queryElements()
    } else {
      elementsToRemove = scheduledblockManager.queryElements().filter(element => {
        const date = scheduledblockManager.getElementDate(element)
        return !isNil(date) && date < currentTimestamp
      })
    }

    elementsToRemove.forEach(element => {
      removeBlock(element)
    })

    // Trigger reload to update the UI
    const event = new CustomEvent('pimcore:document:reload')
    document.dispatchEvent(event)
  }, [disabled, removeBlock, scheduledblockManager])

  // Initialize elements visibility
  useEffect(() => {
    const elements = scheduledblockManager.queryElements()
    elements.forEach(element => {
      element.style.display = 'none'
    })
  }, [scheduledblockManager])

  return {
    addBlock,
    removeBlock,
    activeElement,
    showElementByKey,
    hideAllElements,
    cleanupTimestamps
  }
}
