/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { act, renderHook, type RenderHookResult } from '@testing-library/react'

// the styles module reaches antd-style's untranspiled ESM core; the hook only needs the
// layout constants from it
jest.mock('./sidebar.styles', () => ({
  useStyle: () => ({ styles: { sidebar: 'sidebar' } }),
  SIDEBAR_NAV_WIDTH: 45,
  SIDEBAR_CONTENT_WIDTHS: { default: 250, medium: 272, large: 432 },
  MIN_REMAINING_LAYOUT_WIDTH: 200
}))

// eslint-disable-next-line import/first
import { type LayoutEdge, useSidebarResize, type UseSidebarResizeReturn } from './use-sidebar-resize'

const LARGE = 432
const NAV_WIDTH = 45
const REMAINING = 200
const LAYOUT_WIDTH = 1000

type Hook = RenderHookResult<UseSidebarResizeReturn, unknown>

// the hook hands back read-only refs; the stubs stand in for what React would attach
const setRef = <T, >(ref: React.RefObject<T>, value: T): void => {
  const mutable: React.MutableRefObject<T> = ref as React.MutableRefObject<T>
  mutable.current = value
}

const rect = (left: number, right: number): DOMRect => ({
  left,
  right,
  width: right - left,
  top: 0,
  bottom: 0,
  height: 0,
  x: left,
  y: 0,
  toJSON: () => ({})
})

/**
 * A sidebar flush against one edge of a 1000px layout, with a panel at the large width.
 * Both edges see the same available width, so the clamp only stays correct while the hook
 * measures from the sidebar's own outer edge.
 */
const mountHook = (layoutEdge: LayoutEdge): Hook => {
  const hook = renderHook(() => useSidebarResize('large', layoutEdge))

  const layoutStub: Partial<HTMLElement> = { getBoundingClientRect: () => rect(0, LAYOUT_WIDTH) }
  const sidebarBounds = layoutEdge === 'left' ? rect(0, LARGE) : rect(LAYOUT_WIDTH - LARGE, LAYOUT_WIDTH)

  const sidebarStub: Partial<HTMLDivElement> = {
    getBoundingClientRect: () => sidebarBounds,
    offsetParent: layoutStub as HTMLElement
  }
  const contentStub: Partial<HTMLDivElement> = { getBoundingClientRect: () => rect(0, LARGE) }

  setRef(hook.result.current.sidebarRef, sidebarStub as HTMLDivElement)
  setRef(hook.result.current.contentRef, contentStub as HTMLDivElement)

  return hook
}

const drag = (hook: Hook, movementX: number): void => {
  const event: Partial<MouseEvent> = { movementX }

  act(() => { hook.result.current.onMouseResize(event as MouseEvent) })
}

const pressArrow = (hook: Hook, key: 'ArrowLeft' | 'ArrowRight'): void => {
  const event: Partial<React.KeyboardEvent<HTMLDivElement>> = { key }

  act(() => { hook.result.current.onKeyboardResize(event as React.KeyboardEvent<HTMLDivElement>) })
}

const widthOf = (hook: Hook): number | null => hook.result.current.contentWidth

describe('useSidebarResize', () => {
  describe('drag direction', () => {
    it('widens a right-hand sidebar when the handle is dragged left', () => {
      const hook = mountHook('right')

      drag(hook, -20)

      expect(widthOf(hook)).toBe(LARGE + 20)
    })

    it('widens a left-hand sidebar when the handle is dragged right', () => {
      const hook = mountHook('left')

      drag(hook, 20)

      expect(widthOf(hook)).toBe(LARGE + 20)
    })

    it('does not widen a right-hand sidebar when dragged right', () => {
      const hook = mountHook('right')

      drag(hook, 20)

      expect(widthOf(hook)).toBe(LARGE)
    })

    it('does not widen a left-hand sidebar when dragged left', () => {
      const hook = mountHook('left')

      drag(hook, -20)

      expect(widthOf(hook)).toBe(LARGE)
    })
  })

  describe('keyboard', () => {
    it('widens a right-hand sidebar on ArrowLeft', () => {
      const hook = mountHook('right')

      pressArrow(hook, 'ArrowLeft')

      expect(widthOf(hook)).toBe(LARGE + 5)
    })

    it('widens a left-hand sidebar on ArrowRight', () => {
      const hook = mountHook('left')

      pressArrow(hook, 'ArrowRight')

      expect(widthOf(hook)).toBe(LARGE + 5)
    })
  })

  describe('available width', () => {
    // measured from the wrong edge a left-hand sidebar reports only its own width as
    // available, which collapses maxWidth below the minimum and pins the panel
    it('lets a left-hand sidebar grow into the rest of the layout', () => {
      const hook = mountHook('left')

      drag(hook, 200)

      expect(widthOf(hook)).toBe(LARGE + 200)
    })

    it('reserves room for the main content at either edge', () => {
      const maxWidth = LAYOUT_WIDTH - NAV_WIDTH - REMAINING

      const right = mountHook('right')
      drag(right, -LAYOUT_WIDTH)
      expect(widthOf(right)).toBe(maxWidth)

      const left = mountHook('left')
      drag(left, LAYOUT_WIDTH)
      expect(widthOf(left)).toBe(maxWidth)
    })

    it('never shrinks below the width of the current sizing', () => {
      const hook = mountHook('right')

      drag(hook, LAYOUT_WIDTH)

      expect(widthOf(hook)).toBe(LARGE)
    })
  })
})
