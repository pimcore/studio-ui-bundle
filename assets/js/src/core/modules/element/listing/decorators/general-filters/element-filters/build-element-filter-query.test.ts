/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { buildElementFilterQuery } from './build-element-filter-query'
import { type ElementFilterContext, type ElementListingQueryArgs } from './element-filter-types'

jest.mock('@Pimcore/modules/ant-design/styles/create-styles', () => jest.requireActual('@test-utils/mocks/create-styles-mock'))

const context = {
  config: { handleSearchTermInSidebar: true },
  availableColumns: [],
  getType: () => null,
  currentLanguage: 'en'
} as unknown as ElementFilterContext

const argsWith = (columnFilters: ColumnFilter[]): ElementListingQueryArgs => ({
  body: { folderId: 1, filters: { page: 1, columnFilters } }
}) as unknown as ElementListingQueryArgs

const pqlOf = (args: ElementListingQueryArgs): unknown[] => (args.body.filters.columnFilters ?? [])
  .filter((columnFilter) => columnFilter.type === 'system.pql')
  .map((columnFilter) => columnFilter.filterValue)

const untaggedFilter = { type: 'system.pql', filterValue: 'system_fields.tags = NULL' }
const userPql = { kind: 'columnFilters' as const, filters: [{ type: 'system.pql', filterValue: 'color = "red"' }] }

describe('buildElementFilterQuery', () => {
  it('ANDs a PQL condition from an inner decorator with the user PQL into one PQL filter', () => {
    const args = buildElementFilterQuery([userPql], argsWith([untaggedFilter]), context)

    expect(pqlOf(args)).toEqual(['(color = "red") AND (system_fields.tags = NULL)'])
  })

  it('keeps a PQL condition from an inner decorator when the user set no PQL', () => {
    const args = buildElementFilterQuery([], argsWith([untaggedFilter]), context)

    expect(pqlOf(args)).toEqual(['system_fields.tags = NULL'])
  })

  it('sends the user PQL unchanged when no inner decorator set one', () => {
    const args = buildElementFilterQuery([userPql], argsWith([]), context)

    expect(pqlOf(args)).toEqual(['color = "red"'])
  })
})
