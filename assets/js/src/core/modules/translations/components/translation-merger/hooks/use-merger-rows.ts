/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo, useState } from 'react'
import type { DeltaItem } from '../../../../app/translations/translations-api-slice.gen'
import { useTranslationUpdateMutation } from '../../../../app/translations/translations-api-slice-enhanced'
import trackError, { GeneralError } from '../../../../app/error-handler'
export type RowState = 'pending' | 'applied' | 'reverted'

export interface MergerRow {
  key: string
  translationKey: string
  locale: string
  currentTranslation: string
  importTranslation: string
  state: RowState
}

interface UseMergerRowsReturn {
  rows: MergerRow[]
  loadingRows: Set<string>
  applyableCount: number
  revertableCount: number
  paginatedRows: MergerRow[]
  currentPage: number
  pageSize: number
  totalRows: number
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void
  applyRow: (row: MergerRow) => Promise<void>
  revertRow: (row: MergerRow) => Promise<void>
  applyAll: () => Promise<void>
  revertAll: () => Promise<void>
  resetRows: () => void
}

function groupRowsByKey (
  targetRows: MergerRow[],
  translationField: 'importTranslation' | 'currentTranslation'
): Array<{ key: string, type: null, translationData: Array<{ locale: string, translation: string }> }> {
  const grouped = new Map<string, Array<{ locale: string, translation: string }>>()

  for (const row of targetRows) {
    const existing = grouped.get(row.translationKey) ?? []
    existing.push({ locale: row.locale, translation: row[translationField] })
    grouped.set(row.translationKey, existing)
  }

  return Array.from(grouped.entries()).map(([key, translationData]) => ({
    key,
    type: null,
    translationData
  }))
}

export const useMergerRows = (domain: string, deltaItems: DeltaItem[]): UseMergerRowsReturn => {
  const [updateTranslations] = useTranslationUpdateMutation()
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

  const initialRows: MergerRow[] = useMemo(() => deltaItems.flatMap(item =>
    item.deltaValues.map(delta => ({
      key: `${item.key}::${delta.locale}`,
      translationKey: item.key,
      locale: delta.locale,
      currentTranslation: delta.currentTranslation,
      importTranslation: delta.importTranslation,
      state: 'pending'
    }))
  ), [deltaItems])

  const [rows, setRows] = useState<MergerRow[]>(initialRows)

  const addLoading = (key: string): void => {
    setLoadingRows(prev => new Set([...prev, key]))
  }

  const removeLoading = (key: string): void => {
    setLoadingRows(prev => {
      const next = new Set(prev)
      next.delete(key)
      return next
    })
  }

  const applyRow = async (row: MergerRow): Promise<void> => {
    addLoading(row.key)
    try {
      await updateTranslations({
        domain,
        body: {
          data: [{
            key: row.translationKey,
            type: null,
            translationData: [{ locale: row.locale, translation: row.importTranslation }]
          }]
        }
      }).unwrap()

      setRows(prev => prev.map(r =>
        r.key === row.key ? { ...r, state: 'applied' } : r
      ))
    } catch {
      trackError(new GeneralError('Failed to apply translation'))
    } finally {
      removeLoading(row.key)
    }
  }

  const revertRow = async (row: MergerRow): Promise<void> => {
    addLoading(row.key)
    try {
      await updateTranslations({
        domain,
        body: {
          data: [{
            key: row.translationKey,
            type: null,
            translationData: [{ locale: row.locale, translation: row.currentTranslation }]
          }]
        }
      }).unwrap()

      setRows(prev => prev.map(r =>
        r.key === row.key ? { ...r, state: 'reverted' } : r
      ))
    } catch {
      trackError(new GeneralError('Failed to revert translation'))
    } finally {
      removeLoading(row.key)
    }
  }

  const applyAll = async (): Promise<void> => {
    const applyableRows = rows.filter(r => r.state === 'pending' || r.state === 'reverted')
    if (applyableRows.length === 0) return

    setLoadingRows(new Set(applyableRows.map(r => r.key)))
    const data = groupRowsByKey(applyableRows, 'importTranslation')

    try {
      await updateTranslations({ domain, body: { data } }).unwrap()
      setRows(prev => prev.map(r =>
        r.state === 'pending' || r.state === 'reverted' ? { ...r, state: 'applied' } : r
      ))
    } catch {
      trackError(new GeneralError('Failed to apply all translations'))
    } finally {
      setLoadingRows(new Set())
    }
  }

  const revertAll = async (): Promise<void> => {
    const revertableRows = rows.filter(r => r.state === 'applied' || r.state === 'pending')
    if (revertableRows.length === 0) return

    setLoadingRows(new Set(revertableRows.map(r => r.key)))
    const data = groupRowsByKey(revertableRows, 'currentTranslation')

    try {
      await updateTranslations({ domain, body: { data } }).unwrap()
      setRows(prev => prev.map(r =>
        r.state === 'applied' || r.state === 'pending' ? { ...r, state: 'reverted' } : r
      ))
    } catch {
      trackError(new GeneralError('Failed to revert all translations'))
    } finally {
      setLoadingRows(new Set())
    }
  }

  const applyableCount = rows.filter(r => r.state === 'pending' || r.state === 'reverted').length
  const revertableCount = rows.filter(r => r.state === 'applied' || r.state === 'pending').length

  const paginatedRows = useMemo(() =>
    rows.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  [rows, currentPage, pageSize])

  return {
    rows,
    loadingRows,
    applyableCount,
    revertableCount,
    paginatedRows,
    currentPage,
    pageSize,
    totalRows: rows.length,
    setCurrentPage,
    setPageSize,
    applyRow,
    revertRow,
    applyAll,
    revertAll,
    resetRows: () => { setRows([...initialRows]) }
  }
}
