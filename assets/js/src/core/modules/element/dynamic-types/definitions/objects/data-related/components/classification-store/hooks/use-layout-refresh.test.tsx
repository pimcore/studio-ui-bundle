/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * A configuration change replaces the layout of the groups an object editor field holds,
 * keeps the layout of a group that cannot be fetched and marks arriving keys as new.
 */

import React, { useEffect } from 'react'
import { act, render, screen } from '@testing-library/react'
import { type ClassificationStoreGroupLayout2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { emitClassificationStoreConfigurationChange } from '@Pimcore/modules/data-object/classification-store/classification-store-configuration-change'
import { ClassificationStoreProvider, useClassificationStore } from '../provider'
import { LAYOUT_REFRESH_DEBOUNCE_MS, useLayoutRefresh } from './use-layout-refresh'

const mockFetch = jest.fn()

jest.mock('@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced', () => ({
  useLazyClassificationStoreGetLayoutByGroupQuery: () => [mockFetch]
}))

const layout = (id: number, name: string, keyIds: number[]): ClassificationStoreGroupLayout2 => ({
  id,
  name,
  description: null,
  keys: keyIds.map((keyId) => ({ id: keyId, name: `key${keyId}`, definition: {} })) as ClassificationStoreGroupLayout2['keys']
})

let isNewKey: (groupId: string, keyId: string) => boolean = () => false

const Probe = ({ initial, refresh = true }: { initial: ClassificationStoreGroupLayout2[], refresh?: boolean }): React.JSX.Element => {
  const store = useClassificationStore()

  useEffect(() => { store.updateCurrentLayoutData(initial) }, [])
  isNewKey = store.isNewKey

  return (
    <>
      {refresh ? <Refresher /> : null}
      <div data-testid='layout'>
        {store.currentLayoutData.map((group) => `${group.name}:${group.keys.map((key) => key.id).join(',')}`).join('|')}
      </div>
    </>
  )
}

const Refresher = (): null => {
  useLayoutRefresh({ objectId: 42, fieldName: 'attrs' })
  return null
}

const renderProbe = (initial: ClassificationStoreGroupLayout2[], refresh = true): ReturnType<typeof render> => render(
  <ClassificationStoreProvider>
    <Probe
      initial={ initial }
      refresh={ refresh }
    />
  </ClassificationStoreProvider>
)

const emit = async (): Promise<void> => {
  await act(async () => {
    emitClassificationStoreConfigurationChange()
    await jest.advanceTimersByTimeAsync(LAYOUT_REFRESH_DEBOUNCE_MS)
  })
}

describe('useLayoutRefresh', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockFetch.mockReset()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('turns a burst of changes into one request per held group', async () => {
    mockFetch.mockImplementation(() => ({ unwrap: async () => layout(1, 'A', [10, 11]) }))
    renderProbe([layout(1, 'A', [10]), layout(2, 'B', [20])])

    await act(async () => {
      for (let i = 0; i < 20; i++) emitClassificationStoreConfigurationChange()
      await jest.advanceTimersByTimeAsync(LAYOUT_REFRESH_DEBOUNCE_MS)
    })

    expect(mockFetch).toHaveBeenCalledTimes(2)
  })

  it('requests nothing while mounting', () => {
    renderProbe([layout(1, 'A', [10])])

    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('requests the layout of each held group once, uncached, and replaces it', async () => {
    mockFetch.mockImplementation((arg: any) => ({
      unwrap: async () => arg.groupId === 1 ? layout(1, 'A renamed', [10, 11]) : layout(2, 'B', [20])
    }))
    renderProbe([layout(1, 'A', [10]), layout(2, 'B', [20])])

    await emit()

    expect(mockFetch).toHaveBeenCalledTimes(2)
    expect(mockFetch).toHaveBeenCalledWith({ objectId: 42, fieldName: 'attrs', groupId: 1 }, false)
    expect(mockFetch).toHaveBeenCalledWith({ objectId: 42, fieldName: 'attrs', groupId: 2 }, false)
    expect(screen.getByTestId('layout')).toHaveTextContent('A renamed:10,11|B:20')
  })

  it('marks arriving keys as new and leaves the known ones alone', async () => {
    mockFetch.mockImplementation(() => ({ unwrap: async () => layout(1, 'A', [10, 11]) }))
    renderProbe([layout(1, 'A', [10])])

    await emit()

    expect(isNewKey('1', '11')).toBe(true)
    expect(isNewKey('1', '10')).toBe(false)
    expect(isNewKey('2', '11')).toBe(false)
  })

  it('keeps the last known layout of a group that cannot be fetched', async () => {
    mockFetch.mockImplementation((arg: any) => ({
      unwrap: async () => {
        if (arg.groupId === 1) throw new Error('404')
        return layout(2, 'B', [20, 21])
      }
    }))
    renderProbe([layout(1, 'A', [10]), layout(2, 'B', [20])])

    await emit()

    expect(screen.getByTestId('layout')).toHaveTextContent('A:10|B:20,21')
    expect(isNewKey('1', '10')).toBe(false)
  })

  it('applies only the newest of two overlapping refreshes', async () => {
    const resolvers: Array<(value: any) => void> = []
    mockFetch.mockImplementation(() => ({ unwrap: async () => await new Promise((resolve) => { resolvers.push(resolve) }) }))
    renderProbe([layout(1, 'A', [10])])

    await emit()
    await emit()
    await act(async () => {
      resolvers[1](layout(1, 'second', [10]))
      resolvers[0](layout(1, 'first', [10]))
    })

    expect(screen.getByTestId('layout')).toHaveTextContent('second:10')
  })

  it('stops listening once unmounted', async () => {
    mockFetch.mockImplementation(() => ({ unwrap: async () => layout(1, 'A', [10]) }))
    const { unmount } = renderProbe([layout(1, 'A', [10])])

    unmount()
    await emit()

    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('requests nothing in a provider that does not mount the refresh', async () => {
    renderProbe([layout(1, 'A', [10])], false)

    await emit()

    expect(mockFetch).not.toHaveBeenCalled()
  })
})
