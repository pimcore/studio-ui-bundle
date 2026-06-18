/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { IconButton, IconTextButton, Toolbar, Content, Flex, Box } from '@sdk/components'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Title } from '@Pimcore/components/title/title'
import { t } from 'i18next'
import { Table, Divider } from 'antd'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import type { DeltaItem } from '../../../app/translations/translations-api-slice.gen'
import { useStyle } from './translation-merger.styles'
import { useMergerRows } from './hooks/use-merger-rows'
import { useMergerColumns } from './hooks/use-merger-columns'
import type { MergerRow } from './hooks/use-merger-rows'

interface TranslationMergerProps {
  domain: string
  deltaItems: DeltaItem[]
}

export const TranslationMerger = ({ domain, deltaItems }: TranslationMergerProps): React.JSX.Element => {
  const { styles } = useStyle()
  const {
    loadingRows,
    applyableCount,
    revertableCount,
    paginatedRows,
    currentPage,
    pageSize,
    totalRows,
    setCurrentPage,
    setPageSize,
    applyRow,
    revertRow,
    applyAll,
    revertAll,
    resetRows
  } = useMergerRows(domain, deltaItems)

  const columns = useMergerColumns({ loadingRows, applyRow, revertRow })

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          justify='space-between'
          theme="secondary"
        >
          <Flex gap='extra-small'>
            <IconTextButton
              disabled={ applyableCount === 0 || loadingRows.size > 0 }
              icon={ { value: 'arrow-square-right' } }
              onClick={ () => { void applyAll() } }
              type="link"
            >
              {t('translations.merger.apply-all')}
            </IconTextButton>
            <IconTextButton
              danger
              disabled={ revertableCount === 0 || loadingRows.size > 0 }
              icon={ { value: 'corner-up-left' } }
              onClick={ () => { void revertAll() } }
              type="link"
            >
              {t('translations.merger.revert-all')}
            </IconTextButton>
          </Flex>
          <Flex align="center">
            <IconButton
              icon={ { value: 'refresh' } }
              onClick={ resetRows }
            />
            <Divider
              style={ { height: 24 } }
              type="vertical"
            />
            <Pagination
              current={ currentPage }
              onChange={ (page, size) => { setCurrentPage(page); setPageSize(size) } }
              showSizeChanger
              showTotal={ (total) => `${total} ${t('translations.merger.items')}` }
              total={ totalRows }
            />
          </Flex>
        </Toolbar>
      }
      renderTopBar={
        <Toolbar
          size='headline'
        >
          <Title>{t('translations.merger.title', { domain })}</Title>
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
