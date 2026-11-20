/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import { act, renderHook, type RenderHookResult } from '@testing-library/react'
import { useOpen, type UseOpenHookReturn } from './open'
import { type GridContextMenuProps } from '@Pimcore/components/grid/grid'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { RowSelectionProvider } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/row-selection-provider'
import { useRowSelection, type UseRowSelectionReturn } from '@Pimcore/modules/element/listing/decorators/row-selection/context-layer/provider/use-row-selection'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { count?: number }) => options?.count === undefined ? key : `${key}:${options.count}`
  })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ openElement: mockOpenElement })
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: jest.fn()
}))

jest.mock('..', () => ({
  ContextMenuActionName: { open: 'open' }
}))

const mockOpenElement = jest.fn()

interface ListingHooks {
  rowSelection: UseRowSelectionReturn
  open: UseOpenHookReturn
}

const wrapper = ({ children }: { children: ReactNode }): React.JSX.Element => (
  <RowSelectionProvider>{children}</RowSelectionProvider>
)

const gridElement = (id: number, canView: boolean = true): GridContextMenuProps => ({
  id,
  isLocked: false,
  permissions: { view: canView } as unknown as GridContextMenuProps['permissions']
})

const gridRow = (id: number, canView: boolean = true): { id: string, original: GridContextMenuProps } => ({
  id: String(id),
  original: gridElement(id, canView)
})

const renderInListing = (elementType: ElementType): RenderHookResult<ListingHooks, unknown> => renderHook(() => ({
  rowSelection: useRowSelection(),
  open: useOpen(elementType)
}), { wrapper })

const select = (result: RenderHookResult<ListingHooks, unknown>['result'], elements: GridContextMenuProps[]): void => {
  act(() => {
    result.current.rowSelection.setSelectedRowsData(Object.fromEntries(elements.map(element => [element.id, element])))
    result.current.rowSelection.setSelectedRows(Object.fromEntries(elements.map(element => [element.id, true])))
  })
}

const clickItem = async (item: unknown): Promise<void> => {
  await (item as { onClick: () => unknown }).onClick()
}

const openedIds = (): number[] => mockOpenElement.mock.calls.map(([props]) => props.id)

describe('useOpen openGridContextMenuItem', () => {
  beforeEach(() => {
    mockOpenElement.mockReset().mockResolvedValue(undefined)
  })

  it('opens the right clicked row in a grid without row selection', async () => {
    const { result } = renderHook(() => useOpen('asset'))

    const item = result.current.openGridContextMenuItem(gridRow(1))
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open', hidden: false })
    expect(mockOpenElement.mock.calls).toEqual([[{ id: 1, type: 'asset' }]])
  })

  it('opens every selected element when the right clicked row is part of the selection', async () => {
    const { result } = renderInListing('data-object')
    select(result, [gridElement(2), gridElement(4), gridElement(9)])

    const item = result.current.open.openGridContextMenuItem(gridRow(4))
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open-multiple:3', hidden: false })
    expect(openedIds()).toEqual([2, 4, 9])
    expect(mockOpenElement.mock.calls.every(([props]) => props.type === 'data-object')).toBe(true)
  })

  it('counts and opens only the selected elements the user may view', async () => {
    const { result } = renderInListing('asset')
    select(result, [gridElement(1), gridElement(2, false), gridElement(3)])

    const item = result.current.open.openGridContextMenuItem(gridRow(1))
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open-multiple:2', hidden: false })
    expect(openedIds()).toEqual([1, 3])
  })

  it('shows the single open when the user may view only one of the selected elements', async () => {
    const { result } = renderInListing('asset')
    select(result, [gridElement(1), gridElement(2, false), gridElement(3, false)])

    const item = result.current.open.openGridContextMenuItem(gridRow(1))
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open', hidden: false })
    expect(openedIds()).toEqual([1])
  })

  it('hides the item when the user may view none of the selected elements', () => {
    const { result } = renderInListing('asset')
    select(result, [gridElement(1, false), gridElement(2, false)])

    const item = result.current.open.openGridContextMenuItem(gridRow(1, false))

    expect(item).toHaveProperty('hidden', true)
  })

  it('keeps the single open for a selection of one', async () => {
    const { result } = renderInListing('asset')
    select(result, [gridElement(5)])

    const item = result.current.open.openGridContextMenuItem(gridRow(5))
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open', hidden: false })
    expect(openedIds()).toEqual([5])
  })

  it('opens only the right clicked row when it is outside the selection', async () => {
    const { result } = renderInListing('asset')
    select(result, [gridElement(2), gridElement(3)])

    const item = result.current.open.openGridContextMenuItem(gridRow(1))
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open', hidden: false })
    expect(openedIds()).toEqual([1])
  })
})
