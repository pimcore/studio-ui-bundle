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
import { Flex } from '@Pimcore/components/flex/flex'
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
import { Header } from '@Pimcore/components/header/header'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useDebouncedFormChange } from '@Pimcore/components/form/hooks/use-debounced-form-change'
import {
  type ClassificationStoreConfigurationGroupDetail,
  useClassificationStoreConfigurationGroupCollectionQuery,
  useClassificationStoreConfigurationGroupCreateMutation,
  useClassificationStoreConfigurationGroupDeleteMutation,
  useClassificationStoreConfigurationGroupUpdateMutation
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { KeyGroupRelationsGrid } from './groups/key-group-relations-grid'
import { NoContent } from '@Pimcore/components/no-content/no-content'
import { useStoreImport } from '@Pimcore/modules/classification-store-config/components/store-editor/store-import-provider'

interface IGroupsTabProps {
  storeId: number
  /** Opens the Sub groups tab of the store, where the vocabulary is managed. */
  onShowSubGroups?: () => void
}

interface IGroupDetailFormValues {
  name: string
  description: string
}

export const GroupsTab = ({ storeId, onShowSubGroups }: IGroupsTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const { localModal: modal } = useStudioModal()
  const [groupForm] = Form.useForm<{ name: string, description: string }>()
  const [detailForm] = Form.useForm<IGroupDetailFormValues>()

  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
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

  const { data, isLoading, isFetching, refetch } = useClassificationStoreConfigurationGroupCollectionQuery(queryArgs)

  const groups = data?.items ?? []
  const total = data?.totalItems ?? 0

  useEffect(() => {
    if (data?.items.length === 0 && data.totalItems > 0 && page > 1) {
      setPage(page - 1)
    }
  }, [data, page])

  const [createGroup] = useClassificationStoreConfigurationGroupCreateMutation()
  const [updateGroup] = useClassificationStoreConfigurationGroupUpdateMutation()
  const [deleteGroup] = useClassificationStoreConfigurationGroupDeleteMutation()

  const selectedGroupId = (): number | undefined => {
    const id = Object.keys(selectedRows).find((k) => selectedRows[k])
    if (id === undefined) return undefined
    return parseInt(id, 10)
  }

  const activeGroup = ((): ClassificationStoreConfigurationGroupDetail | undefined => {
    const id = selectedGroupId()
    if (id === undefined) return undefined
    return groups.find((g) => g.id === id)
  })()

  // Keep a stable ref so the debounced callback can always read the latest activeGroup
  const activeGroupRef = useRef(activeGroup)
  activeGroupRef.current = activeGroup

  // Sync detail form whenever the selected group changes
  useEffect(() => {
    detailForm.setFieldsValue({
      name: activeGroup?.name ?? '',
      description: activeGroup?.description ?? ''
    })
  }, [activeGroup?.id])

  // An import rewrites names and descriptions under the selection, and the sync above only runs
  // when the selected ID changes — so the form would keep the pre-import values and the next edit
  // would write them back. Drop the selection: the form clears, and re-selecting reads the
  // refreshed row.
  const { importCount } = useStoreImport()

  useEffect(() => {
    if (importCount === 0) return

    setSelectedRows({})
  }, [importCount])

  const handleDetailChange = useCallback((changedValues: Partial<IGroupDetailFormValues>) => {
    const group = activeGroupRef.current
    if (group === undefined) return

    const currentValues = detailForm.getFieldsValue()
    const newName = (currentValues.name ?? '').trim()
    const newDesc = (currentValues.description ?? '').trim()

    if ('name' in changedValues && newName === '') return

    void updateGroup({
      id: group.id,
      classificationStoreConfigurationGroupUpdate: {
        name: newName !== '' ? newName : group.name,
        description: newDesc !== '' ? newDesc : null
      }
    }).then((response) => {
      if ('error' in response) {
        trackError(new ApiError(response.error!))
      }
    })
  }, [detailForm, updateGroup])

  const { handleFormChange: handleDetailFormChange } = useDebouncedFormChange(handleDetailChange, { delay: 300 })

  const handleAdd = (): void => {
    groupForm.setFieldsValue({
      name: '',
      description: ''
    })

    void modal.confirm({
      icon: null,
      title: t('classification-store.add-group'),
      content: (
        <Form
          form={ groupForm }
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
        const values = await groupForm.validateFields()
        const description = values.description.trim() === '' ? null : values.description

        const createResponse = await createGroup({
          classificationStoreConfigurationGroupCreate: { name: values.name, storeId }
        })

        if ('error' in createResponse) {
          trackError(new ApiError(createResponse.error!))
          return
        }

        if (description !== null) {
          const updateResponse = await updateGroup({
            id: createResponse.data.id,
            classificationStoreConfigurationGroupUpdate: {
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

  const handleDelete = (group: ClassificationStoreConfigurationGroupDetail): void => {
    void modal.confirm({
      title: t('delete'),
      content: t('classification-store.delete-group', { groupName: group.name }),
      onOk: async () => {
        const response = await deleteGroup({ id: group.id })

        if ('error' in response) {
          trackError(new ApiError(response.error!))
          return
        }

        setSelectedRows({})
      }
    })
  }

  const columnHelper = useMemo(() => createColumnHelper<ClassificationStoreConfigurationGroupDetail>(), [])

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
      // The name absorbs what the fixed columns leave, so the table never outgrows the pane.
      meta: { type: 'input', editable: true, autoWidth: true }
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
        size: 35,
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
                  <Header title={ t('classification-store.tabs.groups') } />
                  <IconTextButton
                    icon={ { value: 'new' } }
                    onClick={ handleAdd }
                  >
                    {t('classification-store.add-group')}
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
                autoWidth
                columns={ columns }
                data={ groups }
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
                    void updateGroup({
                      id: rowData.id,
                      classificationStoreConfigurationGroupUpdate: {
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
                setRowId={ (row: ClassificationStoreConfigurationGroupDetail) => row.id !== undefined ? String(row.id) : undefined as unknown as string }
                sorting={ sorting }
              />
            </Flex>
          </ContentLayout>
        )
      } }
      resizeAble
      rightItem={ {
        // Widest share that still leaves the groups list its own width; the key grid carries one column more.
        // The detail carries the strip, the headings and the widest grid, so it takes the larger share.
        size: 65,
        minSize: 300,
        children: activeGroup === undefined
          ? (
            <Flex
              align="center"
              justify="center"
              style={ { height: '100%' } }
            >
              <NoContent text={ t('classification-store.select-group-hint') } />
            </Flex>
            )
          : (
            <ContentLayout
              renderTopBar={
                <Flex
                  align="center"
                  style={ { padding: `${token.paddingXS}px ${token.padding}px` } }
                >
                  <Header title={ activeGroup.name } />
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
                  </Flex>
                </FormKit>
                <Flex style={ { flex: 1, overflow: 'hidden' } }>
                  {/*
                    Keyed by store and group so switching either remounts the grid. Its row
                    selection is keyed by sub-group section and key id, and both repeat across
                    groups, so a carried-over selection would let Assign and Unassign act on
                    keys of the group the user just left.
                  */}
                  <KeyGroupRelationsGrid
                    groupId={ activeGroup.id }
                    groupName={ activeGroup.name }
                    key={ `${storeId}-${activeGroup.id}` }
                    onShowSubGroups={ onShowSubGroups }
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
