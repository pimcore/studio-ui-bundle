/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  createElementSelectorAreas,
  createElementSelectorConfig
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { resolveRelationFilterAllowedTypes } from './resolve-relation-filter-allowed-types'

const ALL_ALLOWED = { asset: true, document: true, object: true }
const OBJECTS_ONLY = { asset: false, document: false, object: true }

describe('resolveRelationFilterAllowedTypes', () => {
  // PEES-1743: a many-to-many object relation definition carries `classes` but no
  // `objectsAllowed` flag, so the filter fell back to "everything" and the element
  // selector opened on the assets tab without the class restriction.
  it('restricts a many-to-many object relation to data objects of the configured classes', () => {
    const allowedTypes = resolveRelationFilterAllowedTypes({
      fieldtype: 'manyToManyObjectRelation',
      classes: [{ classes: 'Car' }]
    })

    expect(createElementSelectorAreas(allowedTypes)).toEqual(OBJECTS_ONLY)
    expect(createElementSelectorConfig(allowedTypes)?.objects).toEqual({
      allowedTypes: ['object', 'variant'],
      allowedClasses: ['Car']
    })
  })

  it('allows every data object class for a many-to-many object relation without classes', () => {
    const allowedTypes = resolveRelationFilterAllowedTypes({
      fieldtype: 'manyToManyObjectRelation',
      classes: []
    })

    expect(createElementSelectorAreas(allowedTypes)).toEqual(OBJECTS_ONLY)
    expect(createElementSelectorConfig(allowedTypes)?.objects).toEqual({
      allowedTypes: undefined,
      allowedClasses: undefined
    })
  })

  it('restricts an advanced many-to-many object relation to its allowed class', () => {
    const allowedTypes = resolveRelationFilterAllowedTypes({
      fieldtype: 'advancedManyToManyObjectRelation',
      allowedClassId: 'Car'
    })

    expect(createElementSelectorAreas(allowedTypes)).toEqual(OBJECTS_ONLY)
    expect(createElementSelectorConfig(allowedTypes)?.objects?.allowedClasses).toEqual(['Car'])
  })

  it('restricts a reverse object relation to the owner class', () => {
    const allowedTypes = resolveRelationFilterAllowedTypes({
      fieldtype: 'reverseObjectRelation',
      ownerClassName: 'Manufacturer'
    })

    expect(createElementSelectorAreas(allowedTypes)).toEqual(OBJECTS_ONLY)
    expect(createElementSelectorConfig(allowedTypes)?.objects?.allowedClasses).toEqual(['Manufacturer'])
  })

  it('keeps the configured element types of a many-to-many relation', () => {
    const allowedTypes = resolveRelationFilterAllowedTypes({
      fieldtype: 'manyToManyRelation',
      assetsAllowed: true,
      assetTypes: [{ assetTypes: 'image' }],
      objectsAllowed: false,
      documentsAllowed: true
    })

    expect(createElementSelectorAreas(allowedTypes)).toEqual({ asset: true, document: true, object: false })
    expect(createElementSelectorConfig(allowedTypes)?.assets).toEqual({ allowedTypes: ['image'] })
  })

  it('allows every element type when a mixed relation has no restrictions', () => {
    const allowedTypes = resolveRelationFilterAllowedTypes({
      fieldtype: 'manyToOneRelation',
      assetsAllowed: false,
      objectsAllowed: false,
      documentsAllowed: false
    })

    expect(createElementSelectorAreas(allowedTypes)).toEqual(ALL_ALLOWED)
  })

  it('allows every element type without a field definition', () => {
    expect(createElementSelectorAreas(resolveRelationFilterAllowedTypes(undefined))).toEqual(ALL_ALLOWED)
  })
})
