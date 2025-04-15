/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
