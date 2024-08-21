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
import React, { useState } from 'react'
import { useEditMode } from '../../../edit-mode/use-edit-mode'
import { useStyle } from './textarea-cell.styles'
import TextArea from 'antd/es/input/TextArea'
import { respectLineBreak } from '@Pimcore/utils/helpers'

export type DefaultCellProps = CellContext<any, any>

export const TextareaCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const { styles } = useStyle()
  const [textAreaValue, setTextAreaValue] = useState(String(props.getValue() ?? ''))

  // useEffect(() => {
  //  if (isInEditMode) {
  //    setTextAreaValue(props.getValue())
  //  }
  // }, [isInEditMode, props])

  function saveValue (): void {
    fireOnUpdateCellDataEvent(textAreaValue)
    disableEditMode()
  }

  function onBlur (): void {
    saveValue()
  }

  function onChange (e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setTextAreaValue(e.target.value)
  }

  function getCellContent (): React.JSX.Element {
    if (!isInEditMode) {
      return (
        <>
          { respectLineBreak(String(props.getValue() ?? ''), false) }
        </>
      )
    }

    return (
      <TextArea
        autoSize={ { minRows: 2 } }
        onBlur={ onBlur }
        onChange={ onChange }
        value={ textAreaValue }
      />
    )
  }

  return (
    <div className={ [styles['textarea-cell'], 'default-cell__content'].join(' ') }>
      { getCellContent() }
    </div>
  )
}
