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

import { useState, useLayoutEffect } from 'react'

export const useBreadcrumbSize = (editorTabsWidth?: number, initialBreadcrumbLastElementWidth?: number): {
  isHideBreadcrumb: boolean
  currentBreadcrumbWidth: number
} => {
  const [isHideBreadcrumb, setIsHideBreadcrumb] = useState(false)
  const [currentBreadcrumbWidth, setCurrentBreadcrumbWidth] = useState<number>(0)

  useLayoutEffect(() => {
    if (editorTabsWidth == null || initialBreadcrumbLastElementWidth == null) return

    const getBreadcrumbSettings = (width: number): { isHide: boolean, width: number } => {
      if (width <= 375) return { isHide: true, width: 50 }
      if (width <= 450) return { isHide: true, width: 70 }
      if (width <= 550) return { isHide: true, width: 85 }
      if (width <= 700) return { isHide: true, width: 100 }
      if (width <= 800) return { isHide: true, width: 150 }
      if (width <= 900) return { isHide: true, width: 200 }
      if (width <= 1000) return { isHide: true, width: 300 }
      if (width <= 1100) return { isHide: true, width: 400 }
      if (width <= 1200) return { isHide: true, width: 500 }
      if (width <= 1300) return { isHide: true, width: 600 }

      return {
        isHide: false,
        width: initialBreadcrumbLastElementWidth
      }
    }

    const { isHide, width } = getBreadcrumbSettings(editorTabsWidth)

    setIsHideBreadcrumb(isHide)
    setCurrentBreadcrumbWidth(width)
  }, [editorTabsWidth, initialBreadcrumbLastElementWidth])

  return { isHideBreadcrumb, currentBreadcrumbWidth }
}
