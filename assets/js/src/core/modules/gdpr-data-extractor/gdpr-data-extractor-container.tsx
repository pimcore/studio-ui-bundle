/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { Split } from '@Pimcore/components/split/split'
import { Title } from '@Pimcore/components/title/title'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { debounce, isEmpty, isUndefined } from 'lodash'
import { type ColumnFilter } from '../app/types/column-filter'
import { type SortFilter } from '../app/types/sort-filter'
import { SearchForm } from './components/search-form/search-form'
import { Tabpanel } from './components/tab-panel/tab-panel'
import { useLazyGdprSearchDataQuery } from './gdpr-data-extractor-slice-enhanced'
import { ApiError, trackError } from '@sdk/modules/app'

export interface SearchOverrides {
  sortFilter?: SortFilter
  provider?: string
  columnFilters?: ColumnFilter[]
  page?: number
  pageSize?: number
}

export const GDPRDataExtractorContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
  const [sortFilter, setSortFilter] = useState<SortFilter | undefined>(undefined)
  const [provider, setProvider] = useState<string>('data_objects')

  const [trigger, { data, isLoading, isFetching, error }] = useLazyGdprSearchDataQuery()

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const debouncedSetColumnFilters = useMemo(
    () => debounce((filters: ColumnFilter[]) => {
      setColumnFilters(filters)
    }, 300),
    []
  )

  const executeSearch = (overrides?: SearchOverrides): void => {
    const currentProvider = overrides?.provider ?? provider
    const currentColumnFilters = overrides?.columnFilters ?? columnFilters
    const currentPageSize = overrides?.pageSize ?? pageSize

    if (overrides?.sortFilter !== undefined) {
      setSortFilter(overrides.sortFilter)
    }
    const currentSortFilter = overrides?.sortFilter ?? sortFilter

    const isSortChange = overrides?.sortFilter !== undefined && overrides?.page === undefined
    const currentPage = isSortChange ? 1 : (overrides?.page ?? page)
    if (isSortChange) {
      setPage(1)
    }

    if (currentProvider === '' || isEmpty(currentColumnFilters)) return

    void trigger({
      provider: currentProvider,
      body: {
        filters: {
          page: currentPage,
          pageSize: currentPageSize,
          columnFilters: currentColumnFilters,
          sortFilter: currentSortFilter
        }
      }
    })
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          justify="end"
          padding={ {
            x: 'small',
            y: 'extra-small'
          } }
          theme="secondary"
        >
          <Flex align="center">
            <Split>
              <IconButton
                disabled={ isLoading || isFetching || provider === '' }
                icon={ { value: 'refresh' } }
                onClick={ () => { executeSearch() } }
              />
              <Pagination
                current={ page }
                hideOnSinglePage
                onChange={ (page, pageSize) => {
                  setPage(page)
                  setPageSize(pageSize)
                  executeSearch({ page, pageSize })
                } }
                showSizeChanger
                showTotal={ (total) => t('pagination.show-total', { total }) }
                total={ data?.totalItems ?? 0 }
              />
            </Split>
          </Flex>
        </Toolbar>
      }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          } }
          theme='secondary'
        >
          <Flex gap={ 4 }>
            <Title>
              {t('gdpr-extractor.title')}
            </Title>
          </Flex>
        </Toolbar>
      }
    >
      <Content
        data-testid="gdpr-data-extractor-content"
        gap={ 'extra-small' }
        padded
        padding={ {
          x: 'extra-small',
          y: 'extra-small'
        } }
      >
        <SearchForm
          isLoading={ isLoading || isFetching }
          onSearch={ (columnFilters) => {
            setColumnFilters(columnFilters)
            executeSearch({ columnFilters })
          } }
          onValueChange={ (filters) => {
            debouncedSetColumnFilters(filters)
          } }
        />
        <Tabpanel
          data={ data?.items ?? [] }
          executeSearch={ executeSearch }
          isLoading={ isLoading || isFetching }
          onProviderChange={ (providerKey) => {
            setProvider(providerKey)
            setPage(1)
            executeSearch({ provider: providerKey, page: 1 })
          } }
          providerKey={ provider }
          refresh={ executeSearch }
        />
      </Content>
    </ContentLayout>
  )
}
