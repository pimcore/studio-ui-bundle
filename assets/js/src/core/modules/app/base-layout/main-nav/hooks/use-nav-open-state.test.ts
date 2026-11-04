/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { act, renderHook } from '@testing-library/react'
import { useNavOpenState } from './use-nav-open-state'
import { CLICK, KEYBOARD_CLICK, MOUSE, TOUCH } from './use-nav-open-state.test-utils'

describe('useNavOpenState', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('opens a hovered root group once the delay has passed', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1', true) })
    expect(result.current.openKeys).toEqual([])

    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual(['1'])
  })

  it('keeps only the last group hovered while sweeping across the column', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleItemPointerEnter(MOUSE, '0', true) })
    act(() => { result.current.handleItemPointerEnter(MOUSE, '1', true) })
    act(() => { result.current.handleItemPointerEnter(MOUSE, '2', true) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['2'])
  })

  it('leaves the levels opened by click untouched when the open group is hovered again', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleOpenState(CLICK, '1') })
    act(() => { result.current.handleOpenState(CLICK, '1-0') })
    expect(result.current.openKeys).toEqual(['1', '1-0'])

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1', true) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['1', '1-0'])
  })

  it('closes the open group when a root item without children is hovered', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleOpenState(CLICK, '1') })

    act(() => { result.current.handleItemPointerEnter(MOUSE, '3', false) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual([])
  })

  it('ignores pointers that are not a mouse', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleItemPointerEnter(TOUCH, '1', true) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual([])
  })

  it('drops a pending preview when the pointer leaves the column', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1', true) })
    act(() => { result.current.cancelHoverPreview() })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual([])
  })

  it('keeps a hovered root group open when it is clicked', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1', true) })
    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual(['1'])

    act(() => { result.current.handleOpenState(CLICK, '1') })
    expect(result.current.openKeys).toEqual(['1'])

    act(() => { result.current.handleOpenState(CLICK, '1') })
    expect(result.current.openKeys).toEqual(['1'])
  })

  it('keeps a root group open when the mouse comes back from its panel and clicks it', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1', true) })
    act(() => { jest.advanceTimersByTime(150) })
    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-2', false) })
    act(() => { jest.advanceTimersByTime(150) })

    act(() => { result.current.handleOpenState(CLICK, '1') })
    expect(result.current.openKeys).toEqual(['1'])
  })

  it('opens a root group on a click inside the preview delay and closes its open sibling', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleOpenState(CLICK, '1') })

    act(() => { result.current.handleItemPointerEnter(MOUSE, '2', true) })
    act(() => { jest.advanceTimersByTime(80) })
    act(() => { result.current.handleOpenState(CLICK, '2') })
    expect(result.current.openKeys).toEqual(['2'])

    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual(['2'])
  })

  it('toggles a root group on a click without the mouse on it, as screen readers and touch send', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleItemPointerEnter(TOUCH, '1', true) })
    act(() => { result.current.handleOpenState(CLICK, '1') })
    expect(result.current.openKeys).toEqual(['1'])

    act(() => { result.current.handleOpenState(CLICK, '1') })
    expect(result.current.openKeys).toEqual([])
  })

  it('toggles a hovered root group on a click once the mouse has left the column', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1', true) })
    act(() => { jest.advanceTimersByTime(150) })
    act(() => { result.current.cancelHoverPreview() })

    act(() => { result.current.handleOpenState(CLICK, '1') })
    expect(result.current.openKeys).toEqual([])
  })

  it('still toggles a root group on a keyboard click', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleOpenState(KEYBOARD_CLICK, '1') })
    expect(result.current.openKeys).toEqual(['1'])

    act(() => { result.current.handleOpenState(KEYBOARD_CLICK, '1') })
    expect(result.current.openKeys).toEqual([])
  })

  it('closes a hovered root group on a keyboard click', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1', true) })
    act(() => { jest.advanceTimersByTime(150) })

    act(() => { result.current.handleOpenState(KEYBOARD_CLICK, '1') })
    expect(result.current.openKeys).toEqual([])
  })

  it('ignores hover while the closed menu is still fading out', () => {
    const { result, rerender } = renderHook(
      ({ isMenuOpen }) => useNavOpenState(isMenuOpen),
      { initialProps: { isMenuOpen: true } }
    )

    act(() => { result.current.handleOpenState(CLICK, '1') })
    rerender({ isMenuOpen: false })

    act(() => { result.current.handleItemPointerEnter(MOUSE, '5', true) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['1'])
  })

  it('does not let a pending preview undo a keyboard click that closed the group', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleOpenState(KEYBOARD_CLICK, '1') })
    expect(result.current.openKeys).toEqual(['1'])

    // the mouse enters the row, then the keyboard click lands inside the preview delay
    act(() => { result.current.handleItemPointerEnter(MOUSE, '1', true) })
    act(() => { jest.advanceTimersByTime(80) })
    act(() => { result.current.handleOpenState(KEYBOARD_CLICK, '1') })
    expect(result.current.openKeys).toEqual([])

    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual([])
  })
})
