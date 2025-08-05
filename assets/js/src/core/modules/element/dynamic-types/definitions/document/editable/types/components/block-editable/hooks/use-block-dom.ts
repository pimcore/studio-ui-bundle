/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useCallback, useRef } from 'react'
import { type BlockEditableConfig, type BlockValue } from '../block-editable'

export interface UseBlockDOMParams {
  editableName: string
  containerRef?: React.RefObject<HTMLDivElement>
}

export const useBlockDOM = ({ editableName, containerRef }: UseBlockDOMParams) => {
  const elementsRef = useRef<HTMLElement[]>([])

  const getBlockContainer = useCallback((): HTMLElement | null => {
    if (containerRef?.current) {
      return containerRef.current
    }
    
    const element = document.querySelector(`[data-name="${editableName}"][data-type="block"]`)
    return element as HTMLElement
  }, [editableName, containerRef])

  const queryDOMElements = useCallback((): HTMLElement[] => {
    const container = getBlockContainer()
    if (!container) return []
    
    const domElements = Array.from(container.querySelectorAll('.pimcore_block_entry[data-name="' + editableName + '"][key]')) as HTMLElement[]
    return domElements
  }, [getBlockContainer, editableName])

  const refreshElements = useCallback(() => {
    const domElements = queryDOMElements()
    
    // Ensure each element has a key attribute
    domElements.forEach(element => {
      const keyAttr = element.getAttribute('key')
      if (!keyAttr) {
        element.setAttribute('key', '0')
      }
    })
    
    elementsRef.current = domElements
    return domElements
  }, [queryDOMElements])

  const getElementIndex = useCallback((element: HTMLElement): number => {
    try {
      const key = element.getAttribute('key')
      for (let i = 0; i < elementsRef.current.length; i++) {
        if (elementsRef.current[i].getAttribute('key') === key) {
          return i
        }
      }
    } catch (e) {
      return 0
    }
    return 0
  }, [])

  const getNextKey = useCallback((): number => {
    let nextKey = 0
    
    for (let i = 0; i < elementsRef.current.length; i++) {
      const currentKey = parseInt(elementsRef.current[i].getAttribute('key') ?? '0', 10)
      if (currentKey > nextKey) {
        nextKey = currentKey
      }
    }
    
    return nextKey + 1
  }, [])

  const getValue = useCallback((): BlockValue => {
    const data: BlockValue = []
    for (let i = 0; i < elementsRef.current.length; i++) {
      const element = elementsRef.current[i]
      const key = element?.getAttribute('key')
      if (element && key) {
        data.push(parseInt(key, 10))
      }
    }
    return data
  }, [])

  return {
    elementsRef,
    getBlockContainer,
    queryDOMElements,
    refreshElements,
    getElementIndex,
    getNextKey,
    getValue
  }
}