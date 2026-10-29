/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useRef } from 'react'
import type { DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Radio, type RadioRef } from 'antd'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { useStyle } from './radio-cell.styles'
import cn from 'classnames'

export interface RadioCellConfig {
  align: 'left' | 'center' | 'right'
}

export const RadioCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { fireOnUpdateCellDataEvent } = useEditMode(props)
  const radioRef = useRef<RadioRef>(null)
  const { column } = props

  function saveValue (): void {
    fireOnUpdateCellDataEvent(radioRef.current!.input?.checked ?? false)
  }

  let config = column.columnDef.meta?.config as RadioCellConfig | undefined
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (config === undefined) {
    config = { align: 'left' }
  }

  function getCellContent (): React.JSX.Element {
    return (
      <Radio
        checked={ props.getValue() }
        disabled={ props.column.columnDef.meta?.editable === false }
        onChange={ saveValue }
        ref={ radioRef }
      />
    )
  }

  const alignClass = config.align !== 'left' ? styles[`align-${config.align}`] : undefined

  return (
    <div className={ cn('default-cell__content', 'default-cell__content--padded', alignClass) }>
      {getCellContent()}
    </div>
  )
}
