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

import React, { useRef } from 'react'
import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Checkbox, type CheckboxRef } from 'antd'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { useStyle } from './checkbox-cell.styles'

export interface CheckboxCellConfig {
  align: 'left' | 'center' | 'right'
}

export const CheckboxCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { fireOnUpdateCellDataEvent } = useEditMode(props)
  const checkboxRef = useRef<CheckboxRef>(null)
  const { column } = props

  function saveValue (): void {
    fireOnUpdateCellDataEvent(checkboxRef.current!.input?.checked ?? false)
  }

  let config = column.columnDef.meta?.config as CheckboxCellConfig | undefined
  if (config === undefined) {
    config = { align: 'left' }
  }

  function getCellContent (): React.JSX.Element {
    return (
      <Checkbox
        checked={ props.getValue() }
        disabled={ props.column.columnDef.meta?.editable === false }
        onChange={ saveValue }
        ref={ checkboxRef }
      />
    )
  }

  return (
    <div className={ [styles['checkbox-cell'], styles['align-' + config.align] ?? '', 'default-cell__content'].join(' ') }>
      {getCellContent()}
    </div>
  )
}
