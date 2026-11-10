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
import { buildOverride, draftOf, overrideTags } from './key-override'

const rel = (extra: Record<string, unknown>): ClassificationStoreConfigurationKeyGroupRelationDetail => (
  { keyId: 1, groupId: 2, ...extra } as unknown as ClassificationStoreConfigurationKeyGroupRelationDetail
)

describe('key override draft', () => {
  it('keeps unread members of the stored override through a save', () => {
    const draft = draftOf(rel({ definitionOverride: { options: ['red'], maxLength: 5 } }))

    expect(buildOverride({ ...draft, validUnits: ['kg'] })).toEqual({ options: ['red'], maxLength: 5, validUnits: ['kg'] })
  })

  it('marks a non-object stored override as unreadable', () => {
    expect(draftOf(rel({ definitionOverride: [] })).unreadable).toBe(true)
    expect(draftOf(rel({ definitionOverride: 'red' })).unreadable).toBe(true)
  })

  it('does not call a subset empty where the key options are unavailable', () => {
    const tags = overrideTags(rel({ definitionOverride: { options: ['red'] }, options: null, optionsUnavailableReason: 'gone' }))

    expect(tags).toHaveLength(1)
    expect(tags[0].danger).toBe(false)
  })

  it('uses a short tag for stored options the row cannot judge', () => {
    const [tag] = overrideTags(rel({ type: 'input', definitionOverride: { options: ['red'] } }))

    expect(tag.translationKey).toBe('classification-store.override.tag-options-unavailable')
  })
})
