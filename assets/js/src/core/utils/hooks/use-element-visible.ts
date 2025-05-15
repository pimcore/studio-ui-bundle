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

const useElementVisible = (ref: RefObject<HTMLElement>, continueObserving: boolean = false): boolean => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!continueObserving) {
            observer.disconnect()
          }
        } else if (continueObserving) {
          setIsVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current !== null) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current !== null) {
        observer.unobserve(ref.current)
        observer.disconnect()
      }
    }
  }, [ref, continueObserving])

  return isVisible
}

export default useElementVisible
