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

import { useState, useEffect } from 'react'

export const useBreadcrumbSize = (editorTabsWidth?: number, initialBreadcrumbLastElementWidth?: number): {
  isHideBreadcrumb: boolean
  currentBreadcrumbWidth: number
} => {
  const [isHideBreadcrumb, setIsHideBreadcrumb] = useState(false)
  const [currentBreadcrumbWidth, setCurrentBreadcrumbWidth] = useState<number>(0)

  useEffect(() => {
    if (editorTabsWidth == null || initialBreadcrumbLastElementWidth == null) return

    if (editorTabsWidth <= 375) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(50)
    }

    if (editorTabsWidth > 375 && editorTabsWidth <= 450) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(70)
    }

    if (editorTabsWidth > 450 && editorTabsWidth <= 550) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(100)
    }

    if (editorTabsWidth > 550 && editorTabsWidth <= 700) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(150)
    }

    if (editorTabsWidth > 700 && editorTabsWidth <= 800) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(200)
    }

    if (editorTabsWidth > 800 && editorTabsWidth <= 900) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(300)
    }

    if (editorTabsWidth > 900 && editorTabsWidth <= 1000) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(400)
    }

    if (editorTabsWidth > 1000 && editorTabsWidth <= 1100) {
      setIsHideBreadcrumb(true)
      setCurrentBreadcrumbWidth(500)
    }

    if (editorTabsWidth > 1100) {
      setIsHideBreadcrumb(false)
      setCurrentBreadcrumbWidth(initialBreadcrumbLastElementWidth)
    }
  }, [editorTabsWidth, initialBreadcrumbLastElementWidth])

  return { isHideBreadcrumb, currentBreadcrumbWidth }
}
