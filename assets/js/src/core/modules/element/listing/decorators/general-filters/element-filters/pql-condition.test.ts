/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { addPqlCondition, removePqlCondition } from './pql-condition'

const condition = 'system_fields.tags = NULL'

describe('addPqlCondition', () => {
  it('adds the condition as the PQL filter when there is none', () => {
    const tagFilter = { type: 'system.tag', filterValue: { tags: [1], considerChildTags: true } }

    expect(addPqlCondition([tagFilter], condition)).toEqual([
      tagFilter,
      { type: 'system.pql', filterValue: condition }
    ])
  })

  it('ANDs the condition into an existing PQL filter, so only one is sent', () => {
    expect(addPqlCondition([{ type: 'system.pql', filterValue: 'color = "red" OR color = "blue"' }], condition)).toEqual([
      { type: 'system.pql', filterValue: '(color = "red" OR color = "blue") AND (system_fields.tags = NULL)' }
    ])
  })
})

describe('removePqlCondition', () => {
  it('returns the PQL without the condition it was combined with', () => {
    const [combined] = addPqlCondition([{ type: 'system.pql', filterValue: 'color = "red" OR color = "blue"' }], condition)

    expect(removePqlCondition(combined.filterValue as string, condition)).toBe('color = "red" OR color = "blue"')
  })

  it('returns an empty PQL when the condition was the only one', () => {
    expect(removePqlCondition(condition, condition)).toBe('')
  })

  it('returns undefined when the condition was not added', () => {
    expect(removePqlCondition('color = "red"', condition)).toBeUndefined()
    expect(removePqlCondition('', condition)).toBeUndefined()
  })
})
