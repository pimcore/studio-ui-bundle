/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import cn from 'classnames'
import {
  StructuredTableGrid
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/structured-table/components/grid/grid'
import { Box } from '@Pimcore/components/box/box'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { toCssDimension } from '@Pimcore/utils/css'
import { Content } from '@Pimcore/components/content/content'

export interface StructuredTableProps {
  disabled?: boolean
  rows: StructuredTableRow[]
  cols: StructuredTableCol[]
  labelWidth: number | null
  labelFirstCell: string | null
  value?: StructuredTableValue | null
  onChange?: (value: StructuredTableValue | null) => void
  width?: number | string | null
  height?: number | string | null
  className?: string
}

export interface StructuredTableRow {
  position: number
  key: string
  label: string
}

export interface StructuredTableCol {
  position: number
  key: string
  label: string
  type: StructuredTableColType
  length: number | null
  width: number | null
}

export type StructuredTableColType = 'text' | 'bool' | 'number'
export type StructuredTableValue = Record<string, Record<string, StructuredTableColumnValue>>
export type StructuredTableColumnValue = string | null | number | boolean

export const StructuredTable = (props: StructuredTableProps): React.JSX.Element => {
  const value = props.value ?? null

  const [key, setKey] = useState<number>(0)
  const { t } = useTranslation()
  const { confirm } = useFormModal()

  const handleChange = (value: StructuredTableValue | null): void => {
    props.onChange?.(value)
  }

  const castColumnValue = (value: StructuredTableColumnValue, columnId: string): StructuredTableColumnValue => {
    const column = props.cols.find((col) => col.key === columnId)

    if (column === undefined) {
      return value
    }

    switch (column.type) {
      case 'number':
        return Number(value)
      case 'bool':
        return Boolean(value)
      default:
        return value === null ? '' : String(value)
    }
  }

  const clearValue = (): void => {
    if (value !== null) {
      const newValue = value

      for (const rowKey in value) {
        for (const colKey in value[rowKey]) {
          newValue[rowKey][colKey] = castColumnValue(null, colKey)
        }
      }

      handleChange(newValue)
      setKey(key + 1) // force re-render
    }
  }

  return (
    <>
      <Content
        style={ {
          width: toCssDimension(props.width),
          height: toCssDimension(props.height)
        } }
      >
        <StructuredTableGrid
          castColumnValue={ castColumnValue }
          className={ cn(props.className) }
          cols={ props.cols }
          disabled={ props.disabled }
          key={ key }
          labelFirstCell={ props.labelFirstCell }
          labelWidth={ props.labelWidth }
          onChange={ handleChange }
          rows={ props.rows }
          value={ value }
        />
      </Content>
      { props.disabled !== true && (
      <Box padding="extra-small">
        <Tooltip title={ t('empty') }>
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => {
              confirm({
                title: t('empty'),
                content: t('empty.confirm'),
                onOk: clearValue
              })
            } }
            type="default"
          />
        </Tooltip>
      </Box>
      )}
    </>
  )
}
