/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildSearchPathFilters } from './search-path-filter'

describe('buildSearchPathFilters', () => {
  it('seeds nothing without a search path', () => {
    expect(buildSearchPathFilters('', 'Full path')).toBeUndefined()
  })

  it('seeds one fullpath filter scoped to the folder contents', () => {
    expect(buildSearchPathFilters('/Marketing/Images', 'Full path')).toEqual({
      fieldFilters: [{
        key: 'fullpath',
        type: 'system.string',
        filterValue: '/Marketing/Images/',
        locale: null,
        meta: { translationKey: 'Full path' }
      }]
    })
  })

  it('does not double a trailing slash', () => {
    const filters = buildSearchPathFilters('/Marketing/Images/', 'Full path')
    const [filter] = filters?.fieldFilters as Array<{ filterValue: string }>

    expect(filter.filterValue).toBe('/Marketing/Images/')
  })
})
