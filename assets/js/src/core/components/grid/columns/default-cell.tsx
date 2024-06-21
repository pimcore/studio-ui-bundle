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
import { TextCell } from './types/text/text-cell'
import { EditableCellContextProvider } from '../edit-mode/editable-cell-context'
import { useStyle } from './default-cell.styles'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'
import { type TypeRegistry } from '../services/type-registry'
import { useKeyboardNavigation } from '../keyboard-navigation/use-keyboard-navigation'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { useTranslation } from 'react-i18next'
import { usePrevious } from '@Pimcore/utils/hooks/use-previous'
import { type ExtendedCellContext } from '../grid'
import { Tooltip } from 'antd'

export type DefaultCellProps = ExtendedCellContext

export const DefaultCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { column, table, row } = props
  const [isEditable] = useState(column.columnDef.meta?.editable ?? false)
  const cellType = column.columnDef.meta?.type ?? 'text'
  const [isInEditMode, setIsInEditMode] = useState(false)
  const element = useRef<HTMLInputElement>(null)
  const typeRegistry = useInjection<TypeRegistry>(serviceIds['Grid/TypeRegistry'])
  const { handleArrowNavigation } = useKeyboardNavigation(props)
  const messageAPi = useMessage()
  const { t } = useTranslation()
  const oldInEditMode = usePrevious(isInEditMode)
  const [hasLongerFocus, setHasLongerFocus] = useState(false)
  const userDelayTimer = useRef<number | null>(null)

  useEffect(() => {
    if (oldInEditMode !== undefined && oldInEditMode !== isInEditMode && !isInEditMode) {
      element.current?.focus()
    }
  }, [isInEditMode])

  const Component = typeRegistry.getComponentByType(cellType) ?? TextCell

  function getCssClasses (): string[] {
    const classes: string[] = []

    if (props.modified === true) {
      classes.push('default-cell--modified')
    }

    return classes
  }

  function enableEditMode (): void {
    if (!isEditable) {
      return
    }

    if (isEditable && table.options.meta?.onUpdateCellData === undefined) {
      throw new Error('onUpdateCellData is required when using editable cells')
    }

    setIsInEditMode(true)
  }

  function onKeyDown (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter' && !isInEditMode) {
      enableEditMode()
    }

    if (element.current === document.activeElement) {
      handleArrowNavigation(event)
    }
  }

  function onDoubleClick (): void {
    enableEditMode()
  }

  function onCopy (_event): void {
    const event = _event as ClipboardEvent
    const copyHandler = typeRegistry.getCopyHandlerByType(cellType)

    if (copyHandler !== undefined && copyHandler(event, props)) {
      event.preventDefault()

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      messageAPi.success({
        content: t('grid.copy-notice'),
        type: 'success',
        duration: 3
      })
    }
  }

  function onPaste (_event: any): void {
    const event = _event as ClipboardEvent
    event.preventDefault()
    const pasteHandler = typeRegistry.getPasteHandlerByType(cellType)

    if (pasteHandler !== undefined && isEditable) {
      pasteHandler(event, props)
    }
  }

  function runModifiedTimer (): void {
    if (props.modified === true) {
      userDelayTimer.current = window.setTimeout(() => {
        setHasLongerFocus(true)
      }, 300)
    }
  }

  function clearModifiedTimer (): void {
    if (userDelayTimer.current !== null) {
      clearTimeout(userDelayTimer.current)
      setHasLongerFocus(false)
    }
  }

  return (
    <div
      className={ [styles['default-cell'], ...getCssClasses()].join(' ') }
      data-grid-column={ column.id }
      data-grid-row={ row.id }
      onBlur={ clearModifiedTimer }
      onCopy={ onCopy }
      onDoubleClick={ onDoubleClick }
      onFocus={ runModifiedTimer }
      onKeyDown={ onKeyDown }
      onMouseEnter={ runModifiedTimer }
      onMouseLeave={ clearModifiedTimer }
      onPaste={ onPaste }
      ref={ element }
      role='button'
      tabIndex={ 0 }
    >
      <EditableCellContextProvider value={ { isInEditMode, setIsInEditMode } }>
        <Tooltip
          open={ hasLongerFocus }
          placement='top'
          title={ t('unsaved-notice') }
        >
          <Component { ...props } />
        </Tooltip>
      </EditableCellContextProvider>
    </div>
  )
}
