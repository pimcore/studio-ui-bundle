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
import { useOpenAnimationDone } from './use-open-animation-done'

describe('useOpenAnimationDone', () => {
  it('starts out waiting for the animation', () => {
    const { result } = renderHook(({ open }) => useOpenAnimationDone(open), {
      initialProps: { open: true }
    })

    expect(result.current.isOpenAnimationDone).toBe(false)
  })

  it('reports the animation as done once the modal says so', () => {
    const { result } = renderHook(({ open }) => useOpenAnimationDone(open), {
      initialProps: { open: true }
    })

    act(() => { result.current.setIsOpenAnimationDone(true) })

    expect(result.current.isOpenAnimationDone).toBe(true)
  })

  // The modal is unmounted as it closes, so its closing animation never reports back. Without the
  // reset the flag stayed true and the next opening was acted on mid-zoom.
  it('waits for the animation again on every later opening', () => {
    const { result, rerender } = renderHook(({ open }) => useOpenAnimationDone(open), {
      initialProps: { open: true }
    })

    act(() => { result.current.setIsOpenAnimationDone(true) })
    rerender({ open: false })

    expect(result.current.isOpenAnimationDone).toBe(false)

    rerender({ open: true })

    expect(result.current.isOpenAnimationDone).toBe(false)
  })
})
