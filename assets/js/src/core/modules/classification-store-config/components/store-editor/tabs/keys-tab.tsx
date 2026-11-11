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
import { useTranslation } from 'react-i18next'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import { kebabCase } from 'lodash'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { Text } from '@Pimcore/components/text/text'
import { Flex } from '@Pimcore/components/flex/flex'
import { Form } from '@Pimcore/components/form/form'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Grid } from '@Pimcore/components/grid/grid'
import { Input } from '@Pimcore/components/input/input'
import { Segmented } from '@Pimcore/components/segmented/segmented'
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
  asKeyDetail,
  type ClassificationStoreConfigurationKeyDetail,
  useClassificationStoreConfigurationKeyCollectionQuery,
  useClassificationStoreConfigurationKeyCreateMutation,
  useClassificationStoreConfigurationKeyDeleteMutation,
  useClassificationStoreConfigurationKeyRestoreMutation,
  useClassificationStoreConfigurationKeyUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { isKeyTypeHeldByEngine } from '@Pimcore/modules/field-definitions/dynamic-types/utils/classification-store-key-types'
import { useStoreEngine } from '@Pimcore/modules/classification-store-config/hooks/use-store-engine'
import { KeyDefinitionModal } from './keys/key-definition-modal'
import { MetadataModal } from './shared/metadata-modal'
import { TitlesModal } from './shared/titles-modal'
import { PairActions } from './shared/pair-actions'
import { type PairMap } from './shared/pairs'

interface IKeysTabProps {
  storeId: number
}

type KeysView = 'active' | 'deleted'

type KeyRow = ClassificationStoreConfigurationKeyDetail & { title: string | undefined }

/** The pair editor being open, and the key it was opened on. */
interface PairEditorState {
  kind: 'metadata' | 'titles'
  row: ClassificationStoreConfigurationKeyDetail
}

export const KeysTab = ({ storeId }: IKeysTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const { localModal: modal } = useStudioModal()
  const [keyForm] = Form.useForm<{ name: string, description: string }>()

  const fieldDefinitionRegistry = useInjection<DynamicTypeFieldDefinitionRegistry>(serviceIds['DynamicTypes/FieldDefinitionRegistry'])

  const { engineCapabilities } = useStoreEngine(storeId)

  const typeSelectOptions = useMemo(() => (
    fieldDefinitionRegistry
      .getTypesByTags(['classificationStore'], { area: ['classification-store'], path: [], fieldDefinitions: {} })
      .map((type) => ({ id: type.id, label: t('field-definition.' + kebabCase(type.id)) }))
      .sort((a, b) => a.label.localeCompare(b.label))
      .map(({ id, label }) => {
        if (isKeyTypeHeldByEngine(id, engineCapabilities)) {
          return { label, value: id }
        }

        return {
          label: (
            <Tooltip title={ t('classification-store.key-type-needs-document-engine') }>
              <span>{label}</span>
            </Tooltip>
          ),
          displayValue: label,
          disabled: true,
          value: id
        }
      })
  ), [fieldDefinitionRegistry, t, engineCapabilities])

  const [definitionKeyId, setDefinitionKeyId] = useState<number | undefined>(undefined)
  const [definitionModalOpen, setDefinitionModalOpen] = useState(false)
  const [pairEditor, setPairEditor] = useState<PairEditorState | undefined>(undefined)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(appConfig.defaultPageSize)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [view, setView] = useState<KeysView>('active')
  const isDeletedView = view === 'deleted'

  const viewOptions = useMemo(() => [
    { label: t('classification-store.keys-view.active'), value: 'active' },
    { label: t('classification-store.keys-view.deleted'), value: 'deleted' }
  ], [t])

  const onViewChange = useCallback((newView: string) => {
    setView(newView as KeysView)
    setSearchTerm('')
    setPage(1)
  }, [])

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
      },
      ...(isDeletedView ? { disabledOnly: true } : {})
    }
  }), [storeId, page, pageSize, searchTerm, sorting, isDeletedView])

  // currentData, so a view switch never shows the other view's rows under its own actions; the
  // Deleted view is re-read when opened, as a key deleted meanwhile is not in a cached page.
  const {
    currentData: data,
    data: lastData,
    error,
    isError,
    isLoading,
    isFetching,
    refetch
  } = useClassificationStoreConfigurationKeyCollectionQuery(
    queryArgs,
    { refetchOnMountOrArgChange: isDeletedView }
  )

  const keys = data?.items ?? []
  // Rows come from currentData; the total holds its last known value while a request is in flight
  // so the pagination does not collapse to one page on every page change, search or view switch.
  const total = (data ?? (isFetching && !isError ? lastData : undefined))?.totalItems ?? 0

  // A refused list request must not read as an empty store: a 403 or a 500 leaves `data`
  // undefined, so the failure is reported rather than left to look like "nothing here".
  useEffect(() => {
    if (isError && error !== undefined) {
      trackError(new ApiError(error))
    }
  }, [isError, error])

  useEffect(() => {
    if (data?.items.length === 0 && data.totalItems > 0 && page > 1) {
      setPage(page - 1)
    }
  }, [data, page])

  // Derive the current key object from the live cache by ID so the definition
  // modal always receives the latest values (e.g. after an optimistic type change).
  const cachedDefinitionKey = definitionKeyId !== undefined
    ? keys.find((k) => k.id === definitionKeyId)
    : undefined
  const definitionKey = cachedDefinitionKey === undefined ? undefined : asKeyDetail(cachedDefinitionKey)

  const [createKey] = useClassificationStoreConfigurationKeyCreateMutation()
  const [updateKey] = useClassificationStoreConfigurationKeyUpdateMutation()
  const [deleteKey] = useClassificationStoreConfigurationKeyDeleteMutation()
  const [restoreKey] = useClassificationStoreConfigurationKeyRestoreMutation()

  // The configured title is a column of its own on the key, and the one the object editor
  // labels the key with. Deriving it from the definition blob instead would write the blob's
  // title back over the configured one on every save that does not mean to touch the title.
  const gridData = useMemo(
    () => keys.map((key) => ({ ...key, title: key.title ?? undefined })),
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
              description,
              // This call writes the description of the key just created and nothing else, so
              // the type and the definition are left to the stored ones (see handleTitleChange).
              type: null,
              definition: null
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
      content: (
        <>
          <p>{ t('classification-store.delete-key', { keyName: key.name }) }</p>
          <p>{ t('classification-store.delete-key-consequence') }</p>
        </>
      ),
      onOk: async () => {
        const response = await deleteKey({ id: key.id })

        if ('error' in response) {
          trackError(new ApiError(response.error!))
        }
      }
    })
  }

  const handleRestore = (key: ClassificationStoreConfigurationKeyDetail): void => {
    void modal.confirm({
      title: t('classification-store.restore-key'),
      content: (
        <>
          <p>{ t('classification-store.restore-key-question', { keyName: key.name }) }</p>
          <p>{ t('classification-store.restore-key-consequence') }</p>
        </>
      ),
      onOk: async () => {
        const response = await restoreKey({ id: key.id })

        if ('error' in response) {
          trackError(new ApiError(response.error!))
        }
      }
    })
  }

  // Every writer below sends the one field its cell changed and nothing else. An absent title or
  // description leaves the stored one alone, and a null type or definition does the same for the
  // two the payload cannot omit; echoing a value back from the row the edit was read on reverts
  // whatever another writer saved into that field meanwhile. `name` is the one field the payload
  // requires, and the cache carries this request's own name from the moment it is sent.
  //
  // `definition` is the clearest case: a definition read out of the cache is sent back as the grid
  // last saw it, and the response then carries it through the preservation mask of the cache patch,
  // over a definition — the index flag, the localization — the key definition dialog saved while
  // the cell edit was in flight. A cell edit never writes the definition, so it must not send the
  // one it happens to hold.
  const handleTitleChange = useCallback(async (
    key: KeyRow,
    newTitle: string
  ): Promise<void> => {
    const response = await updateKey({
      id: key.id,
      classificationStoreConfigurationKeyUpdate: {
        name: key.name,
        title: newTitle.trim() === '' ? null : newTitle,
        type: null,
        definition: null
      }
    })

    if ('error' in response) {
      trackError(new ApiError(response.error!))
    }
  }, [updateKey])

  // Sends the pairs and the name the payload requires, and nothing else: an absent title or
  // description leaves the stored one alone, and a null type or definition does the same.
  const keysRef = useRef(keys)
  keysRef.current = keys

  const handleSavePairs = async (next: PairMap | null): Promise<void> => {
    if (pairEditor === undefined) return

    const key = keysRef.current.find((k) => k.id === pairEditor.row.id) ?? pairEditor.row
    const response = await updateKey({
      id: key.id,
      classificationStoreConfigurationKeyUpdate: {
        name: key.name,
        type: null,
        definition: null,
        customMetadata: next
      }
    })

    if ('error' in response) {
      throw new ApiError(response.error!)
    }
  }

  const handleClosePairEditor = (): void => { setPairEditor(undefined) }

  const handleTypeChange = useCallback(async (
    key: ClassificationStoreConfigurationKeyDetail,
    newType: string
  ): Promise<void> => {
    const response = await updateKey({
      id: key.id,
      classificationStoreConfigurationKeyUpdate: {
        name: key.name,
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
  const handleRestoreRef = useRef(handleRestore)
  handleRestoreRef.current = handleRestore
  const setPairEditorRef = useRef(setPairEditor)
  setPairEditorRef.current = setPairEditor
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
      size: 156,
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
          <PairActions
            customMetadata={ info.row.original.customMetadata }
            name={ info.row.original.name }
            onEditMetadata={ () => { setPairEditorRef.current({ kind: 'metadata', row: info.row.original }) } }
            onEditTitles={ () => { setPairEditorRef.current({ kind: 'titles', row: info.row.original }) } }
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

  // A deleted key is a recycle bin row: read-only cells, and Restore as its one action.
  const deletedColumns = useMemo(() => [
    columnHelper.accessor('id', {
      header: t('classification-store.columns.id'),
      size: 60
    }),
    columnHelper.accessor('name', {
      header: t('classification-store.columns.name'),
      size: 160
    }),
    columnHelper.accessor('title', {
      header: t('classification-store.columns.title'),
      size: 160
    }),
    columnHelper.accessor('type', {
      header: t('classification-store.columns.type'),
      size: 180,
      meta: { type: 'select', config: { options: typeSelectOptions } }
    }),
    columnHelper.accessor('description', {
      header: t('classification-store.columns.description'),
      size: 200
    }),
    columnHelper.display({
      id: 'actions',
      header: t('classification-store.columns.actions'),
      size: 90,
      cell: (info) => (
        <IconButton
          aria-label={ t('classification-store.restore-key') }
          icon={ { value: 'restore' } }
          onClick={ () => { handleRestoreRef.current(info.row.original) } }
          tooltip={ { title: t('classification-store.restore-key') } }
        />
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
                  aria-label={ t('toolbar.reload') }
                  icon={ { value: 'refresh' } }
                  loading={ isFetching }
                  onClick={ () => { void refetch() } }
                  tooltip={ { title: t('toolbar.reload') } }
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
            gap="extra-small"
            justify="space-between"
            style={ { padding: `${token.paddingXS}px ${token.padding}px` } }
            wrap="wrap"
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
            <Flex
              align="center"
              gap="small"
            >
              <Segmented
                onChange={ onViewChange }
                options={ viewOptions }
                value={ view }
              />
              <SearchInput
                key={ view }
                loading={ isFetching }
                onSearch={ (value) => {
                  setSearchTerm(value)
                  setPage(1)
                } }
                placeholder={ t('search') }
              />
            </Flex>
          </Flex>
        }
      >
        <Flex
          style={ { height: '100%', padding: '0 16px' } }
          vertical
        >
          <Grid
            columns={ isDeletedView ? deletedColumns : columns }
            data={ gridData }
            enableSorting
            isLoading={ isLoading || isFetching }
            manualSorting
            onSortingChange={ onSortingChange }
            onUpdateCellData={ ({ columnId, value, rowData }) => {
              // Each branch sends its own field only (see handleTitleChange).
              const typedRow = rowData as KeyRow
              if (columnId === 'name') {
                const newName = (value as string).trim()
                if (newName === '') return
                void updateKey({
                  id: typedRow.id,
                  classificationStoreConfigurationKeyUpdate: {
                    name: newName,
                    type: null,
                    definition: null
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
                    description: (value as string).trim() === '' ? null : (value as string),
                    type: null,
                    definition: null
                  }
                }).then((response) => { if ('error' in response) trackError(new ApiError(response.error!)) })
              }
            } }
            sorting={ sorting }
          />
          {isDeletedView && !isFetching && !isError && data !== undefined && keys.length === 0 && (
            <Text type="secondary">
              { searchTerm.length > 0
                ? t('classification-store.keys-deleted-no-results')
                : t('classification-store.keys-deleted-empty') }
            </Text>
          )}
        </Flex>
      </ContentLayout>

      <KeyDefinitionModal
        keyDetail={ definitionKey }
        onClose={ handleCloseDefinition }
        onSaved={ handleDefinitionSaved }
        open={ definitionModalOpen }
      />

      <MetadataModal
        confirmLoading={ false }
        entityName={ pairEditor?.row.name ?? '' }
        onCancel={ handleClosePairEditor }
        onSave={ handleSavePairs }
        open={ pairEditor?.kind === 'metadata' }
        value={ pairEditor?.row.customMetadata }
      />
      <TitlesModal
        confirmLoading={ false }
        entityName={ pairEditor?.row.name ?? '' }
        onCancel={ handleClosePairEditor }
        onSave={ handleSavePairs }
        open={ pairEditor?.kind === 'titles' }
        value={ pairEditor?.row.customMetadata }
      />
    </>
  )
}
