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
import { createColumnHelper, type SortingState } from '@tanstack/react-table'
import { Popconfirm } from 'antd'
import { isEmpty, isUndefined } from 'lodash'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Flex } from '@Pimcore/components/flex/flex'
import { Box } from '@Pimcore/components/box/box'
import { Divider } from '@Pimcore/components/divider/divider'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { Grid } from '@Pimcore/components/grid/grid'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { formatDateTime } from '@Pimcore/utils/date-time'
import { resolveSavedSearchElementType } from '@Pimcore/modules/search/saved-search/utils/resolve-element-type'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  useSavedSearchGetConfigurationsQuery,
  useSavedSearchDeleteConfigurationMutation
} from '@Pimcore/modules/search/search-api-slice-enhanced'
import { type SavedSearchConfigurationListItem } from '@Pimcore/modules/search/search-api-slice.gen'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { useOpenSavedSearch } from '@Pimcore/modules/search/saved-search/hooks/use-open-saved-search'
import { useStyles } from './saved-searches-tab.styles'

// Row shape with the display values pre-formatted so the Grid's default cell renders them
// (matching the name column) instead of custom cell components.
interface SavedSearchRow extends SavedSearchConfigurationListItem {
  ownership: string
  modificationDateLabel: string
}

export const SavedSearchesTab = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { close } = useSearch()
  const widgetManager = useWidgetManager()
  const { open: onOpen, openingId } = useOpenSavedSearch(close)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [searchTerm, setSearchTerm] = useState('')
  const [sorting, setSorting] = useState<SortingState>([{ id: 'modificationDateLabel', desc: true }])
  const [deletingId, setDeletingId] = useState<number | undefined>(undefined)

  // Map the grid column id to the backend sort field (sorting is server-side / paginated).
  const sortFieldByColumn: Record<string, 'name' | 'modificationDate'> = {
    name: 'name',
    modificationDateLabel: 'modificationDate'
  }
  const activeSort = sorting[0]
  const sortBy = isUndefined(activeSort) ? undefined : sortFieldByColumn[activeSort.id]
  const sortOrder = isUndefined(sortBy) ? undefined : (activeSort?.desc ? 'DESC' : 'ASC')

  const { data, isFetching, refetch } = useSavedSearchGetConfigurationsQuery({
    page: currentPage,
    pageSize,
    searchTerm: isEmpty(searchTerm) ? undefined : searchTerm,
    sortBy,
    sortOrder
  })
  const [deleteConfiguration] = useSavedSearchDeleteConfigurationMutation()

  const total = data?.totalItems ?? 0

  const onDelete = (id: number): void => {
    setDeletingId(id)
    deleteConfiguration({ id }).then((result) => {
      if ('error' in result && !isUndefined(result.error)) {
        trackError(new ApiError(result.error))
        return
      }
      // Close the search's tab if it's open, and step back a page if this emptied the current one.
      widgetManager.closeWidget(`saved-search-${id}`)
      if ((data?.items.length ?? 0) <= 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
    }).catch(() => { /* trigger never rejects; error handled via the result above */ })
      .finally(() => { setDeletingId(undefined) })
  }

  const tableItems: SavedSearchRow[] = (data?.items ?? []).map((item) => ({
    ...item,
    ownership: item.owner ? t('saved-search.ownership.own') : t('saved-search.ownership.shared'),
    modificationDateLabel: formatDateTime({ timestamp: item.modificationDate, dateStyle: 'short', timeStyle: 'short' })
  }))

  const columnHelper = createColumnHelper<SavedSearchRow>()
  const columns = [
    columnHelper.accessor('name', {
      header: t('user-management.name'),
      meta: { autoWidth: true },
      cell: ({ row }) => {
        const elementType = resolveSavedSearchElementType(row.original)
        return (
          <Flex
            align='center'
            gap='small'
            style={ { paddingLeft: 8 } }
          >
            <Tooltip title={ t(elementType) }>
              <Icon value={ elementType } />
            </Tooltip>
            {row.original.name}
          </Flex>
        )
      }
    }),
    columnHelper.accessor('ownership', {
      header: t('saved-search.ownership'),
      enableSorting: false,
      size: 160
    }),
    columnHelper.accessor('modificationDateLabel', {
      header: t('common.modification-date'),
      size: 180
    }),
    columnHelper.display({
      id: 'actions',
      header: t('actions'),
      cell: ({ row }) => (
        <Flex align='center'>
          <IconButton
            data-testid='saved-search-open-button'
            icon={ { value: 'folder' } }
            loading={ openingId === row.original.id }
            onClick={ () => { onOpen(row.original.id) } }
            tooltip={ { title: t('saved-search.open') } }
            type='link'
          />
          {row.original.owner && (
            <Popconfirm
              cancelText={ t('button.cancel') }
              description={ t('saved-search.delete.confirm') }
              okText={ t('delete') }
              onConfirm={ () => { onDelete(row.original.id) } }
              title={ t('saved-search.delete.title') }
            >
              <IconButton
                data-testid='saved-search-delete-button'
                icon={ { value: 'trash' } }
                loading={ deletingId === row.original.id }
                tooltip={ { title: t('delete') } }
                type='link'
              />
            </Popconfirm>
          )}
        </Flex>
      ),
      size: 100
    })
  ]

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          borderStyle='primary'
          margin={ { top: 'small' } }
          padding={ { x: 'small', y: 'extra-small' } }
          theme='secondary'
        >
          <Flex align='center'>
            <IconButton
              data-testid='saved-search-refresh-button'
              disabled={ isFetching }
              icon={ { value: 'refresh' } }
              onClick={ () => { void refetch() } }
              tooltip={ { title: t('refresh') } }
              type='link'
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
      renderTopBar={
        <Box
          className={ styles.topBar }
          margin={ { bottom: 'small' } }
          padding={ { x: 'small', y: 'extra-small' } }
        >
          <SearchInput
            maxWidth='100%'
            onSearch={ (value) => {
              setCurrentPage(1)
              setSearchTerm(value)
            } }
            placeholder={ t('component.search.pleaceholder') }
          />
        </Box>
      }
    >
      <Content
        margin={ { x: 'extra-small', y: 'none' } }
        none={ !isFetching && isEmpty(data?.items) }
      >
        <Box margin={ { x: 'extra-small', y: 'none' } }>
          <Grid
            autoWidth
            columns={ columns }
            data={ tableItems }
            enableSorting
            isLoading={ isFetching }
            manualSorting
            onSortingChange={ (nextSorting) => {
              setSorting(nextSorting)
              setCurrentPage(1)
            } }
            resizable
            // During loading the Grid renders placeholder rows without an id; return undefined for
            // those so it falls back to unique index ids (a constant id collides → phantom skeleton
            // rows linger after the data loads).
            setRowId={ (row) => isUndefined(row.id) ? (undefined as unknown as string) : String(row.id) }
            sorting={ sorting }
          />
        </Box>
      </Content>
    </ContentLayout>
  )
}
