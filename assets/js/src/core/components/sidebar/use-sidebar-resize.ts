/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type RefObject, useEffect, useRef, useState } from 'react'
import { isNil } from 'lodash'
import { MIN_REMAINING_LAYOUT_WIDTH, SIDEBAR_CONTENT_WIDTHS, SIDEBAR_NAV_WIDTH } from './sidebar.styles'

const KEYBOARD_RESIZE_INCREMENT = 5

export type LayoutEdge = 'left' | 'right'

export interface UseSidebarResizeReturn {
  sidebarRef: RefObject<HTMLDivElement>
  contentRef: RefObject<HTMLDivElement>
  contentWidth: number | null
  isResizing: boolean
  startResizing: () => void
  onMouseResize: (event: MouseEvent) => void
  onKeyboardResize: (event: React.KeyboardEvent<HTMLDivElement>) => void
}

/**
 * Width management for the sidebar content panel. The resize handle sits on the edge the
 * sidebar shares with the main content — its left edge on a right-hand sidebar, its right
 * edge on a left-hand one — so dragging that edge away from the sidebar always widens the
 * panel. The width is clamped between the default width of the current sizing and the
 * layout width minus a reserve for the main content.
 */
export const useSidebarResize = (
  sizing: keyof typeof SIDEBAR_CONTENT_WIDTHS,
  layoutEdge: LayoutEdge
): UseSidebarResizeReturn => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [contentWidth, setContentWidth] = useState<number | null>(null)
  const [isResizing, setIsResizing] = useState<boolean>(false)

  // the Divider registers its document-level mousemove listener once on mount, so the
  // resize callbacks must only rely on refs — never on render-scoped values like props
  const sizingRef = useRef(sizing)
  sizingRef.current = sizing

  const edgeRef = useRef(layoutEdge)
  edgeRef.current = layoutEdge

  useEffect(() => {
    setContentWidth((width) => isNil(width) ? width : Math.max(width, SIDEBAR_CONTENT_WIDTHS[sizing]))
  }, [sizing])

  useEffect(() => {
    if (!isResizing) {
      return
    }

    const stopResizing = (): void => { setIsResizing(false) }
    document.addEventListener('mouseup', stopResizing)

    return () => { document.removeEventListener('mouseup', stopResizing) }
  }, [isResizing])

  const resizeBy = (delta: number): void => {
    const contentRect = contentRef.current?.getBoundingClientRect()
    const sidebarElement = sidebarRef.current

    if (isNil(contentRect) || isNil(sidebarElement)) {
      return
    }

    // everything between the sidebar's outer edge and the layout's opposite edge is
    // available; the offsetParent is the layout container (e.g. the ContentLayout)
    // since the sidebar itself is positioned
    const layoutElement = sidebarElement.offsetParent ?? document.body
    const sidebarRect = sidebarElement.getBoundingClientRect()
    const layoutRect = layoutElement.getBoundingClientRect()
    const availableWidth = edgeRef.current === 'left'
      ? layoutRect.right - sidebarRect.left
      : sidebarRect.right - layoutRect.left

    const minWidth = SIDEBAR_CONTENT_WIDTHS[sizingRef.current]
    const maxWidth = Math.max(minWidth, availableWidth - SIDEBAR_NAV_WIDTH - MIN_REMAINING_LAYOUT_WIDTH)

    setContentWidth(Math.min(Math.max(contentRect.width + delta, minWidth), maxWidth))
  }

  // a drag away from the sidebar widens it: rightwards on a left-hand sidebar, leftwards otherwise
  const resizeByPointerDelta = (movementX: number): void => {
    resizeBy(edgeRef.current === 'left' ? movementX : -movementX)
  }

  const onMouseResize = (event: MouseEvent): void => {
    resizeByPointerDelta(event.movementX)
  }

  const onKeyboardResize = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'ArrowLeft') {
      resizeByPointerDelta(-KEYBOARD_RESIZE_INCREMENT)
    }

    if (event.key === 'ArrowRight') {
      resizeByPointerDelta(KEYBOARD_RESIZE_INCREMENT)
    }
  }

  const startResizing = (): void => { setIsResizing(true) }

  return { sidebarRef, contentRef, contentWidth, isResizing, startResizing, onMouseResize, onKeyboardResize }
}
