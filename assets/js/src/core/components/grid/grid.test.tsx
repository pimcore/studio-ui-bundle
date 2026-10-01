/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// antd-style is untranspiled ESM — every `.styles.ts` in the render tree goes through this
// factory, so stubbing it here avoids mocking each `.styles.ts` file individually
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

// Pulls in the untranspiled ESM styles of the antd table
jest.mock('@Pimcore/modules/ant-design/hooks/use-css-component-hash', () => ({
  useCssComponentHash: () => ''
}))

// The grid styles come from antd-style directly, which needs the antd theme token
jest.mock('./grid.styles', () => ({
  useStyles: () => ({ styles: { grid: 'grid', disabledGrid: 'disabled-grid', headerRow: 'header-row' } })
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}))

// The grid resolves the cell types through the container
jest.mock('@Pimcore/app/depency-injection', () => ({
  useInjection: () => ({ getDynamicType: () => undefined })
}))

jest.mock('./grid-cell/grid-cell', () => ({
  GridCell: () => null
}))

jest.mock('./columns/default-cell', () => ({
  DefaultCell: () => null
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { Grid } from './grid'

const COLUMN_SIZE = 150
const ROW_COUNT = 25

// The row virtualizer only renders rows when it knows the size of the scroll
// container, which jsdom does not lay out.
beforeAll(() => {
  Object.defineProperty(globalThis, 'ResizeObserver', {
    writable: true,
    value: class {
      constructor (private readonly callback: ResizeObserverCallback) {}

      // The virtualizer measures its scroll container through the observer,
      // which never fires on its own in jsdom.
      observe (element: Element): void {
        this.callback([{ target: element, contentRect: element.getBoundingClientRect() } as unknown as ResizeObserverEntry], this as unknown as ResizeObserver)
      }

      unobserve (): void {}
      disconnect (): void {}
    }
  })

  // The virtualizer reads the size of its scroll container from these
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 600 })
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 800 })
  Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({ width: 800, height: 33, top: 0, left: 0, right: 800, bottom: 33, x: 0, y: 0, toJSON: () => ({}) })
  })
})

const columns = [
  { id: 'name', accessorKey: 'name', header: 'Name', size: COLUMN_SIZE, cell: () => null },
  { id: 'path', accessorKey: 'path', header: 'Path', size: COLUMN_SIZE, cell: () => null }
]

const data = Array.from({ length: ROW_COUNT }, (_, index) => ({
  id: index + 1,
  name: `item ${index + 1}`,
  path: `/items/item-${index + 1}`
}))

const renderGrid = ({ virtualized = true }: { virtualized?: boolean } = {}): void => {
  render(
    <Grid
      columns={ columns }
      data={ data }
      enableRowVirtualizer={ virtualized }
      resizable
      setRowId={ (originalRow) => String(originalRow.id) }
    />
  )
}

const getWidth = (cell: HTMLElement): string | undefined => cell.style.width

const getFirstHeaderCell = (): HTMLElement => screen.getAllByRole('columnheader')[0]

const getFirstBodyCell = (): HTMLElement => {
  const [firstCell] = document.querySelectorAll<HTMLElement>('tbody td.ant-table-cell')

  return firstCell
}

const resizeFirstColumn = (): void => {
  const [resizer] = screen.getAllByRole('button', { name: 'grid.aria.column-resize' })

  fireEvent.keyDown(resizer, { key: 'ArrowRight' })
}

describe('Grid column resizing with the row virtualizer enabled', () => {
  it('renders virtualized rows whose cells match the header width', () => {
    renderGrid()

    expect(getFirstBodyCell()).toBeDefined()
    expect(getWidth(getFirstHeaderCell())).toBe(`${COLUMN_SIZE}px`)
    expect(getWidth(getFirstBodyCell())).toBe(`${COLUMN_SIZE}px`)
  })

  it('resizes the body cells together with the header cell', () => {
    renderGrid()

    resizeFirstColumn()

    expect(getWidth(getFirstHeaderCell())).toBe(`${COLUMN_SIZE + 5}px`)
    expect(getWidth(getFirstBodyCell())).toBe(`${COLUMN_SIZE + 5}px`)
  })
})

describe('Grid column resizing without the row virtualizer', () => {
  it('resizes the body cells together with the header cell', () => {
    renderGrid({ virtualized: false })

    resizeFirstColumn()

    expect(getWidth(getFirstHeaderCell())).toBe(`${COLUMN_SIZE + 5}px`)
    expect(getWidth(getFirstBodyCell())).toBe(`${COLUMN_SIZE + 5}px`)
  })
})
