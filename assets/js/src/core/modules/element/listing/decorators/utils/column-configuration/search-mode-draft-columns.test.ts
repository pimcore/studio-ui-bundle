/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { getColumnIdentity } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-columns'
import { type AvailableColumn } from './context-layer/provider/available-columns/available-columns-provider'
import { applyColumnConfigurationDraft, buildColumnConfigurationDraft, isSearchModeDraftColumn, withoutSearchModeDraftColumns } from './search-mode-draft-columns'

const available = (key: string): AvailableColumn => ({
  key,
  locale: null,
  group: ['system'],
  type: 'system.string',
  frontendType: 'input',
  config: [],
  sortable: true,
  editable: false,
  exportable: true,
  filterable: true,
  localizable: false
})

const selected = (key: string): SelectedColumn => ({
  key,
  locale: null,
  type: 'system.string',
  config: [],
  sortable: true,
  editable: false,
  localizable: false,
  originalApiDefinition: available(key)
})

const toDraft = (column: SelectedColumn): AvailableColumn => ({ ...column.originalApiDefinition as AvailableColumn, locale: column.locale, width: column.width })

const toSelected = (column: AvailableColumn): SelectedColumn => ({
  key: column.key,
  locale: column.locale,
  type: column.type,
  config: column.config,
  sortable: column.sortable,
  editable: column.editable,
  localizable: column.localizable,
  originalApiDefinition: column
})

const isMode = (column: SelectedColumn): boolean => column.key === 'score'

describe('buildColumnConfigurationDraft', () => {
  it('tags the search mode columns with a stable id', () => {
    const draft = buildColumnConfigurationDraft([selected('id'), selected('score')], isMode, toDraft)

    expect(draft.map(isSearchModeDraftColumn)).toEqual([false, true])
    expect(draft[1].__meta?.uniqueId).toBe(buildColumnConfigurationDraft([selected('score')], isMode, toDraft)[0].__meta?.uniqueId)
    expect(draft[0].__meta).toBeUndefined()
  })
})

describe('withoutSearchModeDraftColumns', () => {
  it('leaves search mode columns out of the columns to save', () => {
    const draft = buildColumnConfigurationDraft([selected('id'), selected('score'), selected('filename')], isMode, toDraft)

    expect(withoutSearchModeDraftColumns(draft).map((column) => column.key)).toEqual(['id', 'filename'])
  })
})

describe('applyColumnConfigurationDraft', () => {
  it('sets only the user columns and anchors the mode column to its predecessor', () => {
    const draft = buildColumnConfigurationDraft([selected('id'), selected('filename'), selected('score')], isMode, toDraft)
    const reordered = [draft[0], draft[2], draft[1]]
    const setSelectedColumns = jest.fn()
    const updatePlacements = jest.fn()

    applyColumnConfigurationDraft(reordered, toSelected, setSelectedColumns, updatePlacements)

    expect(setSelectedColumns.mock.calls[0][0].map((column: SelectedColumn) => column.key)).toEqual(['id', 'filename'])
    expect(updatePlacements).toHaveBeenCalledWith({
      [getColumnIdentity(selected('score'))]: { anchor: getColumnIdentity(selected('id')), order: 0 }
    })
  })

  it('anchors a mode column moved to the top to the start', () => {
    const draft = buildColumnConfigurationDraft([selected('id'), selected('score')], isMode, toDraft)
    const updatePlacements = jest.fn()

    applyColumnConfigurationDraft([draft[1], draft[0]], toSelected, jest.fn(), updatePlacements)

    expect(updatePlacements).toHaveBeenCalledWith({ [getColumnIdentity(selected('score'))]: { anchor: null, order: 0 } })
  })
})
