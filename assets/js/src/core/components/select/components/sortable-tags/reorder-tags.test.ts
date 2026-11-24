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
    expect(reorderTags(['AT', 'DE', 'FR'], 'string:FR', 'string:AT', options)?.value).toEqual(['FR', 'AT', 'DE'])
    expect(reorderTags(['AT', 'DE', 'FR'], 'string:AT', 'string:FR', options)?.value).toEqual(['DE', 'FR', 'AT'])
  })

  it('returns the selected options in the new order', () => {
    expect(reorderTags(['AT', 'DE', 'FR'], 'string:FR', 'string:AT', options)?.options).toEqual([options[2], options[0], options[1]])
  })

  it('matches numeric values by their tag id', () => {
    expect(reorderTags([1, 2, 3], 'number:3', 'number:1')?.value).toEqual([3, 1, 2])
  })

  it('keeps a number and a string with the same text apart', () => {
    expect(reorderTags([1, '1', 2], 'string:1', 'number:1')?.value).toEqual(['1', 1, 2])
  })

  it('keeps labelInValue entries intact', () => {
    const value = [{ value: 'AT', label: 'Austria' }, { value: 'DE', label: 'Germany' }]

    expect(reorderTags(value, 'string:DE', 'string:AT', options)).toEqual({
      value: [value[1], value[0]],
      options: [options[1], options[0]]
    })
  })

  it('returns null when nothing changes', () => {
    expect(reorderTags(['AT', 'DE'], 'string:AT', 'string:AT')).toBeNull()
    expect(reorderTags(['AT', 'DE'], 'string:AT', 'string:XX')).toBeNull()
    expect(reorderTags(undefined, 'string:AT', 'string:DE')).toBeNull()
    expect(reorderTags('AT', 'string:AT', 'string:DE')).toBeNull()
  })

  it('does not mutate the passed value', () => {
    const value = ['AT', 'DE', 'FR']
    reorderTags(value, 'string:FR', 'string:AT')

    expect(value).toEqual(['AT', 'DE', 'FR'])
  })
})

describe('getSortableTagIds', () => {
  it('builds string ids for plain and labelInValue values', () => {
    expect(getSortableTagIds(['AT', 2, { value: 'FR', label: 'France' }])).toEqual(['string:AT', 'number:2', 'string:FR'])
    expect(getSortableTagIds(undefined)).toEqual([])
  })
})
