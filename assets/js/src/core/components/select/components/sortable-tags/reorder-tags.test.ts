/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getSortableTagIds, reorderTags } from './reorder-tags'

const options = [
  { label: 'Austria', value: 'AT' },
  { label: 'Germany', value: 'DE' },
  { label: 'France', value: 'FR' }
]

describe('reorderTags', () => {
  it('moves the dragged tag to the position of the tag it was dropped on', () => {
    expect(reorderTags(['AT', 'DE', 'FR'], 'FR', 'AT', options)?.value).toEqual(['FR', 'AT', 'DE'])
    expect(reorderTags(['AT', 'DE', 'FR'], 'AT', 'FR', options)?.value).toEqual(['DE', 'FR', 'AT'])
  })

  it('returns the selected options in the new order', () => {
    expect(reorderTags(['AT', 'DE', 'FR'], 'FR', 'AT', options)?.options).toEqual([options[2], options[0], options[1]])
  })

  it('matches numeric values by their tag id', () => {
    expect(reorderTags([1, 2, 3], '3', '1')?.value).toEqual([3, 1, 2])
  })

  it('keeps labelInValue entries intact', () => {
    const value = [{ value: 'AT', label: 'Austria' }, { value: 'DE', label: 'Germany' }]

    expect(reorderTags(value, 'DE', 'AT', options)).toEqual({
      value: [value[1], value[0]],
      options: [options[1], options[0]]
    })
  })

  it('returns null when nothing changes', () => {
    expect(reorderTags(['AT', 'DE'], 'AT', 'AT')).toBeNull()
    expect(reorderTags(['AT', 'DE'], 'AT', 'XX')).toBeNull()
    expect(reorderTags(undefined, 'AT', 'DE')).toBeNull()
    expect(reorderTags('AT', 'AT', 'DE')).toBeNull()
  })

  it('does not mutate the passed value', () => {
    const value = ['AT', 'DE', 'FR']
    reorderTags(value, 'FR', 'AT')

    expect(value).toEqual(['AT', 'DE', 'FR'])
  })
})

describe('getSortableTagIds', () => {
  it('builds string ids for plain and labelInValue values', () => {
    expect(getSortableTagIds(['AT', 2, { value: 'FR', label: 'France' }])).toEqual(['AT', '2', 'FR'])
    expect(getSortableTagIds(undefined)).toEqual([])
  })
})
