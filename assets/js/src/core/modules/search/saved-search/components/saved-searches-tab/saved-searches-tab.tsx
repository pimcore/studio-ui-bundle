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
import { Popconfirm } from 'antd'
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
import { formatDateTime } from '@Pimcore/utils/date-time'
import { elementTypes } from '@Pimcore/types/enums/element/element-type'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  useSavedSearchGetConfigurationsQuery,
  useLazySavedSearchGetConfigurationQuery,
  useSavedSearchDeleteConfigurationMutation
} from '@Pimcore/modules/search/search-api-slice-enhanced'
import { type SavedSearchConfigurationListItem } from '@Pimcore/modules/search/search-api-slice.gen'
import { useSearch } from '@Pimcore/modules/search/provider/use-search'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { SAVED_SEARCH_RESULT_WIDGET } from '@Pimcore/modules/search/saved-search'

// Row shape with the display values pre-formatted so the Grid's default cell renders them
// (matching the name column) instead of custom cell components.
interface SavedSearchRow extends SavedSearchConfigurationListItem {
  ownership: string
  modificationDateLabel: string
}

export const SavedSearchesTab = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { close } = useSearch()
  const widgetManager = useWidgetManager()

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
  const [deleteConfiguration, { isLoading: isDeleting }] = useSavedSearchDeleteConfigurationMutation()

  const total = data?.totalItems ?? 0

  const onDelete = (id: number): void => {
    deleteConfiguration({ id }).then((result) => {
      if ('error' in result && !isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }
    }).catch(() => { /* trigger never rejects; error handled via the result above */ })
  }

  const onOpen = (id: number): void => {
    setOpeningId(id)
    fetchConfiguration({ id }).then((result) => {
      if ('data' in result && !isUndefined(result.data)) {
        const configuration = result.data
        // No explicit elementType yet — infer it from classId (objects carry one, assets don't).
        const elementType = isString(configuration.classId) && !isEmpty(configuration.classId)
          ? elementTypes.dataObject
          : elementTypes.asset

        // Open the saved search as a tab in the main widget area, then close the Quick Search modal.
        widgetManager.openMainWidget({
          id: `saved-search-${id}`,
          name: configuration.name,
          component: SAVED_SEARCH_RESULT_WIDGET,
          config: {
            savedSearchId: id,
            elementType,
            label: configuration.name,
            icon: { type: 'name', value: 'search' },
            iconColorGroup: 'element'
          }
        })
        close()
      } else if ('error' in result && !isUndefined(result.error)) {
        trackError(new ApiError(result.error))
      }
    }).catch(() => { /* trigger never rejects; error handled via the result above */ })
      .finally(() => {
        setOpeningId(undefined)
      })
  }

  const tableItems: SavedSearchRow[] = (data?.items ?? []).map((item) => ({
    ...item,
    description: item.description ?? '',
    ownership: item.owner ? t('saved-search.ownership.own') : t('saved-search.ownership.shared'),
    modificationDateLabel: formatDateTime({ timestamp: item.modificationDate, dateStyle: 'short', timeStyle: 'short' })
  }))

  const columnHelper = createColumnHelper<SavedSearchRow>()
  const columns = [
    columnHelper.accessor('name', {
      header: t('user-management.name'),
      meta: { autoWidth: true }
    }),
    columnHelper.accessor('description', {
      header: t('description'),
      size: 280
    }),
    columnHelper.accessor('ownership', {
      header: t('saved-search.ownership'),
      size: 140
    }),
    columnHelper.accessor('modificationDateLabel', {
      header: t('common.modification-date'),
      size: 170
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
                loading={ isDeleting }
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
            data={ tableItems }
            resizable
            setRowId={ (row) => String(row.id) }
          />
        </Box>
      </Content>
    </ContentLayout>
  )
}
