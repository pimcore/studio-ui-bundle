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
import { FormattedDate } from '@Pimcore/components/formatted-date/formatted-date'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import type { PickerRef } from 'rc-picker'
import { DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'
import { useStyle } from './date-cell.styles'
import { FormattedDateTime } from '@Pimcore/components/formatted-date-time/formatted-date-time'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'

export interface DateCellConfig {
  showTime: boolean
}

export const DateCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const datePickerRef = useRef<PickerRef>(null)
  const { styles } = useStyle()
  const { column } = props
  const config: DateCellConfig | undefined = column.columnDef.meta?.config as DateCellConfig | undefined
  const showTime = config?.showTime ?? false
  const dateFormat = showTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'

  useEffect(() => {
    if (isInEditMode) {
      setOpen(true)
      datePickerRef.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (value: number): void {
    fireOnUpdateCellDataEvent(value)
    disableEditMode()
  }

  const value = Number(props.getValue()) !== 0 ? dayjs.unix(Number(props.getValue())) : null

  function getCellContent (): React.JSX.Element {
    if (!isInEditMode) {
      if (value === null || isNaN(Number(props.getValue()))) {
        return <></>
      }
      return (
        showTime ? <FormattedDateTime timestamp={ value.unix() } /> : <FormattedDate timestamp={ value.unix() } />
      )
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
      if (e.key === 'Escape' || e.key === 'Enter') {
        disableEditMode()
      }
    }

    return (
      <DatePicker
        format={ dateFormat }
        needConfirm
        onChange={ (date: Dayjs) => {
          saveValue(date === null ? 0 : date.unix())
        } }
        onKeyDown={ onKeyDown }
        onOk={ disableEditMode }
        open={ open }
        ref={ datePickerRef }
        showTime={ showTime ? { format: 'HH:mm' } : false }
        value={ value }
      />
    )
  }

  return (
    <div className={ [styles['date-cell'], 'default-cell__content'].join(' ') }>
      {getCellContent()}
    </div>
  )
}
