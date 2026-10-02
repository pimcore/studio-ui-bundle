/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PointerEvent, useEffect, useRef, useState } from 'react'
import { isEmpty } from 'lodash'

const HOVER_PREVIEW_DELAY = 120

interface IUseNavOpenStateReturn {
  openKeys: string[]
  handleOpenState: (key: string) => void
  handleRootPointerEnter: (event: PointerEvent<HTMLLIElement>, index: string, hasChildren: boolean) => void
  cancelHoverPreview: () => void
}

export const useNavOpenState = (isMenuOpen: boolean): IUseNavOpenStateReturn => {
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const hoverPreviewTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMenuOpenRef = useRef(isMenuOpen)

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen
  }, [isMenuOpen])

  const cancelHoverPreview = (): void => {
    if (hoverPreviewTimer.current !== null) {
      clearTimeout(hoverPreviewTimer.current)
      hoverPreviewTimer.current = null
    }
  }

  const handleOpenState = (key: string): void => {
    // a click lands inside the preview delay of the pointer enter that preceded it
    cancelHoverPreview()

    // indexes can be multi-digit, so the sibling prefix has to be cut at the last separator
    const separatorIndex = key.lastIndexOf('-')

    if (separatorIndex === -1) {
      setOpenKeys(openKeys.includes(key) ? openKeys.filter(k => k !== key) : [key])
    } else {
      const siblingPrefix = key.substring(0, separatorIndex + 1)
      setOpenKeys([...openKeys.filter(k => !k.startsWith(siblingPrefix)), key])
    }
  }

  const scheduleHoverPreview = (index: string, hasChildren: boolean): void => {
    cancelHoverPreview()

    hoverPreviewTimer.current = setTimeout(() => {
      setOpenKeys((currentOpenKeys) => {
        if (!hasChildren) {
          return isEmpty(currentOpenKeys) ? currentOpenKeys : []
        }

        // already open: keep the deeper levels the user opened by click
        return currentOpenKeys.includes(index) ? currentOpenKeys : [index]
      })
    }, HOVER_PREVIEW_DELAY)
  }

  const handleRootPointerEnter = (event: PointerEvent<HTMLLIElement>, index: string, hasChildren: boolean): void => {
    // the closed menu stays mounted and hoverable while it fades out, and its handlers
    // captured the open state of their render, so the current value has to come from the ref
    if (!isMenuOpenRef.current || event.pointerType !== 'mouse') {
      return
    }

    scheduleHoverPreview(index, hasChildren)
  }

  return {
    openKeys,
    handleOpenState,
    handleRootPointerEnter,
    cancelHoverPreview
  }
}
