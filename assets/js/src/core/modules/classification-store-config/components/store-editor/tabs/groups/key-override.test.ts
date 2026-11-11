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
import {
  buildOverride,
  defaultUnitChoices,
  draftOf,
  overrideTags,
  resolveSubset,
  toggleUnit,
  unitIdsOf
} from './key-override'

const rel = (extra: Partial<ClassificationStoreConfigurationKeyGroupRelationDetail>): ClassificationStoreConfigurationKeyGroupRelationDetail => ({
  keyId: 1,
  groupId: 2,
  sorter: 0,
  mandatory: false,
  keyName: null,
  keyDescription: null,
  groupName: null,
  ...extra
})

// A stored value the contract types as an object but a legacy record may hold as a string.
const storedString = (value: string): object => JSON.parse(JSON.stringify(value))

describe('key override draft', () => {
  it('keeps unread members of the stored override through a save', () => {
    const draft = draftOf(rel({ definitionOverride: { options: ['red'], maxLength: 5 } }))

    expect(buildOverride({ ...draft, validUnits: ['kg'] })).toEqual({ options: ['red'], maxLength: 5, validUnits: ['kg'] })
  })

  it('marks a non-object stored override as unreadable', () => {
    expect(draftOf(rel({ definitionOverride: [] })).unreadable).toBe(true)
    expect(draftOf(rel({ definitionOverride: storedString('red') })).unreadable).toBe(true)
  })

  it('does not call a subset empty where the key options are unavailable', () => {
    const tags = overrideTags(rel({ definitionOverride: { options: ['red'] }, options: null, optionsUnavailableReason: 'gone' }))

    expect(tags).toHaveLength(1)
    expect(tags[0].danger).toBe(false)
  })

  it('uses a short tag for stored options the row cannot judge', () => {
    const [tag] = overrideTags(rel({ keyType: 'input', definitionOverride: { options: ['red'] } }))

    expect(tag.translationKey).toBe('classification-store.override.tag-options-unavailable')
  })

  it('tags a stored override that cannot be read, so the row does not read as having none', () => {
    expect(overrideTags(rel({ definitionOverride: storedString('kg') }))).toEqual([
      expect.objectContaining({ translationKey: 'classification-store.override.tag-unreadable', danger: true })
    ])
    expect(overrideTags(rel({ keyType: 'quantityValue', definitionOverride: { defaultUnit: 5 } }))).toEqual([
      expect.objectContaining({ id: 'default-unit', translationKey: 'classification-store.override.tag-unreadable', danger: true })
    ])
  })

  it('counts a duplicated stored value once, so the last-option floor holds', () => {
    expect(resolveSubset(['red', 'red'], ['red', 'green'])).toEqual(expect.objectContaining({ stored: ['red'], live: ['red'] }))
  })

  it('marks a default unit the key does not permit as a disagreement', () => {
    const units = { defaultUnit: null, validUnits: ['kg'] }

    expect(overrideTags(rel({ keyType: 'quantityValue', units, definitionOverride: { defaultUnit: 'stone' } }))[0].danger).toBe(true)
    expect(overrideTags(rel({ keyType: 'quantityValue', units, definitionOverride: { defaultUnit: 'kg' } }))[0].danger).toBe(false)
  })

  it('carries the published unit IDs unchanged and in order, and narrows over those strings', () => {
    const relation = rel({ keyType: 'quantityValue', units: { defaultUnit: null, validUnits: ['kg', 'g', 'lb'] } })
    const draft = draftOf(relation)

    expect(unitIdsOf(relation)).toEqual(['kg', 'g', 'lb'])
    expect(defaultUnitChoices(relation, draft, [])).toEqual(['kg', 'g', 'lb'])
    expect(toggleUnit(relation, draft, 'lb', false, []).validUnits).toEqual(['kg', 'g'])
  })

  it('reads a null valid-units member as every installation unit, and a null units member as none', () => {
    const everyUnit = rel({ keyType: 'quantityValue', units: { defaultUnit: null, validUnits: null } })
    const noUnits = rel({ keyType: 'input', units: null })

    expect(unitIdsOf(everyUnit, ['kg', 'g'])).toEqual(['kg', 'g'])
    expect(unitIdsOf(noUnits, ['kg', 'g'])).toEqual([])
  })

  it('names the default unit through the given label, the id otherwise', () => {
    const relation = rel({ keyType: 'quantityValue', units: { defaultUnit: null, validUnits: ['kg'] }, definitionOverride: { defaultUnit: 'kg' } })

    expect(overrideTags(relation, { installationUnits: [], unitLabel: () => 'KG' })[0].text).toBe('KG')
    expect(overrideTags(relation)[0].text).toBe('kg')
  })
})
