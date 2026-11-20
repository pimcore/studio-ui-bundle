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
import { ObjectSearchListing } from './object/listing/object-search-listing'
import { AssetSearchListing } from './asset/listing/asset-search-listing'
import { DocumentSearchListing } from './document/listing/document-search-listing'

// each decorator records the config the listing composes it with
const mockConfigs = new Map<string, unknown[]>()
function mockRecord (name: string, props: unknown, config?: unknown): unknown {
  mockConfigs.set(name, [...(mockConfigs.get(name) ?? []), config])
  return props
}
function mockSame (props: unknown): unknown { return props }
function mockPassThrough ({ children }: { children: React.ReactNode }): React.JSX.Element { return <>{children}</> }

jest.mock('@Pimcore/modules/element/listing/decorators/general-filters/general-filters-decorator', () => ({ GeneralFiltersDecorator: (props: unknown, config?: unknown) => mockRecord('filters', props, config) }))
jest.mock('./object/listing/decorator/column-configuration/column-configuration-decorator', () => ({ ColumnConfigurationDecorator: (props: unknown, config?: unknown) => mockRecord('columns', props, config) }))
jest.mock('./asset/listing/decorator/static-column-configuration/static-column-configuration-decorator', () => ({ StaticColumnConfigurationDecorator: (props: unknown, config?: unknown) => mockRecord('columns', props, config) }))
jest.mock('./document/listing/decorator/static-column-configuration/static-column-configuration-decorator', () => ({ StaticColumnConfigurationDecorator: (props: unknown, config?: unknown) => mockRecord('columns', props, config) }))
jest.mock('@Pimcore/modules/search/saved-search/saved-search-decorator', () => ({ SavedSearchDecorator: (props: unknown, config?: unknown) => mockRecord('saved-search', props, config) }))
jest.mock('@Pimcore/modules/element/listing/abstract/listing-container', () => ({ ListingContainer: () => null, defaultProps: {} }))
jest.mock('@Pimcore/modules/search/search-api-slice.gen', () => ({}))
jest.mock('@Pimcore/modules/search/provider/use-search', () => ({ useSearch: () => ({ close: jest.fn() }) }))
jest.mock('@Pimcore/types/enums/element/element-type', () => ({ elementTypes: { asset: 'asset', dataObject: 'data-object', document: 'document' } }))
// everything else the listings compose or wrap themselves in passes straight through
jest.mock('@Pimcore/modules/element/dynamic-types/registry/provider/dynamic-type-registry-provider', () => ({ DynamicTypeRegistryProvider: mockPassThrough }))
jest.mock('@Pimcore/components/language-selection/provider/language-selection-provider', () => ({ LanguageSelectionProvider: mockPassThrough }))
jest.mock('@Pimcore/modules/element/providers/element-click-behavior/element-click-behavior-provider', () => ({ ElementClickBehaviorProvider: mockPassThrough }))
jest.mock('@Pimcore/modules/element/listing/decorators/paging/paging-decorator', () => ({ PagingDecorator: mockSame }))
jest.mock('@Pimcore/modules/element/listing/decorators/sorting/sorting-decorator', () => ({ SortingDecorator: mockSame }))
jest.mock('@Pimcore/modules/element/listing/decorators/type-filter/type-filter-decorator', () => ({ TypeFilterDecorator: mockSame }))
jest.mock('@Pimcore/modules/asset/listing/decorator/tag-filter/tag-filter-decorator', () => ({ TagFilterDecorator: mockSame }))
jest.mock('@Pimcore/modules/data-object/listing/decorator/class-definition-selection/class-definition-selection-decorator', () => ({ ClassDefinitionSelectionDecorator: mockSame }))
jest.mock('@Pimcore/modules/data-object/listing/column-mapper/use-column-mapper', () => ({}))
jest.mock('@Pimcore/modules/asset/listing/hooks/use-root-element-id', () => ({}))
jest.mock('@Pimcore/modules/asset/listing/data-layer/use-data-query-helper', () => ({}))
jest.mock('./object/listing/data-layer/use-data-query-helper', () => ({}))
jest.mock('./object/listing/view/view-layer/views/default-view', () => ({}))
jest.mock('./asset/listing/view/view-layer/views/default-view', () => ({}))
jest.mock('./document/listing/view/view-layer/views/default-view', () => ({}))
jest.mock('./object/listing/decorator/open-element/open-element-decorator', () => ({ OpenElementDecorator: mockSame }))
jest.mock('./asset/listing/decorator/open-element/open-element-decorator', () => ({ OpenElementDecorator: mockSame }))
jest.mock('./document/listing/decorator/open-element/open-element-decorator', () => ({ OpenElementDecorator: mockSame }))

const configOf = (name: string): { readOnly?: boolean, fieldsReadOnly?: boolean } | undefined => {
  const configs = mockConfigs.get(name) ?? []
  return configs[configs.length - 1] as { readOnly?: boolean, fieldsReadOnly?: boolean } | undefined
}
const readOnlyOf = (name: string): unknown => configOf(name)?.readOnly

const listings = [
  ['object', ObjectSearchListing],
  ['asset', AssetSearchListing],
  ['document', DocumentSearchListing]
] as const

describe.each(listings)('the %s search listing', (_type, Listing) => {
  beforeEach(() => {
    mockConfigs.clear()
  })

  it('makes filters, columns and the saved-search panel a view when the saved search is read-only', () => {
    render(<Listing savedSearchReadOnly />)

    expect(readOnlyOf('filters')).toBe(true)
    expect(readOnlyOf('columns')).toBe(true)
    expect(readOnlyOf('saved-search')).toBe(true)
    expect(configOf('saved-search')?.fieldsReadOnly).toBe(true)
  })

  it('hides only the saved-search write actions when asked to, everything else stays editable', () => {
    render(<Listing hideSavedSearchActions />)

    expect(readOnlyOf('filters')).toBe(false)
    expect(readOnlyOf('columns')).toBe(false)
    expect(readOnlyOf('saved-search')).toBe(true)
    expect(configOf('saved-search')?.fieldsReadOnly).toBe(false)
  })

  it('keeps them editable otherwise', () => {
    render(<Listing />)

    expect(readOnlyOf('filters')).toBe(false)
    expect(readOnlyOf('columns')).toBe(false)
    expect(readOnlyOf('saved-search')).toBe(false)
    expect(configOf('saved-search')?.fieldsReadOnly).toBe(false)
  })
})
