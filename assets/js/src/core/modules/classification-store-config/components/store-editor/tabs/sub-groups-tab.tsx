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
import { appConfig } from '@Pimcore/app/config/app-config'
import { theme } from 'antd'
import { isString } from 'lodash'
import { type SerializedError } from '@reduxjs/toolkit'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useTranslation } from 'react-i18next'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import { Alert } from '@Pimcore/components/alert/alert'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Grid } from '@Pimcore/components/grid/grid'
import { Input } from '@Pimcore/components/input/input'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { createColumnHelper, type SortingState } from '@tanstack/react-table'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Header } from '@Pimcore/components/header/header'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type ClassificationStoreConfigurationSubGroupDetail,
  useClassificationStoreConfigurationSubGroupCollectionQuery,
  useClassificationStoreConfigurationSubGroupCreateMutation,
  useClassificationStoreConfigurationSubGroupDeleteMutation,
  useClassificationStoreConfigurationSubGroupUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'

interface ISubGroupsTabProps {
  storeId: number
}

/** Message of a refused delete, which names the groups still using the sub group. */
const inUseMessage = (error: FetchBaseQueryError | SerializedError): string | undefined => {
  if (!('status' in error) || error.status !== 409) return undefined

  const message = (error.data as { message?: unknown } | undefined)?.message

  return isString(message) && message.trim() !== '' ? message : undefined
}

export const SubGroupsTab = ({ storeId }: ISubGroupsTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const { localModal: modal } = useStudioModal()
  const [subGroupForm] = Form.useForm<{ name: string, description: string }>()

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(appConfig.defaultPageSize)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([])

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
        columnFilters: searchTerm.length > 0
          ? [{ type: 'search', filterValue: searchTerm }]
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

  const { data, isLoading, isFetching, refetch } = useClassificationStoreConfigurationSubGroupCollectionQuery(queryArgs)

  const subGroups = data?.items ?? []
  const total = data?.totalItems ?? 0

  useEffect(() => {
    if (data?.items.length === 0 && data.totalItems > 0 && page > 1) {
      setPage(page - 1)
    }
  }, [data, page])

  const [createSubGroup] = useClassificationStoreConfigurationSubGroupCreateMutation()
  const [updateSubGroup] = useClassificationStoreConfigurationSubGroupUpdateMutation()
  const [deleteSubGroup] = useClassificationStoreConfigurationSubGroupDeleteMutation()

  const handleAdd = (): void => {
    subGroupForm.setFieldsValue({
      name: '',
      description: ''
    })

    void modal.confirm({
      icon: null,
      title: t('classification-store.add-sub-group'),
      content: (
        <>
          <Alert
            message={ t('classification-store.add-sub-group-store-hint') }
            showIcon
            style={ { marginBottom: token.marginXS } }
            type="info"
          />
          <Form
            form={ subGroupForm }
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
        </>
      ),
      onOk: async () => {
        const values = await subGroupForm.validateFields()
        const description = values.description.trim() === '' ? null : values.description

        const createResponse = await createSubGroup({
          classificationStoreConfigurationSubGroupCreate: { name: values.name, storeId }
        })

        if ('error' in createResponse) {
          trackError(new ApiError(createResponse.error!))
          return
        }

        if (description !== null) {
          const updateResponse = await updateSubGroup({
            id: createResponse.data.id,
            classificationStoreConfigurationSubGroupUpdate: {
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

  const handleDelete = (subGroup: ClassificationStoreConfigurationSubGroupDetail): void => {
    void modal.confirm({
      title: t('delete'),
      content: t('classification-store.delete-sub-group', { subGroupName: subGroup.name }),
      onOk: async () => {
        const response = await deleteSubGroup({ id: subGroup.id })

        if (!('error' in response)) return

        const stillInUse = inUseMessage(response.error!)

        if (stillInUse === undefined) {
          trackError(new ApiError(response.error!))
          return
        }

        void modal.error({
          title: t('delete'),
          content: (
            <Alert
              description={ t('classification-store.delete-sub-group-in-use-hint') }
              message={ stillInUse }
              showIcon
              type="error"
            />
          )
        })
      }
    })
  }

  const handleUpdate = useCallback(async (
    subGroup: ClassificationStoreConfigurationSubGroupDetail,
    name: string,
    description: string | null
  ): Promise<void> => {
    const response = await updateSubGroup({
      id: subGroup.id,
      classificationStoreConfigurationSubGroupUpdate: { name, description }
    })

    if ('error' in response) {
      trackError(new ApiError(response.error!))
    }
  }, [updateSubGroup])

  const columnHelper = useMemo(() => createColumnHelper<ClassificationStoreConfigurationSubGroupDetail>(), [])

  // Ref-forwarding: keep stable refs so columns useMemo never needs handler deps
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
    columnHelper.accessor('description', {
      header: t('classification-store.columns.description'),
      size: 200,
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
            showTotal={ (total) => t('pagination.show-total', { total }) }
            total={ total }
          />
        </Toolbar>
      }
      renderTopBar={
        <Flex
          align="center"
          justify="space-between"
          style={ { padding: `${token.paddingXS}px ${token.padding}px` } }
        >
          <Flex
            align="center"
            gap="small"
          >
            <Header title={ t('classification-store.tabs.sub-groups') } />
            <IconTextButton
              icon={ { value: 'new' } }
              onClick={ handleAdd }
            >
              {t('classification-store.add-sub-group')}
            </IconTextButton>
          </Flex>
          <SearchInput
            loading={ isFetching }
            onSearch={ (value) => {
              setSearchTerm(value)
              setPage(1)
            } }
            placeholder={ t('search') }
          />
        </Flex>
      }
    >
      <Flex
        style={ { height: '100%', padding: '0 16px' } }
        vertical
      >
        { !isLoading && subGroups.length === 0
          ? <NoContent text={ t('classification-store.no-sub-groups') } />
          : (
            <Grid
              columns={ columns }
              data={ subGroups }
              enableSorting
              isLoading={ isLoading || isFetching }
              manualSorting
              onSortingChange={ onSortingChange }
              onUpdateCellData={ ({ columnId, value, rowData }) => {
                const typedRow = rowData as ClassificationStoreConfigurationSubGroupDetail
                if (columnId === 'name') {
                  const newName = (value as string).trim()
                  if (newName === '') return
                  void handleUpdate(typedRow, newName, typedRow.description ?? null)
                } else if (columnId === 'description') {
                  const newDescription = (value as string).trim()
                  void handleUpdate(typedRow, typedRow.name, newDescription === '' ? null : newDescription)
                }
              } }
              sorting={ sorting }
            />
            ) }
      </Flex>
    </ContentLayout>
  )
}
