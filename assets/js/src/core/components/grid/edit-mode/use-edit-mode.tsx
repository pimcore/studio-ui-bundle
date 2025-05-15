/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import { EditableCellContext } from './editable-cell-context'
import { type DefaultCellProps } from '../columns/default-cell'

export interface EditModeHookReturnType {
  isInEditMode: boolean
  disableEditMode: () => void
  fireOnUpdateCellDataEvent: (value: any, meta?: Record<string, any>) => void
}

export const useEditMode = (props: DefaultCellProps): EditModeHookReturnType => {
  const { isInEditMode, setIsInEditMode } = useContext(EditableCellContext)

  function disableEditMode (): void {
    setIsInEditMode(false)
  }

  function fireOnUpdateCellDataEvent (value: any, meta?: Record<string, any>): void {
    props.table.options.meta?.onUpdateCellData!({
      rowIndex: props.row.index,
      columnId: props.column.id,
      value,
      rowData: props.row.original,
      meta
    })
  }

  return { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent }
}
