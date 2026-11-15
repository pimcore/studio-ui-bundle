/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { useAvailableColumns } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/use-available-columns'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { mergeAvailableColumns } from './search-mode-columns'
import { useSearchModeColumns } from './use-search-mode-additional-columns'

export interface FilterableColumnSources {
  /** The listing's own columns. */
  availableColumns: AvailableColumn[]
  /** Columns of the given store's search mode. */
  modeColumns: GridColumnConfiguration[]
}

/** The two sources useFilterableColumns merges, for callers that need to tell them apart. */
export const useFilterableColumnSources = (source: 'draft' | 'applied'): FilterableColumnSources => {
  const { availableColumns } = useAvailableColumns()
  const { selectedColumns, decodeColumnIdentifier } = useSelectedColumns()

  // like SelectedColumnsProvider: sorts on mode columns are not explicit sorts
  const decodeSelectedColumnIdentifier = (columnIdentifier: string): SelectedColumn | undefined => {
    const column = decodeColumnIdentifier(columnIdentifier)
    return column !== undefined && selectedColumns.includes(column) ? column : undefined
  }

  const modeColumns = useSearchModeColumns(source, decodeSelectedColumnIdentifier)

  return { availableColumns, modeColumns }
}

/**
 * Available columns plus the columns of the given store's search mode, for field filters only (not the
 * column picker). The sidebar editor reads 'draft' so a mode picked there can be filtered on before
 * Apply; the query reads 'applied' so a mode column filter is only sent with its mode.
 */
export const useFilterableColumns = (source: 'draft' | 'applied'): AvailableColumn[] => {
  const { availableColumns, modeColumns } = useFilterableColumnSources(source)

  return useMemo(() => mergeAvailableColumns(availableColumns, modeColumns), [availableColumns, modeColumns])
}
