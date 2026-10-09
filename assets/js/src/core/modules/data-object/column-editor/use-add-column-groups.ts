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
import { useTranslation } from 'react-i18next'
import { type ColumnPickerGroup } from '@Pimcore/components/column-picker/column-picker.types'
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import {
  buildColumnPickerGroups
} from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import { ADVANCED_COLUMN_KEY, ADVANCED_COLUMN_TYPE } from './types'

type PickerGroups = Array<ColumnPickerGroup<GridColumnConfiguration>>

/**
 * Builds grouped, selectable column groups for the studio ColumnPicker from a
 * flat list of GridColumnConfiguration entries. Each leaf carries its column in
 * `meta`, so the picker's `onSelect` can hand it back to the add-column handler.
 * Grouping, translation and key generation are delegated to the shared
 * `buildColumnPickerGroups`, so this picker cannot drift from the grid configuration's.
 */
export const useAddColumnGroups = (availableColumns: GridColumnConfiguration[]): PickerGroups => {
  const { t } = useTranslation()

  return useMemo((): PickerGroups => {
    // The advanced column is offered through its own dedicated button, not the tree.
    const treeColumns = availableColumns.filter(
      (column) => column.key !== ADVANCED_COLUMN_KEY && column.type !== ADVANCED_COLUMN_TYPE
    )

    return buildColumnPickerGroups(treeColumns, t)
  }, [availableColumns, t])
}
