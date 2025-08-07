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

const useElementResize = (element: Element): { width: number, height: number } => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  // Get initial width before the render phase
  useLayoutEffect(() => {
    const targetElement = getElement(element)

    if (!isNull(targetElement)) {
      const { width, height } = targetElement.getBoundingClientRect()

      setSize({ width, height })
    }
  }, [])

  useEffect(() => {
    const targetElement = getElement(element)

    if (isNull(targetElement)) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect

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
  }, [element])

  return size
}

export default useElementResize
