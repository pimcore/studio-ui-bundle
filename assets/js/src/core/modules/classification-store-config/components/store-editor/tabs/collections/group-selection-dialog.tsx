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
  type ClassificationStoreConfigurationGroupDetail,
  useClassificationStoreConfigurationGroupCollectionQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { Flex } from '@Pimcore/components/flex/flex'

interface IGroupSelectionDialogProps {
  open: boolean
  storeId: number
  excludedGroupIds: number[]
  onConfirm: (groups: ClassificationStoreConfigurationGroupDetail[]) => void
  onCancel: () => void
}

export const GroupSelectionDialog = ({
  open,
  storeId,
  excludedGroupIds,
  onConfirm,
  onCancel
}: IGroupSelectionDialogProps): React.JSX.Element => {
  const { t } = useTranslation()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  const { data, isLoading } = useClassificationStoreConfigurationGroupCollectionQuery(
    { storeId, body: { filters: { page: 1, pageSize: 9999 } } },
    { skip: !open }
  )

  const allGroups = data?.items ?? []

  // Reset selection and search when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedRows({})
      setSearchTerm('')
    }
  }, [open])

  const availableGroups = useMemo(() => {
    const excludedSet = new Set(excludedGroupIds)
    return allGroups.filter((g) => {
      if (excludedSet.has(g.id)) return false
      if (searchTerm.trim() === '') return true
      const term = searchTerm.trim().toLowerCase()
      return (
        g.name.toLowerCase().includes(term) ||
        (g.description ?? '').toLowerCase().includes(term)
      )
    })
  }, [allGroups, excludedGroupIds, searchTerm])

  const columnHelper = createColumnHelper<ClassificationStoreConfigurationGroupDetail>()

  const columns = [
    columnHelper.accessor('id', {
      header: t('classification-store.columns.id'),
      size: 60
    }),
    columnHelper.accessor('name', {
      header: t('classification-store.columns.name'),
      size: 200
    }),
    columnHelper.accessor('description', {
      header: t('classification-store.columns.description'),
      size: 300,
      cell: (info) => info.getValue() ?? '-'
    })
  ]

  const selectedGroups = useMemo(() => {
    return availableGroups.filter((g) => selectedRows[String(g.id)])
  }, [selectedRows, availableGroups])

  const handleOk = (): void => {
    if (selectedGroups.length > 0) {
      onConfirm(selectedGroups)
    }
  }

  return (
    <Modal
      okButtonProps={ { disabled: selectedGroups.length === 0 } }
      okText={ t('classification-store.add-group') }
      onCancel={ onCancel }
      onOk={ handleOk }
      open={ open }
      styles={ { body: { maxHeight: '65vh', overflowY: 'auto' } } }
      title={ t('classification-store.select-group') }
      width={ 600 }
    >
      <Flex
        gap="small"
        vertical
      >
        <Input.Search
          onChange={ (e) => { setSearchTerm(e.target.value) } }
          placeholder={ t('classification-store.search-groups') }
          value={ searchTerm }
        />

        <Content
          overflow={ { x: 'hidden', y: 'auto' } }
          style={ { maxHeight: 'calc(65vh - 80px)', minHeight: 120 } }
        >
          <Grid
            columns={ columns }
            data={ availableGroups }
            enableMultipleRowSelection
            isLoading={ isLoading }
            onSelectedRowsChange={ setSelectedRows }
            selectedRows={ selectedRows }
            setRowId={ (row: ClassificationStoreConfigurationGroupDetail) => row.id !== undefined ? String(row.id) : undefined as unknown as string }
          />
        </Content>
      </Flex>
    </Modal>
  )
}
