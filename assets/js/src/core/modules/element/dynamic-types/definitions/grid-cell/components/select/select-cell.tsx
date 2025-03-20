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
import { type RefSelectProps, type DefaultOptionType } from 'antd/es/select'
import cn from 'classnames'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { Select } from '@Pimcore/components/select/select'
import { useStyles } from './select-cell.styles'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'

export interface SelectCellConfig {
  options: string[] | SelectOptionType[]
}

export type SelectOptionType = DefaultOptionType & {
  displayValue?: string
}

export const SelectCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { column, getValue } = props
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const config = column.columnDef.meta?.config as SelectCellConfig | undefined
  const element = useRef<RefSelectProps>(null)

  useEffect(() => {
    if (isInEditMode) {
      element.current?.focus()
      setOpen(true)
    }
  }, [isInEditMode])

  if (config === undefined) {
    return getValue()
  }

  const options: SelectOptionType[] = config.options.map((value: string | object) => (
    typeof value === 'object' ? value : { label: value, value }
  ))

  const displayOption = options.find((option: SelectOptionType) => option.value === getValue())
  const displayValue = displayOption?.displayValue ?? displayOption?.label ?? getValue()

  if (!isInEditMode) {
    return (
      <div className={ [styles['select-cell'], 'default-cell__content'].join(' ') }>
        { displayValue }
      </div>
    )
  }

  return (
    <div className={ cn(styles['select-cell'], 'default-cell__content') }>
      <Select
        onBlur={ disableEditMode }
        onChange={ onChange }
        open={ open }
        options={ options }
        popupMatchSelectWidth={ false }
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
