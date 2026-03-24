/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useRef, useState } from 'react'
import { type RefSelectProps } from 'antd/es/select'
import cn from 'classnames'
import { useEditMode } from '@Pimcore/components/grid/edit-mode/use-edit-mode'
import { Select } from '@Pimcore/components/select/select'
import { Tag } from '@Pimcore/components/tag/tag'
import { useStyles } from './multi-select-cell.styles'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Spin } from '@Pimcore/components/spin/spin'
import { resolveOptions, type SelectOptionType } from '../../utils/select-options'
import { isNil } from 'lodash'
import { META_SUPPORTS_BATCH_APPEND_MODE } from '@Pimcore/modules/data-object/listing/batch-actions/batch-append-mode/batch-append-mode'

export interface MultiSelectCellConfig {
  options?: string[] | SelectOptionType[]
  useOptionsHook?: (fieldName: string) => { isLoading: boolean, options: SelectOptionType[] } | undefined
  fieldName?: string
  [META_SUPPORTS_BATCH_APPEND_MODE]?: boolean
}

export const MultiSelectCell = (props: DefaultCellProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { column, getValue } = props
  const { isInEditMode, disableEditMode, fireOnUpdateCellDataEvent } = useEditMode(props)
  const [open, setOpen] = useState<boolean>(false)
  const config = column.columnDef.meta?.config as MultiSelectCellConfig | undefined
  const element = useRef<RefSelectProps>(null)

  useEffect(() => {
    if (isInEditMode) {
      element.current?.focus()
      setOpen(true)
    }
  }, [isInEditMode])

  const fieldName = config?.fieldName ?? String(props.column.columnDef.meta?.columnKey)
  const optionsResult = !isNil(config) ? resolveOptions(config, fieldName) : { isLoading: false, options: [] }
  if (optionsResult.isLoading) {
    return (
      <div className={ [styles['multi-select-cell'], 'default-cell__content'].join(' ') }>
        <Spin type="classic" />
      </div>
    )
  }
  const options = optionsResult.options

  const value: [] = Array.isArray(getValue()) ? getValue() : []

  if (config === undefined) {
    return <>{value.join(', ')}</>
  }

  const displayOptions = value.map((_value: string) => {
    const option = options.find((option: SelectOptionType) => option.value === _value)
    return { key: _value, display: option?.displayValue ?? option?.label ?? _value }
  })

  if (!isInEditMode) {
    return (
      <div className={ cn('default-cell__content', 'default-cell__content--padded', styles['multi-select-cell'], styles['multi-select-cell--read']) }>
        {displayOptions.map(({ key, display }) => (
          typeof display === 'string'
            ? <Tag key={ key }>{display}</Tag>
            : <React.Fragment key={ key }>{display}</React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className={ cn('default-cell__content', 'default-cell__content--padded', styles['multi-select-cell']) }>
      <Select
        mode="multiple"
        onBlur={ disableEditMode }
        onChange={ onChange }
        open={ open }
        options={ options }
        popupMatchSelectWidth={ false }
        ref={ element }
        value={ value }
      />
    </div>
  )

  function onChange (value: string): void {
    const meta = config?.[META_SUPPORTS_BATCH_APPEND_MODE] === true
      ? {
          [META_SUPPORTS_BATCH_APPEND_MODE]: true
        }
      : undefined
    fireOnUpdateCellDataEvent(value, meta)
  }
}
