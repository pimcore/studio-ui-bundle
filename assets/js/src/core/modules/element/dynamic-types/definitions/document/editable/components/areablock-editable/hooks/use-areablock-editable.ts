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

import { useCallback, useState, useRef, useContext, useEffect } from 'react'
import { isNil, isArray, isEmpty, isUndefined, isString } from 'lodash'
import { useDocumentEditor } from '@Pimcore/modules/document/editor/shared-tab-manager/tabs/edit/hooks/use-document-editor'
import { DocumentContext } from '@Pimcore/modules/document/document-provider'
import trackError, { GeneralError, ApiError } from '@Pimcore/modules/app/error-handler'
import { type AbstractDocumentEditableDefinition } from '../../../dynamic-type-document-editable-abstract'
import { type AreablockEditableConfig, type AreablockValue, type AreablockRenderTrigger } from '../areablock-editable'
import { type AreablockManager } from '../utils/areablock-manager'
import { createEditableDataFromDefinitions } from '../../../utils/editable-utils'
import { createDropzoneContainer } from '../../../helpers/editable-dropzone-sorting/utils/dom-utils'
import { areablockValueUtils, configUtils, buildGroupedTypes } from '../utils/areablock-utils'
import { usePendingElementsReveal } from '../../../hooks/use-pending-elements-reveal'
import { useStyles } from '../areablock-editable.styles'
import { getPimcoreStudioApi } from '@Pimcore/app/public-api/helpers/api-helper'

export interface UseAreablockEditableParams {
  areablockManager: AreablockManager
  value?: AreablockValue
  onChange?: (value: AreablockValue) => void
  config?: AreablockEditableConfig
  disabled?: boolean
  renderTrigger: AreablockRenderTrigger
}

export interface UseAreablockEditableReturn {
  dynamicEditables: AbstractDocumentEditableDefinition[]
  addArea: (element: HTMLElement | null, areaType?: string) => Promise<void>
  removeArea: (element: HTMLElement) => void
  moveAreaUp: (element: HTMLElement) => void
  moveAreaDown: (element: HTMLElement) => void
  moveArea: (fromIndex: number, toIndex: number) => void
}

function mergeAreablockTypesFromDefinitions (documentId: number, editableDefinitions: AbstractDocumentEditableDefinition[]): void {
  try {
    const allGroupedTypes = buildGroupedTypes(editableDefinitions)
    if (Object.keys(allGroupedTypes).length === 0) return

    const { document: documentApiInstance } = getPimcoreStudioApi()
    documentApiInstance.mergeAreablockTypes(documentId, 'areablock', allGroupedTypes)
  } catch (error) {
    console.warn('Could not merge areablock types after addArea:', error)
  }
}

export const useAreablockEditable = ({
  areablockManager,
  onChange,
  config,
  disabled = false,
  renderTrigger
}: UseAreablockEditableParams): UseAreablockEditableReturn => {
  const { initializeData, getValues, removeValues } = useDocumentEditor()
  const { id: documentId } = useContext(DocumentContext)
  const [dynamicEditables, setDynamicEditables] = useState<AbstractDocumentEditableDefinition[]>([])
  const reloadModeElementsRef = useRef<HTMLElement[]>(areablockManager.queryElements())
  const { styles } = useStyles()

  const applyStylesToAreaEntries = useCallback(() => {
    areablockManager.applyStylestoAreaEntries(styles.areaEntry)
  }, [areablockManager])

  useEffect(() => {
    applyStylesToAreaEntries()
  }, [applyStylesToAreaEntries])

  const { hideElementUntilRendered, revealPendingElements } = usePendingElementsReveal({
    dynamicEditables,
    getContainer: () => areablockManager.getContainer()
  })

  const parseBlockStateStack = (blockStateStack?: any): object | null => {
    return isString(blockStateStack) ? JSON.parse(blockStateStack) : null
  }

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
    areablockManager.ensureAllElementKeys()
    const newValue = areablockManager.getAreablockValue()
    onChange?.(newValue)
  }, [onChange, areablockManager])

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
      const container = areablockManager.getContainer()
      if (isNil(container)) return

      const saveData = areablockManager.getAreablockValue()
      saveData.splice(index, 0, {
        key: nextKey,
        type: typeToUse,
        hidden: false
      })

      const { error, data } = await renderTrigger({
        id: documentId,
        body: {
          name: areablockManager.getEditableName(),
          realName: areablockManager.getRealEditableName(),
          index,
          blockStateStack: parseBlockStateStack(config?.blockStateStack),
          areaBlockConfig: config ?? {},
          areaBlockData: saveData
        }
      })

      if (!isUndefined(error)) {
        trackError(new ApiError(error))
        return
      }

      if (!isNil(data?.htmlCode)) {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = data.htmlCode
        const newElement = tempDiv.firstElementChild

        if (!isNil(newElement)) {
          const newAreaElement = newElement as HTMLElement

          hideElementUntilRendered(newAreaElement)

          const existingElements = areablockManager.queryElements()

          if (existingElements.length === 0) {
            container.appendChild(newAreaElement)
            const initialDropzoneContainer = createDropzoneContainer(areablockManager.getEditableName(), true)
            newAreaElement.parentNode?.insertBefore(initialDropzoneContainer, newAreaElement)
          } else if (!isNil(existingElements[index - 1])) {
            existingElements[index - 1].insertAdjacentElement('afterend', newAreaElement)
          } else if (!isNil(existingElements[index])) {
            existingElements[index].insertAdjacentElement('beforebegin', newAreaElement)
          }

          const dropzoneContainer = createDropzoneContainer(areablockManager.getEditableName())
          newAreaElement.appendChild(dropzoneContainer)
          applyStylesToAreaEntries()
        }
      }

      if (!isNil(data?.editableDefinitions) && isArray(data?.editableDefinitions)) {
        const editableDefinitions = data.editableDefinitions as AbstractDocumentEditableDefinition[]
        const editablesData = createEditableDataFromDefinitions(editableDefinitions)
        initializeData(editablesData)
        setDynamicEditables(prev => [...prev, ...editableDefinitions])
        mergeAreablockTypesFromDefinitions(documentId, editableDefinitions)
      } else {
        revealPendingElements()
      }

      handlePostOperation()
    } catch (error) {
      trackError(new GeneralError('Failed to add area'))
      console.error('Failed to add area:', error)
      handlePostOperation()
    }
  }, [disabled, config, handleReloadMode, handlePostOperation, areablockManager, documentId])
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

  const moveAreaUp = (element: HTMLElement): void => { moveAreaByDirection(element, 'up') }
  const moveAreaDown = (element: HTMLElement): void => { moveAreaByDirection(element, 'down') }

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
