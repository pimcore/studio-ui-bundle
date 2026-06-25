/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import { Box } from '@Pimcore/components/box/box'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Switch } from '@Pimcore/components/switch/switch'
import { Tabs } from '@Pimcore/components/tabs/tabs'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { Divider, useFormModal } from '@sdk/components'
import { type SortingState } from '@tanstack/react-table'
import { isNil } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BatchActions } from './components/batch-actions/batch-actions'
import { ReassignOwnerModal } from './components/reassign-owner-modal/reassign-owner-modal'
import { RowSelectionTotal } from './components/row-selection-total/row-selection-total'
import { Table } from './components/table/table'
import { SelectedRowsProvider, useSelectedRowsContext } from './context/selected-items-context'
import { useOwnershipManagement } from './hooks/use-ownership-management'
import {
  type OwnershipManagementGetCollectionApiArg,
  useOwnershipManagementGetCollectionQuery,
  useOwnershipManagementGetTypesQuery
} from './ownership-management-api-slice.gen'
import { useStyles } from './ownership-management-container-inner.styles'

// The collection request "filters" object, as defined by the generated API arg type.
type CollectionFilters = NonNullable<OwnershipManagementGetCollectionApiArg['body']['filters']>

// Maps the grid column ids to the backend sort keys.
const SORT_KEY_MAP: Record<string, string> = {
  modificationDateLabel: 'modificationDate',
  ownerName: 'owner'
}

const toSortKey = (columnId: string): string => SORT_KEY_MAP[columnId] ?? columnId

// Default sort (ID ascending) applied on first load and re-applied whenever the tab changes.
const DEFAULT_SORTING: SortingState = [{ id: 'id', desc: false }]

const OwnershipManagementView = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const modal = useFormModal()
  const { deleteConfigurations, refresh } = useOwnershipManagement()
  const { selectedRows, resetSelectedRows } = useSelectedRowsContext()
  const { data: typesData, isLoading: isTypesLoading, error: typesError } = useOwnershipManagementGetTypesQuery()
  const [activeType, setActiveType] = useState<string | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchValue, setSearchValue] = useState<string>('')
  const [includeDeletedOwners, setIncludeDeletedOwners] = useState<boolean>(true)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)
  const [reassignIds, setReassignIds] = useState<string[]>([])
  const [reassignOpen, setReassignOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!isNil(typesError)) {
      trackError(new ApiError(typesError))
    }
  }, [typesError])

  const types = typesData?.items ?? []

  useEffect(() => {
    if (isNil(activeType) && types.length > 0) {
      setActiveType(types[0].type)
    }
  }, [types, activeType])

  const columnFilters = useMemo(() => {
    const filters: Array<{ type: string, filterValue: string | boolean }> = [
      { type: 'includeDeletedOwners', filterValue: includeDeletedOwners }
    ]

    if (searchValue !== '') {
      filters.push({ type: 'search', filterValue: searchValue })
    }

    return filters
  }, [includeDeletedOwners, searchValue])

  const requestFilters = useMemo((): CollectionFilters => {
    const filters: CollectionFilters = {
      page,
      pageSize,
      columnFilters
    }

    if (sorting.length > 0) {
      const sortKey = toSortKey(sorting[0].id)
      filters.sortFilter = {
        key: sortKey,
        direction: sorting[0].desc ? 'DESC' : 'ASC'
      }

      // Tie-break on id (like Website Settings) whenever the primary sort is not id itself.
      if (sortKey !== 'id') {
        filters.additionalSortFilters = [{ key: 'id', direction: 'ASC' }]
      }
    }

    return filters
  }, [page, pageSize, columnFilters, sorting])

  const { data, isLoading, isFetching, error } = useOwnershipManagementGetCollectionQuery(
    {
      type: activeType ?? '',
      body: {
        filters: requestFilters
      }
    },
    { skip: isNil(activeType) }
  )

  useEffect(() => {
    if (!isNil(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const total = data?.totalItems ?? 0
  const isDataLoading = isLoading || isFetching

  const onPagerChange = (newPage: number, newPageSize: number): void => {
    setPage(newPage)
    setPageSize(newPageSize)
  }

  const onSortingChange = (newSorting: SortingState): void => {
    setSorting(newSorting)
    setPage(1)
  }

  const onTypeChange = (key: string): void => {
    setActiveType(key)
    setPage(1)
    setSorting(DEFAULT_SORTING)
    setSearchValue('')
    setIncludeDeletedOwners(true)
    resetSelectedRows()
  }

  const openReassign = (ids: string[]): void => {
    setReassignIds(ids)
    setReassignOpen(true)
  }

  const confirmDelete = (ids: string[]): void => {
    if (isNil(activeType)) {
      return
    }

    modal.confirm({
      title: t('ownership-management.delete.title'),
      content: t('ownership-management.delete.content', { count: ids.length }),
      onOk: () => {
        void deleteConfigurations(activeType, ids, resetSelectedRows)
      }
    })
  }

  if (isTypesLoading || types.length === 0) {
    return (
      <Content
        fullPage
        loading={ isTypesLoading }
        none={ !isTypesLoading && types.length === 0 }
      />
    )
  }

  const items = types.map((type) => ({
    key: type.type,
    label: (
      <Flex
        align="center"
        gap="mini"
      >
        <Icon value={ type.icon } />
        {t(type.label)}
      </Flex>
    ),
    children: type.type === activeType
      ? (
        <div
          className={ styles.tabBody }
          key={ type.type }
        >
          <Box
            margin={ {
              x: 'extra-small',
              y: 'extra-small'
            } }
          >
            <Flex
              align="center"
              gap="small"
              justify="space-between"
            >
              <SearchInput
                loading={ isFetching }
                onSearch={ (value) => {
                  setSearchValue(value)
                  setPage(1)
                } }
                placeholder={ t('component.search.pleaceholder') }
                withPrefix={ false }
                withoutAddon={ false }
              />
              <Switch
                checked={ includeDeletedOwners }
                labelRight={ t('ownership-management.show-deleted-owners') }
                onChange={ (checked) => {
                  setIncludeDeletedOwners(checked)
                  setPage(1)
                } }
              />
            </Flex>
          </Box>

          <div className={ styles.tableArea }>
            <Content
              loading={ isDataLoading }
              none={ !isDataLoading && (data?.items?.length ?? 0) === 0 }
            >
              <Box
                margin={ {
                  x: 'extra-small',
                  y: 'none'
                } }
              >
                <Table
                  items={ data?.items ?? [] }
                  onDelete={ confirmDelete }
                  onReassign={ openReassign }
                  onSortingChange={ onSortingChange }
                  sorting={ sorting }
                />
              </Box>
            </Content>
          </div>
        </div>
        )
      : (<></>)
  }))

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          {Object.keys(selectedRows).length > 0
            ? (
              <Flex>
                <RowSelectionTotal />
                <BatchActions
                  onBatchAssign={ openReassign }
                  onBatchDelete={ confirmDelete }
                />
              </Flex>
              )
            : (<span />)}

          <Flex align="center">
            <IconButton
              disabled={ isDataLoading }
              icon={ { value: 'refresh' } }
              onClick={ () => { refresh() } }
            />

            {total > 0 && (
              <>
                <Divider
                  size="small"
                  type="vertical"
                />

                <Pagination
                  current={ page }
                  defaultPageSize={ pageSize }
                  onChange={ onPagerChange }
                  showSizeChanger
                  showTotal={ (totalItems) => t('pagination.show-total', { total: totalItems }) }
                  total={ total }
                />
              </>
            )}
          </Flex>
        </Toolbar> }
    >
      <Tabs
        activeKey={ activeType }
        fullHeight
        items={ items }
        onChange={ onTypeChange }
      />

      <ReassignOwnerModal
        configurationType={ activeType ?? '' }
        ids={ reassignIds }
        onClose={ () => { setReassignOpen(false) } }
        open={ reassignOpen }
      />
    </ContentLayout>
  )
}

export const OwnershipManagementContainerInner = (): React.JSX.Element => {
  return (
    <SelectedRowsProvider>
      <OwnershipManagementView />
    </SelectedRowsProvider>
  )
}
