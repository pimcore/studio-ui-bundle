/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

// The resize icon resolves its registry through the DI container, which only exists in the running app.
jest.mock('@Pimcore/components/icon-button/icon-button', () => ({ IconButton: () => null }))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import { mockSplitLayoutGeometry } from '@test-utils/mocks/split-layout-geometry'
// eslint-disable-next-line import/first
import { SplitLayout } from './split-layout'
// eslint-disable-next-line import/first
import { SplitLayoutItem } from './components/item/split-layout-item'

const left = { size: 25, minSize: 415, children: <p>left</p> }
const right = { size: 75, children: <p>right</p> }

// The snapshots were taken from the SplitLayout implementation of 2026.x before it became a PageLayout wrapper.
describe('SplitLayout (deprecated wrapper, parity with 2026.x)', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders both items without a divider by default', () => {
    const { container } = render(
      <SplitLayout
        leftItem={ left }
        rightItem={ right }
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders a resizable divider', () => {
    const { container } = render(
      <SplitLayout
        leftItem={ { minSize: 450, size: 50, children: <p>left</p> } }
        resizeAble
        rightItem={ { minSize: 450, size: 50, children: <p>right</p> } }
        withDivider
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders a divider for a toolbar layout with min and max sizes', () => {
    const { container } = render(
      <SplitLayout
        leftItem={ { minSize: 180, maxSize: 300, size: 180, children: <p>left</p> } }
        rightItem={ { children: <p>right</p> } }
        withDivider
        withToolbar
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it.each([
    ['left', { leftItemFullWidth: true }],
    ['right', { rightItemFullWidth: true }],
    ['both', { leftItemFullWidth: true, rightItemFullWidth: true }]
  ])('renders the %s full-width flag', (_name, flags) => {
    const { container } = render(
      <SplitLayout
        leftItem={ left }
        rightItem={ right }
        withDivider
        { ...flags }
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('keeps the item sizes of the first render', () => {
    const { container, rerender } = render(
      <SplitLayout
        leftItem={ left }
        rightItem={ right }
      />
    )

    rerender(
      <SplitLayout
        leftItem={ { ...left, size: 60, children: <p>new left</p> } }
        rightItem={ { ...right, size: 40 } }
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('resizes by keyboard within the minimum size', () => {
    mockSplitLayoutGeometry(2000)
    const { container } = render(
      <SplitLayout
        leftItem={ left }
        resizeAble
        rightItem={ right }
        withDivider
      />
    )

    for (let i = 0; i < 20; i++) {
      fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowLeft' })
    }

    expect(container.firstChild).toMatchSnapshot()
  })
})

describe('SplitLayoutItem (deprecated, parity with 2026.x)', () => {
  it('renders a pane with the default size and forwards its ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    const { container } = render(
      <SplitLayoutItem
        maxSize={ 300 }
        ref={ ref }
      >
        <p>pane</p>
      </SplitLayoutItem>
    )

    expect(ref.current).toBe(container.firstChild)
    expect(container.firstChild).toMatchSnapshot()
  })
})
