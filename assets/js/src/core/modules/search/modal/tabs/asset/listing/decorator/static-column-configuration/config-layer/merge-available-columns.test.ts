/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { mergeAvailableColumns } from './merge-available-columns'
import { staticAvailableColumns } from './static-available-columns'

const column = (key: string, group: string[], type: string, frontendType: string): AvailableColumn => ({
  config: [],
  key,
  group,
  sortable: true,
  editable: false,
  exportable: true,
  localizable: false,
  locale: null,
  type,
  frontendType,
  filterable: true
})

describe('mergeAvailableColumns', () => {
  it('falls back to the static columns while the API columns are not loaded', () => {
    expect(mergeAvailableColumns(staticAvailableColumns, undefined)).toEqual(staticAvailableColumns)
  })

  it('includes the metadata columns from the API so they can be used as filters', () => {
    const metadataColumn = column('copyright', ['predefined_metadata'], 'metadata.input', 'input')

    const result = mergeAvailableColumns(staticAvailableColumns, [metadataColumn])

    expect(result).toContainEqual(metadataColumn)
  })

  it('prefers the API definition over the static one for the same key', () => {
    const apiId = column('id', ['system'], 'system.id', 'id')
    apiId.config = ['from-api']

    const result = mergeAvailableColumns(staticAvailableColumns, [apiId])

    expect(result.filter((c) => c.key === 'id')).toEqual([apiId])
    expect(result.map((c) => c.key)).toEqual(expect.arrayContaining(staticAvailableColumns.map((c) => c.key)))
  })
})
