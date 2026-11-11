/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ClassificationStoreConfigurationKeyGroupRelationDetail } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

type Relation = ClassificationStoreConfigurationKeyGroupRelationDetail

/** Key types that carry units. */
const UNIT_TYPES: ReadonlySet<string> = new Set(['quantityValue', 'inputQuantityValue', 'quantityValueRange'])

export const carriesUnits = (relation: Relation): boolean => UNIT_TYPES.has(relation.keyType ?? '')

/** True where the key publishes a unit vocabulary; null means its type holds no units. */
export const publishesUnits = (relation: Relation): boolean => relation.units !== undefined && relation.units !== null

/** The unit IDs the key permits; every installation unit where it restricts nothing, none where it holds no units. */
export const unitIdsOf = (relation: Relation, installationUnits: string[] = []): string[] => {
  if (!publishesUnits(relation)) return []

  return relation.units?.validUnits ?? installationUnits
}

export interface IKeyUnits {
  installationUnits: string[]
  /** The installation's abbreviation for the unit, the ID where it names none or the list is not resolved. */
  unitLabel: (id: string) => string
}

/**
 * The three members of the override this screen edits, held as stored. `rest` carries every other
 * member of the stored object so a save overlays the three and leaves the rest as it was.
 * `unreadable` marks a stored value that is not an object at all.
 */
export interface IOverrideDraft {
  options: unknown
  defaultUnit: unknown
  validUnits: unknown
  rest: Record<string, unknown>
  unreadable: boolean
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const draftOf = (relation: Relation): IOverrideDraft => {
  const raw: unknown = relation.definitionOverride

  if (raw !== undefined && raw !== null && !isPlainObject(raw)) {
    return { options: undefined, defaultUnit: undefined, validUnits: undefined, rest: {}, unreadable: true }
  }

  const { options, defaultUnit, validUnits, ...rest } = raw ?? {}

  return {
    options: options ?? undefined,
    defaultUnit: defaultUnit ?? undefined,
    validUnits: validUnits ?? undefined,
    rest,
    unreadable: false
  }
}

/** True where the stored override names a unit member, whatever the key's type carries. */
export const storesUnitMember = (relation: Relation): boolean => {
  const { defaultUnit, validUnits } = draftOf(relation)

  return defaultUnit !== undefined || validUnits !== undefined
}

/** Clears an unreadable stored value, the one action that resolves it. */
export const clearUnreadable = (draft: IOverrideDraft): IOverrideDraft => ({ ...draft, unreadable: false })

export type SubsetStatus = 'all' | 'narrowed' | 'empty' | 'stale-only' | 'invalid'

export interface IResolvedSubset {
  status: SubsetStatus
  /** The stored values, in stored order, stale ones included. */
  stored: string[]
  /** Stored values the key still offers. */
  live: string[]
  /** Stored values the key no longer offers. */
  stale: string[]
}

/** Null and an absent member both mean every value; an empty list means none. */
export const resolveSubset = (raw: unknown, offered: string[]): IResolvedSubset => {
  if (raw === undefined || raw === null) {
    return { status: 'all', stored: offered, live: offered, stale: [] }
  }

  if (!Array.isArray(raw) || !raw.every((value) => typeof value === 'string')) {
    return { status: 'invalid', stored: [], live: [], stale: [] }
  }

  const stored = [...new Set(raw)]
  const live = stored.filter((value) => offered.includes(value))
  const stale = stored.filter((value) => !offered.includes(value))

  if (stored.length === 0) return { status: 'empty', stored, live, stale }
  if (live.length === 0) return { status: 'stale-only', stored, live, stale }

  return { status: 'narrowed', stored, live, stale }
}

export const optionValuesOf = (relation: Relation): string[] =>
  (relation.options ?? []).map((option) => option.value)

/** The values the default unit may be chosen from. */
export const defaultUnitChoices = (relation: Relation, draft: IOverrideDraft, installationUnits: string[]): string[] => {
  const resolved = resolveSubset(draft.validUnits, unitIdsOf(relation, installationUnits))

  if (resolved.status === 'all') return resolved.live
  if (resolved.status === 'narrowed') return resolved.live

  return []
}

export const toggleOption = (
  relation: Relation,
  draft: IOverrideDraft,
  value: string,
  checked: boolean
): IOverrideDraft => {
  const { stored } = resolveSubset(draft.options, optionValuesOf(relation))
  const next = checked ? [...stored.filter((item) => item !== value), value] : stored.filter((item) => item !== value)

  return { ...draft, options: next }
}

/** Deselecting the unit that is the per-group default also resets the default. */
export const toggleUnit = (
  relation: Relation,
  draft: IOverrideDraft,
  id: string,
  checked: boolean,
  installationUnits: string[]
): IOverrideDraft => {
  const { stored } = resolveSubset(draft.validUnits, unitIdsOf(relation, installationUnits))
  const next = checked ? [...stored.filter((item) => item !== id), id] : stored.filter((item) => item !== id)

  return {
    ...draft,
    validUnits: next,
    defaultUnit: !checked && draft.defaultUnit === id ? undefined : draft.defaultUnit
  }
}

export const clearOptions = (draft: IOverrideDraft): IOverrideDraft => ({ ...draft, options: undefined })

/** Widening back to the key's own units keeps a default only where the key itself permits it. */
export const clearUnits = (relation: Relation, draft: IOverrideDraft, installationUnits: string[]): IOverrideDraft => ({
  ...draft,
  validUnits: undefined,
  defaultUnit: typeof draft.defaultUnit === 'string' && unitIdsOf(relation, installationUnits).includes(draft.defaultUnit)
    ? draft.defaultUnit
    : undefined
})

export const setDefaultUnit = (draft: IOverrideDraft, defaultUnit: string | undefined): IOverrideDraft => ({
  ...draft,
  defaultUnit
})

/** The override as it is sent: every member left set, and an explicit null where none remains. */
export const buildOverride = (draft: IOverrideDraft): Record<string, unknown> | null => {
  const override: Record<string, unknown> = {
    ...draft.rest,
    ...(draft.options !== undefined ? { options: draft.options } : {}),
    ...(draft.defaultUnit !== undefined ? { defaultUnit: draft.defaultUnit } : {}),
    ...(draft.validUnits !== undefined ? { validUnits: draft.validUnits } : {})
  }

  return Object.keys(override).length === 0 ? null : override
}

export interface IOverrideTag {
  id: 'options' | 'default-unit' | 'valid-units'
  /** Translation key, or null where the text is a unit symbol. */
  translationKey: string | null
  params: Record<string, unknown>
  text: string
  danger: boolean
}

/** One tag per member the assignment overrides, none where it overrides nothing. */
export const overrideTags = (
  relation: Relation,
  { installationUnits, unitLabel }: IKeyUnits = { installationUnits: [], unitLabel: (id) => id }
): IOverrideTag[] => {
  const draft = draftOf(relation)
  const tags: IOverrideTag[] = []

  if (draft.unreadable) {
    // A stored value that is no object is the state the dialog names; the row must not read as "no override".
    return [{ id: 'options', translationKey: 'classification-store.override.tag-unreadable', params: {}, text: '', danger: true }]
  }

  const options = optionValuesOf(relation)
  const optionsPublished = relation.options !== undefined && relation.options !== null

  if (draft.options !== undefined && !optionsPublished) {
    // The key's options are unknown, not absent: nothing about the stored subset can be judged.
    tags.push({ id: 'options', translationKey: 'classification-store.override.tag-options-unavailable', params: {}, text: '', danger: false })
  } else if (draft.options !== undefined) {
    const resolved = resolveSubset(draft.options, options)

    if (resolved.status === 'empty' || resolved.status === 'stale-only' || resolved.status === 'invalid') {
      tags.push({ id: 'options', translationKey: 'classification-store.override.tag-no-options', params: {}, text: '', danger: true })
    } else {
      tags.push({
        id: 'options',
        translationKey: 'classification-store.override.tag-options',
        params: { count: resolved.stored.length, total: options.length },
        text: '',
        danger: false
      })
    }
  }

  if (typeof draft.defaultUnit === 'string') {
    const published = unitIdsOf(relation, installationUnits)
    // A default the key no longer permits is a disagreement the row must not present as a valid value.
    const outside = published.length > 0 && !published.includes(draft.defaultUnit)

    tags.push({ id: 'default-unit', translationKey: null, params: {}, text: unitLabel(draft.defaultUnit), danger: outside })
  } else if (draft.defaultUnit !== undefined) {
    tags.push({ id: 'default-unit', translationKey: 'classification-store.override.tag-unreadable', params: {}, text: '', danger: true })
  }

  if (draft.validUnits !== undefined) {
    const units = unitIdsOf(relation, installationUnits)
    const resolved = resolveSubset(draft.validUnits, units)

    if (resolved.status === 'empty' || resolved.status === 'stale-only' || resolved.status === 'invalid') {
      tags.push({ id: 'valid-units', translationKey: 'classification-store.override.tag-no-units', params: {}, text: '', danger: true })
    } else if (units.length > 0) {
      tags.push({
        id: 'valid-units',
        translationKey: 'classification-store.override.tag-units',
        params: { count: resolved.stored.length, total: units.length },
        text: '',
        danger: false
      })
    }
  }

  return tags
}
