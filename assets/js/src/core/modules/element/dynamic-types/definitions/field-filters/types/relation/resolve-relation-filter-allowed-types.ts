/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import {
  convertAllowedTypes,
  type IRelationAllowedTypesClassDefinition,
  type IRelationAllowedTypesDataComponent
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'

export type RelationFilterFieldDefinition = Partial<IRelationAllowedTypesClassDefinition> & {
  fieldtype?: string
  allowedClassId?: string | null
  ownerClassName?: string | null
}

const ALL_TYPES_ALLOWED: IRelationAllowedTypesDataComponent = {
  assetsAllowed: true,
  dataObjectsAllowed: true,
  documentsAllowed: true
}

const objectsOfClass = (className: string | null | undefined): IRelationAllowedTypesDataComponent => ({
  assetsAllowed: false,
  documentsAllowed: false,
  dataObjectsAllowed: true,
  allowedClasses: isNil(className) || className === '' ? undefined : [className]
})

/**
 * Element types the relation field filter may select, derived from the field definition.
 *
 * Object-only relation types do not serialize an `objectsAllowed` flag (the backend exposes it
 * as a getter only) and name their classes differently, so they have to be resolved by
 * fieldtype — the same way their editor components do — instead of through the
 * assets/objects/documents flags.
 */
export const resolveRelationFilterAllowedTypes = (fieldDefinition: RelationFilterFieldDefinition | undefined): IRelationAllowedTypesDataComponent => {
  if (isNil(fieldDefinition)) {
    return ALL_TYPES_ALLOWED
  }

  switch (fieldDefinition.fieldtype) {
    case 'manyToManyObjectRelation':
      return convertAllowedTypes({
        ...fieldDefinition,
        assetsAllowed: false,
        documentsAllowed: false,
        objectsAllowed: true
      })
    case 'advancedManyToManyObjectRelation':
      return objectsOfClass(fieldDefinition.allowedClassId)
    case 'reverseObjectRelation':
      return objectsOfClass(fieldDefinition.ownerClassName)
  }

  const convertedTypes = convertAllowedTypes(fieldDefinition as IRelationAllowedTypesClassDefinition)
  const nothingAllowed = convertedTypes.assetsAllowed !== true &&
    convertedTypes.dataObjectsAllowed !== true &&
    convertedTypes.documentsAllowed !== true

  return nothingAllowed ? ALL_TYPES_ALLOWED : convertedTypes
}
