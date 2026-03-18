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
import { createColumnHelper, type SortingState } from '@tanstack/react-table'
import { useTranslation as useI18n } from 'react-i18next'
import { type ModifiedCells } from '@sdk/modules/element'
import { ActionsCell } from './actions-cell'
import { LanguageColumnHeader } from './language-column-header'
import { type TranslationRow } from '../helpers/translation-helpers'
import { useTranslation } from '../hooks/use-translation'
import { EditModal } from '../edit-modal/edit-modal'
import { isUndefined } from 'lodash'
import { GeneralError, trackError } from '@sdk/modules/app'
import { useTranslationDomain } from '../hooks/translation-domain-provider'
import { type LanguageConfig } from '../hooks/use-translation-languages'

interface Language {
  language: string
  display: string
  canEdit?: boolean
}

type TranslationWithActions = TranslationRow & { actions: React.ReactNode }

interface TableProps {
  translationRows: TranslationRow[]
  setTranslationRows: React.Dispatch<React.SetStateAction<TranslationRow[]>>
  visibleLocales: string[]
  editableLocales: string[]
  domainLanguages: LanguageConfig[]
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
}

export const Table = ({ translationRows, setTranslationRows, visibleLocales, editableLocales, domainLanguages, sorting, onSortingChange }: TableProps): React.JSX.Element => {
  const { t } = useI18n()
  const { updateTranslationByKey } = useTranslation()
  const { domain } = useTranslationDomain()
  const [modifiedCells, setModifiedCells] = useState<ModifiedCells>([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingTranslation, setEditingTranslation] = useState<TranslationRow | null>(null)
  const [editingLocale, setEditingLocale] = useState<string>('')

  const languages: Language[] = visibleLocales.map(locale => {
    const domainLang = domainLanguages.find(lang => lang.locale === locale)
    if (isUndefined(domainLang)) {
      trackError(new GeneralError(`Language "${locale}" not found in domain languages`))
      return {
        language: locale,
        display: locale.toUpperCase(),
        canEdit: editableLocales.includes(locale)
      }
    }
    return {
      language: domainLang.locale,
      display: domainLang.displayName,
      canEdit: editableLocales.includes(locale)
    }
  }).filter(Boolean)

  const columnHelper = createColumnHelper<TranslationWithActions>()
  const [editResolveFunction, setEditResolveFunction] = useState<((value: string) => void) | null>(null)

  const handleEditCallback = async (rowData: TranslationRow, columnId: string, currentValue?: string): Promise<string> => {
    return await new Promise((resolve) => {
      const updatedRowData = currentValue !== undefined
        ? { ...rowData, [columnId]: currentValue }
        : rowData

      setEditingTranslation(updatedRowData)
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
          editable: lang.canEdit ?? false,
          type: 'textarea',
          callback: true,
          editCallback: handleEditCallback,
          htmlDetection: true
        } as any,
        size: 200
      })
    )
  }, [languages, columnHelper, handleEditCallback])

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
      enableSorting: false,
      cell: (info) => (
        <ActionsCell
          info={ info }
          setTranslationRows={ setTranslationRows }
        />
      )
    })
  ], [languageColumns, translationRows, visibleLocales, editableLocales])

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
    <div data-testid="translations-table">
      <Grid
        autoWidth
        columns={ tableColumns }
        data={ translationRows }
        dataTestId="translations-grid"
        enableSorting
        manualSorting
        modifiedCells={ modifiedCells }
        onSortingChange={ onSortingChange }
        onUpdateCellData={ onUpdateCellData }
        resizable
        setRowId={ (row: TranslationRow) => row.rowId }
        sorting={ sorting }
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
