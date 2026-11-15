/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { commitFilterValues } from './commit-filter-values'

describe('commitFilterValues', () => {
  it('publishes the whole draft, not only the committed key', () => {
    const setValues = jest.fn()

    commitFilterValues({ setValues }, { searchTerm: 'foo', directChildren: true }, { searchTerm: 'bar' })

    expect(setValues).toHaveBeenCalledWith({ searchTerm: 'bar', directChildren: true })
  })

  it('lets the committed value win over the draft value for the same key', () => {
    const setValues = jest.fn()

    commitFilterValues({ setValues }, { fieldFilters: ['stale'] }, { fieldFilters: ['committed'] })

    expect(setValues).toHaveBeenCalledWith({ fieldFilters: ['committed'] })
  })

  it('publishes the draft unchanged when nothing is committed alongside it', () => {
    const setValues = jest.fn()

    commitFilterValues({ setValues }, { searchTerm: 'foo' })

    expect(setValues).toHaveBeenCalledWith({ searchTerm: 'foo' })
  })
})
