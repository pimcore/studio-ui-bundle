/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { selectPredefinedMetadataToAdd } from './select-predefined-metadata-to-add'
import type { PredefinedMetadata } from '../metadata-api-slice-enhanced'

const definition = (overrides: Partial<PredefinedMetadata>): PredefinedMetadata => ({
  id: 'id',
  name: 'my_field',
  type: 'select',
  language: null,
  data: null,
  creationDate: 0,
  modificationDate: 0,
  isWriteable: true,
  ...overrides
})

describe('selectPredefinedMetadataToAdd (PEES-2096)', () => {
  it('adds a definition that is not yet present', () => {
    const result = selectPredefinedMetadataToAdd([definition({ id: 'a' })], [])

    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({ rowId: 'a', name: 'my_field', language: '', data: null })
  })

  it('skips definitions already present with the same name and language', () => {
    const result = selectPredefinedMetadataToAdd(
      [definition({ id: 'a' })],
      [{ name: 'my_field', language: '' }]
    )

    expect(result).toEqual([])
  })

  it('does not add two definitions with the same name and language in one run', () => {
    const result = selectPredefinedMetadataToAdd(
      [definition({ id: 'a', targetSubType: 'image' }), definition({ id: 'b', targetSubType: 'video' })],
      []
    )

    expect(result.map((entry) => entry.rowId)).toEqual(['a'])
  })

  it('treats the same name in different languages as distinct entries', () => {
    const result = selectPredefinedMetadataToAdd(
      [definition({ id: 'a', language: 'en' }), definition({ id: 'b', language: 'de' })],
      []
    )

    expect(result.map((entry) => entry.rowId)).toEqual(['a', 'b'])
  })
})
