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

import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import React, { useEffect, useRef, useState } from 'react'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { type RefSelectProps, Select } from 'antd'

export const SelectCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const selectRef = useRef<RefSelectProps>(null)

  useEffect(() => {
    if (isInEditMode) {
      setOpen(true)
      selectRef.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (value: string): void {
    fireOnUpdateCellDataEvent(value)
    disableEditMode()
  }

  function getCellContent (): React.JSX.Element {
    if (!isInEditMode) {
      return (
        <>
          { props.getValue() }
        </>
      )
    }

    function onBlur (e: React.FocusEvent<HTMLInputElement>): void {
      saveValue(e.target.value)
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
      if (e.key === 'Escape') {
        disableEditMode()
      }
    }

    const selectOptions = props.row.original.config ?? ''
    const formattedSelectOptions = selectOptions.split(',').map((value: string) => {
      return { value, label: value }
    })

    return (
      <Select
        defaultValue={ props.getValue() }
        onBlur={ onBlur }
        onChange={ saveValue }
        onKeyDown={ onKeyDown }
        open={ open }
        options={ formattedSelectOptions }
        ref={ selectRef }
      />
    )
  }

  return (
    <div>
      {getCellContent()}
    </div>
  )
}
