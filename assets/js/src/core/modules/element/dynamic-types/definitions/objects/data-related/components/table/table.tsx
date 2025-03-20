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

import React, { type ReactElement, useEffect, useMemo } from 'react'
import { isEmpty, isNil } from 'lodash'
import cn from 'classnames'
import { TableGrid } from './components/grid/grid'
import { Box } from '@Pimcore/components/box/box'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useTableValue, type TableValue } from './hooks/use-table-value'
import { getCopyData, getPasteData } from './utils/copy-paste'
import { ButtonGroup } from '@Pimcore/components/button-group/button-group'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Content } from '@Pimcore/components/content/content'
import { toCssDimension } from '@Pimcore/utils/css'

export interface TableProps {
  rows: number | null
  cols: number | null
  value?: TableValue | null
  onChange?: (value: TableValue | null) => void
  disabled?: boolean
  colsFixed?: boolean
  rowsFixed?: boolean
  columnConfigActivated?: boolean
  columnConfig?: Array<{ key: string, label: string }>
  width?: number | string | null
  height?: number | string | null
  data?: string | null // default data from class definition
  className?: string
}

const parseFieldDefinitionData = (data?: string | null): TableValue | null => {
  if (isNil(data) || data === '') {
    return null
  }

  const dataRows = data.split('\n')
  const dataGrid: TableValue = dataRows.map(row => row.split('|'))

  return dataGrid
}

export const Table = (props: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { confirm } = modal

  const columnConfigActivated = props.colsFixed === true ? props.columnConfigActivated ?? false : false

  const fieldDefinitionData = useMemo(() => parseFieldDefinitionData(props.data), [props.data])

  const getInitialValue = (): TableValue | null => {
    if (isNil(props.value) || isEmpty(props.value)) {
      return fieldDefinitionData
    }
    return props.value
  }

  const {
    value,
    setValue,
    activeCell,
    setActiveCell,
    key,
    emptyValue,
    newRow,
    newColumn,
    deleteRow,
    deleteColumn,
    duplicateRow,
    fixColumnConfig,
    rows,
    cols
  } = useTableValue({
    initialValue: getInitialValue(),
    onChange: props.onChange,
    cols: props.cols,
    rows: props.rows,
    columnConfig: props.columnConfig,
    columnConfigActivated,
    emptyValue: fieldDefinitionData
  })

  useEffect(() => {
    if (activeCell !== undefined && (value?.[activeCell.rowIndex] === undefined || (value[activeCell.rowIndex][activeCell.columnIndex] === undefined && value[activeCell.rowIndex][activeCell.columnId] === undefined))) {
      setActiveCell(undefined)
    }
  }, [value])

  const items: ReactElement[] = []

  if (props.disabled !== true) {
    if (props.rowsFixed !== true || rows < (props.rows ?? 0)) {
      items.push(
        <IconTextButton
          icon={ { value: 'new-row' } }
          onClick={ newRow }
          type="default"
        >
          {t('table.new-row')}
        </IconTextButton>
      )
    }

    if (!columnConfigActivated && (props.colsFixed !== true || cols < (props.cols ?? 0))) {
      items.push(
        <IconTextButton
          icon={ { value: 'new-column' } }
          onClick={ newColumn }
          type="default"
        >
          {t('table.new-column')}
        </IconTextButton>
      )
    }

    if (props.rowsFixed !== true || rows > (props.rows ?? 0)) {
      items.push(
        <IconTextButton
          disabled={ activeCell === undefined }
          icon={ { value: 'delete-row' } }
          onClick={ deleteRow }
          type="default"
        >
          {t('table.delete-row')}
        </IconTextButton>
      )
    }

    if (!columnConfigActivated && (props.colsFixed !== true || cols > (props.cols ?? 0))) {
      items.push(
        <IconTextButton
          disabled={ activeCell === undefined }
          icon={ { value: 'delete-column' } }
          onClick={ deleteColumn }
          type="default"
        >
          {t('table.delete-column')}
        </IconTextButton>
      )
    }

    if (props.rowsFixed !== true || rows < (props.rows ?? 0)) {
      items.push(
        <IconTextButton
          disabled={ activeCell === undefined }
          icon={ { value: 'content-duplicate' } }
          onClick={ duplicateRow }
          type="default"
        >
          {t('table.duplicate-row')}
        </IconTextButton>
      )
    }
  }
  items.push(
    <Tooltip title={ t('table.copy') }>
      <IconButton
        icon={ { value: 'copy' } }
        onClick={ () => modal.textarea({
          title: t('table.copy'),
          initialValue: getCopyData(value),
          okText: t('table.copy'),
          onOk: (value: string) => {
            void navigator.clipboard.writeText(value)
          }
        })
            }
        type="default"
      />
    </Tooltip>
  )

  if (props.disabled !== true) {
    items.push(
      <Tooltip title={ t('table.paste') }>
        <IconButton
          icon={ { value: 'paste' } }
          onClick={ () => modal.textarea({
            title: t('table.paste'),
            placeholder: t('paste-placeholder'),
            okText: t('save'),
            onOk: (value: string) => {
              if (value !== '') {
                setValue(fixColumnConfig(getPasteData(value)))
              }
            }
          })
                }
          type="default"
        />
      </Tooltip>
    )
    items.push(
      <Tooltip title={ t('empty') }>
        <IconButton
          icon={ { value: 'trash' } }
          onClick={ () => {
            confirm({
              title: t('empty'),
              content: t('table.empty.confirm'),
              onOk: emptyValue
            })
          } }
          type="default"
        />
      </Tooltip>
    )
  }

  return (
    <div className={ cn(props.className) }>
      <Content
        style={ {
          width: toCssDimension(props.width === 320 ? undefined : props.width), // the default table width does not make sense in studio, 100% width is better
          height: toCssDimension(props.height)
        } }
      >
        <TableGrid
          cols={ cols }
          columnConfig={ props.columnConfig }
          columnConfigActivated={ columnConfigActivated }
          disabled={ props.disabled }
          key={ key }
          onActiveCellChange={ setActiveCell }
          onChange={ setValue }
          rows={ rows }
          value={ value }
        />
      </Content>
      <Box padding="extra-small">
        <ButtonGroup items={ items } />
      </Box>
    </div>
  )
}
