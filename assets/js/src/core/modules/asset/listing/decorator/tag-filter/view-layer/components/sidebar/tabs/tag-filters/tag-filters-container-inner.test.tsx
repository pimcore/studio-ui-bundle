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
import { TagFilterProvider } from '../../../../../context-layer/provider/tag-filter/tag-filter-provider'
import { useTagFilter } from '../../../../../context-layer/provider/tag-filter/use-tag-filter'
import { TagFiltersProvider } from './provider/tag-filters/tag-filters-provider'
import { TagFiltersContainerInner } from './tag-filters-container-inner'

const setPage = jest.fn()

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))
jest.mock('@Pimcore/components/button/button', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/toolbar/toolbar', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/content/content', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/flex/flex', () => jest.requireActual('@test-utils/mocks/studio-component-mocks'))
jest.mock('@Pimcore/components/content-layout/content-layout', () => ({
  ContentLayout: ({ children, renderToolbar }: { children: React.ReactNode, renderToolbar?: React.ReactNode }) => <div>{children}{renderToolbar}</div>
}))
jest.mock('@Pimcore/components/title/title', () => ({ Title: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2> }))
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key: string) => key }) }))

jest.mock('@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging', () => ({
  usePaging: () => ({ setPage })
}))

jest.mock('./tags-tree-filters-container', () => ({
  TagsTreeFiltersContainer: ({ disabled, setCheckedKeys }: { disabled?: boolean, setCheckedKeys: (keys: string[]) => void }) => (
    <button
      data-disabled={ String(disabled) }
      data-testid="tags-tree"
      onClick={ () => { setCheckedKeys(['3']) } }
    />
  )
}))

const ListingState = (): React.JSX.Element => {
  const { tags, onlyUntagged } = useTagFilter()

  return <output data-testid="listing-state">{JSON.stringify({ tags, onlyUntagged })}</output>
}

const renderTab = (showOnlyUntaggedFilter: boolean): void => {
  render(
    <TagFilterProvider showOnlyUntaggedFilter={ showOnlyUntaggedFilter }>
      <TagFiltersProvider>
        <TagFiltersContainerInner />
      </TagFiltersProvider>
      <ListingState />
    </TagFilterProvider>
  )
}

const onlyUntaggedCheckbox = (): HTMLElement => screen.getByRole('checkbox', { name: 'element.sidebar.filter.only-untagged' })

describe('TagFiltersContainerInner', () => {
  beforeEach(() => { setPage.mockClear() })

  it('has no "only untagged" checkbox without the decorator option', () => {
    renderTab(false)

    expect(screen.queryByRole('checkbox', { name: 'element.sidebar.filter.only-untagged' })).not.toBeInTheDocument()
  })

  it('disables the tag tree while "only untagged" is ticked', () => {
    renderTab(true)

    expect(screen.getByTestId('tags-tree')).toHaveAttribute('data-disabled', 'false')

    fireEvent.click(onlyUntaggedCheckbox())

    expect(screen.getByTestId('tags-tree')).toHaveAttribute('data-disabled', 'true')
  })

  it('applies "only untagged" to the listing, keeps the selected tags and goes back to the first page', () => {
    renderTab(true)

    fireEvent.click(screen.getByTestId('tags-tree'))
    fireEvent.click(onlyUntaggedCheckbox())
    fireEvent.click(screen.getByRole('button', { name: 'Apply' }))

    expect(screen.getByTestId('listing-state')).toHaveTextContent(JSON.stringify({ tags: [3], onlyUntagged: true }))
    expect(setPage).toHaveBeenCalledWith(1)
  })

  it('unticks "only untagged" with "Clear all filters"', () => {
    renderTab(true)

    fireEvent.click(onlyUntaggedCheckbox())
    fireEvent.click(screen.getByRole('button', { name: 'Clear all filters' }))

    expect(onlyUntaggedCheckbox()).not.toBeChecked()
    expect(screen.getByTestId('tags-tree')).toHaveAttribute('data-disabled', 'false')
  })
})
