/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

// The `.styles` files pull in antd-style's untranspiled ESM build, which jest does not
// transform. Only the markup asserted below matters here.
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: () => '', theme: {} }),
  css: () => '',
  cx: () => '',
  keyframes: () => ''
}))

// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { CollapseItem } from './collapse-item'

describe('CollapseItem', () => {
  it('renders an expand icon and reveals its content when expandable', async () => {
    const expandIcon = jest.fn(() => <span data-testid='expand-icon' />)

    render(
      <CollapseItem
        expandIcon={ expandIcon }
        label='a note'
      >
        the body
      </CollapseItem>
    )

    expect(expandIcon).toHaveBeenCalled()
    expect(screen.getByTestId('expand-icon')).toBeInTheDocument()

    await userEvent.click(screen.getByText('a note'))

    expect(screen.getByText('the body')).toBeInTheDocument()
  })

  it('renders neither an expand icon nor a content box when not expandable', async () => {
    const expandIcon = jest.fn(() => <span data-testid='expand-icon' />)

    render(
      <CollapseItem
        expandIcon={ expandIcon }
        expandable={ false }
        label='a note'
      >
        the body
      </CollapseItem>
    )

    expect(expandIcon).not.toHaveBeenCalled()
    expect(screen.queryByTestId('expand-icon')).not.toBeInTheDocument()

    // Clicking the header of an item with nothing to reveal must stay inert — the empty
    // content strip it used to open is exactly what issue #3537 reports.
    await userEvent.click(screen.getByText('a note'))

    expect(screen.queryByText('the body')).not.toBeInTheDocument()
  })

  it('stays closed when not expandable even if it is marked active', () => {
    render(
      <CollapseItem
        active
        expandable={ false }
        label='a note'
      >
        the body
      </CollapseItem>
    )

    expect(screen.queryByText('the body')).not.toBeInTheDocument()
  })

  it('gives a non-expandable header no disclosure semantics', () => {
    // Not merely cosmetic: a header left as a disabled disclosure control is announced to
    // screen readers as a collapsed, unavailable button, which no CSS can correct.
    const { container } = render(
      <CollapseItem
        expandable={ false }
        label='a note'
      >
        the body
      </CollapseItem>
    )

    const header = container.querySelector('.ant-collapse-header')

    expect(header).not.toHaveAttribute('role')
    expect(header).not.toHaveAttribute('aria-expanded')
    expect(header).not.toHaveAttribute('aria-disabled')
    expect(header).not.toHaveAttribute('tabindex')
    expect(container.querySelector('.ant-collapse-item-disabled')).not.toBeInTheDocument()
  })
})
