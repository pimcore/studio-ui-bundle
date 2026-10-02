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
  CLASSIFICATION_STORE_COLUMN_TYPE,
  getClassificationStoreColumnLabel,
  getColumnIdentity,
  type SchemaColumn
} from './types'

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

describe('getColumnIdentity', () => {
  it('is the bare key for a non-classification-store column', () => {
    expect(getColumnIdentity({ key: 'productionYear', type: 'dataobject.adapter' })).toBe('productionYear')
  })

  it('combines key, groupId and keyId for a classification store column', () => {
    expect(getColumnIdentity({
      key: 'technicalAttributes',
      type: CLASSIFICATION_STORE_COLUMN_TYPE,
      config: { groupId: 1, keyId: 2 }
    })).toBe('technicalAttributes#1.2')
  })

  it('tells two classification store columns with the same key apart by group/key', () => {
    const height = getColumnIdentity({
      key: 'technicalAttributes',
      type: CLASSIFICATION_STORE_COLUMN_TYPE,
      config: { groupId: 1, keyId: 1 }
    })
    const weight = getColumnIdentity({
      key: 'technicalAttributes',
      type: CLASSIFICATION_STORE_COLUMN_TYPE,
      config: { groupId: 2, keyId: 5 }
    })

    expect(height).not.toBe(weight)
  })

  it('falls back to the bare key when a classification store column has no groupId/keyId yet', () => {
    expect(getColumnIdentity({ key: 'technicalAttributes', type: CLASSIFICATION_STORE_COLUMN_TYPE }))
      .toBe('technicalAttributes')
  })
})

describe('getClassificationStoreColumnLabel', () => {
  it('renders "group › key" when a group name is recorded', () => {
    const label = getClassificationStoreColumnLabel({
      config: { groupName: 'Dimensions', fieldDefinition: { title: 'Height' } }
    })

    expect(label).toBe('Dimensions › Height')
  })

  it('falls back to the key title alone when no group name is available', () => {
    const label = getClassificationStoreColumnLabel({ config: { fieldDefinition: { title: 'Height' } } })

    expect(label).toBe('Height')
  })

  it('falls back to the field definition name, then the raw key id', () => {
    expect(getClassificationStoreColumnLabel({ config: { fieldDefinition: { name: 'height' } } })).toBe('height')
    expect(getClassificationStoreColumnLabel({ config: { keyId: 7 } })).toBe('7')
  })
})

describe('advancedFromSchemaColumn without crypto.randomUUID (non-secure http origins)', () => {
  it('still creates a draft id', () => {
    const original = globalThis.crypto.randomUUID
    Object.defineProperty(globalThis.crypto, 'randomUUID', { value: undefined, configurable: true })

    try {
      const column = advancedFromSchemaColumn({ key: 'name', fieldtype: 'input', type: 'dataobject.adapter' })

      expect(typeof column._id).toBe('string')
      expect(column._id.length).toBeGreaterThan(0)
    } finally {
      Object.defineProperty(globalThis.crypto, 'randomUUID', { value: original, configurable: true })
    }
  })
})
