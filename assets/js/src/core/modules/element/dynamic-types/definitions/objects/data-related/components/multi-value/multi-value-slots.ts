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
  type ClassificationStoreMultiValueEntry,
  type ClassificationStoreVariantLayout
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { variantNameOf } from '@Pimcore/modules/data-object/classification-store/utils/variant-name'

/** One place values of the key are edited: a declared variant, the default variant, or an undeclared one. */
export interface MultiValueSlot {
  /** The variant entries of this slot carry; null is the default variant. */
  variant: string | null
  /** What the slot is headed with; null where it needs no heading. */
  label: string | null
  declared: boolean
}

/** Whether a stored value is one this editor can read: nothing stored, or a list of entries. */
export const isReadableValue = (value: unknown): boolean => isNil(value) || Array.isArray(value)

/** The entries as the editor holds and writes them: in display order, without position (the writer numbers them). */
export const orderEntries = (value: unknown): ClassificationStoreMultiValueEntry[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return (value as ClassificationStoreMultiValueEntry[])
    // A list element holding nothing is no entry, and is dropped here rather than read for a position.
    .filter((entry) => !isNil(entry))
    .map((entry, index) => ({ entry, position: entry.p ?? 0, index }))
    .sort((a, b) => a.position - b.position || a.index - b.index)
    .map(({ entry: { p, ...rest } }) => rest)
}

export const variantOf = (entry: ClassificationStoreMultiValueEntry): string | null => entry.var ?? null

/** The variants the key declares that a value can address: a row carrying no name addresses nothing. */
export const declaredVariantsOf = (
  variants: readonly ClassificationStoreVariantLayout[] | null | undefined
): ClassificationStoreVariantLayout[] => (variants ?? []).filter((variant) => variantNameOf(variant) !== '')

/** The identity of a slot, which the default slot never shares with a declared or stored variant. */
export const slotKeyOf = (slot: MultiValueSlot): string => slot.variant === null ? 'default' : `variant-${slot.variant}`

/**
 * One slot per declared variant in declared order, then the default slot where an entry carries no
 * variant (or where nothing is declared), then one per undeclared variant found in the entries.
 *
 * A declared row carrying no name addresses nothing — no value can name it and none can be written
 * to it — so it declares no slot, rather than one headed by nothing beside the default slot.
 */
export const buildSlots = (
  variants: readonly ClassificationStoreVariantLayout[] | null | undefined,
  entries: readonly ClassificationStoreMultiValueEntry[]
): MultiValueSlot[] => {
  const declared = declaredVariantsOf(variants)
  const slots: MultiValueSlot[] = declared.map((variant) => ({
    variant: variantNameOf(variant),
    label: isNil(variant.label) || variant.label === '' ? variantNameOf(variant) : variant.label,
    declared: true
  }))

  if (declared.length === 0 || entries.some((entry) => variantOf(entry) === null)) {
    slots.push({ variant: null, label: null, declared: true })
  }

  for (const entry of entries) {
    const variant = variantOf(entry)

    if (variant !== null && !slots.some((slot) => slot.variant === variant)) {
      slots.push({ variant, label: variant, declared: false })
    }
  }

  return slots
}

/** The positions in the entry list of the entries one slot holds, in order. */
export const indexesOf = (entries: readonly ClassificationStoreMultiValueEntry[], slot: MultiValueSlot): number[] =>
  entries.flatMap((entry, index) => variantOf(entry) === slot.variant ? [index] : [])

/** Whether a slot may take one more entry; no maximum is no cap, and 0 is a cap. */
export const canAdd = (maximum: number | null | undefined, count: number): boolean => isNil(maximum) || count < maximum

/** The entries with an empty one appended for every slot that holds none, for a key whose slots hold one value each. */
export const seedEmptySlots = (
  variants: readonly ClassificationStoreVariantLayout[] | null | undefined,
  entries: readonly ClassificationStoreMultiValueEntry[]
): ClassificationStoreMultiValueEntry[] => [
  ...entries,
  ...buildSlots(variants, entries)
    .filter((slot) => indexesOf(entries, slot).length === 0)
    .map((slot): ClassificationStoreMultiValueEntry => slot.variant === null ? { v: null } : { var: slot.variant, v: null })
]

/** The entries as they are written: each carries `p`, its index within its variant's slot, because an absent `p` reads as 0 and two entries at one position are refused. */
export const withPositions = (entries: readonly ClassificationStoreMultiValueEntry[]): ClassificationStoreMultiValueEntry[] => {
  const counts = new Map<string | null, number>()

  return entries.map((entry) => {
    const variant = variantOf(entry)
    const position = counts.get(variant) ?? 0

    counts.set(variant, position + 1)

    return { ...entry, p: position }
  })
}
