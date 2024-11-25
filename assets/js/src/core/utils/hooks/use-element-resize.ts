/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
