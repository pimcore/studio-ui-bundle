/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
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
import { isBoolean, isFunction, isUndefined } from 'lodash'
import { addColumnMeta } from './helpers'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { GridContext } from '../grid-context'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'

export interface DefaultCellProps extends ExtendedCellContext {}

export const DefaultCell = ({ ...originalProps }: DefaultCellProps): React.JSX.Element => {
  const { size } = useContext(GridContext)
  const { styles } = useStyle({ size })

  // Evaluate meta properties (edit, type and config) if they are functions
  const props = useMemo(() => {
    const { column, row } = originalProps
    const meta = column.columnDef.meta
    const metaUpdates: Record<string, any> = {}

    if (isFunction(meta?.editable)) {
      metaUpdates.editable = meta.editable(row.original) ?? false
    }

    if (isFunction(meta?.type)) {
      metaUpdates.type = meta.type(row.original) ?? 'text'
    }

    if (isFunction(meta?.config)) {
      metaUpdates.config = meta.config(row.original)
    }

    if (isFunction(meta?.tooltip)) {
      metaUpdates.tooltip = meta.tooltip(row.original)
    }

    return Object.keys(metaUpdates).length > 0 ? addColumnMeta(originalProps, metaUpdates) : originalProps
  }, [originalProps])

  const { column, table, row } = props
  const [isEditable, setIsEditable] = useState(isBoolean(column.columnDef.meta?.editable) ? column.columnDef.meta?.editable : false)
  const cellType = useMemo(() => isNonEmptyString(column.columnDef.meta?.type) ? column.columnDef.meta?.type : 'text', [column.columnDef.meta?.type])
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
    setIsEditable(isBoolean(column.columnDef.meta?.editable) ? column.columnDef.meta?.editable : false)
  }, [column])

  useEffect(() => {
    if (oldInEditMode !== undefined && oldInEditMode !== isInEditMode && !isInEditMode) {
      element.current?.focus()
    }
  }, [isInEditMode])

  const editableCellContextValue = useMemo(() => ({ isInEditMode, setIsInEditMode }), [isInEditMode])
  const { getComponentRenderer } = useDynamicTypeResolver()

  let { ComponentRenderer } = getComponentRenderer({ dynamicTypeIds: [cellType], target: 'GRID_CELL' })

  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (ComponentRenderer === null) {
    ComponentRenderer = getComponentRenderer({ dynamicTypeIds: ['input'], target: 'GRID_CELL' }).ComponentRenderer
  }

  return useMemo(() => {
    const isInAutoWidthColumnEditMode = isInEditMode && column.columnDef.meta?.editable === true && column.columnDef.meta?.autoWidth === true
    const tooltip = isNonEmptyString(column.columnDef.meta?.tooltip) ? column.columnDef.meta?.tooltip : undefined

    const cellContent = (
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

    if (!isUndefined(tooltip)) {
      return (
        <Tooltip title={ tooltip }>
          { cellContent }
        </Tooltip>
      )
    }

    return cellContent
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
