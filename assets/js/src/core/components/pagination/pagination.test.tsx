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
import { Pagination } from './pagination'

// The SDK barrel loads every Studio component and its styles; these stand-ins keep what the pager
// relies on: an icon button with an accessible name and a tooltip.
jest.mock('@sdk/components', () => {
  const { createElement } = jest.requireActual('react')
  return {
    CreatableSelect: () => null,
    Flex: ({ children }: any) => createElement('div', null, children),
    IconButton: ({ icon, className, tooltip, ...props }: any) => createElement('button', { ...props, 'data-icon': icon.value, 'data-tooltip': tooltip?.title, type: 'button' })
  }
})
jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: new Proxy({}, { get: (_t, key) => String(key) }), cx: (...names: any[]) => names.filter(Boolean).join(' '), theme: {} })
}))
jest.mock('@Pimcore/components/pagination/page-size', () => ({
  getDefaultPageSize: () => 10,
  getMaxPageSize: () => 100,
  getPageSizeOptions: () => [10, 20]
}))

const control = (name: string): HTMLElement => screen.getByRole('button', { name: `pagination.${name}` })

describe('Pagination', () => {
  it('draws first, previous, next and last around the page input, with their icons', () => {
    render(<Pagination total={ 45 } />)

    const names = screen.getAllByRole('button').map((button) => button.getAttribute('aria-label'))
    expect(names).toEqual(['pagination.first-page', 'pagination.previous-page', 'pagination.next-page', 'pagination.last-page'])
    expect(control('first-page')).toHaveAttribute('data-icon', 'chevron-left-pipe')
    expect(control('first-page')).toHaveAttribute('data-tooltip', 'pagination.first-page')
    expect(control('last-page')).toHaveAttribute('data-icon', 'chevron-right-pipe')
    expect(screen.getByRole('textbox')).toHaveValue('1')
  })

  it('jumps to the last page and back to the first', () => {
    const onChange = jest.fn()
    render(
      <Pagination
        onChange={ onChange }
        total={ 45 }
      />
    )

    fireEvent.click(control('last-page'))
    expect(screen.getByRole('textbox')).toHaveValue('5')
    expect(onChange).toHaveBeenLastCalledWith(5, 10)

    fireEvent.click(control('first-page'))
    expect(screen.getByRole('textbox')).toHaveValue('1')
    expect(onChange).toHaveBeenLastCalledWith(1, 10)
  })

  it('steps one page with previous and next', () => {
    render(
      <Pagination
        current={ 3 }
        total={ 45 }
      />
    )

    fireEvent.click(control('next-page'))
    expect(screen.getByRole('textbox')).toHaveValue('4')

    fireEvent.click(control('previous-page'))
    fireEvent.click(control('previous-page'))
    expect(screen.getByRole('textbox')).toHaveValue('2')
  })

  it('disables the controls that lead nowhere', () => {
    const { rerender } = render(<Pagination total={ 45 } />)

    expect(control('first-page')).toBeDisabled()
    expect(control('previous-page')).toBeDisabled()
    expect(control('next-page')).toBeEnabled()
    expect(control('last-page')).toBeEnabled()

    rerender(
      <Pagination
        current={ 5 }
        total={ 45 }
      />
    )

    expect(control('first-page')).toBeEnabled()
    expect(control('previous-page')).toBeEnabled()
    expect(control('next-page')).toBeDisabled()
    expect(control('last-page')).toBeDisabled()
  })

  it('disables every control for an empty list and for a disabled pager', () => {
    const { rerender } = render(<Pagination total={ 0 } />)
    expect(screen.getAllByRole('button').every((button) => (button as HTMLButtonElement).disabled)).toBe(true)

    rerender(
      <Pagination
        current={ 3 }
        disabled
        total={ 45 }
      />
    )
    expect(screen.getAllByRole('button').every((button) => (button as HTMLButtonElement).disabled)).toBe(true)
  })

  it('shows the total in front of the controls, with the range of the current page', () => {
    const { container } = render(
      <Pagination
        current={ 5 }
        showTotal={ (total, [from, to]) => `${from}-${to} of ${total}` }
        total={ 45 }
      />
    )

    const totalText = screen.getByText('41-45 of 45')
    expect(totalText.compareDocumentPosition(control('first-page')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(container.querySelector('.ant-pagination-total-text')).toBeNull()
  })
})
