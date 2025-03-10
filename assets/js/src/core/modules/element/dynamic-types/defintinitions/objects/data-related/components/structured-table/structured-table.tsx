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

import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import {
  StructuredTableGrid
} from '@Pimcore/modules/element/dynamic-types/defintinitions/objects/data-related/components/structured-table/components/grid/grid'
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
  const [value, setValue] = useState<StructuredTableValue | null>(props.value ?? null)
  const [key, setKey] = useState<number>(0)
  const { t } = useTranslation()
  const { confirm } = useFormModal()

  const onChange = (value: StructuredTableValue | null): void => {
    setValue(value)
  }

  useEffect(() => {
    if (props.onChange !== undefined) {
      props.onChange(value)
    }
  }, [value])

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

  const emptyValue = (): void => {
    if (value !== null) {
      const newValue = value
      for (const rowKey in value) {
        for (const colKey in value[rowKey]) {
          newValue[rowKey][colKey] = castColumnValue(null, colKey)
        }
      }
      setValue(newValue)
      setKey(key + 1) // force re-render
    }
  }

  return (
    <>
      <Content
        className={ cn(props.className) }
        style={ {
          width: toCssDimension(props.width),
          height: toCssDimension(props.height)
        } }
      >
        <StructuredTableGrid
          castColumnValue={ castColumnValue }
          cols={ props.cols }
          disabled={ props.disabled }
          key={ key }
          labelFirstCell={ props.labelFirstCell }
          labelWidth={ props.labelWidth }
          onChange={ onChange }
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
                onOk: emptyValue
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
