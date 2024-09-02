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

import React, { useEffect, useRef } from 'react'
import { type DefaultCellProps } from '../../default-cell'
import { Select } from 'antd'
import { type RefSelectProps, type DefaultOptionType } from 'antd/es/select'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { useStyles } from './select-cell.styles'

interface SelectCellConfig {
  options: string[]
}

export const SelectCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { column, getValue } = props
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const config = column.columnDef.meta?.config as SelectCellConfig | undefined
  const element = useRef<RefSelectProps>(null)

  useEffect(() => {
    if (isInEditMode) {
      element.current?.focus()
    }
  }, [isInEditMode])

  if (config === undefined) {
    return getValue()
  }

  if (!isInEditMode) {
    return (
      <div className={ [styles['select-cell'], 'default-cell__content'].join(' ') }>
        { getValue() }
      </div>
    )
  }
  const options: DefaultOptionType[] = config.options.map((value: string | object) => (
    typeof value === 'object' ? value : { label: value, value }
  ))

  return (
    <div className={ [styles['select-cell'], 'default-cell__content'].join(' ') }>
      <Select
        onBlur={ disableEditMode }
        onChange={ onChange }
        options={ options }
        ref={ element }
        value={ getValue() }
      />
    </div>
  )

  function onChange (value: string): void {
    fireOnUpdateCellDataEvent(value)
    disableEditMode()
  }
}
