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

interface ElementDimensions {
  width: number
  height: number
}

const useElementResizeDimensions = (ref: RefObject<HTMLDivElement>): ElementDimensions => {
  const [dimensions, setDimensions] = useState<ElementDimensions>({ width: 0, height: 0 })

  // Get initial dimensions before the render phase
  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect()
    setDimensions({
      width: rect?.width ?? 0,
      height: rect?.height ?? 0
    })
  }, [])

  useEffect(() => {
    if (ref.current == null) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      const newWidth = entry.contentRect.width
      const newHeight = entry.contentRect.height

      setDimensions((prevDimensions) => {
        if (
          (newWidth !== 0 && prevDimensions.width !== newWidth) ||
          (newHeight !== 0 && prevDimensions.height !== newHeight)
        ) {
          return { width: newWidth, height: newHeight }
        }
        return prevDimensions
      })
    })

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])

  return dimensions
}

export default useElementResizeDimensions