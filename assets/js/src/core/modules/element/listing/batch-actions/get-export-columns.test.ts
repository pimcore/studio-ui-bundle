/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GridColumnRequest } from '@sdk/api/asset'
import {
  type SelectedColumn
} from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { getExportColumns } from './get-export-columns'

const selectedColumn = (key: string, type: string, uniqueId?: string): SelectedColumn => ({
  key,
  type,
  config: {},
  sortable: false,
  editable: false,
  localizable: false,
  originalApiDefinition: { key, type, __meta: { uniqueId } }
})

const requestColumn = (key: string, type: string, config: GridColumnRequest['config'] = []): GridColumnRequest => ({
  key,
  type,
  group: [],
  locale: 'de',
  config
})

describe('getExportColumns', () => {
  it('keeps an advanced column that the grid request sends under its uniqueId', () => {
    const advancedConfig = { advancedColumns: [{ key: 'simpleField', config: { field: 'name' } }] }

    const result = getExportColumns(
      [requestColumn('uuid-1', 'dataobject.advanced', advancedConfig as unknown as GridColumnRequest['config'])],
      [selectedColumn('advanced', 'dataobject.advanced', 'uuid-1')]
    )

    expect(result).toEqual([
      {
        key: 'advanced',
        type: 'dataobject.advanced',
        group: [],
        locale: 'de',
        config: advancedConfig
      }
    ])
  })

  it('keeps every advanced column with its own config when several are selected', () => {
    const configA = { advancedColumns: [{ key: 'staticText', config: { text: 'A' } }] }
    const configB = { advancedColumns: [{ key: 'staticText', config: { text: 'B' } }] }

    const result = getExportColumns(
      [
        requestColumn('uuid-a', 'dataobject.advanced', configA as unknown as GridColumnRequest['config']),
        requestColumn('uuid-b', 'dataobject.advanced', configB as unknown as GridColumnRequest['config'])
      ],
      [
        selectedColumn('advanced', 'dataobject.advanced', 'uuid-a'),
        selectedColumn('advanced', 'dataobject.advanced', 'uuid-b')
      ]
    )

    expect(result.map((column) => column.config)).toEqual([configA, configB])
  })

  it('drops columns that are not selected, like the system columns the grid request adds', () => {
    const result = getExportColumns(
      [requestColumn('id', 'system.id'), requestColumn('title', 'dataobject.adapter')],
      [selectedColumn('title', 'dataobject.adapter')]
    )

    expect(result.map((column) => column.key)).toEqual(['title'])
  })

  it('does not match an advanced column by its shared key', () => {
    const result = getExportColumns(
      [requestColumn('advanced', 'dataobject.advanced')],
      [selectedColumn('advanced', 'dataobject.advanced', 'uuid-1')]
    )

    expect(result).toEqual([])
  })

  it('does not export a same-key column of another locale, like one a search mode adds', () => {
    const result = getExportColumns(
      [{ ...requestColumn('name', 'dataobject.input'), locale: 'en' }, { ...requestColumn('name', 'dataobject.input'), locale: 'de' }],
      [{ ...selectedColumn('name', 'dataobject.input'), localizable: true, locale: 'en' }]
    )

    expect(result.map((column) => column.locale)).toEqual(['en'])
  })

  it('matches a selected column that follows the current language to any request locale', () => {
    const result = getExportColumns(
      [{ ...requestColumn('name', 'dataobject.input'), locale: 'de' }],
      [{ ...selectedColumn('name', 'dataobject.input'), localizable: true }]
    )

    expect(result.map((column) => column.locale)).toEqual(['de'])
  })

  it('matches the default locale, which the request sends as null', () => {
    const result = getExportColumns(
      [{ ...requestColumn('name', 'dataobject.input'), locale: null }],
      [{ ...selectedColumn('name', 'dataobject.input'), localizable: true, locale: 'default' }]
    )

    expect(result).toHaveLength(1)
  })
})
