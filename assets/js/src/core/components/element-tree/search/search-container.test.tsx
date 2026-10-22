/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => ({
  createStyles: () => () => ({ styles: {}, cx: (...classNames: unknown[]) => classNames.filter(Boolean).join(' '), theme: {} })
}))

jest.mock('@Pimcore/components/icon/icon', () => ({
  Icon: ({ value }: { value: string }) => <span data-testid={ `icon-${value}` } />
}))

jest.mock('@Pimcore/components/element-tree/hooks/use-element-tree-node', () => ({
  useElementTreeNode: jest.fn()
}))

jest.mock('../provider/tree-filter-provider/use-tree-filter', () => ({
  useTreeFilter: () => ({ pageSize: 30 })
}))

// eslint-disable-next-line import/first
import '@testing-library/jest-dom'
// eslint-disable-next-line import/first
import React from 'react'
// eslint-disable-next-line import/first
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/first
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/first
import { SearchContainer } from './search-container'
// eslint-disable-next-line import/first
import { useElementTreeNode } from '@Pimcore/components/element-tree/hooks/use-element-tree-node'
// eslint-disable-next-line import/first
import { type TreeNodeProps } from '@Pimcore/components/element-tree/node/tree-node'

const mockUseElementTreeNode = useElementTreeNode as jest.MockedFunction<typeof useElementTreeNode>

const setSearchTerm = jest.fn()
const setPage = jest.fn()

const renderSearch = (searchTerm?: string): void => {
  mockUseElementTreeNode.mockReturnValue({
    searchTerm,
    setSearchTerm,
    setPage
  } as unknown as ReturnType<typeof useElementTreeNode>)

  render(
    <SearchContainer
      label='Search'
      node={ { id: '1' } as unknown as TreeNodeProps }
      total={ 100 }
    />
  )
}

describe('element tree SearchContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows the close icon as clear button once there is text', async () => {
    renderSearch()

    expect(screen.getByTestId('icon-close').closest('.ant-input-clear-icon')).toHaveClass('ant-input-clear-icon-hidden')

    await userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'foo')

    expect(screen.getByTestId('icon-close').closest('.ant-input-clear-icon')).not.toHaveClass('ant-input-clear-icon-hidden')
  })

  it('clears the field and resets the search like an empty submit', async () => {
    renderSearch('foo')

    const input = screen.getByRole('textbox', { name: 'Search' })
    expect(input).toHaveValue('foo')

    await userEvent.click(screen.getByTestId('icon-close'))

    expect(input).toHaveValue('')
    expect(setSearchTerm).toHaveBeenCalledTimes(1)
    expect(setSearchTerm).toHaveBeenCalledWith(undefined)
    expect(setPage).toHaveBeenCalledTimes(1)
    expect(setPage).toHaveBeenCalledWith(1)
  })
})
