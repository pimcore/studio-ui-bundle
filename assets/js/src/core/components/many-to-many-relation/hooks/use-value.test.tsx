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
import { act, renderHook } from '@testing-library/react'
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
})
