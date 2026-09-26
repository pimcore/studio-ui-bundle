/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { resolveFieldtype } from './resolve-fieldtype'
import { ADVANCED_COLUMN_KEY, ADVANCED_COLUMN_TYPE, type SchemaColumn } from './types'
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'

const regularField: GridColumnConfiguration = {
  key: 'productionYear',
  group: ['system.dataobject'],
  sortable: true,
  editable: true,
  localizable: false,
  type: 'dataobject.adapter',
  frontendType: 'integer',
  config: { fieldDefinition: { fieldtype: 'numeric', title: 'Production year' } }
} as unknown as GridColumnConfiguration

const fieldWithoutConfig: GridColumnConfiguration = {
  key: 'name',
  group: ['system.dataobject'],
  sortable: true,
  editable: true,
  localizable: false,
  type: 'dataobject.adapter',
  frontendType: 'input',
  config: {}
} as unknown as GridColumnConfiguration

const systemField: GridColumnConfiguration = {
  key: 'id',
  group: ['system'],
  sortable: true,
  editable: false,
  localizable: false,
  type: 'system.id',
  frontendType: 'id',
  config: {}
} as unknown as GridColumnConfiguration

const nestedSystemField: GridColumnConfiguration = {
  key: 'published',
  group: [['system'], ['other']],
  sortable: true,
  editable: true,
  localizable: false,
  type: 'system.boolean',
  frontendType: 'boolean',
  config: {}
} as unknown as GridColumnConfiguration

const advancedField: GridColumnConfiguration = {
  key: ADVANCED_COLUMN_KEY,
  group: ['advanced'],
  sortable: false,
  editable: false,
  localizable: true,
  type: ADVANCED_COLUMN_TYPE,
  frontendType: 'input',
  config: { simpleField: [], relationField: [], transformers: [] }
} as unknown as GridColumnConfiguration

describe('resolveFieldtype (review round 2, finding F)', () => {
  it('uses the field definition fieldtype for a regular field', () => {
    expect(resolveFieldtype(regularField)).toBe('numeric')
  })

  it('falls back to frontendType when no field definition config is present', () => {
    expect(resolveFieldtype(fieldWithoutConfig)).toBe('input')
  })

  it('uses the "system" sentinel for a system column, matching Data Hub export adapters', () => {
    expect(resolveFieldtype(systemField)).toBe('system')
  })

  it('uses the "system" sentinel for a system column filed under a nested group', () => {
    expect(resolveFieldtype(nestedSystemField)).toBe('system')
  })

  it('uses the "advanced" sentinel for the advanced/pipeline column', () => {
    expect(resolveFieldtype(advancedField)).toBe(ADVANCED_COLUMN_KEY)
  })

  it('never derives the fieldtype from the column key (the review round 2 regression)', () => {
    expect(resolveFieldtype(regularField)).not.toBe(regularField.key)
    expect(resolveFieldtype(systemField)).not.toBe(systemField.key)
  })

  it('matches the shape a persisted SchemaColumn expects', () => {
    const persisted: SchemaColumn = {
      key: regularField.key,
      fieldtype: resolveFieldtype(regularField),
      type: regularField.type
    }

    expect(persisted.fieldtype).toBe('numeric')
  })
})
