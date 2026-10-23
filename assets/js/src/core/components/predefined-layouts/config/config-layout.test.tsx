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
import { fireEvent, render, screen } from '@testing-library/react'
import { mockSplitLayoutGeometry } from '@test-utils/mocks/split-layout-geometry'
import { getPaneSizing, getSplitLayoutParts } from '@test-utils/split-layout-queries'
import { ConfigLayout } from './config-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const tree = <p>tree</p>
const form = <p>form</p>

const getPane = (text: string): HTMLElement => screen.getByText(text).parentElement!

const getDivider = (): HTMLElement => screen.getByRole('button').parentElement!

// Pins the ConfigLayout behaviour of 2026.x, before it became a PageLayout wrapper.
describe('ConfigLayout (deprecated wrapper, parity with 2026.x)', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the default 20/80 split with a 170px minimum, a divider and toolbar alignment', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
      />
    )

    const layout = container.firstElementChild!
    expect(container.children).toHaveLength(1)
    expect(layout).toHaveClass('split-layout', 'style-splitLayout', 'ant-flex')
    expect(getSplitLayoutParts(layout)).toEqual(['pane: tree', 'divider', 'pane: form'])
    expect(getPaneSizing(getPane('tree'))).toEqual(['20%', '170px', 'auto'])
    expect(getPaneSizing(getPane('form'))).toEqual(['80%', 'auto', 'auto'])
    expect(getDivider()).toHaveClass('style-dividerContainer style-withToolbar', { exact: true })
  })

  it('lets the items override the default sizes', () => {
    render(
      <ConfigLayout
        leftItem={ { minSize: 180, maxSize: 300, size: 180, children: tree } }
        resizeAble
        rightItem={ { children: form } }
      />
    )

    expect(getPaneSizing(getPane('tree'))).toEqual(['180%', '180px', '300px'])
    expect(getPaneSizing(getPane('form'))).toEqual(['80%', 'auto', 'auto'])
    expect(getDivider()).toHaveClass('style-dividerContainer style-resizable style-withToolbar', { exact: true })
  })

  it('lets an explicitly undefined size replace the default', () => {
    render(
      <ConfigLayout
        leftItem={ { size: undefined, children: tree } }
        rightItem={ { children: form } }
      />
    )

    expect(getPaneSizing(getPane('tree'))).toEqual(['50%', '170px', 'auto'])
  })

  it('renders without a divider when it is switched off', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
        withDivider={ false }
        withToolbar={ false }
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: tree', 'pane: form'])
    expect(getPaneSizing(getPane('tree'))).toEqual(['20%', '170px', 'auto'])
  })

  it('renders the divider without toolbar alignment when withToolbar is false', () => {
    render(
      <ConfigLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
        withToolbar={ false }
      />
    )

    expect(getDivider()).toHaveClass('style-dividerContainer', { exact: true })
  })

  it('ignores the full-width flags', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        leftItemFullWidth
        rightItem={ { children: form } }
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: tree', 'divider', 'pane: form'])
    expect(getPaneSizing(getPane('tree'))).toEqual(['20%', '170px', 'auto'])
    expect(getPaneSizing(getPane('form'))).toEqual(['80%', 'auto', 'auto'])
  })

  it('resizes by keyboard only when resizeAble is set, down to the 170px minimum', () => {
    mockSplitLayoutGeometry(1000)
    const { rerender } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
      />
    )

    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowRight' })
    expect(getPane('tree').style.width).toBe('20%')

    rerender(
      <ConfigLayout
        leftItem={ { children: tree } }
        resizeAble
        rightItem={ { children: form } }
      />
    )

    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowRight' })
    expect(parseFloat(getPane('tree').style.width)).toBeCloseTo(20.5)

    for (let i = 0; i < 10; i++) {
      fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowLeft' })
    }

    expect(parseFloat(getPane('tree').style.width)).toBeCloseTo(17)
    expect(parseFloat(getPane('form').style.width)).toBeCloseTo(83)
  })
})
