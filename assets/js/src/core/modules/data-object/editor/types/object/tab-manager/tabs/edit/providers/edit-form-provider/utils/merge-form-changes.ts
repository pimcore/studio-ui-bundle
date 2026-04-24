/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'

/**
 * Merges incoming form changedValues into the accumulated modified-attributes map.
 *
 * For each changed key, the fieldTypeMap is consulted to resolve the field name to
 * its type id, which is then looked up in the registry. This ensures the lookup is
 * always by type id (correct) rather than by field name (coincidental). If no matching
 * type is found, or if the type has no mergeChangedValues override, the incoming value
 * replaces the current one wholesale.
 */
export const mergeFormChanges = (
  current: Record<string, any>,
  changedValues: Record<string, any>,
  objectDataRegistry: DynamicTypeObjectDataRegistry,
  fieldTypeMap: Map<string, string>
): Record<string, any> => {
  const merged: Record<string, any> = { ...current }

  for (const [key, incoming] of Object.entries(changedValues)) {
    const typeId = fieldTypeMap.get(key)
    const dynamicType = typeId !== undefined && objectDataRegistry.hasDynamicType(typeId)
      ? objectDataRegistry.getDynamicType(typeId)
      : undefined
    merged[key] = isUndefined(dynamicType?.mergeChangedValues)
      ? incoming
      : dynamicType.mergeChangedValues(current[key], incoming)
  }

  return merged
}
