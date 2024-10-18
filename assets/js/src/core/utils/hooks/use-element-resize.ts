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

import { useState, useEffect, type RefObject } from 'react'

const useElementResize = (ref: RefObject<HTMLDivElement>): number => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (ref.current == null) return

    const resizeObserver = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])

  return width
}

export default useElementResize
