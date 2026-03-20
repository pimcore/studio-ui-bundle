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
import { InputNumber } from 'antd'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import type { InputNumberRef } from 'rc-input-number'
import { toDisplayString } from '@Pimcore/utils/type-utils'
import { isNumber } from 'lodash'

export interface NumberCellProps extends DefaultCellProps {}

export const NumberCell = (props: NumberCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [value, setValue] = useState<number | null>(props.getValue() as number)
  const element = useRef<InputNumberRef>(null)

  useEffect(() => {
    if (isInEditMode) {
      element.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (): void {
    fireOnUpdateCellDataEvent(value)
    disableEditMode()
  }

  function onKeyDown (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      saveValue()
    }
  }

  function onBlur (): void {
    saveValue()
  }

  function getCellContent (): React.JSX.Element {
    const cellValue = props.getValue()

    if (!isInEditMode) {
      return (
        <>
          { isNumber(cellValue) ? cellValue : toDisplayString(cellValue) }
        </>
      )
    }

    return (
      <InputNumber
        className="w-full"
        defaultValue={ isNumber(cellValue) ? cellValue : undefined }
        onBlur={ onBlur }
        onChange={ (val) => { setValue(val) } }
        onKeyDown={ onKeyDown }
        ref={ element }
        value={ value }
      />
    )
  }

  return (
    <div className="default-cell__content default-cell__content--padded">
      { getCellContent() }
    </div>
  )
}
