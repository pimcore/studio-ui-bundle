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

const useElementResize = (ref: RefObject<HTMLDivElement>): number => {
  const [width, setWidth] = useState(0)

  // Get initial width before the render phase
  useLayoutEffect(() => {
    setWidth(ref.current?.getBoundingClientRect().width ?? 0)
  }, [])

  useEffect(() => {
    if (ref.current == null) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      const newWidth = entry.contentRect.width

      setWidth((prevWidth) => {
        if (newWidth !== 0 && prevWidth !== newWidth) {
          return newWidth
        }
        return prevWidth
      })
    })

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])

  return width
}

export default useElementResize
