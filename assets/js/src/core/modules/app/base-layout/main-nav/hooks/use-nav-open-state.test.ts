/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PointerEvent } from 'react'
import { act, renderHook } from '@testing-library/react'
import { useNavOpenState } from './use-nav-open-state'

const pointerEvent = (pointerType: string): PointerEvent<HTMLLIElement> => (
  { pointerType } as unknown as PointerEvent<HTMLLIElement>
)

const MOUSE = pointerEvent('mouse')
const TOUCH = pointerEvent('touch')

describe('useNavOpenState', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('opens a hovered root group once the delay has passed', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleRootPointerEnter(MOUSE, '1', true) })
    expect(result.current.openKeys).toEqual([])

    act(() => { jest.advanceTimersByTime(150) })
    expect(result.current.openKeys).toEqual(['1'])
  })

  it('keeps only the last group hovered while sweeping across the column', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleRootPointerEnter(MOUSE, '0', true) })
    act(() => { result.current.handleRootPointerEnter(MOUSE, '1', true) })
    act(() => { result.current.handleRootPointerEnter(MOUSE, '2', true) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['2'])
  })

  it('leaves the levels opened by click untouched when the open group is hovered again', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleOpenState('1') })
    act(() => { result.current.handleOpenState('1-0') })
    expect(result.current.openKeys).toEqual(['1', '1-0'])

    act(() => { result.current.handleRootPointerEnter(MOUSE, '1', true) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['1', '1-0'])
  })

  it('closes the open group when a root item without children is hovered', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleOpenState('1') })

    act(() => { result.current.handleRootPointerEnter(MOUSE, '3', false) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual([])
  })

  it('ignores pointers that are not a mouse', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleRootPointerEnter(TOUCH, '1', true) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual([])
  })

  it('drops a pending preview when the pointer leaves the column', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleRootPointerEnter(MOUSE, '1', true) })
    act(() => { result.current.cancelHoverPreview() })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual([])
  })

  it('still toggles a root group on click', () => {
    const { result } = renderHook(() => useNavOpenState(true))

    act(() => { result.current.handleOpenState('1') })
    expect(result.current.openKeys).toEqual(['1'])

    act(() => { result.current.handleOpenState('1') })
    expect(result.current.openKeys).toEqual([])
  })
  it('ignores hover while the closed menu is still fading out', () => {
    const { result, rerender } = renderHook(
      ({ isMenuOpen }) => useNavOpenState(isMenuOpen),
      { initialProps: { isMenuOpen: true } }
    )

    act(() => { result.current.handleOpenState('1') })
    rerender({ isMenuOpen: false })

    act(() => { result.current.handleRootPointerEnter(MOUSE, '5', true) })
    act(() => { jest.advanceTimersByTime(150) })

    expect(result.current.openKeys).toEqual(['1'])
  })
})
