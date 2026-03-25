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
  type ClassificationStoreConfigurationCollectionRelationDetail,
  type ClassificationStoreConfigurationGroupDetail,
  useClassificationStoreConfigurationCollectionRelationCollectionQuery,
  useClassificationStoreConfigurationCollectionRelationCreateMutation,
  useClassificationStoreConfigurationCollectionRelationDeleteMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { GroupSelectionDialog } from './group-selection-dialog'

interface ICollectionGroupRelationsGridProps {
  storeId: number
  colId: number | undefined
  collectionName: string | undefined
}

export const CollectionGroupRelationsGrid = ({
  storeId,
  colId,
  collectionName
}: ICollectionGroupRelationsGridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const modal = useFormModal()

  const [groupDialogOpen, setGroupDialogOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const { data, isLoading, isFetching, refetch } = useClassificationStoreConfigurationCollectionRelationCollectionQuery(
    { colId: colId!, body: { filters: { page, pageSize } } },
    { skip: colId === undefined }
  )

  const relations = data?.items ?? []
  const total = data?.totalItems ?? 0

  const [createRelation] = useClassificationStoreConfigurationCollectionRelationCreateMutation()
  const [deleteRelation] = useClassificationStoreConfigurationCollectionRelationDeleteMutation()

  const handleRemove = useCallback((relation: ClassificationStoreConfigurationCollectionRelationDetail): void => {
    void modal.confirm({
      title: t('delete'),
      content: t('classification-store.delete-group-relation', { groupName: relation.groupName ?? String(relation.groupId) }),
      onOk: async () => {
        const response = await deleteRelation({
          classificationStoreConfigurationCollectionRelationDelete: {
            colId: relation.colId,
            groupId: relation.groupId
          }
        })

        if ('error' in response) {
          trackError(new ApiError(response.error!))
        }
      }
    })
  }, [modal, deleteRelation, t])

  const handleSorterChange = useCallback(async (
    relation: ClassificationStoreConfigurationCollectionRelationDetail,
    sorter: number
  ): Promise<void> => {
    const response = await createRelation({
      classificationStoreConfigurationCollectionRelationCreate: {
        colId: relation.colId,
        groupId: relation.groupId,
        sorter
      }
    })

    if ('error' in response) {
      trackError(new ApiError(response.error!))
    }
  }, [createRelation])

  const handleAddGroup = useCallback(async (groups: ClassificationStoreConfigurationGroupDetail[]): Promise<void> => {
    if (colId === undefined) return
    setGroupDialogOpen(false)
    const results = await Promise.all(
      groups.map(async (group) => await createRelation({
        classificationStoreConfigurationCollectionRelationCreate: {
          colId,
          groupId: group.id,
          sorter: 0
        }
      }))
    )
    for (const response of results) {
      if ('error' in response) {
        trackError(new ApiError(response.error!))
      }
    }
  }, [colId, createRelation])

  const columnHelper = useMemo(() => createColumnHelper<ClassificationStoreConfigurationCollectionRelationDetail>(), [])

  const columns = useMemo(() => [
    columnHelper.accessor('groupId', {
      header: t('classification-store.columns.id'),
      size: 60
    }),
    columnHelper.accessor('groupName', {
      header: t('classification-store.columns.name'),
      size: 200,
      meta: { type: 'input' }
    }),
    columnHelper.accessor('groupDescription', {
      header: t('classification-store.columns.description'),
      size: 200,
      meta: { type: 'input' }
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
  const excludedGroupIds = useMemo(() => relations.map((r) => r.groupId), [relations])

  const headerTitle = colId !== undefined
    ? t('classification-store.collection-relations-title', { name: collectionName ?? String(colId) })
    : t('classification-store.select-collection-hint')

  return (
    <ContentLayout
      renderToolbar={ colId !== undefined
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
          { colId !== undefined && (
            <IconTextButton
              icon={ { value: 'new' } }
              onClick={ () => { setGroupDialogOpen(true) } }
            >
              {t('classification-store.add-group')}
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
            const typedRow = rowData as ClassificationStoreConfigurationCollectionRelationDetail
            if (columnId === 'sorter' && value !== null) {
              void handleSorterChange(typedRow, value as number)
            }
          } }
        />
      </Flex>

      <GroupSelectionDialog
        excludedGroupIds={ excludedGroupIds }
        onCancel={ () => { setGroupDialogOpen(false) } }
        onConfirm={ (groups) => { void handleAddGroup(groups) } }
        open={ groupDialogOpen }
        storeId={ storeId }
      />
    </ContentLayout>
  )
}
