/**
 * This source file is available under the terms of the
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
import { LanguageColumnHeader } from './language-column-header'
import { type TranslationRow } from '../helpers/translation-helpers'
import { useTranslation } from '../hooks/use-translation'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { EditModal } from '../edit-modal/edit-modal'
import { isUndefined } from 'lodash'
import { GeneralError, trackError } from '@sdk/modules/app'
import { useTranslationDomain } from '../hooks/translation-domain-provider'

interface Language {
  language: string
  display: string
}

type TranslationWithActions = TranslationRow & { actions: React.ReactNode }

interface TableProps {
  translationRows: TranslationRow[]
  setTranslationRows: React.Dispatch<React.SetStateAction<TranslationRow[]>>
  visibleLocales: string[]
}

export const Table = ({ translationRows, setTranslationRows, visibleLocales }: TableProps): React.JSX.Element => {
  const { t } = useI18n()
  const { updateTranslationByKey } = useTranslation()
  const { domain } = useTranslationDomain()
  const [modifiedCells, setModifiedCells] = useState<ModifiedCells>([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingTranslation, setEditingTranslation] = useState<TranslationRow | null>(null)
  const [editingLocale, setEditingLocale] = useState<string>('')
  const settings = useSettings()

  const availableLanguages = settings?.availableAdminLanguages ?? []

  const languages: Language[] = visibleLocales.map(validLang => {
    const match = availableLanguages.find(lang => lang.language === validLang)
    if (isUndefined(match)) {
      trackError(new GeneralError(`Language "${validLang}" not found in availableLanguages`))
      return { language: validLang, display: validLang }
    }
    return match
  }).filter(Boolean)

  const columnHelper = createColumnHelper<TranslationWithActions>()
  const [editResolveFunction, setEditResolveFunction] = useState<((value: string) => void) | null>(null)

  const handleEditCallback = async (rowData: TranslationRow, columnId: string): Promise<string> => {
    return await new Promise((resolve) => {
      setEditingTranslation(rowData)
      setEditingLocale(columnId.replace('_', ''))
      setEditResolveFunction(() => resolve)
      setEditModalOpen(true)
    })
  }

  const languageColumns = useMemo(() => {
    return languages.map(lang =>
      columnHelper.accessor(`_${lang.language}` as keyof TranslationWithActions, {
        id: `_${lang.language}`,
        header: () => (
          <LanguageColumnHeader
            display={ lang.display }
            language={ lang.language }
          />
        ),
        meta: {
          editable: true,
          type: 'text',
          callback: true,
          editCallback: handleEditCallback
        } as any,
        size: 200
      })
    )
  }, [languages, columnHelper, visibleLocales, handleEditCallback])

  const typeOptions = [{
    value: 'simple',
    label: t('translations.type-options.simple')
  },
  {
    value: 'custom',
    label: t('translations.type-options.custom')
  }]

  const tableColumns = useMemo(() => [
    columnHelper.accessor('key', {
      header: t('translations.columns.key'),
      meta: { editable: false },
      size: 200
    }),
    columnHelper.accessor('type', {
      header: t('translations.columns.type'),
      meta: { type: 'select', editable: true, config: { options: typeOptions } },
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
  ], [languageColumns, translationRows, visibleLocales])

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

    const { success } = await updateTranslationByKey(columnId, updatedRow, domain)

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

      <EditModal
        locale={ editingLocale }
        onSave={ (newValue: string) => {
          if (editResolveFunction !== null) {
            editResolveFunction(newValue)
            setEditResolveFunction(null)
          }
        } }
        open={ editModalOpen }
        setOpen={ (open: boolean) => {
          setEditModalOpen(open)
          if (!open && editResolveFunction !== null) {
            editResolveFunction(editingTranslation?.[`_${editingLocale}`] ?? '')
            setEditResolveFunction(null)
          }
        } }
        translationRow={ editingTranslation }
      />
    </div>
  )
}
