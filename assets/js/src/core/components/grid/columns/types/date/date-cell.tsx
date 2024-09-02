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
import { type DefaultCellProps } from '../../default-cell'
import { FormattedDate } from '@Pimcore/components/formatted-date/formatted-date'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import type { PickerRef } from 'rc-picker'
import { DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'
import { useStyle } from './date-cell.styles'

export const DateCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<number>(Number(props.getValue()))
  const datePickerRef = useRef<PickerRef>(null)
  const dateFormat = 'YYYY-MM-DD'
  const { styles } = useStyle()

  useEffect(() => {
    if (isInEditMode) {
      setOpen(true)
      datePickerRef.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (value: number): void {
    setValue(value)
    fireOnUpdateCellDataEvent(String(value))
    disableEditMode()
  }

  function getCellContent (): React.JSX.Element {
    if (!isInEditMode) {
      return (
        <FormattedDate timestamp={ value } />
      )
    }

    function onBlur (e: React.FocusEvent<HTMLInputElement>): void {
      // saveValue(e.target.value)
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
      if (e.key === 'Escape' || e.key === 'Enter') {
        disableEditMode()
      }
    }

    return (
      <DatePicker
        defaultValue={ dayjs.unix(value) }
        disabledDate={ (current: Dayjs) => {
          return current < dayjs().subtract(1, 'day')
        } }
        format={ dateFormat }
        needConfirm
        onBlur={ onBlur }
        onChange={ (date: Dayjs) => {
          saveValue(date.unix())
        } }
        onKeyDown={ onKeyDown }
        open={ open }
        ref={ datePickerRef }
      />
    )
  }

  return (
    <div className={ [styles['date-cell'], 'default-cell__content'].join(' ') }>
      {getCellContent()}
    </div>
  )
}
