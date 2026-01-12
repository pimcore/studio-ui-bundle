/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FieldDefinition } from '@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider'
import { type FieldDefinitionContext } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-abstract'

export const getParent = <T extends FieldDefinition = FieldDefinition>(context: FieldDefinitionContext): T | undefined => {
  const { fieldDefinitions, path } = context
  const definition = fieldDefinitions[path[path.length - 2]]
  return definition as T | undefined
}

export const isParent = (fieldType: string, context: FieldDefinitionContext): boolean => {
  const parent = getParent(context)
  return parent?.fieldtype === fieldType
}
