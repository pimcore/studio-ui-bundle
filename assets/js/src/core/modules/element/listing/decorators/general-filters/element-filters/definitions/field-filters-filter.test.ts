/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ReactElement } from 'react'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { DynamicTypeFieldFilterAbstract } from '@Pimcore/modules/element/dynamic-types/definitions/field-filters/dynamic-type-field-filter-abstract'
import { type FieldFilter } from '../../context-layer/provider/field-filters/field-filters-provider'
import { mergeAvailableColumns } from '../../search-modes/search-mode-columns'
import { type ElementFilterContext } from '../element-filter-types'
import { prepareFieldFilters } from './field-filters-filter'

class TestFieldFilter extends DynamicTypeFieldFilterAbstract {
  constructor (readonly id: string) { super() }
  getFieldFilterComponent (): ReactElement { return null as unknown as ReactElement }
  getFieldFilterType (): string { return this.id }
}

const column = (key: string, type: string): GridColumnConfiguration => ({
  key,
  group: ['system'],
  sortable: true,
  editable: false,
  localizable: false,
  locale: null,
  type,
  frontendType: type,
  config: []
})

const idColumn = column('id', 'system.id')
const scoreColumn = column('score', 'test.score')

const contextWith = (availableColumns: GridColumnConfiguration[]): ElementFilterContext => ({
  config: { handleSearchTermInSidebar: true },
  availableColumns,
  getType: (({ dynamicTypeIds }: { dynamicTypeIds: string[] }) => new TestFieldFilter(dynamicTypeIds[0])) as unknown as ElementFilterContext['getType'],
  currentLanguage: 'en'
})

const filters: FieldFilter[] = [
  { key: 'id', type: 'system.id', filterValue: 5, locale: undefined, meta: { translationKey: 'id' } },
  { key: 'score', type: 'test.score', filterValue: 0.8, locale: undefined, meta: { translationKey: 'score' } }
]

describe('prepareFieldFilters', () => {
  it('drops a filter whose column is not available (mode not applied)', () => {
    expect(prepareFieldFilters(filters, contextWith([idColumn])).map((filter) => filter.type)).toEqual(['system.id'])
  })

  it('sends a filter on a column of the applied search mode', () => {
    const prepared = prepareFieldFilters(filters, contextWith(mergeAvailableColumns([idColumn], [scoreColumn])))

    expect(prepared.map((filter) => [filter.type, filter.filterValue])).toEqual([['system.id', 5], ['test.score', 0.8]])
  })
})
