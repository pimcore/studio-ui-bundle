/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getSelectAllValues, getSelectableOptions } from './select-all-values'

const options = [
  { label: 'Austria', value: 'AT' },
  { label: 'Germany', value: 'DE' },
  { label: 'Spain', value: 'ES', disabled: true },
  { label: 'France', value: 'FR' }
]

describe('getSelectAllValues', () => {
  it('selects every enabled option', () => {
    expect(getSelectAllValues({ options })).toEqual(['AT', 'DE', 'FR'])
  })

  it('keeps the current selection first and does not duplicate it', () => {
    expect(getSelectAllValues({ options, value: ['FR', 'ES'] })).toEqual(['FR', 'ES', 'AT', 'DE'])
  })

  it('selects only the options matching the search', () => {
    expect(getSelectAllValues({ options, optionFilterProp: 'label', searchValue: 'ge' })).toEqual(['DE'])
  })

  it('selects everything when the search is handled elsewhere (filterOption false)', () => {
    expect(getSelectAllValues({ options, optionFilterProp: 'label', searchValue: 'zz', filterOption: false })).toEqual(['AT', 'DE', 'FR'])
  })

  it('uses a custom filter function', () => {
    const filterOption = (input: string, option?: { value?: unknown }): boolean => option?.value === input
    expect(getSelectAllValues({ options, searchValue: 'AT', filterOption })).toEqual(['AT'])
  })

  it('flattens grouped options', () => {
    const grouped = [{ label: 'EU', options: [{ label: 'Austria', value: 'AT' }] }, { label: 'Other', options: [{ label: 'Norway', value: 'NO' }] }]
    expect(getSelectAllValues({ options: grouped })).toEqual(['AT', 'NO'])
  })

  it('keeps all children of a group whose own label matches the search', () => {
    const grouped = [{ label: 'Europe', options: [{ label: 'Austria', value: 'AT' }, { label: 'Spain', value: 'ES' }] }, { label: 'Other', options: [{ label: 'Norway', value: 'NO' }] }]
    expect(getSelectAllValues({ options: grouped, searchValue: 'euro', optionFilterProp: 'label' })).toEqual(['AT', 'ES'])
    expect(getSelectAllValues({ options: grouped, searchValue: 'nor', optionFilterProp: 'label' })).toEqual(['NO'])
  })

  it('handles missing options and a non-array value', () => {
    expect(getSelectAllValues({})).toEqual([])
    expect(getSelectAllValues({ options, value: null })).toEqual(['AT', 'DE', 'FR'])
  })
})

describe('getSelectableOptions', () => {
  it('is empty once everything enabled is selected', () => {
    expect(getSelectableOptions({ options, value: ['AT', 'DE', 'FR'] })).toEqual([])
  })
})
