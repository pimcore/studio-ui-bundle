/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { IconButton } from '@sdk/components'
import { LanguageColumnHeader } from '../../../table/language-column-header'
import { t } from 'i18next'
import type { ColumnsType } from 'antd/es/table'
import type { MergerRow } from './use-merger-rows'

interface UseMergerColumnsProps {
  loadingRows: Set<string>
  applyRow: (row: MergerRow) => Promise<void>
  revertRow: (row: MergerRow) => Promise<void>
}

export const useMergerColumns = ({ loadingRows, applyRow, revertRow }: UseMergerColumnsProps): ColumnsType<MergerRow> => {
  const languageDisplayNames = useMemo(() => new Intl.DisplayNames(['en'], { type: 'language' }), [])

  return useMemo(() => [
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
}
