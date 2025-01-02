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

import React from 'react'
import { TableGrid } from './components/grid/grid'
import { Box } from '@Pimcore/components/box/box'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useTableValue, type TableValue } from './hooks/use-table-value'
import { getCopyData, getPasteData } from './utils/copy-paste'

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
}

export const Table = (props: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const modal = useFormModal()
  const { confirm } = modal

  const columnConfigActivated = props.colsFixed === true ? props.columnConfigActivated ?? false : false

  const {
    value,
    setValue,
    activeCell,
    setActiveCell,
    key,
    emptyValue,
    addRow,
    addColumn,
    deleteRow,
    deleteColumn,
    duplicateRow,
    fixColumnConfig,
    rows,
    cols
  } = useTableValue({
    initialValue: props.value ?? null,
    onChange: props.onChange,
    cols: props.cols,
    rows: props.rows,
    columnConfig: props.columnConfig,
    columnConfigActivated
  })

  return (
    <>
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
      <Box padding="extra-small">
        { props.disabled !== true && (
        <>
            { !columnConfigActivated && (props.colsFixed !== true || cols < (props.cols ?? 0)) && (
            <Tooltip title={ t('table.add-column') }>
              <IconButton
                icon={ { value: 'trash' } }
                onClick={ addColumn }
                type="default"
              />
            </Tooltip>
            ) }
            { !columnConfigActivated && (props.colsFixed !== true || cols > (props.cols ?? 0)) && (
            <Tooltip title={ t('table.delete-column') }>
              <IconButton
                disabled={ activeCell === undefined }
                icon={ { value: 'trash' } }
                onClick={ deleteColumn }
                type="default"
              />
            </Tooltip>
            ) }
            { (props.rowsFixed !== true || rows < (props.rows ?? 0)) && (
            <Tooltip title={ t('table.add-row') }>
              <IconButton
                icon={ { value: 'trash' } }
                onClick={ addRow }
                type="default"
              />
            </Tooltip>
            ) }
            { (props.rowsFixed !== true || rows > (props.rows ?? 0)) && (
            <Tooltip title={ t('table.delete-row') }>
              <IconButton
                disabled={ activeCell === undefined }
                icon={ { value: 'trash' } }
                onClick={ deleteRow }
                type="default"
              />
            </Tooltip>
            ) }
            { (props.rowsFixed !== true || rows < (props.rows ?? 0)) && (
            <Tooltip title={ t('table.duplicate-row') }>
              <IconButton
                disabled={ activeCell === undefined }
                icon={ { value: 'trash' } }
                onClick={ duplicateRow }
                type="default"
              />
            </Tooltip>
            ) }
        </>
        ) }
        <Tooltip title={ t('table.copy') }>
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => modal.textarea({
              title: t('table.copy'),
              initialValue: getCopyData(value),
              okText: t('copy'),
              onOk: (value: string) => {
                void navigator.clipboard.writeText(value)
              }
            })
              }
            type="default"
          />
        </Tooltip>

        { props.disabled !== true && (
        <>
          <Tooltip title={ t('table.paste') }>
            <IconButton
              icon={ { value: 'trash' } }
              onClick={ () => modal.textarea({
                title: t('table.paste'),
                placeholder: t('paste-placeholder'),
                okText: t('save'),
                onOk: (value: string) => {
                  if (value !== '') {
                    console.log('paste data', getPasteData(value), fixColumnConfig(getPasteData(value)))
                    setValue(fixColumnConfig(getPasteData(value)))
                  }
                }
              })
                }
              type="default"
            />
          </Tooltip>

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
        </>
        ) }
      </Box>
    </>
  )
}
