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
import { useMcpServerTabManager } from './use-mcp-server-tab-manager'

const openThree = (): ReturnType<typeof renderHook<ReturnType<typeof useMcpServerTabManager>, unknown>> => {
  const hook = renderHook(() => useMcpServerTabManager())

  act(() => {
    for (const id of ['a', 'b', 'c']) {
      hook.result.current.openTab({ id, name: id.toUpperCase(), writeable: true })
    }
  })

  return hook
}

describe('useMcpServerTabManager', () => {
  it('activates the neighbouring tab when the active one is closed', () => {
    const { result } = openThree()
    act(() => { result.current.setActiveTab('b') })

    act(() => { result.current.closeTab('b') })

    expect(result.current.tabs.map((tab) => tab.id)).toEqual(['a', 'c'])
    expect(result.current.activeTabKey).toBe('c')
  })

  // The tab context menu calls onClose once per tab in a loop, through the same
  // function reference, so every close in the batch must see the latest active key.
  it('leaves no active tab after "close all" closes them in one batch', () => {
    const { result } = openThree()
    act(() => { result.current.setActiveTab('b') })
    const { closeTab } = result.current

    act(() => {
      ['a', 'b', 'c'].forEach((key) => { closeTab(key) })
    })

    expect(result.current.tabs).toEqual([])
    expect(result.current.activeTabKey).toBeUndefined()
  })

  it('keeps the remaining tab active after "close others" in one batch', () => {
    const { result } = openThree()
    act(() => { result.current.setActiveTab('b') })
    const { closeTab } = result.current

    act(() => {
      ['b', 'c'].forEach((key) => { closeTab(key) })
    })

    expect(result.current.tabs.map((tab) => tab.id)).toEqual(['a'])
    expect(result.current.activeTabKey).toBe('a')
  })
})
