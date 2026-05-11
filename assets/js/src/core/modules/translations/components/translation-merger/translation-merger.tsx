/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { IconButton, Toolbar, Content, Flex, IconTextButton, Box } from '@sdk/components'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Title } from '@Pimcore/components/title/title'
import { LanguageColumnHeader } from '../../table/language-column-header'
import { t } from 'i18next'
import { Table, Pagination, Divider } from 'antd'
import type { DeltaItem } from '../../../app/translations/translations-api-slice.gen'
import { useTranslationUpdateMutation } from '../../../app/translations/translations-api-slice-enhanced'
import trackError, { GeneralError } from '../../../app/error-handler'
import { useStyle } from './translation-merger.styles'

type RowState = 'pending' | 'applied' | 'reverted'

interface MergerRow {
  key: string
  translationKey: string
  locale: string
  currentTranslation: string
  importTranslation: string
  state: RowState
}

interface TranslationMergerProps {
  domain: string
  deltaItems: DeltaItem[]
}

export const TranslationMerger = ({ domain, deltaItems }: TranslationMergerProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [updateTranslations] = useTranslationUpdateMutation()
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const initialRows: MergerRow[] = useMemo(() => deltaItems.flatMap(item =>
    item.deltaValues.map(delta => ({
      key: `${item.key}::${delta.locale}`,
      translationKey: item.key,
      locale: delta.locale,
      currentTranslation: delta.currentTranslation,
      importTranslation: delta.importTranslation,
      state: 'pending' as RowState
    }))
  ), [deltaItems])

  const [rows, setRows] = useState<MergerRow[]>(initialRows)

  const applyRow = async (row: MergerRow): Promise<void> => {
    setLoadingRows(prev => new Set([...prev, row.key]))
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
      setLoadingRows(prev => {
        const next = new Set(prev)
        next.delete(row.key)
        return next
      })
    }
  }

  const revertRow = async (row: MergerRow): Promise<void> => {
    setLoadingRows(prev => new Set([...prev, row.key]))
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
      setLoadingRows(prev => {
        const next = new Set(prev)
        next.delete(row.key)
        return next
      })
    }
  }

  const applyAll = async (): Promise<void> => {
    const applyableRows = rows.filter(r => r.state === 'pending' || r.state === 'reverted')
    if (applyableRows.length === 0) return

    const allKeys = new Set(applyableRows.map(r => r.key))
    setLoadingRows(allKeys)

    const grouped = new Map<string, Array<{ locale: string, translation: string }>>()
    for (const row of applyableRows) {
      const existing = grouped.get(row.translationKey) ?? []
      existing.push({ locale: row.locale, translation: row.importTranslation })
      grouped.set(row.translationKey, existing)
    }

    const data = Array.from(grouped.entries()).map(([key, translationData]) => ({
      key,
      type: null,
      translationData
    }))

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

    const allKeys = new Set(revertableRows.map(r => r.key))
    setLoadingRows(allKeys)

    const grouped = new Map<string, Array<{ locale: string, translation: string }>>()
    for (const row of revertableRows) {
      const existing = grouped.get(row.translationKey) ?? []
      existing.push({ locale: row.locale, translation: row.currentTranslation })
      grouped.set(row.translationKey, existing)
    }

    const data = Array.from(grouped.entries()).map(([key, translationData]) => ({
      key,
      type: null,
      translationData
    }))

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

  const languageDisplayNames = useMemo(() => new Intl.DisplayNames(['en'], { type: 'language' }), [])

  const columns = useMemo(() => [
    {
      title: t('translations.merger.column.language'),
      key: 'locale',
      width: 150,
      render: (_: unknown, record: MergerRow) => (
        <LanguageColumnHeader
          display={ languageDisplayNames.of(record.locale) ?? record.locale }
          language={ record.locale }
        />
      )
    },
    {
      title: t('translations.merger.column.key'),
      dataIndex: 'translationKey',
      key: 'translationKey',
      ellipsis: true
    },
    {
      title: t('translations.merger.column.csv-value'),
      dataIndex: 'importTranslation',
      key: 'importTranslation',
      ellipsis: true
    },
    {
      title: t('translations.merger.column.action'),
      key: 'action',
      width: 60,
      align: 'center' as const,
      render: (_: unknown, record: MergerRow) => {
        const isLoading = loadingRows.has(record.key)

        if (record.state === 'applied') {
          return (
            <IconButton
              danger
              disabled={ isLoading }
              icon={ { value: 'corner-up-left' } }
              loading={ isLoading }
              onClick={ () => { void revertRow(record) } }
              type="link"
            />
          )
        }

        if (record.state === 'reverted') {
          return (
            <IconButton
              disabled={ isLoading }
              icon={ { value: 'arrow-square-right' } }
              loading={ isLoading }
              onClick={ () => { void applyRow(record) } }
              type="link"
            />
          )
        }

        return (
          <IconButton
            disabled={ isLoading }
            icon={ { value: 'arrow-square-right' } }
            loading={ isLoading }
            onClick={ () => { void applyRow(record) } }
            type="link"
          />
        )
      }
    },
    {
      title: t('translations.merger.column.current'),
      dataIndex: 'currentTranslation',
      key: 'currentTranslation',
      ellipsis: true
    }
  ], [loadingRows])

  const paginatedRows = useMemo(() =>
    rows.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  [rows, currentPage, pageSize])

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <Flex
            align="center"
            justify="flex-end"
            style={ { width: '100%' } }
          >
            <IconButton
              icon={ { value: 'refresh' } }
              onClick={ () => { setRows([...initialRows]) } }
            />
            <Divider
              style={ { height: 24 } }
              type="vertical"
            />
            <Pagination
              current={ currentPage }
              onChange={ (page, size) => { setCurrentPage(page); setPageSize(size) } }
              pageSize={ pageSize }
              showSizeChanger
              showTotal={ (total) => `${total} ${t('translations.merger.items')}` }
              total={ rows.length }
            />
          </Flex>
        </Toolbar>
      }
      renderTopBar={
        <Toolbar
          justify="space-between"
          margin={ {
            x: 'mini',
            y: 'none'
          } }
          theme="secondary"
        >
          <Title>{t('translations.merger.title', { domain })}</Title>
          <Flex gap="small">
            <IconTextButton
              disabled={ applyableCount === 0 || loadingRows.size > 0 }
              icon={ { value: 'arrow-square-right' } }
              onClick={ () => { void applyAll() } }
            >
              {t('translations.merger.apply-all')}
            </IconTextButton>

            <IconTextButton
              danger
              disabled={ revertableCount === 0 || loadingRows.size > 0 }
              icon={ { value: 'corner-up-left' } }
              onClick={ () => { void revertAll() } }
            >
              {t('translations.merger.revert-all')}
            </IconTextButton>
          </Flex>
        </Toolbar>
      }
    >
      <Content
        className={ styles.mergerContainer }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            columns={ columns }
            dataSource={ paginatedRows }
            pagination={ false }
            rowClassName={ (record: MergerRow) => {
              if (record.state === 'pending') return 'row-conflict'
              if (record.state === 'applied' || record.state === 'reverted') return 'row-applied'
              return ''
            } }
            size="small"
          />
        </Box>
      </Content>
    </ContentLayout>
  )
}
