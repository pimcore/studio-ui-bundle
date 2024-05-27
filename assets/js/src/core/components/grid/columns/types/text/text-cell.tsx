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

import { type CellContext } from '@tanstack/react-table'
import React, { useEffect, useRef } from 'react'
import { useEditMode } from '../../../edit-mode/use-edit-mode'
import { Input, type InputRef } from 'antd'
import { useStyle } from './text-cell.styles'

export type DefaultCellProps = CellContext<any, any>

export const TextCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const { styles } = useStyle()
  const element = useRef<InputRef>(null)

  useEffect(() => {
    if (isInEditMode) {
      element.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (): void {
    fireOnUpdateCellDataEvent(element.current!.input?.value ?? '')
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
      <Input
        defaultValue={ props.getValue() }
        onBlur={ onBlur }
        onKeyDown={ onKeyDown }
        ref={ element }
        type="text"
      />
    )
  }

  return (
    <div className={ [styles['text-cell'], 'default-cell__content'].join(' ') }>
      { getCellContent() }
    </div>
  )
}
