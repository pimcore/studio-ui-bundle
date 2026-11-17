/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const openElement = jest.fn()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { count?: number }) => options?.count === undefined ? key : `${key}:${options.count}`
  })
}))

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({ openElement })
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: () => null
}))

jest.mock('..', () => ({
  ContextMenuActionName: { open: 'open' }
}))

// eslint-disable-next-line import/first
import { renderHook } from '@testing-library/react'
// eslint-disable-next-line import/first
import { useOpen } from './open'
// eslint-disable-next-line import/first
import { type GridContextMenuProps } from '@Pimcore/components/grid/grid'

const gridElement = (id: number, canView: boolean = true): GridContextMenuProps => ({
  id,
  isLocked: false,
  permissions: { view: canView } as unknown as GridContextMenuProps['permissions']
})

const gridRow = (id: number, canView: boolean = true): { original: GridContextMenuProps } => ({
  original: gridElement(id, canView)
})

const clickItem = async (item: unknown): Promise<void> => {
  await (item as { onClick: () => unknown }).onClick()
}

const openedIds = (): number[] => openElement.mock.calls.map(([props]) => props.id)

describe('useOpen openGridContextMenuItem', () => {
  beforeEach(() => {
    openElement.mockReset().mockResolvedValue(undefined)
  })

  it('opens the right clicked row when no selection is passed', async () => {
    const { result } = renderHook(() => useOpen('asset'))

    const item = result.current.openGridContextMenuItem(gridRow(1))
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open', hidden: false })
    expect(openElement.mock.calls).toEqual([[{ id: 1, type: 'asset' }]])
  })

  it('opens every selected element when the right clicked row is part of the selection', async () => {
    const { result } = renderHook(() => useOpen('data-object'))
    const selection = [gridElement(4), gridElement(2), gridElement(9)]

    const item = result.current.openGridContextMenuItem(gridRow(2), selection)
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open-selected:3', hidden: false })
    expect(openedIds()).toEqual([4, 2, 9])
    expect(openElement.mock.calls.every(([props]) => props.type === 'data-object')).toBe(true)
  })

  it('counts and opens only the selected elements the user may view', async () => {
    const { result } = renderHook(() => useOpen('asset'))
    const selection = [gridElement(1), gridElement(2, false), gridElement(3)]

    const item = result.current.openGridContextMenuItem(gridRow(1), selection)
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open-selected:2', hidden: false })
    expect(openedIds()).toEqual([1, 3])
  })

  it('hides the item when the user may view none of the selected elements', () => {
    const { result } = renderHook(() => useOpen('asset'))
    const selection = [gridElement(1, false), gridElement(2, false)]

    const item = result.current.openGridContextMenuItem(gridRow(1, false), selection)

    expect(item).toHaveProperty('hidden', true)
  })

  it('keeps the single open for a selection of one', async () => {
    const { result } = renderHook(() => useOpen('asset'))

    const item = result.current.openGridContextMenuItem(gridRow(5), [gridElement(5)])
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open', hidden: false })
    expect(openedIds()).toEqual([5])
  })

  it('opens only the right clicked row when it is outside the selection', async () => {
    const { result } = renderHook(() => useOpen('asset'))
    const selection = [gridElement(2), gridElement(3)]

    const item = result.current.openGridContextMenuItem(gridRow(1), selection)
    await clickItem(item)

    expect(item).toMatchObject({ label: 'element.open', hidden: false })
    expect(openedIds()).toEqual([1])
  })
})
