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
import { useDocumentEditor } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor'
import { type AbstractDocumentEditableDefinition } from '../../../dynamic-type-document-editable-abstract'
import { type ScheduledblockEditableConfig, type ScheduledblockValue, type ScheduledblockEntry } from '../scheduledblock-editable'
import { type ScheduledblockManager } from '../utils/scheduledblock-manager'
import {
  scheduledblockValueUtils,
  configUtils
} from '../utils/scheduledblock-utils'

export interface UseScheduledblockEditableParams {
  scheduledblockManager: ScheduledblockManager
  value?: ScheduledblockValue
  onChange?: (value: ScheduledblockValue) => void
  config?: ScheduledblockEditableConfig
  disabled?: boolean
}

export interface UseScheduledblockEditableReturn {
  dynamicEditables: AbstractDocumentEditableDefinition[]
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
  const { initializeData, getValues, removeValues } = useDocumentEditor()
  const [dynamicEditables, setDynamicEditables] = useState<AbstractDocumentEditableDefinition[]>([])
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)
  const reloadModeElementsRef = useRef<HTMLElement[]>(scheduledblockManager.queryElements())

  const handleReloadMode = useCallback((elementsUpdater: (elements: HTMLElement[]) => HTMLElement[]) => {
    const currentElements = reloadModeElementsRef.current
    const newElements = elementsUpdater([...currentElements])
    reloadModeElementsRef.current = newElements
    const newValue = scheduledblockValueUtils.elementsToScheduledblockValue(newElements)
    onChange?.(newValue)
  }, [onChange])

  const handlePostOperation = useCallback(() => {
    scheduledblockManager.ensureAllElementKeys()
    const newValue = scheduledblockManager.getScheduledblockValue()
    onChange?.(newValue)
  }, [onChange, scheduledblockManager])

  const getScheduledblockEditableNames = (element: HTMLElement): string[] => {
    const elementKey = scheduledblockManager.getElementKey(element)
    if (isNil(elementKey)) return []

    const currentValues = getValues()
    return scheduledblockValueUtils.filterEditableNames(Object.keys(currentValues), scheduledblockManager.getEditableName(), elementKey)
  }

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

    const limit = configUtils.getEffectiveLimit(config)
    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : scheduledblockManager.queryElements()
    if (configUtils.isLimitReached(currentElements.length, limit)) return

    const nextKey = scheduledblockManager.calculateNextKey()
    const timestamp = Math.floor(date.getTime() / 1000)

    if (configUtils.isReloadMode(config)) {
      handleReloadMode((elements) => {
        const placeholderElement = document.createElement('div')
        scheduledblockManager.setElementKey(placeholderElement, nextKey.toString())
        scheduledblockManager.setElementDate(placeholderElement, timestamp)
        return [...elements, placeholderElement]
      })
      return
    }

    // In normal mode, we need to trigger a document reload to get the new block
    // This will be handled by the reload mechanism similar to how blocks work
    const newEntry: ScheduledblockEntry = {
      key: nextKey.toString(),
      date: timestamp
    }

    const newValue = [...value, newEntry]
    onChange?.(newValue)

    // Store the date for restoration after reload
    const documentId = (window as any).editWindow?.document?.id
    if (documentId) {
      const tmpStoreId = `pimcore_scheduled_block_tmp_date_${documentId}_${scheduledblockManager.getEditableName()}`
      const globalManager = (window.top as any)?.pimcore?.globalmanager
      if (globalManager) {
        globalManager.add(tmpStoreId, date)
      }
    }

    // Trigger reload
    const event = new CustomEvent('pimcore:document:reload')
    document.dispatchEvent(event)
  }, [disabled, config, handleReloadMode, value, onChange, scheduledblockManager])

  const removeBlock = useCallback((element: HTMLElement) => {
    if (disabled) return

    if (configUtils.isReloadMode(config)) {
      const index = scheduledblockManager.findElementIndex(element)
      handleReloadMode((elements) => {
        const newElements = [...elements]
        newElements.splice(index, 1)
        return newElements
      })
      return
    }

    const editableNamesToRemove = getScheduledblockEditableNames(element)

    const elementKey = scheduledblockManager.getElementKey(element)

    if (!isNil(elementKey)) {
      const editableName = scheduledblockManager.getEditableName()
      const namePattern = `${editableName}:${elementKey}.`

      setDynamicEditables(prev =>
        prev.filter(editable => !editable.name.startsWith(namePattern))
      )
    }

    element.remove()

    if (editableNamesToRemove.length > 0) {
      removeValues(editableNamesToRemove)
    }

    handlePostOperation()
  }, [disabled, config, handleReloadMode, removeValues, handlePostOperation, scheduledblockManager])

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
    dynamicEditables,
    addBlock,
    removeBlock,
    activeElement,
    showElementByKey,
    hideAllElements,
    cleanupTimestamps
  }
}
