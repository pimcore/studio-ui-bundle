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
import { MetadataModal } from './shared/metadata-modal'
import { TitlesModal } from './shared/titles-modal'
import { PairActions } from './shared/pair-actions'
import { type PairMap } from './shared/pairs'

interface ISubGroupsTabProps {
  storeId: number
}

/** The editable fields of a sub group; name and description are always replaced together. */
interface SubGroupDraft {
  name: string
  description: string | null
  /** Carried only once a change names it: absent keeps the stored pairs. */
  customMetadata?: object | null
}

/** The pair editor being open, and the row it was opened on. */
interface PairEditorState {
  kind: 'metadata' | 'titles'
  row: ClassificationStoreConfigurationSubGroupDetail
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

  const {
    data,
    currentData,
    error,
    isError,
    isLoading,
    isFetching,
    refetch
  } = useClassificationStoreConfigurationSubGroupCollectionQuery(queryArgs)

  const subGroups = data?.items ?? []
  const total = data?.totalItems ?? 0

  // A refused collection request must not read as a store without sub groups: a 403 or a 500
  // left `data` undefined, which the empty default turned into "no sub groups yet". The error is
  // reported, and the empty state below waits for a response that actually arrived.
  useEffect(() => {
    if (isError && error !== undefined) {
      trackError(new ApiError(error))
    }
  }, [isError, error])

  // Deleting the last row of a page steps back one page — judged on `currentData`, the response
  // for the page being asked for, never on `data`, which keeps the previous page's response while
  // the new one is in flight. On `data` the correction ran a second time against the page it had
  // just left behind and walked straight down to page 1, skipping the page that had rows on it.
  useEffect(() => {
    if (isFetching || currentData === undefined) return

    if (currentData.items.length === 0 && currentData.totalItems > 0 && page > 1) {
      setPage(page - 1)
    }
  }, [currentData, isFetching, page])

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

  /** Cumulative pending change of a row, and the chain its saves run on, both keyed by row id. */
  const draftsRef = useRef(new Map<number, SubGroupDraft>())
  const chainsRef = useRef(new Map<number, Promise<void>>())

  /**
   * Saves one changed field of a row, carrying whatever earlier change of that row has not come
   * back yet.
   *
   * `SubGroupUpdate` replaces both the name and the description, so a payload rebuilt from the
   * row the grid renders would re-send the field the first request is still changing: editing
   * the name and then the description sent the second PUT with the old name, and whichever
   * answer landed last decided which of the two edits survived. The draft carries the pending
   * value forward and the chain keeps the two requests in the order they were made.
   *
   * A queued save carries only its own field and is rebased onto the draft at the moment it is
   * sent, never at the moment it is queued. A payload captured at queue time still held the name
   * of a rename that was refused in front of it, so a name the server had just rejected went out
   * again and took the perfectly valid description edit behind it down with it.
   */
  const handleUpdate = useCallback(async (
    subGroup: ClassificationStoreConfigurationSubGroupDetail,
    change: Partial<SubGroupDraft>,
    rethrow = false
  ): Promise<void> => {
    const { id } = subGroup
    const stored: SubGroupDraft = { name: subGroup.name, description: subGroup.description ?? null }
    // Set when this save is refused, so a caller that waits for it can tell.
    const outcome: { failure?: ApiError } = {}

    const chain = (chainsRef.current.get(id) ?? Promise.resolve()).then(async () => {
      // Rebased here, not above: a save in front of this one that failed drops the draft, so this
      // change goes out over the row the server still holds rather than over the refused value.
      const next: SubGroupDraft = { ...(draftsRef.current.get(id) ?? stored), ...change }

      draftsRef.current.set(id, next)

      const response = await updateSubGroup({
        id,
        classificationStoreConfigurationSubGroupUpdate: next
      })

      if ('error' in response) {
        // The server kept its own value, so the next edit of this row has to start from the
        // refetched row rather than from a draft the server refused.
        draftsRef.current.delete(id)
        outcome.failure = new ApiError(response.error!)
        if (!rethrow) trackError(outcome.failure)
      }
    })

    chainsRef.current.set(id, chain)

    void chain.then(() => {
      // Nothing newer queued behind it: the row the grid shows is the row the server holds.
      if (chainsRef.current.get(id) === chain) {
        chainsRef.current.delete(id)
        draftsRef.current.delete(id)
      }
    })

    // The stored chain never rejects; only a caller that asked to be told gets the failure.
    await chain

    if (outcome.failure !== undefined && rethrow) throw outcome.failure
  }, [updateSubGroup])

  const subGroupsRef = useRef(subGroups as ClassificationStoreConfigurationSubGroupDetail[])
  subGroupsRef.current = subGroups as ClassificationStoreConfigurationSubGroupDetail[]

  const handleSavePairs = async (next: PairMap | null): Promise<void> => {
    if (pairEditor === undefined) return

    // The freshest row, so the name carried is not the one the editor was opened on.
    const subGroup = subGroupsRef.current.find((g) => g.id === pairEditor.row.id) ?? pairEditor.row

    await handleUpdate(subGroup, { customMetadata: next }, true)
  }

  const handleClosePairEditor = (): void => { setPairEditor(undefined) }

  const columnHelper = useMemo(() => createColumnHelper<ClassificationStoreConfigurationSubGroupDetail>(), [])

  // Ref-forwarding: keep stable refs so columns useMemo never needs handler deps
  const handleDeleteRef = useRef(handleDelete)
  handleDeleteRef.current = handleDelete
  const setPairEditorRef = useRef(setPairEditor)
  setPairEditorRef.current = setPairEditor

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
    // The description absorbs what the fixed columns leave, so the table never outgrows the tab.
    columnHelper.accessor('description', {
      header: t('classification-store.columns.description'),
      size: 200,
      meta: { type: 'input', editable: true, autoWidth: true }
    }),
    columnHelper.display({
      id: 'actions',
      header: t('classification-store.columns.actions'),
      size: 124,
      // The label names the row: `IconButton` takes its accessible name from an explicit
      // `aria-label` or from string children, never from `tooltip.title`, so a column of
      // identical "Delete" buttons would not say what each one deletes.
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
            aria-label={ t('classification-store.aria.delete-sub-group', { name: info.row.original.name }) }
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
      <ContentLayout
        renderToolbar={
          <Toolbar theme="secondary">
            { isLoading
              ? null
              : (
                <IconButton
                  aria-label={ t('refresh') }
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
            gap="extra-small"
            justify="space-between"
            style={ { padding: `${token.paddingXS}px ${token.padding}px` } }
            wrap="wrap"
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
          { /* Only a response that arrived can say the store has no sub groups. */ }
          { !isLoading && !isError && data !== undefined && subGroups.length === 0
            ? <NoContent text={ t('classification-store.no-sub-groups') } />
            : (
              <Grid
                autoWidth
                columns={ columns }
                data={ subGroups }
                enableSorting
                isLoading={ isLoading || isFetching }
                manualSorting
                onSortingChange={ onSortingChange }
                onUpdateCellData={ ({ columnId, value, rowData }) => {
                  const typedRow = rowData as ClassificationStoreConfigurationSubGroupDetail
                  // Only the edited field is handed over: the other one comes from the row's
                  // pending draft, never from the row the grid is still rendering.
                  if (columnId === 'name') {
                    const newName = (value as string).trim()
                    if (newName === '') return
                    void handleUpdate(typedRow, { name: newName })
                  } else if (columnId === 'description') {
                    const newDescription = (value as string).trim()
                    void handleUpdate(typedRow, { description: newDescription === '' ? null : newDescription })
                  }
                } }
                sorting={ sorting }
              />
              ) }
        </Flex>
      </ContentLayout>
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
