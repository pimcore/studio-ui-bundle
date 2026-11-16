/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ClassificationStoreVariantLayout } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { type ClassificationStoreCollection2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import {
  defaultVariantDeclarationOf,
  multiValueMembersOf
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/utils/multi-value-members'
import { variantNameOf } from '@Pimcore/modules/data-object/classification-store/utils/variant-name'
import { variantColumnSuffix, variantSlotsOf } from '@Pimcore/modules/data-object/classification-store/utils/variant-column'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type IDynamicFilter } from '@Pimcore/components/dynamic-filter/provider/dynamic-filter-provider'

/** What tells two classification store filter rows apart: the column, the key in its group, and its variant. */
export const filterSlotId = (filter: Pick<IDynamicFilter, 'id' | 'config'>): string =>
  filter.id + JSON.stringify({
    keyId: filter.config?.keyId,
    groupId: filter.config?.groupId,
    variant: filter.config?.variant ?? null
  })

/**
 * The filter rows one picked key adds to the panel: one per slot the key writes values in. The index holds a
 * declared variant under its own `<key>_<variant>` entry, so a filter that names no variant reads the default
 * slot and never matches a variant's value.
 */
export const classificationStoreFilterSlots = (column: AvailableColumn, item: Record<string, any>): IDynamicFilter[] => {
  // the layout members where published, so a key declaring variants expands even when `definition` omits them
  const members = multiValueMembersOf(item as ClassificationStoreCollection2)
  const fieldDefinition = { ...item.definition, ...members }
  const nameTooltip = Array.isArray(column.group) ? column.group.join('/') : undefined
  const declaration = defaultVariantDeclarationOf(item as ClassificationStoreCollection2)

  return variantSlotsOf(item.variants as ClassificationStoreVariantLayout[] | null | undefined, declaration).map((variant) => {
    const config = {
      fieldDefinition,
      groupId: item.groupId,
      keyId: item.id,
      // `variant: null` addresses the default slot, which is the only slot a key without variants has
      variant: variant === null ? null : variantNameOf(variant),
      translationKey: fieldDefinition.title
    }
    const translationKey = `${String(fieldDefinition.title)}${variantColumnSuffix({ config })}`

    return {
      data: undefined,
      id: column.key,
      translationKey,
      type: column.type,
      frontendType: fieldDefinition.fieldtype,
      localizable: column.localizable,
      locale: column.localizable ? 'default' : undefined,
      config: { ...config, translationKey },
      nameTooltip
    }
  })
}
