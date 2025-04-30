/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
