/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchProvider } from '@Pimcore/modules/search/provider/search-provider'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { ElementTag } from './element-tag'

const openElement = jest.fn()

jest.mock('@Pimcore/modules/element/hooks/use-element-helper', () => ({
  useElementHelper: () => ({
    openElement,
    mapToElementType: jest.fn(),
    mapToLegacyElementType: jest.fn(),
    executeElementTask: jest.fn()
  })
}))

jest.mock('./element-tag.styles', () => ({
  useStyles: () => ({ styles: {} })
}))

jest.mock('../tooltip/tooltip', () => ({
  Tooltip: ({ children }: { children?: React.ReactNode }) => children
}))

jest.mock('../../utils/use-element-overflow', () => ({
  __esModule: true,
  default: () => false
}))

jest.mock('@Pimcore/components/tag/tag', () => {
  const TagMock = React.forwardRef<HTMLButtonElement, { children?: React.ReactNode, onClick?: () => void }>(
    ({ children, onClick }, ref) => (
      <button
        onClick={ onClick }
        ref={ ref }
        type="button"
      >{ children }</button>
    )
  )
  TagMock.displayName = 'Tag'

  return { Tag: TagMock }
})

/** Opens the search on mount and renders its current open state, so a test can assert on it. */
const SearchStateProbe = (): React.JSX.Element => {
  const { isOpen, open } = useSearch()

  useEffect(() => {
    open()
  }, [])

  return <span data-testid="search-state">{ isOpen ? 'open' : 'closed' }</span>
}

describe('ElementTag', () => {
  beforeEach(() => {
    openElement.mockClear()
  })

  test('closes the enclosing search when a clickable tag is clicked', async () => {
    render(
      <SearchProvider>
        <SearchStateProbe />
        <ElementTag
          elementType="data-object"
          id={ 42 }
          path="/Products/Allfa"
        />
      </SearchProvider>
    )

    expect(screen.getByTestId('search-state')).toHaveTextContent('open')

    await userEvent.click(screen.getByText('/Products/Allfa'))

    expect(openElement).toHaveBeenCalledWith({ type: 'data-object', id: 42 })
    expect(screen.getByTestId('search-state')).toHaveTextContent('closed')
  })

  test('keeps the enclosing search open when a non-clickable tag is clicked', async () => {
    render(
      <SearchProvider>
        <SearchStateProbe />
        <ElementTag
          elementType="data-object"
          path="/Products/Allfa"
        />
      </SearchProvider>
    )

    await userEvent.click(screen.getByText('/Products/Allfa'))

    expect(openElement).not.toHaveBeenCalled()
    expect(screen.getByTestId('search-state')).toHaveTextContent('open')
  })

  test('opens the element without a SearchProvider above it', async () => {
    render(
      <ElementTag
        elementType="data-object"
        id={ 42 }
        path="/Products/Allfa"
      />
    )

    await userEvent.click(screen.getByText('/Products/Allfa'))

    expect(openElement).toHaveBeenCalledWith({ type: 'data-object', id: 42 })
  })
})
