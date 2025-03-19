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
import { isNull } from 'lodash'

const useElementOverflow = (ref: RefObject<HTMLSpanElement>): boolean => {
  const [isOverflow, setIsOverflow] = useState(false)

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!isNull(ref.current)) {
        setIsOverflow(ref.current.scrollWidth > ref.current.clientWidth)
      }
    })

    if (!isNull(ref.current)) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isOverflow
}

export default useElementOverflow
