/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useEffect } from 'react'
import { Modal } from '@Pimcore/components/modal/modal'
import { Input } from 'antd'
import { type ColumnDef } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'

export interface CsvImportModalProps {
  open: boolean
  columns: Array<ColumnDef<any>>
  value: any[]
  onConfirm: (newRows: any[]) => void
  onCancel: () => void
}

const getColumnKeys = (columns: Array<ColumnDef<any>>): string[] => {
  return columns
    .filter(col => 'accessorKey' in col)
    .map(col => ('accessorKey' in col ? (col.accessorKey as string) : ''))
    .filter(key => key !== '')
}

const rowsToCsv = (rows: any[], colKeys: string[]): string => {
  return rows.map(row => colKeys.map(k => row[k] ?? '').join(',')).join('\n')
}

const csvToRows = (csv: string, colKeys: string[]): any[] => {
  return csv.split('\n')
    .filter(line => line.trim() !== '')
    .map(line => {
      const cells = line.split(',')
      return Object.fromEntries(colKeys.map((k, i) => [k, cells[i]?.trim() ?? '']))
    })
}

export const CsvImportModal = (props: CsvImportModalProps): React.JSX.Element => {
  const { open, columns, value, onConfirm, onCancel } = props
  const { t } = useTranslation()
  const [csvText, setCsvText] = useState('')

  const colKeys = getColumnKeys(columns)

  useEffect(() => {
    if (open) {
      setCsvText(rowsToCsv(value, colKeys))
    }
  }, [open])

  const handleOk = (): void => {
    const newRows = csvToRows(csvText, colKeys)
    onConfirm(newRows)
  }

  return (
    <Modal
      cancelText={ t('operational-grid.csv-import.cancel') }
      okText={ t('operational-grid.csv-import.ok') }
      onCancel={ onCancel }
      onOk={ handleOk }
      open={ open }
      title={ t('operational-grid.csv-import.title') }
    >
      <p>{t('operational-grid.csv-import.description')}</p>
      <Input.TextArea
        onChange={ (e) => { setCsvText(e.target.value) } }
        rows={ 10 }
        value={ csvText }
      />
    </Modal>
  )
}
