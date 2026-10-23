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
import { ConfigLayout } from './config-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const tree = <p>tree</p>
const form = <p>form</p>

// The snapshots were taken from the ConfigLayout implementation of 2026.x before it became a PageLayout wrapper.
describe('ConfigLayout (deprecated wrapper, parity with 2026.x)', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders the default 20/80 split with a 170px minimum, divider and toolbar', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('lets the items override the default sizes', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { minSize: 180, maxSize: 300, size: 180, children: tree } }
        resizeAble
        rightItem={ { children: form } }
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('lets an explicitly undefined size replace the default', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { size: undefined, children: tree } }
        rightItem={ { children: form } }
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders without divider and toolbar when they are switched off', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
        withDivider={ false }
        withToolbar={ false }
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('ignores the full-width flags', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        leftItemFullWidth
        rightItem={ { children: form } }
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('resizes by keyboard only when resizeAble is set', () => {
    mockSplitLayoutGeometry(1000)
    const { container, rerender } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
      />
    )

    fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowRight' })
    expect(container.firstChild).toMatchSnapshot()

    rerender(
      <ConfigLayout
        leftItem={ { children: tree } }
        resizeAble
        rightItem={ { children: form } }
      />
    )

    for (let i = 0; i < 10; i++) {
      fireEvent.keyDown(screen.getByRole('button'), { key: 'ArrowLeft' })
    }

    expect(container.firstChild).toMatchSnapshot()
  })
})
