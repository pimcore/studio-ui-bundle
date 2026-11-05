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
import { Input } from 'antd'
import { Modal } from '@Pimcore/components/modal/modal'
import { Grid } from '@Pimcore/components/grid/grid'
import { Content } from '@Pimcore/components/content/content'
import { createColumnHelper } from '@tanstack/react-table'
import { type RowSelectionState } from '@tanstack/react-table'
import {
  type ClassificationStoreConfigurationSubGroupDetail,
  useClassificationStoreConfigurationSubGroupCollectionQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { Flex } from '@Pimcore/components/flex/flex'
import { hasIdentifier } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface ISubGroupSelectionDialogProps {
  open: boolean
  storeId: number
  confirmLoading?: boolean
  onConfirm: (subGroup: ClassificationStoreConfigurationSubGroupDetail) => void
  onCancel: () => void
}

export const SubGroupSelectionDialog = ({
  open,
  storeId,
  confirmLoading = false,
  onConfirm,
  onCancel
}: ISubGroupSelectionDialogProps): React.JSX.Element => {
  const { t } = useTranslation()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  // The whole vocabulary of the store, so a sub group no key of this group carries yet
  // can be picked too. Creating one stays on the Sub groups tab of the store.
  const { data, error, isError, isLoading } = useClassificationStoreConfigurationSubGroupCollectionQuery(
    { storeId, body: { filters: { page: 1, pageSize: 9999 } } },
    { skip: !open }
  )

  // A refused vocabulary request must say so: a 403 or a 500 left `data` undefined, which the
  // empty default turned into a picker with nothing in it and Assign disabled, reading as a store
  // whose vocabulary is empty rather than as a load that failed.
  useEffect(() => {
    if (isError && error !== undefined) {
      trackError(new ApiError(error))
    }
  }, [isError, error])

  const allSubGroups = data?.items ?? []

  // Reset selection and search when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedRows({})
      setSearchTerm('')
    }
  }, [open])

  const availableSubGroups = useMemo(() => {
    // Only sub groups the server has given an identifier: that is the value a key-group
    // relation stores, so one without it cannot be assigned and must not be offered.
    return allSubGroups.filter(hasIdentifier).filter((s) => {
      if (searchTerm.trim() === '') return true
      const term = searchTerm.trim().toLowerCase()
      return (
        s.name.toLowerCase().includes(term) ||
        (s.description ?? '').toLowerCase().includes(term)
      )
    })
  }, [allSubGroups, searchTerm])

  const columnHelper = createColumnHelper<ClassificationStoreConfigurationSubGroupDetail>()

  const columns = [
    columnHelper.accessor('name', {
      header: t('classification-store.columns.name'),
      size: 200
    }),
    // The description absorbs what the fixed columns leave, so the table never outgrows the dialog.
    columnHelper.accessor('description', {
      header: t('classification-store.columns.description'),
      size: 150,
      cell: (info) => info.getValue() ?? '-',
      meta: { autoWidth: true }
    })
  ]

  const selectedSubGroup = useMemo(() => {
    return availableSubGroups.find((s) => selectedRows[String(s.id)])
  }, [selectedRows, availableSubGroups])

  const handleOk = (): void => {
    if (selectedSubGroup !== undefined) {
      onConfirm(selectedSubGroup)
    }
  }

  return (
    <Modal
      confirmLoading={ confirmLoading }
      okButtonProps={ { disabled: selectedSubGroup === undefined } }
      okText={ t('classification-store.assign-sub-group') }
      onCancel={ onCancel }
      onOk={ handleOk }
      open={ open }
      styles={ { body: { maxHeight: '65vh', overflowY: 'auto' } } }
      title={ t('classification-store.select-sub-group') }
      width={ 600 }
    >
      <Flex
        gap="small"
        vertical
      >
        <Input.Search
          onChange={ (e) => { setSearchTerm(e.target.value) } }
          placeholder={ t('classification-store.search-sub-groups') }
          value={ searchTerm }
        />

        <Content
          overflow={ { x: 'hidden', y: 'auto' } }
          style={ { maxHeight: 'calc(65vh - 80px)', minHeight: 120 } }
        >
          <Grid
            autoWidth
            columns={ columns }
            data={ availableSubGroups }
            enableRowSelection
            isLoading={ isLoading }
            onSelectedRowsChange={ setSelectedRows }
            selectedRows={ selectedRows }
            setRowId={ (row: ClassificationStoreConfigurationSubGroupDetail) => row.id !== undefined ? String(row.id) : undefined as unknown as string }
          />
        </Content>
      </Flex>
    </Modal>
  )
}
