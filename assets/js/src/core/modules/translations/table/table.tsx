/**
 * This source file is availabexport const Table = ({ translationRows, setTranslationRows }: TableProps): React.JSX.Element => {
  const { t } = useI18n()
  const { updateTranslationByKey } = useTranslation()
  const [modifiedCells, setModifiedCells] = useState <ModifiedCells>([])nder the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState, useMemo } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation as useI18n } from 'react-i18next'
import { type ModifiedCells } from '@sdk/modules/element'
import { ActionsCell } from './actions-cell'
import { TranslationRow } from '../translations-container'
import { useTranslation } from '../hooks/use-translation'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { FlagIcon } from '@Pimcore/components/flag-icon/flag-icon'
import { isUndefined } from 'lodash'
import { GeneralError, trackError } from '@sdk/modules/app'

type Language = {
  language: string
  display: string
}

type TranslationWithActions = TranslationRow & { actions: React.ReactNode }

interface TableProps {
  translationRows: TranslationRow[]
  setTranslationRows: React.Dispatch<React.SetStateAction<TranslationRow[]>>
}

export const Table = ({ translationRows, setTranslationRows }: TableProps): React.JSX.Element => {
  const { t } = useI18n()
  const { updateTranslationByKey } = useTranslation()
  const [modifiedCells, setModifiedCells] = useState <ModifiedCells>([])

  const settings = useSettings()
  
  const availableLanguages = settings.availableAdminLanguages
  const validLanguages: string[] = settings.validLanguages

  const languages: Language[] = validLanguages.map(validLang => {
    const match = availableLanguages.find(lang => lang.language === validLang)
    if (isUndefined(match)) {
      trackError(new GeneralError(`Language "${validLang}" not found in availableLanguages`))
      return { language: validLang, display: validLang } 
    }
    return match
  }).filter(Boolean)
  
  const columnHelper = createColumnHelper<TranslationWithActions>()

  const languageColumns = useMemo(() => {
    return languages.map(lang => 
      columnHelper.accessor(`_${lang.language}` as keyof TranslationWithActions, {
        id: `_${lang.language}`,
        header: () => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FlagIcon value={ lang.language } />
            <span>{lang.display}</span>
          </div>
        ),
        meta: { 
          editable: true,
          type: 'text'
        },
        size: 200
      })
    )
  }, [languages, columnHelper])

  const tableColumns = useMemo(() => [
    columnHelper.accessor('key', {
      header: t('translations.columns.key'),
      meta: { editable: false },
      size: 200
    }),
    columnHelper.accessor('type', {
      header: t('translations.columns.type'),
      meta: { editable: true },
      size: 100
    }),
    ...languageColumns,
    columnHelper.accessor('actions', {
      header: t('translations.columns.actions'),
      size: 80,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setTranslationRows={ setTranslationRows }
        />
      )
    })
  ], [languageColumns, translationRows])

  const onUpdateCellData = async ({
    columnId,
    value,
    rowData
  }: {
    columnId: string
    value: unknown
    rowData: TranslationRow
  }): Promise<void> => {
    const rowId = rowData.rowId
    const updatedRow: TranslationRow = { ...rowData, [columnId]: value }

    setTranslationRows(prev =>
      prev.map(row =>
        row.rowId === rowId ? updatedRow : row
      )
    )

    setModifiedCells([{ columnId, rowIndex: rowId }])

    const { success } = await updateTranslationByKey(columnId, updatedRow)

    if (success) setModifiedCells([])
    else {
      setTranslationRows(prev =>
        prev.map(row =>
          row.rowId === rowId ? rowData : row
        )
      )
    }
  }

  return (
    <div>
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ translationRows }
        enableSorting
        modifiedCells={ modifiedCells }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: TranslationRow) => row.rowId }
      />
    </div>
  )
}
