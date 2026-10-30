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
import { render } from '@testing-library/react'
import { getContainerOf, getDivider, getPaneSizing, getSplitLayoutParts } from '@test-utils/page-layout-queries'
import { ConfigLayout } from './config-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const tree = <p>tree</p>
const form = <p>form</p>

describe('ConfigLayout (deprecated wrapper)', () => {
  it('renders the config variant of PageLayout with its defaults', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
      />
    )

    const layout = container.firstElementChild!
    expect(layout).toHaveClass('split-layout', 'style-splitLayout', 'ant-flex')
    expect(getSplitLayoutParts(layout)).toEqual(['pane: tree', 'divider', 'pane: form'])
    expect(getPaneSizing(getContainerOf('tree'))).toEqual(['20%', '170px', 'auto'])
    expect(getPaneSizing(getContainerOf('form'))).toEqual(['80%', 'auto', 'auto'])
    expect(getDivider()).toHaveClass('style-dividerContainer style-withToolbar', { exact: true })
  })

  it('passes the items and flags on, with resizeAble as resizable', () => {
    render(
      <ConfigLayout
        leftItem={ { minSize: 180, maxSize: 300, size: 180, children: tree } }
        resizeAble
        rightItem={ { children: form } }
        withToolbar={ false }
      />
    )

    expect(getPaneSizing(getContainerOf('tree'))).toEqual(['180%', '180px', '300px'])
    expect(getPaneSizing(getContainerOf('form'))).toEqual(['80%', 'auto', 'auto'])
    expect(getDivider()).toHaveClass('style-dividerContainer style-resizable', { exact: true })
  })

  it('renders without a divider when it is switched off', () => {
    const { container } = render(
      <ConfigLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
        withDivider={ false }
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: tree', 'pane: form'])
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
    expect(getPaneSizing(getContainerOf('tree'))).toEqual(['20%', '170px', 'auto'])
  })
})
