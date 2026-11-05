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

const openByClick = (result: { current: ReturnType<typeof useNavOpenState> }, ...keys: string[]): void => {
  keys.forEach(key => { act(() => { result.current.handleOpenState(KEYBOARD_CLICK, key) }) })
}

describe('useNavOpenState nested levels', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('opens a hovered nested group once the delay has passed and closes its open sibling', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1', '1-0', '1-0-2')

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-3', true) })
    expect(result.current.openKeys).toEqual(['1', '1-0', '1-0-2'])

    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual(['1', '1-3'])
  })

  it('closes the open sibling panel and its descendants when a nested leaf is hovered', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1', '1-0', '1-0-2')

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-4', false) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['1'])
  })

  it('keeps the ancestor panels open when an item two levels deep is hovered', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1', '1-0', '1-0-2')

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-0-1', true) })
    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual(['1', '1-0', '1-0-1'])

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-0-3', false) })
    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual(['1', '1-0'])
  })

  it('keeps the deeper levels when the open nested group is hovered again', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1', '1-0', '1-0-2')

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-0', true) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['1', '1-0', '1-0-2'])
  })

  it('keeps the deeper levels when the mouse comes back onto an open group and clicks it', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1', '1-0', '1-0-2')

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-0-2', true) })
    act(() => { jest.advanceTimersByTime(150) })

    act(() => { result.current.handleOpenState(CLICK, '1-0') })
    expect(result.current.openKeys).toEqual(['1', '1-0', '1-0-2'])

    act(() => { result.current.handleOpenState(CLICK, '1') })
    expect(result.current.openKeys).toEqual(['1', '1-0', '1-0-2'])
  })

  it('collapses the deeper levels when an open nested group is clicked without the mouse on it', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1', '1-0', '1-0-2')

    act(() => { result.current.handleOpenState(CLICK, '1-0') })
    expect(result.current.openKeys).toEqual(['1', '1-0'])
  })

  it('leaves the open keys untouched when a nested leaf has no open sibling', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1')
    const openKeys = result.current.openKeys

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-4', false) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toBe(openKeys)
  })

  it('cuts multi-digit sibling indexes at the last separator', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1', '1-10', '1-10-3')

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-10-12', true) })
    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual(['1', '1-10', '1-10-12'])

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-1', false) })
    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual(['1'])
  })

  it('does not treat a multi-digit sibling under the mouse as the clicked group', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1')
    act(() => { result.current.handleItemPointerEnter(MOUSE, '10', true) })

    act(() => { result.current.handleOpenState(CLICK, '1') })
    expect(result.current.openKeys).toEqual([])
  })

  it('ignores nested items hovered by a pointer that is not a mouse', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    openByClick(result, '1', '1-0')

    act(() => { result.current.handleItemPointerEnter(TOUCH, '1-3', true) })
    act(() => { result.current.handleItemPointerEnter(TOUCH, '1-4', false) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['1', '1-0'])
  })

  it('ignores nested hover while the closed menu is still fading out', () => {
    const { result, rerender } = renderHook(
      ({ isMenuOpen }) => useNavOpenState(isMenuOpen),
      { initialProps: { isMenuOpen: true } }
    )

    openByClick(result, '1', '1-0')
    rerender({ isMenuOpen: false })

    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-3', true) })
    act(() => { result.current.handleItemPointerEnter(MOUSE, '1-4', false) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['1', '1-0'])
  })
})
