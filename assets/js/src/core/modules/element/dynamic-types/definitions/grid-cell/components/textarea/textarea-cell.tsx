/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { useStyle } from './textarea-cell.styles'
import { type TextAreaRef } from 'antd/es/input/TextArea'
import { Input } from 'antd'
import { respectLineBreak } from '@Pimcore/utils/helpers'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { IconButton } from '@sdk/components'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { isHtmlContent } from '@Pimcore/utils/html'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { isString } from 'lodash'

export const TextareaCell = (props: DefaultCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const { styles } = useStyle()
  const [textAreaValue, setTextAreaValue] = useState(String(props.getValue() ?? ''))
  const element = React.createRef<TextAreaRef>()
  const callback = Boolean(props.column.columnDef.meta?.callback ?? false)
  const editCallback = props.column.columnDef.meta?.editCallback
  const htmlDetection = Boolean((props.column.columnDef.meta as any)?.htmlDetection ?? false)

  useEffect(() => {
    if (isInEditMode) {
      element.current?.focus()
    }
  }, [isInEditMode])

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

  const openEditMode = async (): Promise<void> => {
    if (editCallback !== undefined && typeof editCallback === 'function') {
      try {
        const currentTextareaValue = textAreaValue
        const newValue = await editCallback(props.row.original, props.column.id, currentTextareaValue)

        setTextAreaValue(newValue)
        fireOnUpdateCellDataEvent(newValue)
      } catch {
        trackError(new GeneralError('Edit callback failed'))
      }
    } else {
      console.log('No edit callback available')
    }
  }

  function getCellContent (): React.JSX.Element {
    const cellValue = props.getValue()
    const cellValueString = isString(cellValue) ? cellValue : String(cellValue ?? '')
    const shouldRenderHtml = htmlDetection && isHtmlContent(cellValueString)

    if (!isInEditMode) {
      if (shouldRenderHtml) {
        return (
          <SanitizeHtml html={ cellValueString } />
        )
      }

      return (
        <>
          { respectLineBreak(String(props.getValue() ?? ''), false) }
        </>
      )
    }

    return (
      <div style={ { position: 'relative', width: '100%' } }>
        <Input.TextArea
          autoSize={ { minRows: 1 } }
          onBlur={ onBlur }
          onChange={ onChange }
          ref={ element }
          value={ textAreaValue }
          style={ callback ? { paddingRight: '36px' } : undefined }
        />
        { callback && (
          <div style={ { position: 'absolute', top: '5px', right: '8px', zIndex: 1 } }>
            <IconButton
              icon={ { value: 'edit' } }
              onClick={ async () => { await openEditMode() } }
              onMouseDown={ (e) => { e.preventDefault() } }
              size="small"
            />
          </div>
        ) }
      </div>
    )
  }

  return (
    <div className={ [styles['textarea-cell'], 'default-cell__content'].join(' ') }>
      { getCellContent() }
    </div>
  )
}
