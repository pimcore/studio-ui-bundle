/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IRelationAllowedTypesClassDefinition } from './allowed-types'
import { supportsInlineSearch } from './inline-search'

type RelationConfig = Partial<IRelationAllowedTypesClassDefinition>

const objectOnlyRelation = (overrides: RelationConfig = {}): RelationConfig => ({
  objectsAllowed: true,
  assetsAllowed: false,
  documentsAllowed: false,
  classes: [{ classes: 'Supplier' }],
  ...overrides
})

describe('supportsInlineSearch', () => {
  it('accepts a relation restricted to objects of a single class', () => {
    expect(supportsInlineSearch(objectOnlyRelation())).toBe(true)
  })

  it('rejects a relation that allows more than one class', () => {
    expect(supportsInlineSearch(objectOnlyRelation({
      classes: [{ classes: 'Supplier' }, { classes: 'Manufacturer' }]
    }))).toBe(false)
  })

  it('rejects a relation without an allowed class', () => {
    expect(supportsInlineSearch(objectOnlyRelation({ classes: [] }))).toBe(false)
    expect(supportsInlineSearch(objectOnlyRelation({ classes: undefined }))).toBe(false)
  })

  it('rejects a relation restricted to object folders', () => {
    expect(supportsInlineSearch(objectOnlyRelation({ classes: [{ classes: 'folder' }] }))).toBe(false)
  })

  it('rejects a relation that also allows assets', () => {
    expect(supportsInlineSearch(objectOnlyRelation({ assetsAllowed: true }))).toBe(false)
  })

  it('rejects a relation that also allows documents', () => {
    expect(supportsInlineSearch(objectOnlyRelation({ documentsAllowed: true }))).toBe(false)
  })

  it('rejects a relation that does not allow objects', () => {
    expect(supportsInlineSearch(objectOnlyRelation({ objectsAllowed: false }))).toBe(false)
  })

  // The class definition editor watches values that stay undefined until their
  // switch is touched, so an untouched form must not read as eligible either way.
  it('treats untouched switches as not set', () => {
    expect(supportsInlineSearch({})).toBe(false)
    expect(supportsInlineSearch(objectOnlyRelation({ objectsAllowed: undefined }))).toBe(false)
    expect(supportsInlineSearch(objectOnlyRelation({ assetsAllowed: undefined, documentsAllowed: undefined })))
      .toBe(true)
  })
})
