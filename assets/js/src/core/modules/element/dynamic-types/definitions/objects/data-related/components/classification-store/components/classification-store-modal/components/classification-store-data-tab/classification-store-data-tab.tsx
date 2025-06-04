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
import { useTranslation } from 'react-i18next'
import { type RowSelectionState } from '@tanstack/react-table'
import { Refetch } from '../refetch/refetch'
import { Pagination } from '../pagination/pagination'
import { Split } from '@Pimcore/components/split/split'
import { Box } from '@Pimcore/components/box/box'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Grid } from '@Pimcore/components/grid/grid'
import { Button } from '@Pimcore/components/button/button'
import { useClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider/use-classification-store'

interface ClassificationStoreDataTabProps<T> {
  tabId: 'collection' | 'group' | 'group-by-key'
  queryHook: (args: any, options?: any) => {
    isLoading: boolean
    isFetching: boolean
    data?: { items: T[], totalItems: number }
    refetch: () => void
  }
  queryArgs: any
  columns: any[]
}

export const ClassificationStoreDataTab = <T,>({ tabId, queryHook, queryArgs, columns }: ClassificationStoreDataTabProps<T>): React.JSX.Element => {
  const { getSearchValue, setSearchValue } = useClassificationStore()

  const [searchTerm, setSearchTerm] = useState(getSearchValue(tabId))
  const [searchQuery, setSearchQuery] = useState(getSearchValue(tabId))
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [selectedItems, setSelectedItems] = useState<RowSelectionState | undefined>(undefined)

  const { isLoading, data, isFetching, refetch } = queryHook(
    { ...queryArgs, page, pageSize, searchTerm },
    { refetchOnMountOrArgChange: true }
  )
  const { t } = useTranslation()

  const handleSearch = (value: string): void => {
    setSearchValue(tabId, value)
    setSearchTerm(value)
  }

  const handleApplySelectionClick = (): void => {
    // const currentItem = find(data?.items, { id: 3 })

    // operations.add('3')
  }

  return (
    <Content>
      <ContentLayout
        renderToolbar={
          <Toolbar theme='secondary'>
            <Split size='extra-small'>
              <Refetch
                isFetching={ isFetching }
                refetch={ refetch }
              />
              <Pagination
                page={ page }
                pageSize={ pageSize }
                setPage={ setPage }
                setPageSize={ setPageSize }
                totalItems={ data?.totalItems ?? 0 }
              />
            </Split>
            <Button
              disabled={ isFetching }
              onClick={ handleApplySelectionClick }
              type="primary"
            >
              {t('common.apply-selection')}
            </Button>
          </Toolbar>
            }
        renderTopBar={
          <Toolbar
            padding={ { top: 'extra-small', bottom: 'extra-small', left: 'none', right: 'none' } }
            position='top'
            theme='secondary'
          >
            <SearchInput
              maxWidth='100%'
              onChange={ (event) => { setSearchQuery(event.target.value) } }
              onSearch={ handleSearch }
              value={ searchQuery }
            />
          </Toolbar>
            }
      >
        <Box padding={ { top: 'extra-small', bottom: 'extra-small' } }>
          <Grid
            columns={ columns }
            data={ data?.items ?? [] }
            enableMultipleRowSelection
            isLoading={ isLoading }
            onSelectedRowsChange={ (row: RowSelectionState) => { setSelectedItems(row) } }
            selectedRows={ selectedItems }
            setRowId={ (row) => row.id }
          />
        </Box>
      </ContentLayout>
    </Content>
  )
}
