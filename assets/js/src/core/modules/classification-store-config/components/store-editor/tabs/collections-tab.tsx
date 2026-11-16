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

import { MatchingId } from '@Pimcore/modules/classification-store-config/components/store-editor/tabs/shared/matching-id'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { appConfig } from '@Pimcore/app/config/app-config'
import { theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { useStudioModal } from '@Pimcore/components/modal/hooks/use-studio-modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { Header } from '@Pimcore/components/header/header'
import { Form } from '@Pimcore/components/form/form'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Grid } from '@Pimcore/components/grid/grid'
import { Input } from '@Pimcore/components/input/input'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { createColumnHelper } from '@tanstack/react-table'
import { type RowSelectionState, type SortingState } from '@tanstack/react-table'
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Title } from '@Pimcore/components/title/title'
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
import { useStoreImport } from '@Pimcore/modules/classification-store-config/components/store-editor/store-import-provider'
import { MetadataModal } from './shared/metadata-modal'
import { TitlesModal } from './shared/titles-modal'
import { PairActions } from './shared/pair-actions'
import { getScrollAffordanceStyle } from './shared/scroll-affordance'
import { type PairMap } from './shared/pairs'

interface ICollectionsTabProps {
  storeId: number
}

/** The pair editor being open, and the row it was opened on. */
interface PairEditorState {
  kind: 'metadata' | 'titles'
  row: ClassificationStoreConfigurationCollectionDetail
}

/** The editable fields of a collection; name and description are always replaced together. */
interface CollectionDraft {
  name: string
  description: string | null
  /** Carried only once a change names it: absent keeps the stored pairs. */
  customMetadata?: object | null
}

interface ICollectionDetailFormValues {
  name: string
  description: string
}

export const CollectionsTab = ({ storeId }: ICollectionsTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const { localModal: modal } = useStudioModal()
  const [collectionForm] = Form.useForm<{ name: string, description: string }>()
  const [detailForm] = Form.useForm<ICollectionDetailFormValues>()

  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(appConfig.defaultPageSize)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pairEditor, setPairEditor] = useState<PairEditorState | undefined>(undefined)

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

  const { data, error, isError, isLoading, isFetching, refetch } = useClassificationStoreConfigurationCollectionCollectionQuery(queryArgs)

  const collections = data?.items ?? []
  const total = data?.totalItems ?? 0

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

  // An import rewrites names and descriptions under the selection, and the sync above only runs
  // when the selected ID changes — so the form would keep the pre-import values and the next edit
  // would write them back. Drop the selection: the form clears, and re-selecting reads the
  // refreshed row.
  const { importCount } = useStoreImport()

  useEffect(() => {
    if (importCount === 0) return

    setSelectedRows({})
  }, [importCount])

  /** Cumulative pending change of a row, and the chain its saves run on, both keyed by row id. */
  const draftsRef = useRef(new Map<number, CollectionDraft>())
  const chainsRef = useRef(new Map<number, Promise<void>>())
  /** Last name and description the server confirmed for a row whose chain is running. */
  const baseRef = useRef(new Map<number, { name: string, description: string | null }>())

  /**
   * Saves one changed field of a row, carrying whatever earlier change of that row has not come
   * back yet. `CollectionUpdate` replaces name and description whole, so two unordered writes of the
   * same row (a metadata save and an inline rename) could land in either order and the later
   * answer would restore the older name. The draft carries the pending value forward and the
   * chain keeps the requests in the order they were made; a queued save is rebased onto the
   * draft when it is sent, not when it is queued.
   */
  const handleUpdate = useCallback(async (
    row: ClassificationStoreConfigurationCollectionDetail,
    change: Partial<CollectionDraft>,
    rethrow = false
  ): Promise<void> => {
    const { id } = row
    // The row the grid shows may already carry the optimistic value of a save still in front of
    // this one, so while a chain is running the base is the last value the server confirmed (or,
    // before any has been, the row as it was when the chain began) — never the row read now.
    const stored: CollectionDraft = chainsRef.current.has(id)
      ? (baseRef.current.get(id) ?? { name: row.name, description: row.description ?? null })
      : { name: row.name, description: row.description ?? null }
    if (!chainsRef.current.has(id)) baseRef.current.set(id, stored)
    const outcome: { failure?: ApiError } = {}

    const chain = (chainsRef.current.get(id) ?? Promise.resolve()).then(async () => {
      // Rebased here, not at queue time: a save in front of this one that failed drops the draft,
      // and this change then goes out over the confirmed base, not the refused optimistic name.
      const next: CollectionDraft = { ...(draftsRef.current.get(id) ?? baseRef.current.get(id) ?? stored), ...change }

      draftsRef.current.set(id, next)

      const response = await updateCollection({
        id,
        classificationStoreConfigurationCollectionUpdate: next
      })

      if (!('error' in response)) {
        baseRef.current.set(id, { name: next.name, description: next.description })
      }

      if ('error' in response) {
        // The server kept its own value: the next edit starts from the refetched row.
        draftsRef.current.delete(id)
        outcome.failure = new ApiError(response.error!)
        if (!rethrow) trackError(outcome.failure)
      }
    })

    chainsRef.current.set(id, chain)

    void chain.then(() => {
      if (chainsRef.current.get(id) === chain) {
        chainsRef.current.delete(id)
        draftsRef.current.delete(id)
        baseRef.current.delete(id)
      }
    })

    await chain

    if (outcome.failure !== undefined && rethrow) throw outcome.failure
  }, [updateCollection])

  const handleDetailChange = useCallback((changedValues: Partial<ICollectionDetailFormValues>) => {
    const collection = activeCollectionRef.current
    if (collection === undefined) return

    const currentValues = detailForm.getFieldsValue()
    const newName = (currentValues.name ?? '').trim()
    const newDesc = (currentValues.description ?? '').trim()

    if ('name' in changedValues && newName === '') return

    void handleUpdate(collection, {
      name: newName !== '' ? newName : collection.name,
      description: newDesc !== '' ? newDesc : null
    })
  }, [detailForm, handleUpdate])

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
      content: (
        <>
          <p>{ t('classification-store.delete-collection', { collectionName: collection.name }) }</p>
          <p>{ t('classification-store.delete-collection-consequence') }</p>
        </>
      ),
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

  // Read at send time, so a name edited inline after the editor opened is the one sent.
  const collectionsRef = useRef(collections)
  collectionsRef.current = collections

  const handleSavePairs = async (next: PairMap | null): Promise<void> => {
    if (pairEditor === undefined) return

    const collection = collectionsRef.current.find((c) => c.id === pairEditor.row.id) ?? pairEditor.row
    await handleUpdate(collection, { customMetadata: next }, true)
  }

  const handleClosePairEditor = (): void => { setPairEditor(undefined) }

  const columnHelper = useMemo(() => createColumnHelper<ClassificationStoreConfigurationCollectionDetail>(), [])

  // Ref-forwarding: keep stable ref so columns useMemo never needs handler deps
  const handleDeleteRef = useRef(handleDelete)
  handleDeleteRef.current = handleDelete
  const setPairEditorRef = useRef(setPairEditor)
  setPairEditorRef.current = setPairEditor

  const columns = useMemo(() => [
    columnHelper.accessor('id', {
      header: t('classification-store.columns.id'),
      size: 60
    }),
    columnHelper.accessor('name', {
      header: t('classification-store.columns.name'),
      size: 120,
      // Its size is the table minWidth floor: a narrower pane scrolls the grid instead of cutting names.
      meta: { type: 'input', editable: true, autoWidth: true }
    }),
    columnHelper.display({
      id: 'actions',
      header: t('classification-store.columns.actions'),
      size: 124,
      cell: (info) => (
        <Flex
          align="center"
          gap="mini"
        >
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
  ], [t, columnHelper])

  return (
    <>
      <SplitLayout
        leftItem={ {
          size: 45,
          minSize: 300,
          children: (
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
                    gap='extra-small'
                    wrap="wrap"
                  >
                    <Title>{t('classification-store.tabs.collections')}</Title>
                    <IconTextButton
                      icon={ { value: 'new' } }
                      onClick={ handleAdd }
                    >
                      {t('classification-store.add-collection')}
                    </IconTextButton>
                  </Flex>
                  <SearchInput
                    loading={ isFetching }
                    onSearch={ (value) => {
                      setSearchTerm(value)
                      setPage(1)
                    } }
                    placeholder={ t('search') }
                    withPrefix={ false }
                    withoutAddon={ false }
                  />
                </Flex>
              }
            >
              <Flex
                style={ { height: '100%', padding: '0 16px', ...getScrollAffordanceStyle(token.colorBgContainer, token.colorBorder) } }
                vertical
              >
                <Grid
                  autoWidth
                  columns={ columns }
                  data={ collections }
                  enableRowSelection
                  enableSorting
                  isLoading={ isLoading || isFetching }
                  manualSorting
                  onSelectedRowsChange={ (rows) => { setSelectedRows(rows) } }
                  onSortingChange={ onSortingChange }
                  onUpdateCellData={ ({ columnId, value, rowData }) => {
                    if (columnId === 'name') {
                      const newName = (value as string).trim()
                      if (newName === '') return
                      void handleUpdate(rowData as ClassificationStoreConfigurationCollectionDetail, { name: newName })
                    }
                  } }
                  selectedRows={ selectedRows }
                  setRowId={ (row: ClassificationStoreConfigurationCollectionDetail) => row.id !== undefined ? String(row.id) : undefined as unknown as string }
                  sorting={ sorting }
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
                  <Header >
                    <Title>{activeCollection.name}</Title>
                  </Header>
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
                      style={ { padding: `${token.paddingXS}px ${token.padding}px` } }
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
                      <Form.Item label={ t('classification-store.columns.matching-id') }>
                        <MatchingId
                          alignWithInputText
                          identifier={ activeCollection.identifier }
                        />
                      </Form.Item>
                    </Flex>
                  </FormKit>
                  <Flex style={ { flex: 1, minWidth: 0, ...getScrollAffordanceStyle(token.colorBgContainer, token.colorBorder) } }>
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
