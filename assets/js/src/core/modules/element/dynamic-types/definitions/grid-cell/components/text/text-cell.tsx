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
import { type InputRef } from 'antd'
import { isString } from 'lodash'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { SanitizeHtml } from '@Pimcore/components/sanitize-html/sanitize-html'
import { Input } from '@Pimcore/components/input/input'
import { toDisplayString } from '@Pimcore/utils/type-utils'

export interface TextCellProps extends DefaultCellProps {}

export const TextCell = (props: TextCellProps): React.JSX.Element => {
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
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
    const cellValue = props.getValue()
    const displayValue = toDisplayString(cellValue)

    if (!isInEditMode) {
      const renderAsHtml = props.column.columnDef.meta?.config?.renderAsHtml === true

      if (renderAsHtml && isString(cellValue)) {
        return <SanitizeHtml html={ cellValue } />
      }

      return (
        <>
          { displayValue }
        </>
      )
    }

    return (
      <Input
        defaultValue={ displayValue }
        onBlur={ onBlur }
        onKeyDown={ onKeyDown }
        ref={ element }
        type="text"
      />
    )
  }

  return (
    <div className="default-cell__content default-cell__content--padded">
      { getCellContent() }
    </div>
  )
}
