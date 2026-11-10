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

export interface IPublishedOption {
  label: string
  value: string
}

export interface IPublishedUnit {
  id: string
  symbol: string
}

/**
 * What the assignment row publishes about its key. The generated client is refreshed from the
 * published contract by the standing snapshot routine; until it declares these members they are
 * read through this one type, so the names are corrected in one place.
 */
export interface IPublishedKeyVocabulary {
  type?: string
  options?: IPublishedOption[] | null
  optionsUnavailableReason?: string | null
  validUnits?: IPublishedUnit[] | null
}

type Relation = ClassificationStoreConfigurationKeyGroupRelationDetail

/** Key types that carry units. */
const UNIT_TYPES: readonly string[] = ['quantityValue', 'inputQuantityValue', 'quantityValueRange']

export const vocabularyOf = (relation: Relation): IPublishedKeyVocabulary => relation as IPublishedKeyVocabulary

export const carriesUnits = (relation: Relation): boolean => UNIT_TYPES.includes(vocabularyOf(relation).type ?? '')

export const keyUnitsOf = (relation: Relation): IPublishedUnit[] => vocabularyOf(relation).validUnits ?? []

export const unitSymbol = (relation: Relation, id: string): string =>
  keyUnitsOf(relation).find((unit) => unit.id === id)?.symbol ?? id

/** The three members of the override this screen edits, held as stored so an unread one survives a save. */
export interface IOverrideDraft {
  options: unknown
  defaultUnit: unknown
  validUnits: unknown
}

export const draftOf = (relation: Relation): IOverrideDraft => {
  const stored = (relation.definitionOverride ?? {}) as Record<string, unknown>

  return {
    options: stored.options ?? undefined,
    defaultUnit: stored.defaultUnit ?? undefined,
    validUnits: stored.validUnits ?? undefined
  }
}

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

  const stored = raw
  const live = stored.filter((value) => offered.includes(value))
  const stale = stored.filter((value) => !offered.includes(value))

  if (stored.length === 0) return { status: 'empty', stored, live, stale }
  if (live.length === 0) return { status: 'stale-only', stored, live, stale }

  return { status: 'narrowed', stored, live, stale }
}

export const optionValuesOf = (relation: Relation): string[] =>
  (vocabularyOf(relation).options ?? []).map((option) => option.value)

export const unitIdsOf = (relation: Relation): string[] => keyUnitsOf(relation).map((unit) => unit.id)

/** The values the default unit may be chosen from. */
export const defaultUnitChoices = (relation: Relation, draft: IOverrideDraft): string[] => {
  const resolved = resolveSubset(draft.validUnits, unitIdsOf(relation))

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
  checked: boolean
): IOverrideDraft => {
  const { stored } = resolveSubset(draft.validUnits, unitIdsOf(relation))
  const next = checked ? [...stored.filter((item) => item !== id), id] : stored.filter((item) => item !== id)

  return {
    ...draft,
    validUnits: next,
    defaultUnit: !checked && draft.defaultUnit === id ? undefined : draft.defaultUnit
  }
}

export const clearOptions = (draft: IOverrideDraft): IOverrideDraft => ({ ...draft, options: undefined })

/** Widening back to the key's own units keeps a default only where the key itself permits it. */
export const clearUnits = (relation: Relation, draft: IOverrideDraft): IOverrideDraft => ({
  ...draft,
  validUnits: undefined,
  defaultUnit: typeof draft.defaultUnit === 'string' && unitIdsOf(relation).includes(draft.defaultUnit)
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
export const overrideTags = (relation: Relation): IOverrideTag[] => {
  const draft = draftOf(relation)
  const tags: IOverrideTag[] = []
  const options = optionValuesOf(relation)
  const optionsPublished = vocabularyOf(relation).options !== undefined && vocabularyOf(relation).options !== null

  if (draft.options !== undefined) {
    const resolved = resolveSubset(draft.options, options)

    if (resolved.status === 'empty' || resolved.status === 'stale-only' || (optionsPublished && resolved.status === 'invalid')) {
      tags.push({ id: 'options', translationKey: 'classification-store.override.tag-no-options', params: {}, text: '', danger: true })
    } else if (optionsPublished) {
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
    tags.push({ id: 'default-unit', translationKey: null, params: {}, text: unitSymbol(relation, draft.defaultUnit), danger: false })
  }

  if (draft.validUnits !== undefined) {
    const units = unitIdsOf(relation)
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
