/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { TimePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { PickerRef } from 'rc-picker'
import { FormattedTime } from '@Pimcore/components/formatted-time/formatted-time'
import { useClickOutside } from '@Pimcore/utils/hooks/use-click-outside'
import { useStyle } from './time-cell.styles'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'

export const TimeCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const timePickerRef = useRef<PickerRef>(null)
  const { styles } = useStyle()

  useClickOutside(timePickerRef, () => {
    disableEditMode()
  }, '.ant-picker-dropdown')

  useEffect(() => {
    if (isInEditMode) {
      setOpen(true)
      timePickerRef.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (value: number): void {
    fireOnUpdateCellDataEvent(value)
    disableEditMode()
  }

  function getCellContent (): React.JSX.Element {
    if (!isInEditMode) {
      return (
        <FormattedTime timestamp={ Number(props.getValue()) } />
      )
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
      if (e.key === 'Escape' || e.key === 'Enter') {
        disableEditMode()
      }
    }

    return (
      <>
        <TimePicker
          format="HH:mm"
          needConfirm
          onChange={ (time: Dayjs) => {
            saveValue(time.unix())
          } }
          onKeyDown={ onKeyDown }
          open={ open }
          ref={ timePickerRef }
          value={ dayjs.unix(Number(props.getValue())) }
        />
      </>
    )
  }

  return (
    <div className={ [styles['time-cell'], 'default-cell__content'].join(' ') }>
      {getCellContent()}
    </div>
  )
}
