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
import { useTemporaryValue } from './use-temporary-value'

describe('useTemporaryValue', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('holds a value for the given duration', () => {
    const { result } = renderHook(() => useTemporaryValue<string>(1000))

    act(() => { result.current[1]('publish') })

    expect(result.current[0]).toBe('publish')

    act(() => { jest.advanceTimersByTime(1000) })

    expect(result.current[0]).toBeNull()
  })

  it('restarts the duration when a value is set again', () => {
    const { result } = renderHook(() => useTemporaryValue<string>(1000))

    act(() => { result.current[1]('save') })
    act(() => { jest.advanceTimersByTime(800) })
    act(() => { result.current[1]('publish') })
    act(() => { jest.advanceTimersByTime(800) })

    expect(result.current[0]).toBe('publish')
  })
})
