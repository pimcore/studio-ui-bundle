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
import { render, screen } from '@testing-library/react'
import { getContainerOf, getDivider, getPaneSizing, getSplitLayoutParts } from '@test-utils/page-layout-queries'
import { PageLayout } from './page-layout'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const tree = <p>tree</p>
const form = <p>form</p>

// The content and split variants are tested next to their components.
describe('PageLayout', () => {
  it('is a memoized component', () => {
    expect(PageLayout).toHaveProperty('$$typeof', Symbol.for('react.memo'))
  })
})

describe('PageLayout config variant', () => {
  it('defaults to a 20/80 split with a 170px minimum, a fixed divider and toolbar alignment', () => {
    const { container } = render(
      <PageLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
        variant="config"
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: tree', 'divider', 'pane: form'])
    expect(getPaneSizing(getContainerOf('tree'))).toEqual(['20%', '170px', 'auto'])
    expect(getPaneSizing(getContainerOf('form'))).toEqual(['80%', 'auto', 'auto'])
    expect(getDivider()).toHaveClass('style-dividerContainer style-withToolbar', { exact: true })
  })

  it('lets the items and flags override the defaults', () => {
    render(
      <PageLayout
        leftItem={ { size: 25, minSize: 200, maxSize: 600, children: tree } }
        resizable
        rightItem={ { size: 75, children: form } }
        variant="config"
        withToolbar={ false }
      />
    )

    expect(getPaneSizing(getContainerOf('tree'))).toEqual(['25%', '200px', '600px'])
    expect(getPaneSizing(getContainerOf('form'))).toEqual(['75%', 'auto', 'auto'])
    expect(getDivider()).toHaveClass('style-dividerContainer style-resizable', { exact: true })
  })

  it('lets an explicitly undefined size replace the default', () => {
    render(
      <PageLayout
        leftItem={ { size: undefined, children: tree } }
        rightItem={ { children: form } }
        variant="config"
      />
    )

    expect(getPaneSizing(getContainerOf('tree'))).toEqual(['50%', '170px', 'auto'])
  })

  it('renders without a divider when it is switched off', () => {
    const { container } = render(
      <PageLayout
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
        variant="config"
        withDivider={ false }
      />
    )

    expect(getSplitLayoutParts(container.firstElementChild!)).toEqual(['pane: tree', 'pane: form'])
  })

  it('shows only one item at full width', () => {
    render(
      <PageLayout
        fullWidth="right"
        leftItem={ { children: tree } }
        rightItem={ { children: form } }
        variant="config"
      />
    )

    expect(getPaneSizing(getContainerOf('form'))).toEqual(['100%', 'auto', 'auto'])
    expect(screen.queryByText('tree')).not.toBeInTheDocument()
  })
})
