/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useRef, useEffect } from 'react'
import { isNil } from 'lodash'
import { type ScheduledblockValue } from '../scheduledblock-editable'
import { type ScheduledblockManager } from '../utils/scheduledblock-manager'
import {
  scheduledblockValueUtils
} from '../utils/scheduledblock-utils'

export interface UseScheduledblockEditableParams {
  scheduledblockManager: ScheduledblockManager
  onChange?: (value: ScheduledblockValue) => void
  disabled?: boolean
}

export interface UseScheduledblockEditableReturn {
  addBlock: (date: Date) => void
  removeBlock: (element: HTMLElement) => void
  cleanupTimestamps: (allTimestamps: boolean) => void
}

export const useScheduledblockEditable = ({
  scheduledblockManager,
  onChange,
  disabled = false
}: UseScheduledblockEditableParams): UseScheduledblockEditableReturn => {
  const reloadModeElementsRef = useRef<HTMLElement[]>(scheduledblockManager.queryElements())

  const handleReloadMode = useCallback((elementsUpdater: (elements: HTMLElement[]) => HTMLElement[]) => {
    const currentElements = reloadModeElementsRef.current
    const newElements = elementsUpdater([...currentElements])
    reloadModeElementsRef.current = newElements
    const newValue = scheduledblockValueUtils.elementsToScheduledblockValue(newElements)
    onChange?.(newValue)
  }, [onChange])

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

    if (allTimestamps) {
      handleReloadMode(() => [])
    } else {
      handleReloadMode((elements) => {
        const entries = scheduledblockValueUtils.elementsToScheduledblockValue(elements)
        const currentlyValidEntry = scheduledblockValueUtils.getLatestPreviousEntry(entries, currentTimestamp)
        
        return elements.filter(element => {
          const date = scheduledblockManager.getElementDate(element)
          const elementKey = scheduledblockManager.getElementKey(element)
          
          // Keep if date is null/undefined, or date is in the future, 
          // or this is the currently valid entry (closest to current time but in the past)
          return isNil(date) || 
                 date >= currentTimestamp || 
                 (!isNil(currentlyValidEntry) && elementKey === currentlyValidEntry.key)
        })
      })
    }
  }, [disabled, handleReloadMode, scheduledblockManager])

  // Initialize elements visibility
  useEffect(() => {
    scheduledblockManager.hideAllElements()
  }, [scheduledblockManager])

  return {
    addBlock,
    removeBlock,
    cleanupTimestamps
  }
}
