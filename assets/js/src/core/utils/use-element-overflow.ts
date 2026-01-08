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

const useElementOverflow = (ref: RefObject<HTMLElement>): boolean => {
  const [isOverflow, setIsOverflow] = useState(false)

  useEffect(() => {
    const checkOverflow = (): void => {
      if (isNull(ref.current)) return

      const element = ref.current
      
      const range = document.createRange()
      range.selectNodeContents(element)
      const contentWidth = range.getBoundingClientRect().width
      const elementWidth = element.getBoundingClientRect().width
      
      const style = window.getComputedStyle(element)
      const paddingLeft = parseFloat(style.paddingLeft) ?? 0
      const paddingRight = parseFloat(style.paddingRight) ?? 0
      const availableWidth = elementWidth - paddingLeft - paddingRight
      
      setIsOverflow(contentWidth > availableWidth)
    }

    const observer = new ResizeObserver(checkOverflow)

    if (!isNull(ref.current)) {
      observer.observe(ref.current)
      checkOverflow()
    }

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isOverflow
}

export default useElementOverflow
