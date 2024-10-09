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

import React, { type ComponentType, useEffect, useMemo, useRef, useState } from 'react'
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

export interface DefaultCellProps extends ExtendedCellContext {
  fallbackType?: ComponentType<DefaultCellProps>
}

export const DefaultCell = ({ fallbackType = TextCell, ...props }: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { column, table, row } = props
  const [isEditable, setIsEditable] = useState(column.columnDef.meta?.editable ?? false)
  const cellType = useMemo(() => column.columnDef.meta?.type ?? 'text', [column.columnDef.meta?.type])
  const [isInEditMode, setIsInEditMode] = useState(false)
  const element = useRef<HTMLInputElement>(null)
  const typeRegistry = useInjection<TypeRegistry>(serviceIds['Grid/TypeRegistry'])
  const { handleArrowNavigation } = useKeyboardNavigation(props)
  const messageAPi = useMessage()
  const { t } = useTranslation()
  const oldInEditMode = usePrevious(isInEditMode)

  useEffect(() => {
    setIsEditable(column.columnDef.meta?.editable ?? false)
  }, [column])

  useEffect(() => {
    if (oldInEditMode !== undefined && oldInEditMode !== isInEditMode && !isInEditMode) {
      element.current?.focus()
    }
  }, [isInEditMode])

  const editableCellContextValue = useMemo(() => ({ isInEditMode, setIsInEditMode }), [isInEditMode])

  const Component = useMemo(() => typeRegistry.getComponentByType(cellType) ?? fallbackType, [cellType])

  function getCssClasses (): string[] {
    const classes: string[] = []

    if (props.modified === true) {
      classes.push('default-cell--modified')
    }

    if (isInEditMode) {
      classes.push('default-cell--edit-mode')
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

  return useMemo(() => {
    return (
      <div
        className={ [styles['default-cell'], ...getCssClasses()].join(' ') }
        data-grid-column={ column.getIndex() }
        data-grid-row={ row.index }
        onCopy={ onCopy }
        onDoubleClick={ onDoubleClick }
        onKeyDown={ onKeyDown }
        onPaste={ onPaste }
        ref={ element }
        role='button'
        tabIndex={ 0 }
      >
        <EditableCellContextProvider value={ editableCellContextValue }>
          <Component { ...props } />
        </EditableCellContextProvider>
      </div>
    )
  }, [isInEditMode, props.getValue(), row, row.getIsSelected(), isEditable])
}
