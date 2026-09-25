/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  ADVANCED_COLUMN_TYPE,
  advancedFromSchemaColumn,
  advancedToSchemaColumn,
  type SchemaColumn
} from './types'

// jsdom (as used by this jest environment) does not implement crypto.randomUUID, only
// crypto.getRandomValues; advancedFromSchemaColumn relies on it to key the editor draft.
if (globalThis.crypto?.randomUUID === undefined) {
  Object.defineProperty(globalThis.crypto, 'randomUUID', {
    value: (): string => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/gu, (char) => {
      const random = Math.random() * 16 | 0
      const value = char === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    })
  })
}

describe('advancedFromSchemaColumn / advancedToSchemaColumn round trip', () => {
  it('round-trips a plain (non-advanced) column unchanged', () => {
    const schemaColumn: SchemaColumn = {
      key: 'productionYear',
      fieldtype: 'numeric',
      type: 'dataobject.adapter',
      locale: null
    }

    const draft = advancedFromSchemaColumn(schemaColumn)
    expect(draft.pipeline).toBeUndefined()
    expect(draft.key).toBe('productionYear')

    const roundTripped = advancedToSchemaColumn(draft)
    expect(roundTripped).toEqual(schemaColumn)
  })

  it('round-trips an advanced column, packing the pipeline into config', () => {
    const schemaColumn: SchemaColumn = {
      key: 'Engine spec',
      fieldtype: 'advanced',
      type: ADVANCED_COLUMN_TYPE,
      config: {
        advancedColumns: [{ key: 'engine', type: 'dataobject.adapter', config: { some: 'thing' } }],
        transformers: [{ type: 'combine' }]
      },
      locale: 'en'
    }

    const draft = advancedFromSchemaColumn(schemaColumn)
    expect(draft.pipeline).toEqual({
      title: 'Engine spec',
      sourceFields: [{ key: 'engine', type: 'dataobject.adapter', config: { some: 'thing' } }],
      transformers: [{ type: 'combine' }]
    })
    expect(draft.locale).toBe('en')

    const roundTripped = advancedToSchemaColumn(draft)
    expect(roundTripped).toEqual(schemaColumn)
  })

  it('defaults a missing source-field config to an empty object on the way back in', () => {
    const schemaColumn: SchemaColumn = {
      key: 'Title',
      fieldtype: 'advanced',
      type: ADVANCED_COLUMN_TYPE,
      config: {
        advancedColumns: [{ key: 'name', type: 'dataobject.adapter' }],
        transformers: undefined
      }
    }

    const draft = advancedFromSchemaColumn(schemaColumn)
    expect(draft.pipeline?.sourceFields).toEqual([{ key: 'name', type: 'dataobject.adapter', config: {} }])
  })
})
