/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type ColumnFilter } from '@Pimcore/modules/app/types/column-filter'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { type FieldFilter } from '../context-layer/provider/field-filters/field-filters-provider'
import { FULLTEXT_SEARCH_MODE_ID, SearchModeAbstract, type SearchModeAvailability, type SearchModeContext } from './search-mode-abstract'
import { dropVanishedModeColumnFilters, findRemovedColumns, getColumnIdentity, mergeAvailableColumns, placeAdditionalColumns, resolveSearchModeAdditionalColumns, splitSearchModeColumns, toAdditionalSelectedColumn } from './search-mode-columns'

const scoreColumn: GridColumnConfiguration = {
  key: 'score',
  group: ['system'],
  sortable: true,
  editable: false,
  exportable: false,
  filterable: true,
  localizable: false,
  locale: null,
  type: 'test.score',
  frontendType: 'test.score',
  config: []
}

class PlainMode extends SearchModeAbstract {
  readonly id: string = 'plain'
  readonly columnFilterType = 'test.filter'
  readonly order = 10
  readonly icon = 'search'
  available = true
  visible = true

  getMenuLabel (): string { return 'Plain' }
  getCollapsedLabel (): string { return 'Plain' }
  isVisible (): boolean { return this.visible }
  getAvailability (): SearchModeAvailability { return { available: this.available } }
  buildColumnFilter (query: string): ColumnFilter { return { type: this.columnFilterType, filterValue: query } }
}

class ScoreMode extends PlainMode {
  readonly id: string = 'score'
  receivedContext: SearchModeContext | undefined

  getAdditionalColumns (context: SearchModeContext): GridColumnConfiguration[] {
    this.receivedContext = context
    return [scoreColumn]
  }
}

const context: SearchModeContext = { elementType: 'asset', hasExplicitSorting: false }

const selected = (key: string, locale: string | null = null): SelectedColumn => ({
  key,
  locale,
  type: 'system.string',
  config: [],
  sortable: true,
  editable: false,
  localizable: locale !== null
})

describe('SearchModeAbstract.getAdditionalColumns', () => {
  it('adds no columns unless a mode overrides it', () => {
    expect(new PlainMode().getAdditionalColumns(context)).toEqual([])
  })
})

describe('resolveSearchModeAdditionalColumns', () => {
  it('returns the active mode columns and passes the mode context', () => {
    const mode = new ScoreMode()

    expect(resolveSearchModeAdditionalColumns([new PlainMode(), mode], 'score', context)).toEqual([scoreColumn])
    expect(mode.receivedContext).toEqual(context)
  })

  it('returns nothing in full-text mode', () => {
    expect(resolveSearchModeAdditionalColumns([new ScoreMode()], FULLTEXT_SEARCH_MODE_ID, context)).toEqual([])
  })

  it('returns nothing for an unknown stored mode id', () => {
    expect(resolveSearchModeAdditionalColumns([new ScoreMode()], 'gone', context)).toEqual([])
  })

  it('returns nothing for a hidden mode', () => {
    const mode = new ScoreMode()
    mode.visible = false

    expect(resolveSearchModeAdditionalColumns([mode], 'score', context)).toEqual([])
  })

  it('returns nothing when the mode is unavailable on this surface (query falls back to full text)', () => {
    const mode = new ScoreMode()
    mode.available = false

    expect(resolveSearchModeAdditionalColumns([mode], 'score', context)).toEqual([])
  })
})

describe('toAdditionalSelectedColumn', () => {
  it('maps the column configuration like a loaded grid configuration column', () => {
    expect(toAdditionalSelectedColumn(scoreColumn)).toEqual({
      key: 'score',
      locale: null,
      type: 'test.score',
      config: [],
      sortable: true,
      editable: false,
      localizable: false,
      exportable: false,
      frontendType: 'test.score',
      group: ['system'],
      originalApiDefinition: scoreColumn
    })
  })
})

describe('placeAdditionalColumns without placements', () => {
  const score = toAdditionalSelectedColumn(scoreColumn)

  it('appends additional columns after the selected ones', () => {
    const columns = [selected('id'), selected('filename')]

    expect(placeAdditionalColumns(columns, [score])).toEqual([...columns, score])
  })

  it('keeps the selected columns array untouched when there is nothing to add', () => {
    const columns = [selected('id')]

    expect(placeAdditionalColumns(columns, [])).toBe(columns)
  })

  it('skips a column the user already selected', () => {
    const userScore = { ...selected('score'), width: 120 }
    const columns = [selected('id'), userScore]

    expect(placeAdditionalColumns(columns, [score])).toBe(columns)
  })

  it('treats an undefined locale like null when matching', () => {
    const userScore: SelectedColumn = { ...selected('score'), locale: undefined }

    expect(placeAdditionalColumns([userScore], [score])).toEqual([userScore])
  })

  it('appends a column whose key is selected in another locale', () => {
    const localized = { ...score, key: 'name', locale: 'de', localizable: true }
    const columns = [selected('name', 'en')]

    expect(placeAdditionalColumns(columns, [localized])).toEqual([...columns, localized])
  })

  it('does not append the same additional column twice', () => {
    expect(placeAdditionalColumns([], [score, { ...score }])).toEqual([score])
  })
})

describe('placeAdditionalColumns with placements', () => {
  const score = toAdditionalSelectedColumn(scoreColumn)
  const rank = toAdditionalSelectedColumn({ ...scoreColumn, key: 'rank' })
  const id = selected('id')
  const filename = selected('filename')
  const keys = (columns: SelectedColumn[]): Array<string | undefined> => columns.map((column) => column.key)

  it('inserts a mode column after its anchor', () => {
    const placements = { [getColumnIdentity(score)]: { anchor: getColumnIdentity(id) } }

    expect(keys(placeAdditionalColumns([id, filename], [score], placements))).toEqual(['id', 'score', 'filename'])
  })

  it('puts a mode column first for a null anchor', () => {
    const placements = { [getColumnIdentity(score)]: { anchor: null } }

    expect(keys(placeAdditionalColumns([id, filename], [score], placements))).toEqual(['score', 'id', 'filename'])
  })

  it('appends a mode column whose anchor is no longer selected', () => {
    const placements = { [getColumnIdentity(score)]: { anchor: getColumnIdentity(selected('gone')) } }

    expect(keys(placeAdditionalColumns([id, filename], [score], placements))).toEqual(['id', 'filename', 'score'])
  })

  it('keeps the stored order of mode columns sharing an anchor', () => {
    const placements = {
      [getColumnIdentity(score)]: { anchor: getColumnIdentity(id), order: 1 },
      [getColumnIdentity(rank)]: { anchor: getColumnIdentity(id), order: 0 }
    }

    expect(keys(placeAdditionalColumns([id, filename], [score, rank], placements))).toEqual(['id', 'rank', 'score', 'filename'])
  })

  it('keeps the mode order for mode columns without placement', () => {
    const placements = { [getColumnIdentity(rank)]: { anchor: null } }

    expect(keys(placeAdditionalColumns([id], [score, rank], placements))).toEqual(['rank', 'id', 'score'])
  })

  it('anchors to a localized column by key and locale', () => {
    const nameEn = selected('name', 'en')
    const nameDe = selected('name', 'de')
    const placements = { [getColumnIdentity(score)]: { anchor: getColumnIdentity(nameEn) } }

    expect(placeAdditionalColumns([nameEn, nameDe], [score], placements)).toEqual([nameEn, score, nameDe])
  })

  it('anchors to an advanced column by its unique id, not its title', () => {
    const advanced = (uniqueId: string, title: string): SelectedColumn => ({
      ...selected(title),
      type: 'dataobject.advanced',
      originalApiDefinition: { key: 'advanced', __meta: { uniqueId, advancedColumnConfig: { title } } }
    })
    const first = advanced('a-1', 'Same')
    const second = advanced('a-2', 'Same')
    const placements = { [getColumnIdentity(score)]: { anchor: getColumnIdentity(second) } }

    expect(placeAdditionalColumns([first, second, id], [score], placements)).toEqual([first, second, score, id])
  })

  it('applies a stored width without touching the user columns', () => {
    const columns = [id]
    const placed = placeAdditionalColumns(columns, [score], { [getColumnIdentity(score)]: { width: 222 } })

    expect(placed[0]).toBe(id)
    expect(placed[1]).toEqual({ ...score, width: 222 })
  })

  it('ignores placements of a column the user selected explicitly', () => {
    const columns = [selected('score'), id]

    expect(placeAdditionalColumns(columns, [score], { [getColumnIdentity(score)]: { anchor: getColumnIdentity(id) } })).toBe(columns)
  })
})

describe('splitSearchModeColumns', () => {
  const score = toAdditionalSelectedColumn(scoreColumn)
  const rank = toAdditionalSelectedColumn({ ...scoreColumn, key: 'rank' })
  const isMode = (column: SelectedColumn): boolean => column.key === 'score' || column.key === 'rank'

  it('anchors each mode column to its preceding user column', () => {
    const { selectedColumns, placements } = splitSearchModeColumns([score, selected('id'), rank, selected('filename')], isMode)

    expect(selectedColumns).toEqual([selected('id'), selected('filename')])
    expect(placements).toEqual({
      [getColumnIdentity(score)]: { anchor: null, order: 0 },
      [getColumnIdentity(rank)]: { anchor: getColumnIdentity(selected('id')), order: 0 }
    })
  })

  it('round-trips through placeAdditionalColumns', () => {
    const ordered = [selected('id'), rank, score, selected('filename')]
    const { selectedColumns, placements } = splitSearchModeColumns(ordered, isMode)

    expect(placeAdditionalColumns(selectedColumns, [score, rank], placements)).toEqual(ordered)
  })
})

describe('findRemovedColumns', () => {
  it('returns the previous columns no longer present, matched by key and locale', () => {
    const previous = [selected('id'), selected('score'), selected('name', 'de')]
    const current = [{ ...selected('id'), width: 80 }, selected('name', 'en')]

    expect(findRemovedColumns(previous, current).map((c) => [c.key, c.locale])).toEqual([['score', null], ['name', 'de']])
  })

  it('returns nothing when every column is still present', () => {
    expect(findRemovedColumns([selected('id')], [selected('id'), selected('score')])).toEqual([])
  })
})

describe('mergeAvailableColumns', () => {
  const available = (key: string): GridColumnConfiguration => ({ ...scoreColumn, key, type: 'system.string', frontendType: 'input' })

  it('appends mode columns after the available ones', () => {
    const columns = [available('id'), available('filename')]

    expect(mergeAvailableColumns(columns, [scoreColumn])).toEqual([...columns, scoreColumn])
  })

  it('keeps the available columns array untouched when there is nothing to add', () => {
    const columns = [available('id')]

    expect(mergeAvailableColumns(columns, [])).toBe(columns)
  })

  it('lets an available column win over a mode column with the same key', () => {
    const apiScore = { ...available('score'), type: 'api.score' }
    const columns = [available('id'), apiScore]

    expect(mergeAvailableColumns(columns, [scoreColumn])).toBe(columns)
  })

  it('does not add the same mode column twice', () => {
    expect(mergeAvailableColumns([], [scoreColumn, { ...scoreColumn }])).toEqual([scoreColumn])
  })
})

describe('dropVanishedModeColumnFilters', () => {
  const filter = (key: string): FieldFilter => ({ key, type: `test.${key}`, filterValue: 1, locale: undefined, meta: { translationKey: key } })
  const filters = [filter('score'), filter('id')]

  it('drops a filter on a column only the previous mode provided', () => {
    expect(dropVanishedModeColumnFilters(filters, [scoreColumn], [{ ...scoreColumn, key: 'id' }])).toEqual([filter('id')])
  })

  it('keeps a filter on a column the listing or the new mode still provides', () => {
    expect(dropVanishedModeColumnFilters(filters, [scoreColumn], [scoreColumn])).toBe(filters)
  })

  it('leaves filters on non-mode columns alone even when they are not listed', () => {
    expect(dropVanishedModeColumnFilters(filters, [], [])).toBe(filters)
  })
})
