/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { KeyboardSensor, PointerSensor, type DndContextProps, type DragEndEvent } from '@dnd-kit/core'
import { StackList } from './stack-list'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

jest.mock('../icon-button/icon-button', () => ({
  IconButton: React.forwardRef<HTMLButtonElement, Record<string, unknown>>(function IconButton (props, ref) {
    const { icon, theme, ...rest } = props
    return (
      <button
        ref={ ref }
        { ...rest }
      />
    )
  })
}))

jest.mock('../collapse/collapse', () => ({ CollapseItem: () => null }))

let dndProps: DndContextProps | undefined

jest.mock('@dnd-kit/core', () => {
  const actual = jest.requireActual('@dnd-kit/core')
  return {
    ...actual,
    DndContext: (props: DndContextProps) => {
      dndProps = props
      return <actual.DndContext { ...props } />
    }
  }
})

const createItems = (): Array<React.ComponentProps<typeof StackList>['items'][number]> => [
  { id: 'a', key: 'key-a', sortable: true, children: <span>A</span> },
  { id: 'b', key: 'key-b', sortable: true, children: <span>B</span> },
  { id: 'c', key: 'key-c', sortable: true, children: <span>C</span> }
]

const dragEnd = (activeId: string, overId: string): void => {
  act(() => {
    dndProps?.onDragEnd?.({ active: { id: activeId }, over: { id: overId } } as unknown as DragEndEvent)
  })
}

describe('StackList', () => {
  beforeEach(() => {
    dndProps = undefined
  })

  it('moves an item that has a key to the dropped position', () => {
    const onItemsChange = jest.fn()
    render(<StackList
      items={ createItems() }
      onItemsChange={ onItemsChange }
      sortable
           />)

    dragEnd('c', 'a')

    expect(onItemsChange).toHaveBeenCalledTimes(1)
    expect(onItemsChange.mock.calls[0][0].map((item: { id: string }) => item.id)).toEqual(['c', 'a', 'b'])
  })

  it('moves an item without a key to the dropped position', () => {
    const onItemsChange = jest.fn()
    const items = createItems().map(({ key, ...item }) => item)
    render(<StackList
      items={ items }
      onItemsChange={ onItemsChange }
      sortable
           />)

    dragEnd('a', 'c')

    expect(onItemsChange.mock.calls[0][0].map((item: { id: string }) => item.id)).toEqual(['b', 'c', 'a'])
  })

  it('supports keyboard sorting', () => {
    render(<StackList
      items={ createItems() }
      sortable
           />)

    const sensorTypes = (dndProps?.sensors ?? []).map((sensor) => sensor.sensor)
    expect(sensorTypes).toContain(KeyboardSensor)
    expect(sensorTypes).toContain(PointerSensor)
  })

  it('renders a labelled, focusable drag handle', () => {
    render(<StackList
      items={ createItems() }
      sortable
           />)

    const handles = screen.getAllByLabelText('aria.stack-list.drag-handle')
    expect(handles).toHaveLength(3)
    expect(handles[0]).toHaveAttribute('tabindex', '0')
  })
})
