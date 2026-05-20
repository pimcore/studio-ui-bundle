/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Input } from 'antd'
import { Grid } from '@Pimcore/components/grid/grid'
import { Content } from '@Pimcore/components/content/content'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { createColumnHelper, type RowSelectionState, type SortingState } from '@tanstack/react-table'
import {
  type ClassificationStoreConfigurationKeyDetail,
  useClassificationStoreConfigurationKeyCollectionQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { Flex } from '@Pimcore/components/flex/flex'

interface IKeySelectionDialogProps {
  open: boolean
  storeId: number
  excludedKeyIds: number[]
  onConfirm: (keys: ClassificationStoreConfigurationKeyDetail[]) => void
  onCancel: () => void
}

const DEFAULT_PAGE_SIZE = 20

export const KeySelectionDialog = ({
  open,
  storeId,
  excludedKeyIds,
  onConfirm,
  onCancel
}: IKeySelectionDialogProps): React.JSX.Element => {
  const { t } = useTranslation()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)

  const onSortingChange = useCallback((newSorting: SortingState) => {
    setSorting(newSorting)
    setPage(1)
  }, [])

  const queryArgs = useMemo(() => ({
    storeId,
    body: {
      filters: {
        page,
        pageSize,
        columnFilters: searchTerm.trim().length > 0
          ? [{ type: 'search', filterValue: searchTerm.trim() }]
          : [],
        ...(sorting.length > 0
          ? {
              sortFilter: {
                key: sorting[0].id,
                direction: sorting[0].desc ? 'DESC' : 'ASC'
              }
            }
          : {})
      }
    }
  }), [storeId, page, pageSize, searchTerm, sorting])

  const { data, isLoading } = useClassificationStoreConfigurationKeyCollectionQuery(
    queryArgs,
    { skip: !open }
  )

  const total = data?.totalItems ?? 0

  // Reset selection, search and pagination when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedRows({})
      setSearchTerm('')
      setSorting([])
      setPage(1)
    }
  }, [open])

  const availableKeys = useMemo(() => {
    const excludedSet = new Set(excludedKeyIds)
    return (data?.items ?? []).filter((k) => !excludedSet.has(k.id))
  }, [data?.items, excludedKeyIds])

  const columnHelper = createColumnHelper<ClassificationStoreConfigurationKeyDetail>()

  const columns = [
    columnHelper.accessor('id', {
      header: t('classification-store.columns.id'),
      size: 60
    }),
    columnHelper.accessor('name', {
      header: t('classification-store.columns.name'),
      size: 200
    }),
    columnHelper.accessor('type', {
      header: t('classification-store.columns.type'),
      size: 120
    }),
    columnHelper.accessor('description', {
      header: t('classification-store.columns.description'),
      size: 250,
      cell: (info) => info.getValue() ?? '-'
    })
  ]

  const selectedKeys = useMemo(() => {
    return availableKeys.filter((k) => selectedRows[String(k.id)])
  }, [selectedRows, availableKeys])

  const handleOk = (): void => {
    if (selectedKeys.length > 0) {
      onConfirm(selectedKeys)
    }
  }

  return (
    <Modal
      okButtonProps={ { disabled: selectedKeys.length === 0 } }
      okText={ t('classification-store.add-key') }
      onCancel={ onCancel }
      onOk={ handleOk }
      open={ open }
      styles={ { body: { maxHeight: '65vh', overflowY: 'auto' } } }
      title={ t('classification-store.select-key') }
      width={ 700 }
    >
      <Flex
        gap="small"
        vertical
      >
        <Input.Search
          onChange={ (e) => {
            setSearchTerm(e.target.value)
            setPage(1)
          } }
          placeholder={ t('classification-store.search-keys') }
          value={ searchTerm }
        />

        <Content
          overflow={ { x: 'hidden', y: 'auto' } }
          style={ { maxHeight: 'calc(65vh - 120px)', minHeight: 120 } }
        >
          <Grid
            columns={ columns }
            data={ availableKeys }
            enableMultipleRowSelection
            enableSorting
            isLoading={ isLoading }
            manualSorting
            onSelectedRowsChange={ setSelectedRows }
            onSortingChange={ onSortingChange }
            selectedRows={ selectedRows }
            setRowId={ (row: ClassificationStoreConfigurationKeyDetail) => row.id !== undefined ? String(row.id) : undefined as unknown as string }
            sorting={ sorting }
          />
        </Content>

        <Pagination
          current={ page }
          defaultPageSize={ pageSize }
          onChange={ (newPage, newPageSize) => {
            setPage(newPage)
            setPageSize(newPageSize)
          } }
          showSizeChanger
          showTotal={ (total) => t('pagination.show-total', { total }) }
          total={ total }
        />
      </Flex>
    </Modal>
  )
}
