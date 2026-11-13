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
import { type ClassificationStoreVariantLayout } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { declaredVariantsOf } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/multi-value/multi-value-slots'
import { variantNameOf } from './variant-name'

/** Separates a variant from the address it qualifies, in a cell key and in the key address of a patch. */
const VARIANT_SEPARATOR = '#'

/** The shape of a column or column config that may address one variant of a `multiValue` key. */
interface VariantColumnLike {
  config?: { variant?: string | null, fieldDefinition?: unknown } | null
}

/** The variant a column addresses; null is the default slot. */
export const variantOfColumn = (column: VariantColumnLike | undefined): string | null => column?.config?.variant ?? null

/**
 * The column's own key at the head of a cell key, when the cell key is that key or that key plus a `#<variant>`
 * suffix. A key name may itself contain the separator, so the suffix is read relative to the column's key.
 */
const ownKeyOf = (cellKey: string, columnKey: string | undefined): string | undefined => {
  if (columnKey === undefined || columnKey === '') {
    return undefined
  }

  return cellKey === columnKey || cellKey.startsWith(columnKey + VARIANT_SEPARATOR) ? columnKey : undefined
}

/** The variant a cell key names after its `#`; null is the default slot. Pass the column's key when known. */
export const variantOfCellKey = (cellKey: string, columnKey?: string): string | null => {
  const own = ownKeyOf(cellKey, columnKey)
  const separator = own === undefined ? cellKey.indexOf(VARIANT_SEPARATOR) : own.length

  // Trimmed like the name a column carries (`variantNameOf`), so the two compare equal.
  return separator === -1 || separator >= cellKey.length ? null : cellKey.slice(separator + 1).trim()
}

/** The cell key without its variant suffix. Pass the column's key when known. */
export const withoutVariantSuffix = (cellKey: string, columnKey?: string): string => {
  const own = ownKeyOf(cellKey, columnKey)

  if (own !== undefined) {
    return own
  }

  const separator = cellKey.indexOf(VARIANT_SEPARATOR)

  return separator === -1 ? cellKey : cellKey.slice(0, separator)
}

/** The key address a patch writes a value under: `<keyId>#<variant>`, or the bare key id for the default slot. */
export const keyAddressOf = (keyId: number | string, variant: string | null): string =>
  isNil(variant) ? String(keyId) : `${keyId}${VARIANT_SEPARATOR}${variant}`

/** What tells a variant column apart in a header: the variant's label, else its name, in brackets; nothing for the default slot. */
export const variantColumnSuffix = (column: VariantColumnLike): string => {
  const variant = variantOfColumn(column)

  if (variant === null) {
    return ''
  }

  const declared = (column.config?.fieldDefinition as { variants?: Array<{ name: string, label?: string | null }> } | undefined)?.variants
  const label = (declared ?? []).find((entry) => variantNameOf(entry) === variant)?.label

  return ` (${isNil(label) || label === '' ? variant : label})`
}

/** The slots a key is shown in as columns: one per declared variant in declaration order, then the default slot (null). */
export const variantSlotsOf = (
  variants: readonly ClassificationStoreVariantLayout[] | null | undefined
): Array<ClassificationStoreVariantLayout | null> => [
  ...declaredVariantsOf(variants),
  // Offered unconditionally; once the layout publishes `defaultVariant`, keep this entry unless it is `false`.
  null
]
