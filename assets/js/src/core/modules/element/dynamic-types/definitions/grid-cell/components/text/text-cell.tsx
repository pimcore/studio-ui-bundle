/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef } from 'react'
import { useStyle } from './text-cell.styles'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { IconButton, Input } from '@sdk/components'
import { type InputRef } from 'antd'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { isHtmlContent } from '@Pimcore/utils/html-detection'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'

export interface TextCellProps extends DefaultCellProps {}

export const TextCell = (props: TextCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const { styles } = useStyle()
  const element = useRef<InputRef>(null)
  const callback = Boolean(props.column.columnDef.meta?.callback ?? false)
  const editCallback = props.column.columnDef.meta?.editCallback
  const htmlDetection = Boolean((props.column.columnDef.meta as any)?.htmlDetection ?? false)

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
    const cellValue = props.getValue()
    const cellValueString = typeof cellValue === 'string' ? cellValue : String(cellValue ?? '')
    const shouldRenderHtml = htmlDetection && isHtmlContent(cellValueString)

    if (!isInEditMode) {
      if (shouldRenderHtml) {
        return (
          <SanitizeHtml html={ cellValueString } />
        )
      }

      return (
        <>
          { cellValue }
        </>
      )
    }

    const openEditMode = async (): Promise<void> => {
      if (editCallback !== undefined && typeof editCallback === 'function') {
        try {
          const newValue = await editCallback(props.row.original, props.column.id)
          fireOnUpdateCellDataEvent(newValue)
        } catch {
          trackError(new GeneralError('Edit callback failed'))
        }
      } else {
        console.log('No edit callback available')
      }
    }

    return (
      <Input
        defaultValue={ props.getValue() }
        onBlur={ onBlur }
        onKeyDown={ onKeyDown }
        ref={ element }
        suffix={ callback
          ? (
            <IconButton
              icon={ { value: 'edit' } }
              onClick={ async () => { await openEditMode() } }
              onMouseDown={ (e) => { e.preventDefault() } }
            />
            )
          : null }
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
