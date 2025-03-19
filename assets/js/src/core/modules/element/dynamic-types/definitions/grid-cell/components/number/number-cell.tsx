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
import { InputNumber } from 'antd'
import { useStyle } from './number-cell.styles'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import cn from 'classnames'
import type { InputNumberRef } from 'rc-input-number'

export interface NumberCellProps extends DefaultCellProps {}

export const NumberCell = (props: NumberCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [value, setValue] = useState<number | null>(props.getValue() as number)
  const { styles } = useStyle()
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
    if (!isInEditMode) {
      return (
        <>
          { props.getValue() }
        </>
      )
    }

    return (
      <InputNumber
        className="w-full"
        defaultValue={ props.getValue() }
        onBlur={ onBlur }
        onChange={ setValue }
        onKeyDown={ onKeyDown }
        ref={ element }
        value={ value }
      />
    )
  }

  return (
    <div className={ cn(styles['number-cell'], 'default-cell__content') }>
      { getCellContent() }
    </div>
  )
}
