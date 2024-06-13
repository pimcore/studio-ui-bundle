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
import React, { useEffect, useRef } from 'react'
import { Checkbox, type CheckboxRef } from 'antd'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { useStyles } from '@Pimcore/components/grid/columns/types/boolean/boolean-cell.styles'

export const BooleanCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const checkboxRef = useRef<CheckboxRef>(null)

  useEffect(() => {
    if (isInEditMode) {
      checkboxRef.current?.focus()
    }
  }, [isInEditMode])

  function saveValue (): void {
    fireOnUpdateCellDataEvent(checkboxRef.current!.input?.value ?? '')
    // disableEditMode()
  }

  function getCellContent (): React.JSX.Element {
    if (!isInEditMode) {
      return (
        <>
          <Checkbox
            checked={ props.getValue() }
            disabled
          />
        </>
      )
    }

    function onKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
      if (e.key === 'Escape') {
        disableEditMode()
      }
    }

    return (
      <Checkbox
        checked={ props.getValue() }
        onChange={ saveValue }
        onKeyDown={ onKeyDown }
        ref={ checkboxRef }
      />
    )
  }

  return (
    <div className={ styles.booleanCell }>
      {getCellContent()}
    </div>
  )
}
