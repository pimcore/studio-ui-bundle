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
import dayjs, { type Dayjs } from 'dayjs'

export const DateCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const datePickerRef = useRef<PickerRef>(null)

  useEffect(() => {
    if (isInEditMode) {
      setOpen(true)
      datePickerRef.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (value: string): void {
    fireOnUpdateCellDataEvent(value)
    disableEditMode()
  }

  function getCellContent (): React.JSX.Element {
    if (!isInEditMode) {
      return (
        <FormattedDate timestamp={ props.getValue() * 1000 } />
      )
    }

    function onBlur (e: React.FocusEvent<HTMLInputElement>): void {
      saveValue(e.target.value)
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
      if (e.key === 'Escape' || e.key === 'Enter') {
        disableEditMode()
      }
    }

    return (
      <DatePicker
        defaultValue={ dayjs.unix(Number(props.getValue())) }
        format="DD/MM/YYYY"
        needConfirm
        onBlur={ onBlur }
        onChange={ (date: Dayjs) => { console.log(date) } }
        onKeyDown={ onKeyDown }
        open={ open }
        ref={ datePickerRef }
      />
    )
  }

  return (
    <div className={ ['default-cell__content'].join(' ') }>
      {getCellContent()}
    </div>
  )
}
