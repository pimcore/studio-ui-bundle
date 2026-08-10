/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { filterInheritedFields } from './group-value'

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
