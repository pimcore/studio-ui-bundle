/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { sortByLabel } from './sort-by-label'

const toItems = (labels: string[]): Array<{ label: string }> => labels.map((label) => ({ label }))
const labelsOf = (items: Array<{ label: string }>): string[] => items.map((item) => item.label)

describe('sortByLabel', () => {
  it('sorts the bricks alphabetically instead of in assignment order (regression platform-version#845)', () => {
    const items = toItems(['Shipping', 'Dimensions', 'Warranty', 'Accessories', 'Pricing', 'Materials'])

    expect(labelsOf(sortByLabel(items, 'en'))).toEqual(
      ['Accessories', 'Dimensions', 'Materials', 'Pricing', 'Shipping', 'Warranty']
    )
  })

  it('ignores case', () => {
    expect(labelsOf(sortByLabel(toItems(['beta', 'Alpha', 'gamma']), 'en'))).toEqual(['Alpha', 'beta', 'gamma'])
  })

  it('does not mutate the input', () => {
    const items = toItems(['b', 'a'])
    sortByLabel(items, 'en')

    expect(labelsOf(items)).toEqual(['b', 'a'])
  })

  it.each(['pt_br', 'pt_BR', 'sv_fi', 'zh_Hans', 'de_DE'])(
    'accepts the Pimcore underscore locale %s instead of throwing a RangeError',
    (lng) => {
      expect(labelsOf(sortByLabel(toItems(['b', 'a']), lng))).toEqual(['a', 'b'])
    }
  )

  it.each([undefined, '', 'not a locale!'])('falls back to the default locale for %p', (lng) => {
    expect(labelsOf(sortByLabel(toItems(['b', 'a']), lng))).toEqual(['a', 'b'])
  })
})
