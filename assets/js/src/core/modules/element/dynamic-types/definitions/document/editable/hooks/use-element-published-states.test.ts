/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const dispatch = jest.fn()
const initiate = jest.fn((arg: unknown) => ({ type: 'initiate', arg }))

jest.mock('@sdk/app', () => ({
  useAppDispatch: () => dispatch
}))

jest.mock('@Pimcore/modules/element/element-api-slice.gen', () => ({
  api: { endpoints: { elementGetPublishedState: { initiate: (...args: unknown[]) => initiate(...(args as [unknown])) } } }
}))

// eslint-disable-next-line import/first
import { act, renderHook, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useElementPublishedStates } from './use-element-published-states'

type Ref = Parameters<typeof useElementPublishedStates>[0][number]

interface Deferred {
  resolve: (isPublished: boolean | null) => void
  reject: () => void
}

const answerWith = (answers: Record<string, boolean | null>): void => {
  dispatch.mockImplementation((action: { arg: { elementType: string, id: number } }) => ({
    unwrap: async () => ({ isPublished: answers[`${action.arg.elementType}:${action.arg.id}`] ?? null })
  }))
}

describe('useElementPublishedStates', () => {
  beforeEach(() => {
    dispatch.mockReset()
    initiate.mockClear()
  })

  it('looks up documents and data objects with the API element type', async () => {
    answerWith({ 'document:7': false, 'data-object:8': true })
    const refs: Ref[] = [{ id: 7, type: 'document' }, { id: 8, type: 'object' }]

    const { result } = renderHook(() => useElementPublishedStates(refs))

    await waitFor(() => { expect(result.current).toEqual({ 'document:7': false, 'data-object:8': true }) })
    expect(initiate).toHaveBeenCalledWith({ elementType: 'document', id: 7 }, { subscribe: false })
    expect(initiate).toHaveBeenCalledWith({ elementType: 'data-object', id: 8 }, { subscribe: false })
  })

  it('skips assets, unknown types and elements that already carry a published state', async () => {
    answerWith({ 'document:7': false })
    const refs: Ref[] = [
      { id: 1, type: 'asset' },
      { id: 2, type: 'unknown' },
      { id: 3, type: 'document', isPublished: true },
      { id: 7, type: 'document', isPublished: null }
    ]

    const { result } = renderHook(() => useElementPublishedStates(refs))

    await waitFor(() => { expect(result.current).toEqual({ 'document:7': false }) })
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  it('reports an unknown state when a lookup fails and keeps the other results', async () => {
    dispatch.mockImplementation((action: { arg: { id: number } }) => ({
      unwrap: async () => {
        if (action.arg.id === 7) {
          throw new Error('forbidden')
        }

        return { isPublished: false }
      }
    }))
    const refs: Ref[] = [{ id: 7, type: 'document' }, { id: 8, type: 'document' }]

    const { result } = renderHook(() => useElementPublishedStates(refs))

    await waitFor(() => { expect(result.current).toEqual({ 'document:7': null, 'document:8': false }) })
  })

  it('does not look up the same elements again on a re-render and only fetches new ones', async () => {
    answerWith({ 'document:7': false, 'document:8': true })

    const { result, rerender } = renderHook(
      ({ refs }: { refs: Ref[] }) => useElementPublishedStates(refs),
      { initialProps: { refs: [{ id: 7, type: 'document' }] as Ref[] } }
    )
    await waitFor(() => { expect(result.current).toEqual({ 'document:7': false }) })

    rerender({ refs: [{ id: 7, type: 'document' }] })
    expect(dispatch).toHaveBeenCalledTimes(1)

    rerender({ refs: [{ id: 7, type: 'document' }, { id: 8, type: 'document' }] })
    await waitFor(() => { expect(result.current).toEqual({ 'document:7': false, 'document:8': true }) })
    expect(dispatch).toHaveBeenCalledTimes(2)
  })

  it('looks up at most four elements at the same time', async () => {
    const pending: Deferred[] = []
    dispatch.mockImplementation(() => ({
      unwrap: async () => await new Promise((resolve, reject) => {
        pending.push({ resolve: (isPublished) => { resolve({ isPublished }) }, reject })
      })
    }))
    const refs: Ref[] = Array.from({ length: 6 }, (_, index) => ({ id: index + 1, type: 'document' }))

    const { result } = renderHook(() => useElementPublishedStates(refs))

    await waitFor(() => { expect(pending).toHaveLength(4) })

    await act(async () => { pending[0].resolve(false) })
    await waitFor(() => { expect(pending).toHaveLength(5) })

    await act(async () => { pending.slice(1).forEach((deferred) => { deferred.resolve(true) }) })
    await waitFor(() => { expect(pending).toHaveLength(6) })

    await act(async () => { pending[5].resolve(true) })
    await waitFor(() => { expect(Object.keys(result.current)).toHaveLength(6) })
    expect(dispatch).toHaveBeenCalledTimes(6)
  })
})
