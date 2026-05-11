/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Header } from '@Pimcore/components/header/header'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type ClassificationStoreConfigurationKeyGroupRelationDetail,
  type ClassificationStoreConfigurationKeyDetail,
  useClassificationStoreConfigurationKeyGroupRelationCollectionQuery,
  useClassificationStoreConfigurationKeyGroupRelationCreateMutation,
  useClassificationStoreConfigurationKeyGroupRelationDeleteMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { KeySelectionDialog } from './key-selection-dialog'

interface IKeyGroupRelationsGridProps {
  storeId: number
  groupId: number | undefined
  groupName: string | undefined
}

export const KeyGroupRelationsGrid = ({
  storeId,
  groupId,
  groupName
}: IKeyGroupRelationsGridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const modal = useFormModal()

  const [keyDialogOpen, setKeyDialogOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const { data, isLoading, isFetching, refetch } = useClassificationStoreConfigurationKeyGroupRelationCollectionQuery(
    { groupId: groupId!, body: { filters: { page, pageSize } } },
    { skip: groupId === undefined }
  )

  const relations = data?.items ?? []
  const total = data?.totalItems ?? 0

  const [createRelation] = useClassificationStoreConfigurationKeyGroupRelationCreateMutation()
  const [deleteRelation] = useClassificationStoreConfigurationKeyGroupRelationDeleteMutation()

  const handleRemove = useCallback((relation: ClassificationStoreConfigurationKeyGroupRelationDetail): void => {
    void modal.confirm({
      title: t('delete'),
      content: t('classification-store.delete-key-relation', { keyName: relation.keyName ?? String(relation.keyId) }),
      onOk: async () => {
        const response = await deleteRelation({
          classificationStoreConfigurationKeyGroupRelationDelete: {
            keyId: relation.keyId,
            groupId: relation.groupId
          }
        })

        if ('error' in response) {
          trackError(new ApiError(response.error!))
        }
      }
    })
  }, [modal, deleteRelation, t])

  const handleMandatoryChange = useCallback(async (
    relation: ClassificationStoreConfigurationKeyGroupRelationDetail,
    mandatory: boolean
  ): Promise<void> => {
    const response = await createRelation({
      classificationStoreConfigurationKeyGroupRelationCreate: {
        keyId: relation.keyId,
        groupId: relation.groupId,
        sorter: relation.sorter,
        mandatory
      }
    })

    if ('error' in response) {
      trackError(new ApiError(response.error!))
    }
  }, [createRelation])

  const handleSorterChange = useCallback(async (
    relation: ClassificationStoreConfigurationKeyGroupRelationDetail,
    sorter: number
  ): Promise<void> => {
    const response = await createRelation({
      classificationStoreConfigurationKeyGroupRelationCreate: {
        keyId: relation.keyId,
        groupId: relation.groupId,
        sorter,
        mandatory: relation.mandatory
      }
    })

    if ('error' in response) {
      trackError(new ApiError(response.error!))
    }
  }, [createRelation])

  const handleAddKey = useCallback(async (keys: ClassificationStoreConfigurationKeyDetail[]): Promise<void> => {
    if (groupId === undefined) return
    setKeyDialogOpen(false)
    const results = await Promise.all(
      keys.map(async (key) => await createRelation({
        classificationStoreConfigurationKeyGroupRelationCreate: {
          keyId: key.id,
          groupId,
          sorter: 0,
          mandatory: false
        }
      }))
    )
    for (const response of results) {
      if ('error' in response) {
        trackError(new ApiError(response.error!))
      }
    }
  }, [groupId, createRelation])

  const columnHelper = useMemo(() => createColumnHelper<ClassificationStoreConfigurationKeyGroupRelationDetail>(), [])

  const columns = useMemo(() => [
    columnHelper.accessor('keyId', {
      header: t('classification-store.columns.id'),
      size: 60
    }),
    columnHelper.accessor('keyName', {
      header: t('classification-store.columns.name'),
      size: 200,
      meta: { type: 'input' }
    }),
    columnHelper.accessor('keyDescription', {
      header: t('classification-store.columns.description'),
      size: 200,
      meta: { type: 'input' }
    }),
    columnHelper.accessor('mandatory', {
      header: t('classification-store.columns.mandatory'),
      size: 100,
      meta: { type: 'boolean', editable: true, config: { align: 'center' } }
    }),
    columnHelper.accessor('sorter', {
      header: t('classification-store.columns.sorter'),
      size: 100,
      meta: { type: 'number', editable: true }
    }),
    columnHelper.display({
      id: 'actions',
      header: t('classification-store.columns.actions'),
      size: 60,
      cell: (info) => (
        <IconButton
          icon={ { value: 'trash' } }
          onClick={ () => { handleRemove(info.row.original) } }
          tooltip={ { title: t('delete') } }
        />
      )
    })
  ], [t, handleRemove, columnHelper])

  // Stable array — only recomputed when relations change
  const excludedKeyIds = useMemo(() => relations.map((r) => r.keyId), [relations])

  const headerTitle = groupId !== undefined
    ? t('classification-store.relations-title', { name: groupName ?? String(groupId) })
    : t('classification-store.select-group-hint')

  return (
    <ContentLayout
      renderToolbar={ groupId !== undefined
        ? (
          <Toolbar theme="secondary">
            { isLoading
              ? null
              : (
                <IconButton
                  icon={ { value: 'refresh' } }
                  loading={ isFetching }
                  onClick={ () => { void refetch() } }
                  tooltip={ { title: t('refresh') } }
                />
                ) }
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
          </Toolbar>
          )
        : undefined }
      renderTopBar={
        <Flex
          align="center"
          justify="space-between"
          style={ { padding: '8px 16px' } }
        >
          <Header title={ headerTitle } />
          { groupId !== undefined && (
            <IconTextButton
              icon={ { value: 'new' } }
              onClick={ () => { setKeyDialogOpen(true) } }
            >
              {t('classification-store.add-key')}
            </IconTextButton>
          ) }
        </Flex>
      }
    >
      <Flex
        style={ { height: '100%', padding: '0 16px' } }
        vertical
      >
        <Grid
          columns={ columns }
          data={ relations }
          isLoading={ isLoading || isFetching }
          onUpdateCellData={ ({ columnId, value, rowData }) => {
            const typedRow = rowData as ClassificationStoreConfigurationKeyGroupRelationDetail
            if (columnId === 'mandatory') {
              void handleMandatoryChange(typedRow, value as boolean)
            } else if (columnId === 'sorter' && value !== null) {
              void handleSorterChange(typedRow, value as number)
            }
          } }
        />
      </Flex>

      <KeySelectionDialog
        excludedKeyIds={ excludedKeyIds }
        onCancel={ () => { setKeyDialogOpen(false) } }
        onConfirm={ (keys) => { void handleAddKey(keys) } }
        open={ keyDialogOpen }
        storeId={ storeId }
      />
    </ContentLayout>
  )
}
