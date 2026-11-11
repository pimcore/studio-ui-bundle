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
import { isNonEmptyString } from '@sdk/utils'
import { type ClassificationStoreVariantLayout } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { variantNameOf } from '@Pimcore/modules/data-object/classification-store/utils/variant-name'

/** A reason a `multiValue` key definition cannot be saved: a translation id and its parameters. */
export interface MultiValueRefusal {
  id: string
  params?: Record<string, string>
}

export const REFUSAL_DELEGATE_REQUIRED = 'classification-store.multi-value.delegate-required'
export const REFUSAL_VARIANT_EMPTY = 'classification-store.multi-value.variant-name-empty'
export const REFUSAL_VARIANT_DUPLICATE = 'classification-store.multi-value.variant-name-duplicate'

/** The refusals of the variant list alone, which the list shows beside the rows. */
export const getVariantRefusals = (variants: readonly ClassificationStoreVariantLayout[] | null | undefined): MultiValueRefusal[] => {
  const refusals: MultiValueRefusal[] = []
  const seen = new Set<string>()
  const duplicated = new Set<string>()

  for (const variant of variants ?? []) {
    // One reading of the name for the empty and the duplicate check: 'metric' and 'metric ' head the same-looking slot.
    const name = variantNameOf(variant).trim()

    if (name === '') {
      if (!refusals.some((refusal) => refusal.id === REFUSAL_VARIANT_EMPTY)) {
        refusals.push({ id: REFUSAL_VARIANT_EMPTY })
      }
    } else if (seen.has(name)) {
      duplicated.add(name)
    }

    seen.add(name)
  }

  duplicated.forEach((name) => refusals.push({ id: REFUSAL_VARIANT_DUPLICATE, params: { name } }))

  return refusals
}

/** Everything that stops a `multiValue` key definition from being saved. */
export const getMultiValueRefusals = (definition: Record<string, unknown> | null | undefined): MultiValueRefusal[] => {
  const refusals: MultiValueRefusal[] = []

  if (isNil(definition) || !isNonEmptyString(definition.delegateDatatype)) {
    refusals.push({ id: REFUSAL_DELEGATE_REQUIRED })
  }

  return [
    ...refusals,
    ...getVariantRefusals(definition?.variants as ClassificationStoreVariantLayout[] | null | undefined)
  ]
}

/** Whether a save narrows what the key declared: a declared variant removed, or the maximum lowered. */
export const narrowsDeclaration = (
  before: Record<string, unknown> | null | undefined,
  after: Record<string, unknown> | null | undefined
): boolean => {
  const names = new Set(((after?.variants ?? []) as ClassificationStoreVariantLayout[]).map((variant) => variant.name))
  const removed = ((before?.variants ?? []) as ClassificationStoreVariantLayout[]).some((variant) => !names.has(variant.name))
  const oldMaximum = before?.maximum
  const newMaximum = after?.maximum
  const lowered = typeof newMaximum === 'number' && (typeof oldMaximum !== 'number' || newMaximum < oldMaximum)

  return removed || lowered
}
