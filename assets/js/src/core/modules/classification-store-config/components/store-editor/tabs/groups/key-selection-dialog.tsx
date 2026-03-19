/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, Input } from 'antd'
import { Grid } from '@Pimcore/components/grid/grid'
import { Content } from '@Pimcore/components/content/content'
import { createColumnHelper } from '@tanstack/react-table'
import { type RowSelectionState } from '@tanstack/react-table'
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

  const { data, isLoading } = useClassificationStoreConfigurationKeyCollectionQuery(
    { storeId, body: { filters: { page: 1, pageSize: 9999 } } },
    { skip: !open }
  )

  const allKeys = data?.items ?? []

  // Reset selection and search when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedRows({})
      setSearchTerm('')
    }
  }, [open])

  const availableKeys = useMemo(() => {
    const excludedSet = new Set(excludedKeyIds)
    return allKeys.filter((k) => {
      if (excludedSet.has(k.id)) return false
      if (searchTerm.trim() === '') return true
      const term = searchTerm.trim().toLowerCase()
      return (
        k.name.toLowerCase().includes(term) ||
        (k.description ?? '').toLowerCase().includes(term)
      )
    })
  }, [allKeys, excludedKeyIds, searchTerm])

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
          onChange={ (e) => { setSearchTerm(e.target.value) } }
          placeholder={ t('classification-store.search-keys') }
          value={ searchTerm }
        />

        <Content
          overflow={ { x: 'hidden', y: 'auto' } }
          style={ { maxHeight: 'calc(65vh - 80px)', minHeight: 120 } }
        >
          <Grid
            columns={ columns }
            data={ availableKeys }
            enableMultipleRowSelection
            isLoading={ isLoading }
            onSelectedRowsChange={ setSelectedRows }
            selectedRows={ selectedRows }
            setRowId={ (row: ClassificationStoreConfigurationKeyDetail) => row.id !== undefined ? String(row.id) : '' }
          />
        </Content>
      </Flex>
    </Modal>
  )
}
