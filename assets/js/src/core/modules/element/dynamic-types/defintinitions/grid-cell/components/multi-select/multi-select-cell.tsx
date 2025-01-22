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

import React, { useEffect, useRef, useState } from 'react'
import { type RefSelectProps } from 'antd/es/select'
import cn from 'classnames'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { Select } from '@Pimcore/components/select/select'
import { useStyles } from './multi-select-cell.styles'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import {
  type SelectOptionType
} from '@Pimcore/modules/element/dynamic-types/defintinitions/grid-cell/components/select/select-cell'

export interface MultiSelectCellConfig {
  options: string[] | SelectOptionType[]
}
export const MultiSelectCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { column, getValue } = props
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const config = column.columnDef.meta?.config as MultiSelectCellConfig | undefined
  const element = useRef<RefSelectProps>(null)

  useEffect(() => {
    if (isInEditMode) {
      element.current?.focus()
      setOpen(true)
    }
  }, [isInEditMode])

  const value: [] = Array.isArray(getValue()) ? getValue() : []

  if (config === undefined) {
    return <>{ value.join(', ') }</>
  }

  const options: SelectOptionType[] = config.options.map((value: string | object) => (
    typeof value === 'object' ? value : { label: value, value }
  ))

  const displayOptions = value.map((value: string) => {
    const option = options.find((option: SelectOptionType) => option.value === value)
    return option?.displayValue ?? option?.label ?? value
  })
  const displayValue = displayOptions.join(', ')

  if (!isInEditMode) {
    return (
      <div className={ [styles['multi-select-cell'], 'default-cell__content'].join(' ') }>
        { displayValue }
      </div>
    )
  }

  return (
    <div className={ cn(styles['multi-select-cell'], 'default-cell__content') }>
      <Select
        mode="multiple"
        onBlur={ disableEditMode }
        onChange={ onChange }
        open={ open }
        options={ options }
        popupMatchSelectWidth={ false }
        ref={ element }
        value={ value }
      />
    </div>
  )

  function onChange (value: string): void {
    fireOnUpdateCellDataEvent(value)
  }
}
