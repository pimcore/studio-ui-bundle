/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useState, useRef, useContext } from 'react'
import { isNil, isArray, isEmpty } from 'lodash'
import { useDocumentEditor } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { type AbstractDocumentEditableDefinition } from '../../../../dynamic-type-document-editable-abstract'
import { type AreablockEditableConfig, type AreablockValue } from '../areablock-editable'
import { type AreablockManager } from '../utils/areablock-manager'
import {
  areablockValueUtils,
  configUtils
} from '../utils/areablock-utils'

export interface UseAreablockEditableParams {
  areablockManager: AreablockManager
  value?: AreablockValue
  onChange?: (value: AreablockValue) => void
  config?: AreablockEditableConfig
  disabled?: boolean
  onOperationComplete?: (limitReached: boolean) => void
}

export interface UseAreablockEditableReturn {
  dynamicEditables: AbstractDocumentEditableDefinition[]
  addArea: (element: HTMLElement | null, areaType?: string) => Promise<void>
  removeArea: (element: HTMLElement) => void
  moveAreaUp: (element: HTMLElement) => void
  moveAreaDown: (element: HTMLElement) => void
  moveArea: (fromIndex: number, toIndex: number) => void
}

export const useAreablockEditable = ({
  areablockManager,
  value = [],
  onChange,
  config,
  disabled = false,
  onOperationComplete
}: UseAreablockEditableParams): UseAreablockEditableReturn => {
  const { initializeData, getValues, removeValues } = useDocumentEditor()
  const { id: documentId } = useContext(DocumentContext)
  const [dynamicEditables, setDynamicEditables] = useState<AbstractDocumentEditableDefinition[]>([])
  const reloadModeElementsRef = useRef<HTMLElement[]>(areablockManager.queryElements())

  const getAreaEditableNames = (element: HTMLElement): string[] => {
    const elementKey = areablockManager.getElementKey(element)
    if (isNil(elementKey)) return []

    const currentValues = getValues()
    return areablockValueUtils.filterEditableNames(Object.keys(currentValues), areablockManager.getEditableName(), elementKey)
  }

  const handleReloadMode = useCallback((elementsUpdater: (elements: HTMLElement[]) => HTMLElement[]) => {
    const currentElements = reloadModeElementsRef.current
    const newElements = elementsUpdater([...currentElements])
    reloadModeElementsRef.current = newElements
    const newValue = areablockValueUtils.elementsToAreablockValue(newElements)
    onChange?.(newValue)
  }, [onChange])

  const handlePostOperation = useCallback(() => {
    const elements = areablockManager.ensureAllElementKeys()
    const newValue = areablockManager.getAreablockValue()
    onChange?.(newValue)

    if (!isNil(onOperationComplete)) {
      const limitReached = configUtils.isLimitReached(elements.length, config?.limit)
      onOperationComplete(limitReached)
    }
  }, [onChange, onOperationComplete, config?.limit, areablockManager])

  const addArea = useCallback(async (element: HTMLElement | null, areaType?: string) => {
    if (disabled) return

    const limit = configUtils.getEffectiveLimit(config)
    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : areablockManager.queryElements()
    if (configUtils.isLimitReached(currentElements.length, limit)) return

    const availableTypes = configUtils.getAvailableTypes(config)
    const typeToUse = areaType ?? (!isEmpty(availableTypes) ? availableTypes[0].type : 'default')

    if (!configUtils.isTypeAllowed(config, typeToUse)) return

    const index = !isNil(element) ? areablockManager.findElementIndex(element) + 1 : 0
    const nextKey = areablockManager.calculateNextKey()

    if (configUtils.isReloadMode(config)) {
      handleReloadMode((elements) => {
        const placeholderElement = document.createElement('div')
        areablockManager.setElementKey(placeholderElement, nextKey.toString())
        areablockManager.setElementType(placeholderElement, typeToUse)
        placeholderElement.setAttribute('data-hidden', 'false')
        const newElements = [...elements]
        newElements.splice(index, 0, placeholderElement)
        return newElements
      })
      return
    }

    try {
      const placeholderElement = document.createElement('div')
      placeholderElement.className = 'pimcore-areablock-placeholder'
      placeholderElement.setAttribute('data-placeholder-key', nextKey.toString())
      placeholderElement.style.display = 'none'

      const container = areablockManager.getContainer()
      if (!isNil(container)) {
        if (isEmpty(currentElements)) {
          container.appendChild(placeholderElement)
        } else if (!isNil(currentElements[index - 1])) {
          currentElements[index - 1].insertAdjacentElement('afterend', placeholderElement)
        } else if (!isNil(currentElements[index])) {
          currentElements[index].insertAdjacentElement('beforebegin', placeholderElement)
        }
      }

      const saveData = areablockManager.getAreablockValue()
      saveData.splice(index, 0, {
        key: nextKey,
        type: typeToUse,
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
        }
      }

      if (!isNil(result.editableDefinitions) && isArray(result.editableDefinitions)) {
        result.editableDefinitions.forEach((editableDef: AbstractDocumentEditableDefinition) => {
          const editableData = { type: editableDef.type, data: editableDef.config }
          initializeData({ [editableDef.name]: editableData })
        })

        setDynamicEditables(prev => [...prev, ...result.editableDefinitions])
      }

      handlePostOperation()
    } catch (error) {
      trackError(new GeneralError('Failed to add area'))
      console.error('Failed to add area:', error)
      const placeholders = areablockManager.getContainer()?.querySelectorAll(`[data-placeholder-key="${nextKey}"]`)
      placeholders?.forEach(placeholder => { placeholder.remove() })
      handlePostOperation()
    }
  }, [disabled, config, handleReloadMode, handlePostOperation, areablockManager, documentId, initializeData])

  const removeArea = useCallback((element: HTMLElement) => {
    if (disabled) return

    if (configUtils.isReloadMode(config)) {
      const index = areablockManager.findElementIndex(element)
      handleReloadMode((elements) => {
        const newElements = [...elements]
        newElements.splice(index, 1)
        return newElements
      })
      return
    }

    const editableNamesToRemove = getAreaEditableNames(element)
    const elementKey = areablockManager.getElementKey(element)

    if (!isNil(elementKey)) {
      const editableName = areablockManager.getEditableName()
      const namePattern = `${editableName}:${elementKey}.`

      setDynamicEditables(prev =>
        prev.filter(editable => !editable.name.startsWith(namePattern))
      )
    }

    element.remove()

    if (!isEmpty(editableNamesToRemove)) {
      removeValues(editableNamesToRemove)
    }

    handlePostOperation()
  }, [disabled, config, handleReloadMode, removeValues, handlePostOperation, areablockManager])

  const moveAreaByDirection = (element: HTMLElement, direction: 'up' | 'down'): void => {
    if (disabled) return

    const index = areablockManager.findElementIndex(element)
    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : areablockManager.queryElements()

    if (direction === 'up' && !configUtils.canMoveUp(index)) return
    if (direction === 'down' && !configUtils.canMoveDown(index, currentElements.length)) return

    if (configUtils.isReloadMode(config)) {
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      handleReloadMode((elements) => areablockValueUtils.swapElements(elements, index, targetIndex))
      return
    }

    const targetElement = direction === 'up' ? currentElements[index - 1] : currentElements[index + 1]
    if (!isNil(targetElement)) {
      const insertTarget = direction === 'up' ? targetElement : targetElement.nextSibling
      targetElement.parentNode?.insertBefore(element, insertTarget)
      handlePostOperation()
    }
  }

  const moveAreaUp = (element: HTMLElement): void => {
    moveAreaByDirection(element, 'up')
  }

  const moveAreaDown = (element: HTMLElement): void => {
    moveAreaByDirection(element, 'down')
  }

  const moveArea = useCallback((fromIndex: number, toIndex: number): void => {
    if (disabled) return

    const currentElements = configUtils.isReloadMode(config) ? reloadModeElementsRef.current : areablockManager.queryElements()

    if (fromIndex < 0 || fromIndex >= currentElements.length || toIndex < 0 || toIndex >= currentElements.length) {
      return
    }

    if (configUtils.isReloadMode(config)) {
      handleReloadMode((elements) => {
        const newElements = [...elements]
        const [movedElement] = newElements.splice(fromIndex, 1)
        newElements.splice(toIndex, 0, movedElement)
        return newElements
      })
      return
    }

    const scrollX = window.scrollX
    const scrollY = window.scrollY

    const fromElement = currentElements[fromIndex]
    const toElement = currentElements[toIndex]

    if (!isNil(fromElement) && !isNil(toElement)) {
      const insertTarget = toIndex > fromIndex
        ? toElement.nextSibling
        : toElement

      toElement.parentNode?.insertBefore(fromElement, insertTarget)

      requestAnimationFrame(() => {
        window.scrollTo(scrollX, scrollY)
      })

      handlePostOperation()
    }
  }, [disabled, config, handleReloadMode, handlePostOperation, areablockManager])

  return {
    dynamicEditables,
    addArea,
    removeArea,
    moveAreaUp,
    moveAreaDown,
    moveArea
  }
}
