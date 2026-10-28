/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState } from 'react'
import { act, renderHook, waitFor } from '@testing-library/react'
import { type DisplayManyToManyRelationValue, type ManyToManyRelationValue, useValue } from './use-value'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('@Pimcore/components/modal/alert-modal/hooks/use-alert-modal', () => ({
  useAlertModal: () => ({ warn: jest.fn() })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-format-path', () => ({
  useFormatPath: () => ({ formatPath: jest.fn(), hasUncachedItems: () => false })
}))

jest.mock('@Pimcore/modules/data-object/hooks/use-data-object', () => ({
  useDataObject: () => ({ id: 1 })
}))

const createItem = (id: number): ManyToManyRelationValue[number] => ({
  id,
  type: 'asset',
  subtype: 'image',
  fullPath: `/item-${id}`,
  isPublished: null
})

const renderUseValue = (initialValue: ManyToManyRelationValue): ReturnType<typeof renderHook<{ value: ManyToManyRelationValue | null, hook: ReturnType<typeof useValue> }, unknown>> => {
  return renderHook(() => {
    const [value, setValue] = useState<ManyToManyRelationValue | null>(initialValue)
    const [displayedValue, setDisplayedValue] = useState<DisplayManyToManyRelationValue | null>(initialValue)
    const hook = useValue(value, setValue, displayedValue, setDisplayedValue, null)
    return { value, hook }
  })
}

describe('useValue', () => {
  it('deletes the correct items when deleteItem is called from a stale closure', async () => {
    const [a, b, c, d] = [1, 2, 3, 4].map(createItem)
    const { result } = renderUseValue([a, b, c, d])

    // Memoized grid cells may keep the deleteItem callback of an earlier render
    const staleDeleteItem = result.current.hook.deleteItem

    await act(async () => {
      result.current.hook.deleteItem(3)
    })
    expect(result.current.value).toEqual([a, b, c])

    await act(async () => {
      staleDeleteItem(0)
    })
    expect(result.current.value).toEqual([b, c])
  })

  // The search can be used while the visible field values are still loading; a term that only matches
  // a visible field value must find its rows once the values arrive.
  it('applies an active search again when the visible field values arrive', async () => {
    const [a, b] = [1, 2].map(createItem)
    const { result, rerender } = renderHook(({ visibleFieldsValue }: { visibleFieldsValue: Array<Record<string, any>> }) => {
      const [value, setValue] = useState<ManyToManyRelationValue | null>([a, b])
      const [displayedValue, setDisplayedValue] = useState<DisplayManyToManyRelationValue | null>([a, b])
      const hook = useValue(value, setValue, displayedValue, setDisplayedValue, null, false, undefined, visibleFieldsValue)
      return { displayedValue, hook }
    }, { initialProps: { visibleFieldsValue: [] as Array<Record<string, any>> } })

    await act(async () => {
      result.current.hook.onSearch('golf')
    })
    await waitFor(() => { expect(result.current.displayedValue).toEqual([]) })

    rerender({ visibleFieldsValue: [{ id: 1, name: 'Polo' }, { id: 2, name: 'Golf' }] })

    await waitFor(() => { expect(result.current.displayedValue?.map(item => item.id)).toEqual([2]) })
  })

  // The toolbar debounces the search, so a search can run with an onSearch of a render before the
  // visible field values arrived; it must still match them.
  it('matches the latest visible field values in a search started before they arrived', async () => {
    const [a, b] = [1, 2].map(createItem)
    const { result, rerender } = renderHook(({ visibleFieldsValue }: { visibleFieldsValue: Array<Record<string, any>> }) => {
      const [value, setValue] = useState<ManyToManyRelationValue | null>([a, b])
      const [displayedValue, setDisplayedValue] = useState<DisplayManyToManyRelationValue | null>([a, b])
      const hook = useValue(value, setValue, displayedValue, setDisplayedValue, null, false, undefined, visibleFieldsValue)
      return { displayedValue, hook }
    }, { initialProps: { visibleFieldsValue: [] as Array<Record<string, any>> } })

    const searchOfEarlierRender = result.current.hook.onSearch

    rerender({ visibleFieldsValue: [{ id: 1, name: 'Polo' }, { id: 2, name: 'Golf' }] })

    await act(async () => {
      searchOfEarlierRender('golf')
    })

    await waitFor(() => { expect(result.current.displayedValue?.map(item => item.id)).toEqual([2]) })
  })
})
