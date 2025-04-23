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
