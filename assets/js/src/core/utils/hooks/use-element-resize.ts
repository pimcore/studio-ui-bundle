/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useEffect, type RefObject, useLayoutEffect } from 'react'
import { isNull, isString } from 'lodash'

type Element = RefObject<HTMLElement> | string

const getElement = (element: Element): HTMLElement | null => {
  if (isString(element)) {
    return document.getElementById(element)
  }

  return element.current
}

const useElementResize = (element: Element, disable: boolean = false): { width: number, height: number } => {
  const [size, setSize] = useState({ width: 0, height: 0 })
  // Get initial width before the render phase
  useLayoutEffect(() => {
    if (disable) {
      return
    }
    
    const targetElement = getElement(element)

    if (!isNull(targetElement)) {
      const { width, height } = targetElement.getBoundingClientRect()

      setSize({ width, height })
    }
  }, [disable])

  useEffect(() => {
    if (disable) {
      return
    }
    
    const targetElement = getElement(element)

    if (isNull(targetElement)) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      let width: number
      let height: number

      // Prefer modern spec-compliant API
      if (entry.borderBoxSize && entry.borderBoxSize.length > 0) {
        width = entry.borderBoxSize[0].inlineSize
        height = entry.borderBoxSize[0].blockSize
      } else {
        // Fallback for older browsers (contentRect is always defined)
        const rect = entry.contentRect
        width = rect.width
        height = rect.height
      }

      setSize((prevSize) => {
        if (
          width !== 0 &&
          height !== 0 &&
          (width !== prevSize.width || height !== prevSize.height)
        ) {
          return { width, height }
        }

        return prevSize
      })
    })

    resizeObserver.observe(targetElement)

    return () => {
      resizeObserver.disconnect()
    }
  }, [element, disable])
  return size
}

export default useElementResize
