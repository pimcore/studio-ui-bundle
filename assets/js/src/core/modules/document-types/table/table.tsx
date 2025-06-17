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
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useStyles } from './table.styles'
import { allLegacyElementTypes, type ModifiedCells } from '@sdk/modules/element'
import { ActionsCell } from './actions-cell'
import { DocumentTypeRow, useDocumentType } from '../hooks/use-document-type'
import { useDocumentConfig } from '../hooks/use-document-config'


export type DocumentTypeWithActions = DocumentType & { actions: React.ReactNode }

interface TableProps {
  documentTypeRows: DocumentTypeRow[]
  setDocumentTypeRows: React.Dispatch<React.SetStateAction<DocumentTypeRow[]>>
}

export const Table = ({ documentTypeRows, setDocumentTypeRows }: TableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { updateDocumentTypeById } = useDocumentType()
  const { controllers, controllersLoading, templates, templatesLoading, docTypes, docTypesLoading } = useDocumentConfig()

  const [modifiedCells, setModifiedCells] = useState <ModifiedCells>([])

  const controllerNames = controllers.map(item => item.name);
  const templatePaths = templates.map(template => template.path);
  const docTypeNames = docTypes.map(template => template.name);

  const columnHelper = createColumnHelper<DocumentTypeWithActions>()

  const tableColumns = [
    columnHelper.accessor('name', {
      header: t('document-types.columns.name'),
      meta: { editable: true },
      size: 200
    }),
    columnHelper.accessor('group', {
      header: t('document-types.columns.group'),
      meta: { editable: true },
      size: 100
    }),
    columnHelper.accessor('controller', {
      header: t('document-types.columns.controller'),
      meta: { type: 'select', editable: true, config: { options: Object.values(controllerNames) } },
      size: 200
    }),
    columnHelper.accessor('template', {
      header: t('document-types.columns.template'),
      meta: { type: 'select', editable: true, config: { options: Object.values(templatePaths) } },
      size: 150
    }),
    columnHelper.accessor('type', {
      header: t('document-types.columns.type'),
      meta: { type: 'select', editable: true, config: { options: Object.values(docTypeNames) } },
      size: 80
    }),
    columnHelper.accessor('staticGeneratorEnabled', {
      header: t('document-types.columns.static'),
      size: 70,
      meta: { type: 'checkbox', editable: true, config: { align: 'center' } }
    }),
    columnHelper.accessor('priority', {
      header: t('document-types.columns.priority'),
      meta: { editable: true },
      size: 80
    }),
    columnHelper.accessor('creationDate', {
      header: t('document-types.columns.creation-date'),
      meta: { type: 'date', editable: true },
      size: 150
    }),
    columnHelper.accessor('modificationDate', {
      header: t('document-types.columns.modification-date'),
      meta: { type: 'date', editable: true },
      size: 150
    }),
    columnHelper.accessor('actions', {
      header: t('document-types.columns.actions'),
      size: 80,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setDocumentTypeRows={ setDocumentTypeRows }
        />
      )
    })
  ]

  const onUpdateCellData = async ({
    columnId,
    value,
    rowData
  }: {
    columnId: string
    value: unknown
    rowData: DocumentTypeRow
  }): Promise<void> => {
    const rowId = rowData.rowId
    const updatedRow: DocumentTypeRow = { ...rowData, [columnId]: value }

    console.log("rowData", rowData)
    setDocumentTypeRows(prev =>
      prev.map(row =>
        row.rowId === rowId ? updatedRow : row
      )
    )

    setModifiedCells([{ columnId, rowIndex: rowId }])

    const { success } = await updateDocumentTypeById(updatedRow.id, updatedRow)

    if (success) setModifiedCells([])
    else {
      setDocumentTypeRows(prev =>
        prev.map(row =>
          row.rowId === rowId ? rowData : row
        )
      )
    }
  }

  return (
    <div className={ styles.table }>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ documentTypeRows }
        enableSorting
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: DataProperty) => row.rowId }
      />
    </div>
  )
}
