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

import React, { type KeyboardEvent } from 'react'
import { useStyles } from './resizer.styles'
import { type Header, type Table } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

export interface ResizerProps {
  isResizing: boolean
  table: Table<any>
  header?: Header<any, any>
}

const Resizer = (props: ResizerProps): React.JSX.Element => {
  const { styles } = useStyles()
  const classes = ['grid__resizer']
  const isHeaderResizer = props.header !== undefined
  const { t } = useTranslation()

  classes.push(styles.resizer)

  if (isHeaderResizer) {
    classes.push('grid__resizer--hoverable')
  }

  if (props.isResizing) {
    classes.push('grid__resizer--resizing')
  }

  function onFocus (): void {
    const { header, table } = props

    if (!isHeaderResizer) {
      return
    }

    table.setColumnSizingInfo((oldInfo) => {
      return {
        ...oldInfo,
        isResizingColumn: header!.column.id
      }
    })
  }

  function onBlur (): void {
    const { table } = props

    table.setColumnSizingInfo((oldInfo) => {
      return {
        ...oldInfo,
        isResizingColumn: false
      }
    })
  }

  function onKeyDown (event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      onArrowLeft(event)
    } else if (event.key === 'ArrowRight') {
      onArrowRight(event)
    }
  }

  function onArrowLeft (event: KeyboardEvent): void {
    event.preventDefault()

    const { header, table } = props

    table.setColumnSizing(oldSizing => {
      const newSizing = {}
      newSizing[header!.column.id] = header!.column.getSize() - 5

      return {
        ...oldSizing,
        ...newSizing
      }
    })
  }

  function onArrowRight (event: KeyboardEvent): void {
    event.preventDefault()

    const { header, table } = props

    table.setColumnSizing(oldSizing => {
      const newSizing = {}
      newSizing[header!.column.id] = header!.column.getSize() + 5

      return {
        ...oldSizing,
        ...newSizing
      }
    })
  }

  function getHeaderColumnProps (): Record<string, any> {
    const { header } = props

    if (!isHeaderResizer) {
      return {}
    }

    return {
      role: 'button',
      tabIndex: 0,
      'aria-label': t('grid.aria.column-resize'),
      onMouseDown: header?.getResizeHandler(),
      onFocus,
      onBlur,
      onKeyDown
    }
  }

  const columnResizeMultiplier = (props.table.options.columnResizeDirection === 'rtl' ? -1 : 1)
  const offsetValue = (props.table.getState().columnSizingInfo.deltaOffset ?? 0)

  return (
    <div
      className={ classes.join(' ') }
      { ...getHeaderColumnProps() }
      style={ {
        transform:
          props.isResizing
            ? `translateX(${columnResizeMultiplier * offsetValue}px)`
            : ''
      } }
    />
  )
}

const CachedResizer = React.memo(Resizer)

export { CachedResizer as Resizer }
