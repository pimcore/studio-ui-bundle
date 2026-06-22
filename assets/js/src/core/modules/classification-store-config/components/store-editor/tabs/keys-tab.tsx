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
import { kebabCase } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Grid } from '@Pimcore/components/grid/grid'
import { Input } from '@Pimcore/components/input/input'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { createColumnHelper, type SortingState } from '@tanstack/react-table'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Header } from '@Pimcore/components/header/header'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type DynamicTypeFieldDefinitionRegistry } from '@Pimcore/modules/field-definitions/dynamic-types/dynamic-type-field-definition-registry'
import { serviceIds, useInjection } from '@sdk/app'
import {
  type ClassificationStoreConfigurationKeyDetail,
  useClassificationStoreConfigurationKeyCollectionQuery,
  useClassificationStoreConfigurationKeyCreateMutation,
  useClassificationStoreConfigurationKeyDeleteMutation,
  useClassificationStoreConfigurationKeyUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { KeyDefinitionModal } from './keys/key-definition-modal'

interface IKeysTabProps {
  storeId: number
}

type KeyRow = ClassificationStoreConfigurationKeyDetail & { title: string | undefined }

export const KeysTab = ({ storeId }: IKeysTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { modal } = App.useApp()
  const [keyForm] = Form.useForm<{ name: string, description: string }>()

  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

  const typeSelectOptions = useMemo(() => (
    fieldDefinitionRegistry
      .getTypesByTags(['classificationStore'], { area: ['classification-store'], path: [], fieldDefinitions: {} })
      .map((type) => ({
        label: t('field-definition.' + kebabCase(type.id)),
        value: type.id
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  ), [fieldDefinitionRegistry, t])

  const [definitionKeyId, setDefinitionKeyId] = useState<number | undefined>(undefined)
  const [definitionModalOpen, setDefinitionModalOpen] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
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

  const { data, isLoading, isFetching, refetch } = useClassificationStoreConfigurationKeyCollectionQuery(queryArgs)

  const keys = data?.items ?? []
  const total = data?.totalItems ?? 0

  useEffect(() => {
    if (data?.items.length === 0 && data.totalItems > 0 && page > 1) {
      setPage(page - 1)
    }
  }, [data, page])

  // Derive the current key object from the live cache by ID so the definition
  // modal always receives the latest values (e.g. after an optimistic type change).
  const definitionKey = definitionKeyId !== undefined
    ? keys.find((k) => k.id === definitionKeyId)
    : undefined

  const [createKey] = useClassificationStoreConfigurationKeyCreateMutation()
  const [updateKey] = useClassificationStoreConfigurationKeyUpdateMutation()
  const [deleteKey] = useClassificationStoreConfigurationKeyDeleteMutation()

  const getKeyTitle = (key: ClassificationStoreConfigurationKeyDetail): string | null => {
    const keyDefinition = key.definition as { title?: unknown } | null
    return typeof keyDefinition?.title === 'string' ? keyDefinition.title : null
  }

  const gridData = useMemo(
    () => keys.map((key) => ({ ...key, title: getKeyTitle(key) ?? undefined })),
    [keys]
  )

  const handleAdd = (): void => {
    keyForm.setFieldsValue({
      name: '',
      description: ''
    })

    void modal.confirm({
      icon: null,
      title: t('classification-store.add-key'),
      content: (
        <Form
          form={ keyForm }
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
        const values = await keyForm.validateFields()
        const description = values.description.trim() === '' ? null : values.description

        const createResponse = await createKey({
          classificationStoreConfigurationKeyCreate: { name: values.name, storeId }
        })

        if ('error' in createResponse) {
          trackError(new ApiError(createResponse.error!))
          return
        }

        if (description !== null) {
          const createdKey = createResponse.data
          const updateResponse = await updateKey({
            id: createdKey.id,
            classificationStoreConfigurationKeyUpdate: {
              name: createdKey.name,
              title: getKeyTitle(createdKey),
              description,
              type: createdKey.type,
              definition: createdKey.definition
            }
          })

          if ('error' in updateResponse) {
            trackError(new ApiError(updateResponse.error!))
          }
        }
      }
    })
  }

  const handleOpenDefinition = (key: ClassificationStoreConfigurationKeyDetail): void => {
    setDefinitionKeyId(key.id)
    setDefinitionModalOpen(true)
  }

  const handleCloseDefinition = (): void => {
    setDefinitionModalOpen(false)
    setDefinitionKeyId(undefined)
  }

  const handleDefinitionSaved = (): void => {
    setDefinitionModalOpen(false)
    setDefinitionKeyId(undefined)
  }

  const handleDelete = (key: ClassificationStoreConfigurationKeyDetail): void => {
    void modal.confirm({
      title: t('delete'),
      content: t('classification-store.delete-key', { keyName: key.name }),
      onOk: async () => {
        const response = await deleteKey({ id: key.id })

        if ('error' in response) {
          trackError(new ApiError(response.error!))
        }
      }
    })
  }

  const handleTitleChange = useCallback(async (
    key: KeyRow,
    newTitle: string
  ): Promise<void> => {
    const response = await updateKey({
      id: key.id,
      classificationStoreConfigurationKeyUpdate: {
        name: key.name,
        title: newTitle.trim() === '' ? null : newTitle,
        description: key.description ?? null,
        type: key.type,
        definition: key.definition
      }
    })

    if ('error' in response) {
      trackError(new ApiError(response.error!))
    }
  }, [updateKey])

  const handleTypeChange = useCallback(async (
    key: ClassificationStoreConfigurationKeyDetail,
    newType: string
  ): Promise<void> => {
    const response = await updateKey({
      id: key.id,
      classificationStoreConfigurationKeyUpdate: {
        name: key.name,
        title: getKeyTitle(key),
        description: key.description ?? null,
        type: newType,
        definition: null
      }
    })

    if ('error' in response) {
      trackError(new ApiError(response.error!))
    }
  }, [updateKey])

  const columnHelper = useMemo(() => createColumnHelper<KeyRow>(), [])

  // Ref-forwarding: keep stable refs so columns useMemo never needs handler deps
  const handleOpenDefinitionRef = useRef(handleOpenDefinition)
  handleOpenDefinitionRef.current = handleOpenDefinition
  const handleDeleteRef = useRef(handleDelete)
  handleDeleteRef.current = handleDelete
  const handleTitleChangeRef = useRef(handleTitleChange)
  handleTitleChangeRef.current = handleTitleChange
  const handleTypeChangeRef = useRef(handleTypeChange)
  handleTypeChangeRef.current = handleTypeChange

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: t('classification-store.columns.id'),
      size: 60
    }),
    columnHelper.accessor('name', {
      header: t('classification-store.columns.name'),
      size: 160,
      meta: { type: 'input', editable: true }
    }),
    columnHelper.accessor('title', {
      header: t('classification-store.columns.title'),
      size: 160,
      meta: { type: 'input', editable: true }
    }),
    columnHelper.accessor('type', {
      header: t('classification-store.columns.type'),
      size: 180,
      meta: {
        type: 'select',
        editable: true,
        config: { options: typeSelectOptions }
      }
    }),
    columnHelper.accessor('description', {
      header: t('classification-store.columns.description'),
      size: 200,
      meta: { type: 'input', editable: true }
    }),

    columnHelper.display({
      id: 'actions',
      header: t('classification-store.columns.actions'),
      size: 90,
      cell: (info) => (
        <Flex
          align="center"
          gap="mini"
        >
          <IconButton
            icon={ { value: 'edit' } }
            onClick={ () => { handleOpenDefinitionRef.current(info.row.original) } }
            tooltip={ { title: t('classification-store.edit-definition') } }
          />
          <IconButton
            icon={ { value: 'trash' } }
            onClick={ () => { handleDeleteRef.current(info.row.original) } }
            tooltip={ { title: t('delete') } }
          />
        </Flex>
      )
    })
  ], [t, columnHelper, typeSelectOptions])

  return (
    <>
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
            style={ { padding: '8px 16px' } }
          >
            <Flex
              align="center"
              gap="small"
            >
              <Header title={ t('classification-store.tabs.keys') } />
              <IconTextButton
                icon={ { value: 'new' } }
                onClick={ handleAdd }
              >
                {t('classification-store.add-key')}
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
          <Grid
            columns={ columns }
            data={ gridData }
            enableSorting
            isLoading={ isLoading || isFetching }
            manualSorting
            onSortingChange={ onSortingChange }
            onUpdateCellData={ ({ columnId, value, rowData }) => {
              const typedRow = rowData as KeyRow
              if (columnId === 'name') {
                const newName = (value as string).trim()
                if (newName === '') return
                void updateKey({
                  id: typedRow.id,
                  classificationStoreConfigurationKeyUpdate: {
                    name: newName,
                    title: getKeyTitle(typedRow),
                    description: typedRow.description ?? null,
                    type: typedRow.type,
                    definition: typedRow.definition
                  }
                }).then((response) => { if ('error' in response) trackError(new ApiError(response.error!)) })
              } else if (columnId === 'title') {
                void handleTitleChangeRef.current(typedRow, value as string)
              } else if (columnId === 'type') {
                void handleTypeChangeRef.current(typedRow as ClassificationStoreConfigurationKeyDetail, value as string)
              } else if (columnId === 'description') {
                void updateKey({
                  id: typedRow.id,
                  classificationStoreConfigurationKeyUpdate: {
                    name: typedRow.name,
                    title: getKeyTitle(typedRow),
                    description: (value as string).trim() === '' ? null : (value as string),
                    type: typedRow.type,
                    definition: typedRow.definition
                  }
                }).then((response) => { if ('error' in response) trackError(new ApiError(response.error!)) })
              }
            } }
            sorting={ sorting }
          />
        </Flex>
      </ContentLayout>

      <KeyDefinitionModal
        keyDetail={ definitionKey }
        onClose={ handleCloseDefinition }
        onSaved={ handleDefinitionSaved }
        open={ definitionModalOpen }
      />
    </>
  )
}
