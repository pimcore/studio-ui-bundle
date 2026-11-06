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
  type DynamicTypeFieldDefinitionAbstract,
  type FieldDefinitionContext
} from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'

/**
 * Drop the types that declare an area and are not in this one.
 *
 * The field definition registry is global and every bundle registers into it,
 * so a type that is only meaningful in one editor has no way to stay out of
 * the others except by saying which areas it belongs to. A type that declares
 * nothing is offered everywhere, exactly as before.
 *
 * Intended for the dropdown only. Tag resolution stays unfiltered, because a
 * type still has to resolve its own icon and label wherever a tree is built
 * from field definitions that already exist.
 */
export const filterTypesByArea = (
  types: DynamicTypeFieldDefinitionAbstract[],
  context: FieldDefinitionContext
): DynamicTypeFieldDefinitionAbstract[] => types.filter((type) => {
  const allowedAreas = type.getAllowedAreas(context)
  return isNil(allowedAreas) || allowedAreas.some(allowed => context.area.includes(allowed))
})
