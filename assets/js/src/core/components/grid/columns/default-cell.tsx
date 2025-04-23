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

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { EditableCellContextProvider } from '../edit-mode/editable-cell-context'
import { useStyle } from './default-cell.styles'
// import { useInjection } from '@Pimcore/app/depency-injection'
// import { serviceIds } from '@Pimcore/app/config/services/service-ids'
// import { type TypeRegistry } from '../services/type-registry'
import { useKeyboardNavigation } from '../keyboard-navigation/use-keyboard-navigation'
// import { useMessage } from '@Pimcore/components/message/useMessage'
// import { useTranslation } from 'react-i18next'
import { usePrevious } from '@Pimcore/utils/hooks/use-previous'
import { type ExtendedCellContext } from '../grid'
import { useDynamicTypeResolver } from '@Pimcore/modules/element/dynamic-types/resolver/hooks/use-dynamic-type-resolver'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

export interface DefaultCellProps extends ExtendedCellContext {}

export const DefaultCell = ({ ...props }: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { column, table, row } = props
  const [isEditable, setIsEditable] = useState(column.columnDef.meta?.editable ?? false)
  const cellType = useMemo(() => column.columnDef.meta?.type ?? 'text', [column.columnDef.meta?.type])
  const [isInEditMode, setIsInEditMode] = useState(false)
  const element = useRef<HTMLInputElement>(null)
  const [columnWrapperWidth, setColumnWrapperWidth] = useState<number | undefined>(undefined)
  // @todo move to new dynamic type system
  // const typeRegistry = useInjection<TypeRegistry>(serviceIds['Grid/TypeRegistry'])
  const { handleArrowNavigation } = useKeyboardNavigation(props)
  // const messageAPi = useMessage()
  // const { t } = useTranslation()
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
  const { getComponentRenderer } = useDynamicTypeResolver()

  let { ComponentRenderer } = getComponentRenderer({ dynamicTypeIds: [cellType], target: 'GRID_CELL' })

  if (ComponentRenderer === null) {
    ComponentRenderer = getComponentRenderer({ dynamicTypeIds: ['input'], target: 'GRID_CELL' }).ComponentRenderer
  }

  return useMemo(() => {
    const isInAutoWidthColumnEditMode = isInEditMode && column.columnDef.meta?.editable === true && column.columnDef.meta?.autoWidth === true
    return (
      <div
        className={ [styles['default-cell'], ...getCssClasses()].join(' ') }
        data-grid-column={ column.getIndex() }
        data-grid-row={ row.index }
        // @todo move to new dynamic type system
        // onCopy={ onCopy }
        key={ isInAutoWidthColumnEditMode ? 'auto-width-column-editmode' : 'default' }
        onDoubleClick={ onDoubleClick }
        onFocus={ () => props.onFocus?.({
          rowIndex: row.index,
          columnIndex: column.getIndex(),
          columnId: column.id
        }) }
        onKeyDown={ onKeyDown }
        // @todo move to new dynamic type system
        // onPaste={ onPaste }
        ref={ element }
        role='button'
        style={ { width: isInAutoWidthColumnEditMode ? columnWrapperWidth : undefined } }
        tabIndex={ 0 }
      >
        <EditableCellContextProvider value={ editableCellContextValue }>
          { ComponentRenderer !== null ? ComponentRenderer(props) : <>Cell type not supported</> }
        </EditableCellContextProvider>
      </div>
    )
  }, [isInEditMode, props.getValue(), row, row.getIsSelected(), isEditable, props.active, props.modified])

  function getCssClasses (): string[] {
    const classes: string[] = []

    if (props.active === true) {
      classes.push('default-cell--active')
    }

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

    if (!isInEditMode) {
      if (element.current !== null) {
        setColumnWrapperWidth(element.current.offsetWidth)
      }
    }

    if (isEditable && table.options.meta?.onUpdateCellData === undefined) {
      trackError(new GeneralError('onUpdateCellData is required when using editable cells'))
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

  // @todo move to new dynamic type system
  /*
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
  } */
}
