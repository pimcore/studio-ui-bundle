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
import React, { useEffect, useRef, useState } from 'react'
import { TextCell } from './types/text/text-cell'
import { EditableCellContextProvider } from '../edit-mode/editable-cell-context'
import { useStyle } from './default-cell.styles'
import { useInjection } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'
import { type TypeRegistry } from '../services/type-registry'
import { useKeyboardNavigation } from '../keyboard-navigation/use-keyboard-navigation'

export type DefaultCellProps = CellContext<any, any>

export const DefaultCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyle()
  const { column, table, row } = props
  const [isEditable] = useState(column.columnDef.meta?.editable ?? false)
  const cellType = column.columnDef.meta?.type ?? 'text'
  const [isInEditMode, setIsInEditMode] = useState(false)
  const element = useRef<HTMLInputElement>(null)
  const typeRegistry = useInjection<TypeRegistry>(serviceIds['Grid/TypeRegistry'])
  const { handleArrowNavigation } = useKeyboardNavigation(props)

  useEffect(() => {
    if (!isInEditMode) {
      element.current?.focus()
    }
  }, [isInEditMode])

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

  const Component = typeRegistry.getType(cellType) ?? TextCell

  return (
    <div
      className={ styles['default-cell'] }
      data-grid-column={ column.id }
      data-grid-row={ row.id }
      onDoubleClick={ onDoubleClick }
      onKeyDown={ onKeyDown }
      ref={ element }
      role='button'
      tabIndex={ 0 }
    >
      <EditableCellContextProvider value={ { isInEditMode, setIsInEditMode } }>
        <Component { ...props } />
      </EditableCellContextProvider>
    </div>
  )
}
