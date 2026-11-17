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
  /** Whether the key declares the slot: false for an undeclared variant, and for a default slot the key declines but still holds values in. */
  declared: boolean
}

/** What the key declares about the default variant: absent or null permits it, only an explicit false declines it. */
export interface DefaultVariantDeclaration {
  defaultVariant?: boolean | null
  defaultVariantLabel?: string | null
}

/** Whether the key permits a value carrying no variant, which is the one rule every surface reads the default slot by. */
export const permitsDefaultVariant = (declaration: DefaultVariantDeclaration): boolean => declaration.defaultVariant !== false

/** Whether a stored value is one this editor can read: nothing stored, or a list of entries. */
export const isReadableValue = (value: unknown): boolean => isNil(value) || Array.isArray(value)

/** The places each slot's entries hold in the list, in list order. */
const slotPlacesOf = (
  entries: ReadonlyArray<{ entry: ClassificationStoreMultiValueEntry }>
): Map<string | null, number[]> => {
  const places = new Map<string | null, number[]>()

  entries.forEach(({ entry }, at) => {
    const variant = entry.var ?? null

    places.set(variant, [...(places.get(variant) ?? []), at])
  })

  return places
}

/** The entries as the editor holds and writes them: in display order, without position (the writer numbers them). */
export const orderEntries = (value: unknown): ClassificationStoreMultiValueEntry[] => {
  if (!Array.isArray(value)) {
    return []
  }

  const entries = (value as ClassificationStoreMultiValueEntry[])
    // A list element holding nothing is no entry, and is dropped here rather than read for a position.
    .filter((entry) => !isNil(entry))
    .map((entry, index) => ({ entry, position: entry.p ?? 0, index }))
  const ordered = [...entries]

  // A position is the entry's place in its own slot, so it orders that slot and leaves the slots where the list holds them.
  for (const places of slotPlacesOf(entries).values()) {
    const sorted = places
      .map((place) => entries[place])
      .sort((a, b) => a.position - b.position || a.index - b.index)

    places.forEach((place, at) => { ordered[place] = sorted[at] })
  }

  return ordered.map(({ entry: { p, ...rest } }) => rest)
}

export const variantOf = (entry: ClassificationStoreMultiValueEntry): string | null => entry.var ?? null

/** The variants the key declares that a value can address: a row carrying no name addresses nothing. */
export const declaredVariantsOf = (
  variants: readonly ClassificationStoreVariantLayout[] | null | undefined
): ClassificationStoreVariantLayout[] => (variants ?? []).filter((variant) => variantNameOf(variant) !== '')

/** The identity of a slot, which the default slot never shares with a declared or stored variant. */
export const slotKeyOf = (slot: MultiValueSlot): string => slot.variant === null ? 'default' : `variant-${slot.variant}`

/**
 * One slot per declared variant in declared order, then the default slot where the key permits the
 * default variant or an entry carries no variant, then one per undeclared variant found in the
 * entries. A key that declines the default variant keeps that slot only for the entries it already
 * holds, as an undeclared one.
 *
 * A declared row carrying no name addresses nothing — no value can name it and none can be written
 * to it — so it declares no slot, rather than one headed by nothing beside the default slot.
 */
export const buildSlots = (
  variants: readonly ClassificationStoreVariantLayout[] | null | undefined,
  entries: readonly ClassificationStoreMultiValueEntry[],
  declaration: DefaultVariantDeclaration = {}
): MultiValueSlot[] => {
  const defaultPermitted = permitsDefaultVariant(declaration)
  const declared = declaredVariantsOf(variants)
  const slots: MultiValueSlot[] = declared.map((variant) => ({
    variant: variantNameOf(variant),
    label: isNil(variant.label) || variant.label === '' ? variantNameOf(variant) : variant.label,
    declared: true
  }))

  if (defaultPermitted || entries.some((entry) => variantOf(entry) === null)) {
    const label = declaration.defaultVariantLabel

    slots.push({ variant: null, label: isNil(label) || label === '' ? null : label, declared: defaultPermitted })
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

/** The entries with an empty one appended for every slot that holds none. */
export const seedEmptySlots = (
  variants: readonly ClassificationStoreVariantLayout[] | null | undefined,
  entries: readonly ClassificationStoreMultiValueEntry[],
  declaration: DefaultVariantDeclaration = {}
): ClassificationStoreMultiValueEntry[] => [
  ...entries,
  ...buildSlots(variants, entries, declaration)
    .filter((slot) => indexesOf(entries, slot).length === 0)
    .map((slot): ClassificationStoreMultiValueEntry => slot.variant === null ? { v: null } : { var: slot.variant, v: null })
]
