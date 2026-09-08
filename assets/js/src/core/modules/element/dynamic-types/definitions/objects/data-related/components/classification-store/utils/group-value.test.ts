/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { filterInheritedFields, getMergedValue } from './group-value'

const notInherited = (): boolean => false

describe('filterInheritedFields', () => {
  it('keeps an explicitly cleared value instead of dropping it', () => {
    const value = {
      activeGroups: { 2: true },
      groupCollectionMapping: { 2: 1 },
      2: {
        default: {
          4: null
        }
      }
    }

    const result = filterInheritedFields(value, notInherited)

    expect(result[2]).not.toEqual([])
    expect(result[2].default[4]).toBeNull()
  })

  it('keeps a group with a mix of cleared and populated keys', () => {
    const value = {
      activeGroups: { 1: true },
      groupCollectionMapping: { 1: 1 },
      1: {
        default: {
          1: null,
          2: { value: '196', unitId: 'mm' }
        }
      }
    }

    const result = filterInheritedFields(value, notInherited)

    expect(result[1].default[1]).toBeNull()
    expect(result[1].default[2]).toEqual({ value: '196', unitId: 'mm' })
  })

  it('omits fields that are still inherited', () => {
    const value = {
      activeGroups: { 2: true },
      groupCollectionMapping: { 2: 1 },
      2: {
        default: {
          4: { value: '3.34', unitId: 'kg' }
        }
      }
    }

    const isInherited = (name: string): boolean => name === '2.default.4'

    const result = filterInheritedFields(value, isInherited)

    expect(result[2]?.default?.[4]).toBeUndefined()
  })

  it('collapses a group to an empty array when every field in it is inherited', () => {
    const value = {
      activeGroups: { 2: true },
      groupCollectionMapping: { 2: 1 },
      2: {
        default: {
          4: { value: '3.34', unitId: 'kg' }
        }
      }
    }

    const result = filterInheritedFields(value, () => true)

    expect(result[2]).toEqual([])
  })
})

describe('getMergedValue', () => {
  // The value the object was loaded with, i.e. what the parent provides.
  const originalValue = {
    activeGroups: { 2: true },
    groupCollectionMapping: { 2: 1 },
    2: {
      default: {
        4: 'from the parent',
        5: 'also from the parent'
      }
    }
  }

  const allInherited = (): boolean => true

  it('shows the inherited values of a group that holds no own values any more', () => {
    // What filterInheritedFields emits once every key of the group is inherited
    // again, e.g. after the inheritance of the last own key was restored.
    const currentValue = {
      activeGroups: { 2: true },
      groupCollectionMapping: { 2: 1 },
      2: []
    }

    const result = getMergedValue(currentValue, originalValue, currentValue, allInherited)

    expect(result[2].default[4]).toBe('from the parent')
    expect(result[2].default[5]).toBe('also from the parent')
  })

  it('keeps the group structure of a group that has nothing to inherit either', () => {
    const currentValue = { activeGroups: { 3: true }, groupCollectionMapping: {}, 3: [] }

    const result = getMergedValue(currentValue, {}, currentValue, allInherited)

    expect(result[3]).toEqual({})
  })

  it('takes the own value of a key that is not inherited', () => {
    const currentValue = {
      activeGroups: { 2: true },
      groupCollectionMapping: { 2: 1 },
      2: { default: { 4: 'own value', 5: null } }
    }

    const result = getMergedValue(currentValue, originalValue, currentValue, notInherited)

    expect(result[2].default[4]).toBe('own value')
  })
})
