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
import { getAreablockClipboard, setAreablockClipboard } from '../utils/areablock-clipboard'
import { type ValueType } from '@Pimcore/app/public-api/document-editor-iframe/editable-data/editable-data'
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
  copyArea: (element: HTMLElement) => void
  cutArea: (element: HTMLElement) => void
  pasteArea: (element: HTMLElement | null) => void
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
  value,
  onChange,
  config,
  disabled = false,
  renderTrigger
}: UseAreablockEditableParams): UseAreablockEditableReturn => {
  const { initializeData, getValues, removeValues, triggerSaveAndReload } = useDocumentEditor()
  const { id: documentId } = useContext(DocumentContext)
  const [dynamicEditables, setDynamicEditables] = useState<AbstractDocumentEditableDefinition[]>([])
  const { styles } = useStyles()

  const valueRef = useRef<AreablockValue | undefined>(value)
  valueRef.current = value

  // the value provided by the document editor store is the authoritative state of the
  // areablock (it originates from the backend indices) — the rendered DOM is only used
  // as a fallback and for element lookup, so that markup without key attributes (e.g.
  // custom areabrick wrappers) can never corrupt the stored indices
  const getCurrentValue = useCallback((): AreablockValue => {
    const currentValue = valueRef.current
    if (isArray(currentValue)) {
      return currentValue
    }

    return areablockManager.getAreablockValue()
  }, [areablockManager])

  const getNextKey = useCallback((): number => {
    const domKeys = areablockManager.queryElements().map(element => areablockManager.getElementKey(element))
    return areablockValueUtils.calculateNextKey(getCurrentValue(), domKeys)
  }, [areablockManager, getCurrentValue])

  const getInsertIndex = useCallback((element: HTMLElement | null): number => {
    if (isNil(element)) return 0

    const elementKey = areablockManager.getElementKey(element)
    if (isNil(elementKey)) return 0

    const entryIndex = areablockValueUtils.getEntryIndexByKey(getCurrentValue(), elementKey)
    return entryIndex === -1 ? 0 : entryIndex + 1
  }, [areablockManager, getCurrentValue])

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

  const addArea = useCallback(async (element: HTMLElement | null, areaType?: string) => {
    if (disabled) return

    const limit = configUtils.getEffectiveLimit(config)
    const currentValue = getCurrentValue()
    if (configUtils.isLimitReached(currentValue.length, limit)) return

    const availableTypes = configUtils.getAvailableTypes(config)
    const typeToUse = areaType ?? (!isEmpty(availableTypes) ? availableTypes[0].type : 'default')

    if (!configUtils.isTypeAllowed(config, typeToUse)) return

    const index = getInsertIndex(element)
    const newEntry = {
      key: getNextKey().toString(),
      type: typeToUse,
      hidden: false
    }
    const saveData = areablockValueUtils.insertEntry(currentValue, index, newEntry)

    if (configUtils.isReloadMode(config)) {
      onChange?.(saveData)
      return
    }

    try {
      const container = areablockManager.getContainer()
      if (isNil(container)) return

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
          } else if (!isNil(element)) {
            element.insertAdjacentElement('afterend', newAreaElement)
          } else {
            existingElements[0].insertAdjacentElement('beforebegin', newAreaElement)
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

      onChange?.(saveData)
    } catch (error) {
      trackError(new GeneralError('Failed to add area'))
      console.error('Failed to add area:', error)
    }
  }, [disabled, config, onChange, areablockManager, documentId, getCurrentValue, getNextKey, getInsertIndex])

  const removeArea = useCallback((element: HTMLElement) => {
    if (disabled) return

    const elementKey = areablockManager.getElementKey(element)
    if (isNil(elementKey)) return

    const newValue = areablockValueUtils.removeEntryByKey(getCurrentValue(), elementKey)

    if (configUtils.isReloadMode(config)) {
      onChange?.(newValue)
      return
    }

    const editableNamesToRemove = getAreaEditableNames(element)
    const editableName = areablockManager.getEditableName()
    const namePattern = `${editableName}:${elementKey}.`

    setDynamicEditables(prev =>
      prev.filter(editable => !editable.name.startsWith(namePattern))
    )

    element.remove()
    if (!isEmpty(editableNamesToRemove)) {
      removeValues(editableNamesToRemove)
    }
    onChange?.(newValue)
  }, [disabled, config, onChange, removeValues, areablockManager, getCurrentValue])

  const moveAreaByDirection = (element: HTMLElement, direction: 'up' | 'down'): void => {
    if (disabled) return

    const elementKey = areablockManager.getElementKey(element)
    if (isNil(elementKey)) return

    const currentValue = getCurrentValue()
    const fromIndex = areablockValueUtils.getEntryIndexByKey(currentValue, elementKey)
    if (fromIndex === -1) return

    if (direction === 'up' && !configUtils.canMoveUp(fromIndex)) return
    if (direction === 'down' && !configUtils.canMoveDown(fromIndex, currentValue.length)) return

    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1
    const newValue = areablockValueUtils.moveEntry(currentValue, fromIndex, toIndex)

    if (configUtils.isReloadMode(config)) {
      onChange?.(newValue)
      return
    }

    const currentElements = areablockManager.queryElements()
    const domIndex = currentElements.indexOf(element)
    const targetElement = direction === 'up' ? currentElements[domIndex - 1] : currentElements[domIndex + 1]
    if (!isNil(targetElement)) {
      const insertTarget = direction === 'up' ? targetElement : targetElement.nextSibling
      targetElement.parentNode?.insertBefore(element, insertTarget)
    }

    onChange?.(newValue)
  }

  const moveAreaUp = (element: HTMLElement): void => { moveAreaByDirection(element, 'up') }
  const moveAreaDown = (element: HTMLElement): void => { moveAreaByDirection(element, 'down') }

  const moveArea = useCallback((fromIndex: number, toIndex: number): void => {
    if (disabled) return

    const currentElements = areablockManager.queryElements()

    if (fromIndex < 0 || fromIndex >= currentElements.length || toIndex < 0 || toIndex >= currentElements.length) {
      return
    }

    const fromElement = currentElements[fromIndex]
    const toElement = currentElements[toIndex]
    const fromKey = areablockManager.getElementKey(fromElement)
    const toKey = areablockManager.getElementKey(toElement)
    if (isNil(fromKey) || isNil(toKey)) return

    const currentValue = getCurrentValue()
    const valueFromIndex = areablockValueUtils.getEntryIndexByKey(currentValue, fromKey)
    const valueToIndex = areablockValueUtils.getEntryIndexByKey(currentValue, toKey)
    if (valueFromIndex === -1 || valueToIndex === -1) return

    const newValue = areablockValueUtils.moveEntry(currentValue, valueFromIndex, valueToIndex)

    if (configUtils.isReloadMode(config)) {
      onChange?.(newValue)
      return
    }

    const scrollX = window.scrollX
    const scrollY = window.scrollY

    const insertTarget = toIndex > fromIndex
      ? toElement.nextSibling
      : toElement

    toElement.parentNode?.insertBefore(fromElement, insertTarget)

    requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollY)
    })

    onChange?.(newValue)
  }, [disabled, config, onChange, areablockManager, getCurrentValue])

  const copyArea = useCallback((element: HTMLElement) => {
    const elementKey = areablockManager.getElementKey(element)
    const elementType = areablockManager.getElementType(element)

    if (isNil(elementKey) || isNil(elementType)) return

    const editableName = areablockManager.getEditableName()
    const areaPrefix = `${editableName}:${elementKey}.`
    const copiedValues: Record<string, ValueType> = {}

    Object.entries(getValues()).forEach(([name, value]) => {
      if (name.startsWith(areaPrefix)) {
        copiedValues[name.substring(areaPrefix.length)] = value
      }
    })

    setAreablockClipboard({
      identifier: {
        name: editableName,
        realName: areablockManager.getRealEditableName(),
        key: elementKey
      },
      type: elementType,
      values: copiedValues
    })
  }, [areablockManager])

  const cutArea = useCallback((element: HTMLElement) => {
    if (disabled) return

    copyArea(element)
    removeArea(element)
  }, [disabled, copyArea, removeArea])

  const pasteArea = useCallback((element: HTMLElement | null) => {
    if (disabled) return

    const clipboardItem = getAreablockClipboard()

    if (isNil(clipboardItem)) return

    if (!configUtils.isTypePasteable(config, clipboardItem.type)) return

    const limit = configUtils.getEffectiveLimit(config)
    const currentValue = getCurrentValue()

    if (configUtils.isLimitReached(currentValue.length, limit)) return

    const index = getInsertIndex(element)
    const nextKey = getNextKey()
    const editableName = areablockManager.getEditableName()

    const pastedValues: Record<string, ValueType> = {}

    Object.entries(clipboardItem.values).forEach(([relativeName, value]) => {
      pastedValues[`${editableName}:${nextKey}.${relativeName}`] = value
    })

    initializeData(pastedValues)

    const newValue = areablockValueUtils.insertEntry(currentValue, index, {
      key: nextKey.toString(),
      type: clipboardItem.type,
      hidden: false
    })

    onChange?.(newValue)

    if (!configUtils.isReloadMode(config)) {
      triggerSaveAndReload()
    }
  }, [disabled, config, onChange, areablockManager, triggerSaveAndReload, getCurrentValue, getNextKey, getInsertIndex])

  return {
    dynamicEditables,
    addArea,
    removeArea,
    moveAreaUp,
    moveAreaDown,
    moveArea,
    copyArea,
    cutArea,
    pasteArea
  }
}
