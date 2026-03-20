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

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { App } from 'antd'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Grid } from '@Pimcore/components/grid/grid'
import { Input } from '@Pimcore/components/input/input'
import { createColumnHelper } from '@tanstack/react-table'
import { type RowSelectionState } from '@tanstack/react-table'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Header } from '@Pimcore/components/header/header'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useDebouncedFormChange } from '@Pimcore/components/form/hooks/use-debounced-form-change'
import {
  type ClassificationStoreConfigurationCollectionDetail,
  useClassificationStoreConfigurationCollectionCollectionQuery,
  useClassificationStoreConfigurationCollectionCreateMutation,
  useClassificationStoreConfigurationCollectionDeleteMutation,
  useClassificationStoreConfigurationCollectionUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { CollectionGroupRelationsGrid } from './collections/collection-group-relations-grid'
import { NoContent } from '@Pimcore/components/no-content/no-content'

interface ICollectionsTabProps {
  storeId: number
}

interface ICollectionDetailFormValues {
  name: string
  description: string
}

export const CollectionsTab = ({ storeId }: ICollectionsTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { modal } = App.useApp()
  const [collectionForm] = Form.useForm<{ name: string, description: string }>()
  const [detailForm] = Form.useForm<ICollectionDetailFormValues>()

  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const { data, isLoading, isFetching, refetch } = useClassificationStoreConfigurationCollectionCollectionQuery({
    storeId,
    body: { filters: { page, pageSize } }
  })

  const collections = data?.items ?? []
  const total = data?.totalItems ?? 0

  const [createCollection] = useClassificationStoreConfigurationCollectionCreateMutation()
  const [updateCollection] = useClassificationStoreConfigurationCollectionUpdateMutation()
  const [deleteCollection] = useClassificationStoreConfigurationCollectionDeleteMutation()

  const activeCollection = ((): ClassificationStoreConfigurationCollectionDetail | undefined => {
    const id = Object.keys(selectedRows).find((k) => selectedRows[k])
    if (id === undefined) return undefined
    return collections.find((c) => String(c.id) === id)
  })()

  // Keep a stable ref so the debounced callback can always read the latest activeCollection
  const activeCollectionRef = useRef(activeCollection)
  activeCollectionRef.current = activeCollection

  // Sync detail form whenever the selected collection changes
  useEffect(() => {
    detailForm.setFieldsValue({
      name: activeCollection?.name ?? '',
      description: activeCollection?.description ?? ''
    })
  }, [activeCollection?.id])

  const handleDetailChange = useCallback((changedValues: Partial<ICollectionDetailFormValues>) => {
    const collection = activeCollectionRef.current
    if (collection === undefined) return

    const currentValues = detailForm.getFieldsValue()
    const newName = (currentValues.name ?? '').trim()
    const newDesc = (currentValues.description ?? '').trim()

    if ('name' in changedValues && newName === '') return

    void updateCollection({
      id: collection.id,
      classificationStoreConfigurationCollectionUpdate: {
        name: newName !== '' ? newName : collection.name,
        description: newDesc !== '' ? newDesc : null
      }
    }).then((response) => {
      if ('error' in response) {
        trackError(new ApiError(response.error!))
      }
    })
  }, [detailForm, updateCollection])

  const { handleFormChange: handleDetailFormChange } = useDebouncedFormChange(handleDetailChange, { delay: 300 })

  const handleAdd = (): void => {
    collectionForm.setFieldsValue({
      name: '',
      description: ''
    })

    void modal.confirm({
      icon: null,
      title: t('classification-store.add-collection'),
      content: (
        <Form
          form={ collectionForm }
          layout="vertical"
        >
          <Form.Item
            label={ t('classification-store.columns.name') }
            name="name"
            rules={ [{ required: true, message: t('form.validation.required') }] }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={ t('classification-store.columns.description') }
            name="description"
          >
            <Input />
          </Form.Item>
        </Form>
      ),
      onOk: async () => {
        const values = await collectionForm.validateFields()
        const description = values.description.trim() === '' ? null : values.description

        const createResponse = await createCollection({
          classificationStoreConfigurationCollectionCreate: { name: values.name, storeId }
        })

        if ('error' in createResponse) {
          trackError(new ApiError(createResponse.error!))
          return
        }

        if (description !== null) {
          const updateResponse = await updateCollection({
            id: createResponse.data.id,
            classificationStoreConfigurationCollectionUpdate: {
              name: values.name,
              description
            }
          })

          if ('error' in updateResponse) {
            trackError(new ApiError(updateResponse.error!))
          }
        }
      }
    })
  }

  const handleDelete = (collection: ClassificationStoreConfigurationCollectionDetail): void => {
    void modal.confirm({
      title: t('delete'),
      content: t('classification-store.delete-collection', { collectionName: collection.name }),
      onOk: async () => {
        const response = await deleteCollection({ id: collection.id })

        if ('error' in response) {
          trackError(new ApiError(response.error!))
          return
        }

        setSelectedRows({})
      }
    })
  }

  const columnHelper = useMemo(() => createColumnHelper<ClassificationStoreConfigurationCollectionDetail>(), [])

  // Ref-forwarding: keep stable ref so columns useMemo never needs handler deps
  const handleDeleteRef = useRef(handleDelete)
  handleDeleteRef.current = handleDelete

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: t('classification-store.columns.id'),
      size: 80
    }),
    columnHelper.accessor('name', {
      header: t('classification-store.columns.name'),
      size: 220,
      meta: { type: 'input', editable: true }
    }),
    columnHelper.display({
      id: 'actions',
      header: t('classification-store.columns.actions'),
      size: 60,
      cell: (info) => (
        <IconButton
          icon={ { value: 'trash' } }
          onClick={ () => { handleDeleteRef.current(info.row.original) } }
          tooltip={ { title: t('delete') } }
        />
      )
    })
  ], [t, columnHelper])

  return (
    <SplitLayout
      leftItem={ {
        size: 45,
        minSize: 250,
        children: (
          <ContentLayout
            renderToolbar={
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
            }
            renderTopBar={
              <Flex
                align="center"
                justify="space-between"
                style={ { padding: '8px 16px' } }
              >
                <Header title={ t('classification-store.tabs.collections') } />
                <IconTextButton
                  icon={ { value: 'new' } }
                  onClick={ handleAdd }
                >
                  {t('classification-store.add-collection')}
                </IconTextButton>
              </Flex>
            }
          >
            <Flex
              style={ { height: '100%', padding: '0 16px' } }
              vertical
            >
              <Grid
                columns={ columns }
                data={ collections }
                enableRowSelection
                isLoading={ isLoading || isFetching }
                onSelectedRowsChange={ (rows) => { setSelectedRows(rows) } }
                onUpdateCellData={ ({ columnId, value, rowData }) => {
                  if (columnId === 'name') {
                    const newName = (value as string).trim()
                    if (newName === '') return
                    void updateCollection({
                      id: rowData.id,
                      classificationStoreConfigurationCollectionUpdate: {
                        name: newName,
                        description: rowData.description ?? null
                      }
                    }).then((response) => {
                      if ('error' in response) {
                        trackError(new ApiError(response.error!))
                      }
                    })
                  }
                } }
                selectedRows={ selectedRows }
                setRowId={ (row: ClassificationStoreConfigurationCollectionDetail) => row.id !== undefined ? String(row.id) : undefined as unknown as string }
              />
            </Flex>
          </ContentLayout>
        )
      } }
      resizeAble
      rightItem={ {
        size: 55,
        minSize: 300,
        children: activeCollection === undefined
          ? (
            <Flex
              align="center"
              justify="center"
              style={ { height: '100%' } }
            >
              <NoContent text={ t('classification-store.select-collection-hint') } />
            </Flex>
            )
          : (
            <ContentLayout
              renderTopBar={
                <Flex
                  align="center"
                  style={ { padding: '8px 16px' } }
                >
                  <Header title={ activeCollection.name } />
                </Flex>
              }
            >
              <Flex
                style={ { height: '100%' } }
                vertical
              >
                <FormKit
                  formProps={ {
                    form: detailForm,
                    onValuesChange: handleDetailFormChange
                  } }
                  wrapInPanel={ false }
                >
                  <Flex
                    gap="small"
                    style={ { padding: '8px 16px' } }
                    vertical
                  >
                    <Form.Item
                      label={ t('classification-store.columns.name') }
                      name="name"
                      rules={ [{ required: true }] }
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={ t('classification-store.columns.description') }
                      name="description"
                    >
                      <Input />
                    </Form.Item>
                  </Flex>
                </FormKit>
                <Flex style={ { flex: 1, overflow: 'hidden' } }>
                  <CollectionGroupRelationsGrid
                    colId={ activeCollection.id }
                    collectionName={ activeCollection.name }
                    storeId={ storeId }
                  />
                </Flex>
              </Flex>
            </ContentLayout>
            )
      } }
      withDivider
      withToolbar
    />
  )
}
