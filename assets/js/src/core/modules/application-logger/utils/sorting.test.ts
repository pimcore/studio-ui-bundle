/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  APPLICATION_LOGGER_SORT_KEY_MAP,
  DEFAULT_APPLICATION_LOGGER_SORT_FILTER,
  mapSortingToSortFilter
} from './sorting'

describe('mapSortingToSortFilter', () => {
  it('falls back to the default sort filter when nothing is sorted', () => {
    expect(mapSortingToSortFilter([])).toEqual(DEFAULT_APPLICATION_LOGGER_SORT_FILTER)
  })

  it.each(Object.entries(APPLICATION_LOGGER_SORT_KEY_MAP))(
    'maps the "%s" column to the "%s" api field',
    (columnId, apiField) => {
      expect(mapSortingToSortFilter([{ id: columnId, desc: false }])).toEqual({
        key: apiField,
        direction: 'ASC'
      })
    }
  )

  it('translates the descending flag into the api direction', () => {
    expect(mapSortingToSortFilter([{ id: 'date', desc: true }])).toEqual({
      key: 'timestamp',
      direction: 'DESC'
    })
  })

  it('never leaks an unmapped column id into the api field', () => {
    // A column id is not a database column, so letting one through produced an "Unknown column
    // in ORDER BY" error and a 500 response.
    expect(mapSortingToSortFilter([{ id: 'actions', desc: false }]))
      .toEqual(DEFAULT_APPLICATION_LOGGER_SORT_FILTER)

    expect(mapSortingToSortFilter([{ id: 'nonsense', desc: true }]))
      .toEqual(DEFAULT_APPLICATION_LOGGER_SORT_FILTER)
  })

  it.each(['translatedPriority', 'relatedElementData'])(
    'keeps the default sort filter for the unsortable "%s" column',
    (columnId) => {
      // Type and Related Object are filterable rather than sortable. Should a column ever be
      // marked sortable again without a mapping, it must still not reach the api unmapped.
      expect(mapSortingToSortFilter([{ id: columnId, desc: true }]))
        .toEqual(DEFAULT_APPLICATION_LOGGER_SORT_FILTER)
    }
  )
})
