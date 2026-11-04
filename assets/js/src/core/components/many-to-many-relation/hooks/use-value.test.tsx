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

const renderUseValue = (initialValue: ManyToManyRelationValue, maxItems: number | null = null): ReturnType<typeof renderHook<{ value: ManyToManyRelationValue | null, hook: ReturnType<typeof useValue> }, unknown>> => {
  return renderHook(() => {
    const [value, setValue] = useState<ManyToManyRelationValue | null>(initialValue)
    const [displayedValue, setDisplayedValue] = useState<DisplayManyToManyRelationValue | null>(initialValue)
    const hook = useValue(value, setValue, displayedValue, setDisplayedValue, maxItems)
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

  describe('addDroppedElements', () => {
    const dropped = (id: number): Record<string, unknown> => ({ id, type: 'image', fullPath: `/item-${id}` })

    it('adds every dropped element when the field has no limit', async () => {
      const { result } = renderUseValue([createItem(1)], null)

      await act(async () => {
        result.current.hook.addDroppedElements([dropped(2), dropped(3)], 'asset')
      })

      expect(result.current.value?.map(item => item.id)).toEqual([1, 2, 3])
    })

    it('treats an unset limit like no limit', async () => {
      // field definitions without maxItems hand over undefined at runtime
      const { result } = renderUseValue([createItem(1)], undefined as unknown as null)

      await act(async () => {
        result.current.hook.addDroppedElements([dropped(2), dropped(3)], 'asset')
      })

      expect(result.current.value?.map(item => item.id)).toEqual([1, 2, 3])
    })

    it('fills up to the limit and leaves the rest out', async () => {
      const { result } = renderUseValue([createItem(1)], 2)

      await act(async () => {
        result.current.hook.addDroppedElements([dropped(2), dropped(3)], 'asset')
      })

      expect(result.current.value?.map(item => item.id)).toEqual([1, 2])
    })

    it('adds nothing to a full field', async () => {
      const { result } = renderUseValue([createItem(1), createItem(2)], 2)

      await act(async () => {
        result.current.hook.addDroppedElements([dropped(3)], 'asset')
      })

      expect(result.current.value?.map(item => item.id)).toEqual([1, 2])
    })
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
