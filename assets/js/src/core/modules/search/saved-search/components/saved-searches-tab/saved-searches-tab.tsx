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
import { createColumnHelper } from '@tanstack/react-table'
import { isEmpty, isString, isUndefined } from 'lodash'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Title } from '@Pimcore/components/title/title'
import { Divider } from '@Pimcore/components/divider/divider'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { Grid } from '@Pimcore/components/grid/grid'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Text } from '@Pimcore/components/text/text'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  useSavedSearchGetConfigurationsQuery,
  useLazySavedSearchGetConfigurationQuery
} from '@Pimcore/modules/search/search-api-slice-enhanced'
import { type SavedSearchConfigurationListItem } from '@Pimcore/modules/search/search-api-slice.gen'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'

export const SavedSearchesTab = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { setActiveKey, setPendingRestore } = useSearch()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [openingId, setOpeningId] = useState<number | undefined>(undefined)

  const { data, isLoading, isFetching } = useSavedSearchGetConfigurationsQuery({
    page: currentPage,
    pageSize,
    searchTerm: isEmpty(searchTerm) ? undefined : searchTerm
  })
  const [fetchConfiguration] = useLazySavedSearchGetConfigurationQuery()

  const total = data?.totalItems ?? 0

  const onOpen = (id: number): void => {
    setOpeningId(id)
    fetchConfiguration({ id }).then((result) => {
      if ('data' in result && !isUndefined(result.data)) {
        const configuration = result.data
        // No explicit elementType yet — infer the tab from classId (objects carry one, assets don't).
        const targetTab = isString(configuration.classId) && !isEmpty(configuration.classId)
          ? elementTypes.dataObject
          : elementTypes.asset

        setPendingRestore(configuration)
        setActiveKey(targetTab)
      } else if ('error' in result && !isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }
    }).catch(() => { /* trigger never rejects; error handled via the result above */ })
      .finally(() => {
        setOpeningId(undefined)
      })
  }

  const columnHelper = createColumnHelper<SavedSearchConfigurationListItem>()
  const columns = [
    columnHelper.accessor('name', {
      header: t('user-management.name'),
      meta: { autoWidth: true }
    }),
    columnHelper.accessor('description', {
      header: t('description'),
      cell: ({ row }) => <Text>{row.original.description ?? ''}</Text>,
      meta: { autoWidth: true }
    }),
    columnHelper.accessor('owner', {
      header: t('saved-search.ownership'),
      cell: ({ row }) => (
        <Text>{row.original.owner ? t('saved-search.ownership.own') : t('saved-search.ownership.shared')}</Text>
      ),
      size: 160
    }),
    columnHelper.accessor('modificationDate', {
      header: t('common.modification-date'),
      cell: ({ row }) => (
        <Text>{formatDateTime({ timestamp: row.original.modificationDate, dateStyle: 'short', timeStyle: 'short' })}</Text>
      ),
      size: 160
    }),
    columnHelper.display({
      id: 'actions',
      header: t('actions'),
      cell: ({ row }) => (
        <Flex
          align='center'
          justify='center'
        >
          <IconButton
            data-testid='saved-search-open-button'
            icon={ { value: 'folder' } }
            loading={ openingId === row.original.id }
            onClick={ () => { onOpen(row.original.id) } }
            tooltip={ { title: t('saved-search.open') } }
            type='link'
          />
        </Flex>
      ),
      size: 80
    })
  ]

  return (
    <ContentLayout
      renderTopBar={
        <Toolbar
          justify='space-between'
          padding={ { left: 'small', right: 'extra-small' } }
          theme='secondary'
        >
          <Title>{t('saved-search.saved-searches')}</Title>
          <Flex align='center'>
            <SearchInput
              loading={ isFetching }
              onSearch={ (value) => {
                setCurrentPage(1)
                setSearchTerm(value)
              } }
              placeholder={ t('component.search.pleaceholder') }
            />
            {total > 0 && (
              <>
                <Divider
                  size='small'
                  type='vertical'
                />
                <Pagination
                  current={ currentPage }
                  defaultPageSize={ pageSize }
                  onChange={ (page, size) => {
                    setCurrentPage(page)
                    setPageSize(size)
                  } }
                  showSizeChanger
                  showTotal={ (totalItems) => t('pagination.show-total', { total: totalItems }) }
                  total={ total }
                />
              </>
            )}
          </Flex>
        </Toolbar>
      }
    >
      <Content
        loading={ isLoading }
        margin={ { x: 'extra-small', y: 'none' } }
        none={ isUndefined(data?.items) || isEmpty(data?.items) }
      >
        <Box margin={ { x: 'extra-small', y: 'none' } }>
          <Grid
            autoWidth
            columns={ columns }
            data={ data?.items ?? [] }
            resizable
            setRowId={ (row) => String(row.id) }
          />
        </Box>
      </Content>
    </ContentLayout>
  )
}
