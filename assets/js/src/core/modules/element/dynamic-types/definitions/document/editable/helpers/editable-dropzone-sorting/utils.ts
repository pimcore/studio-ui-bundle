/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNull, isUndefined, isFunction } from 'lodash'

// Generic manager interface that both BlockManager and AreablockManager can implement
export interface EditableManager {
  getContainer: () => HTMLElement | null
  queryElements: () => HTMLElement[]
  getElementKey: (element: HTMLElement) => string | null
  getElementType?: (element: HTMLElement) => string | null
}

/**
 * Validates that the editable manager has all required methods
 */
export const validateEditableManager = (editableManager: unknown): editableManager is EditableManager => {
  if (isNull(editableManager) || isUndefined(editableManager)) {
    return false
  }

  const manager = editableManager as EditableManager
  return (
    isFunction(manager.getContainer) &&
    isFunction(manager.queryElements) &&
    isFunction(manager.getElementKey)
  )
}

/**
 * Validates the onMoveItem callback
 */
export const validateOnMoveItem = (onMoveItem: unknown): onMoveItem is (fromIndex: number, toIndex: number) => void => {
  return isFunction(onMoveItem)
}

/**
 * Validates hook parameters and throws descriptive errors
 */
export const validateHookParams = (editableManager: unknown, onMoveItem: unknown): void => {
  if (!validateEditableManager(editableManager)) {
    throw new Error('Invalid editable manager: missing required methods')
  }

  if (!validateOnMoveItem(onMoveItem)) {
    throw new Error('Invalid onMoveItem: must be a function')
  }
}

/**
 * Safely gets an attribute from an element with error handling
 */
export const safeGetAttribute = (element: HTMLElement | null, attributeName: string): string | null => {
  try {
    return element?.getAttribute(attributeName) ?? null
  } catch (error) {
    console.warn(`Failed to get attribute ${attributeName}:`, error)
    return null
  }
}

/**
 * Safely sets an attribute on an element with error handling
 */
export const safeSetAttribute = (element: HTMLElement | null, attributeName: string, value: string): void => {
  try {
    element?.setAttribute(attributeName, value)
  } catch (error) {
    console.warn(`Failed to set attribute ${attributeName}:`, error)
  }
}

/**
 * Safely removes an attribute from an element with error handling
 */
export const safeRemoveAttribute = (element: HTMLElement | null, attributeName: string): void => {
  try {
    element?.removeAttribute(attributeName)
  } catch (error) {
    console.warn(`Failed to remove attribute ${attributeName}:`, error)
  }
}

/**
 * Safely queries elements with error handling
 */
export const safeQuerySelectorAll = (container: HTMLElement | Document, selector: string): NodeListOf<Element> | null => {
  try {
    return container.querySelectorAll(selector)
  } catch (error) {
    console.warn(`Failed to query selector ${selector}:`, error)
    return null
  }
}

/**
 * Creates a debounced function that delays execution
 */
export const createDebounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): [(...args: Parameters<T>) => void, () => void] => {
  let timeoutId: NodeJS.Timeout | null = null

  const debouncedFunc = (...args: Parameters<T>): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, delay)
  }

  const cleanup = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return [debouncedFunc, cleanup]
}
