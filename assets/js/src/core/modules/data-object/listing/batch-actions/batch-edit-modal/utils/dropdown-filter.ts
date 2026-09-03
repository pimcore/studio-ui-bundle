/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type BatchEdit } from '../batch-edit-provider'
import { type UseDynamicTypeResolverReturnType } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import { container } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectDataRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/dynamic-type-object-data-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

// Helper function to compare groups that can be strings, arrays, or nested arrays
export const areGroupsEqual = (group1: any, group2: any): boolean => {
  // Normalize groups to string arrays for comparison
  const normalizeGroup = (group: any): string[] => {
    if (typeof group === 'string') {
      return group.split('.')
    }
    if (Array.isArray(group)) {
      return group.flat().map(part => String(part))
    }
    return [String(group)]
  }

  const normalizedGroup1 = normalizeGroup(group1)
  const normalizedGroup2 = normalizeGroup(group2)

  if (normalizedGroup1.length !== normalizedGroup2.length) {
    return false
  }

  return normalizedGroup1.every((part, index) => part === normalizedGroup2[index])
}

// Helper function to check if a column item should be included in batch edit options
export const shouldIncludeColumnItem = (
  item: any,
  batchEdits: BatchEdit[],
  hasType: (props: { target: string, dynamicTypeIds: string[] }) => boolean,
  getType: UseDynamicTypeResolverReturnType['getType'],
  contentLanguages: string[] = []
): boolean => {
  const isEditable: boolean = item.editable === true
  const existingEntries = batchEdits.filter(batchItem =>
    item.key === batchItem.key && areGroupsEqual(item.group, batchItem.group)
  )

  // Only adapter fields get one row per content language; object-brick stays single-entry, and an
  // empty content-language list degrades to single-entry too.
  const supportsMultipleLocales = item.localizable === true && item.mainType !== 'dataobject.objectbrick'
  const isAlreadyInBatchEditList = item.mainType !== 'dataobject.classificationstore' && (
    supportsMultipleLocales
      ? (contentLanguages.length === 0 ? existingEntries.length > 0 : existingEntries.length >= contentLanguages.length)
      : existingEntries.length > 0
  )

  const hasDynamicType = hasType({
    target: 'BATCH_EDIT',
    dynamicTypeIds: [item?.mainType, item?.frontendType as string]
  })

  let isAllowedInBatchEdit = false
  const objectTypeRegistry = container.get<DynamicTypeObjectDataRegistry>(serviceIds['DynamicTypes/ObjectDataRegistry'])

  if (objectTypeRegistry.hasDynamicType(item?.frontendType as string)) {
    const objectType = objectTypeRegistry.getDynamicType(item?.frontendType as string)
    isAllowedInBatchEdit = objectType.isAllowedInBatchEditForField(item?.config?.fieldDefinition as Record<string, any> | undefined)
  }

  return isEditable && hasDynamicType && !isAlreadyInBatchEditList && isAllowedInBatchEdit
}
