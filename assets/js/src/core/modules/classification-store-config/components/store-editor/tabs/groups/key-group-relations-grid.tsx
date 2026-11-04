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
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { useMessage } from '@Pimcore/components/message/useMessage'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { createColumnHelper, functionalUpdate, type RowSelectionState, type Updater } from '@tanstack/react-table'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Header } from '@Pimcore/components/header/header'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type ClassificationStoreConfigurationKeyGroupRelationCreate,
  type ClassificationStoreConfigurationKeyGroupRelationDetail,
  type ClassificationStoreConfigurationKeyDetail,
  type ClassificationStoreConfigurationSubGroupDetail,
  useClassificationStoreConfigurationKeyGroupRelationCollectionQuery,
  useClassificationStoreConfigurationKeyGroupRelationCreateMutation,
  useClassificationStoreConfigurationKeyGroupRelationDeleteMutation,
  useClassificationStoreConfigurationSubGroupCollectionQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import { buildSubGroupSections } from '@Pimcore/modules/data-object/classification-store/utils/sub-group-sections'
import { KeySelectionDialog } from './key-selection-dialog'
import { KeyRelationsSection } from './key-relations-section'
import { SubGroupSelectionDialog } from './sub-group-selection-dialog'
import { SubGroupStrip, type SubGroupUsage } from './sub-group-strip'

interface IKeyGroupRelationsGridProps {
  storeId: number
  groupId: number | undefined
  groupName: string | undefined
  /** Opens the Sub groups tab of the store, where the vocabulary is managed. */
  onShowSubGroups?: () => void
}

const ASSIGN_PROGRESS_KEY = 'classification-store-sub-group-assign'

/** Sub group of a relation, with an unset one always reported as null. */
const subGroupOf = (relation: ClassificationStoreConfigurationKeyGroupRelationDetail): string | null => {
  const subGroup = relation.subGroup
  return subGroup === undefined || subGroup === '' ? null : subGroup
}

export const KeyGroupRelationsGrid = ({
  storeId,
  groupId,
  groupName,
  onShowSubGroups
}: IKeyGroupRelationsGridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const modal = useFormModal()
  const messageApi = useMessage()

  const [keyDialogOpen, setKeyDialogOpen] = useState(false)
  const [subGroupDialogOpen, setSubGroupDialogOpen] = useState(false)
  const [isAssigning, setIsAssigning] = useState(false)
  // The same flag as isAssigning, readable synchronously: a second batch started before React
  // has re-rendered with the disabled buttons still has to be refused.
  const isAssigningRef = useRef(false)
  const [selectedRowsBySection, setSelectedRowsBySection] = useState<Record<string, RowSelectionState>>({})
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(appConfig.defaultPageSize)

  const { data, isLoading, isFetching, refetch } = useClassificationStoreConfigurationKeyGroupRelationCollectionQuery(
    { groupId: groupId!, body: { filters: { page, pageSize } } },
    { skip: groupId === undefined }
  )

  const relations: ClassificationStoreConfigurationKeyGroupRelationDetail[] = useMemo(
    () => data?.items ?? [],
    [data?.items]
  )

  const total = data?.totalItems ?? 0

  /** True when the grid holds the whole group, so a statement about the group can be made. */
  const holdsWholeGroup = total <= pageSize

  // A selection is keyed by sub-group section and key id, and both repeat across groups, so one
  // carried over would let Assign and Unassign act on keys that are not on screen. The Groups
  // tab also remounts this grid per group; the reset keeps that correct here rather than
  // depending on how a parent happens to mount it.
  useEffect(() => {
    setSelectedRowsBySection({})
    setPage(1)
  }, [groupId])

  // The vocabulary is only read to label the headings and chips with a name instead of the
  // bare identifier the relation stores.
  const {
    data: subGroupData,
    error: subGroupError,
    isError: isSubGroupError
  } = useClassificationStoreConfigurationSubGroupCollectionQuery(
    { storeId, body: { filters: { page: 1, pageSize: 9999 } } },
    { skip: groupId === undefined }
  )

  // Same shape as the picker's: a 403 or a 500 leaves `subGroupData` undefined, which the empty
  // default turns into a vocabulary with no names in it. The screen stays usable — every heading
  // and chip falls back to the identifier — but the failure is reported rather than swallowed.
  useEffect(() => {
    if (isSubGroupError && subGroupError !== undefined) {
      trackError(new ApiError(subGroupError))
    }
  }, [isSubGroupError, subGroupError])

  const subGroupNames = useMemo(
    () => new Map((subGroupData?.items ?? []).map((subGroup) => [subGroup.identifier, subGroup.name])),
    [subGroupData?.items]
  )

  const [createRelation] = useClassificationStoreConfigurationKeyGroupRelationCreateMutation()
  const [deleteRelation] = useClassificationStoreConfigurationKeyGroupRelationDeleteMutation()

  // The sections, and the chip counts built from them below, describe the page the grid is
  // showing — not the whole group. A paginated grid whose headings group the rows in front of
  // the user is coherent, and loading the whole group to widen them is what made every key past
  // appConfig.maxPageSize unreachable. Where a statement about the whole group is unavoidable it
  // is gated on holdsWholeGroup instead.
  const sections = useMemo(
    () => buildSubGroupSections({ items: relations, getSubGroup: subGroupOf }),
    [relations]
  )

  const usages = useMemo<SubGroupUsage[]>(() => sections.flatMap((section) => {
    const { identifier } = section

    if (identifier === null) return []

    return [{ identifier, name: subGroupNames.get(identifier) ?? identifier, count: section.items.length }]
  }), [sections, subGroupNames])

  const unassignedCount = sections.find((section) => section.identifier === null)?.items.length ?? 0

  // One map per section so a section's select-all cannot wipe the other sections, and the
  // grid forwards TanStack's updater as it gets it, so a row toggle arrives as a function.
  const handleSectionSelection = useCallback((identifier: string | null, rows: RowSelectionState): void => {
    const key = identifier ?? ''

    setSelectedRowsBySection((previous) => ({
      ...previous,
      [key]: functionalUpdate(rows as Updater<RowSelectionState>, previous[key] ?? {})
    }))
  }, [])

  const selectedRelations = useMemo(() => relations.filter((relation) => {
    const rows = selectedRowsBySection[subGroupOf(relation) ?? '']
    return rows?.[String(relation.keyId)] ?? false
  }), [relations, selectedRowsBySection])

  /**
   * Reports the sub groups the given keys were the last ones of in this group.
   *
   * Only while the grid holds the whole group: the claim is derived from the loaded relations,
   * and on any other page a key left on a page that is not loaded would still use the sub group,
   * which would make the message plainly wrong. Suppressed rather than guessed.
   */
  const reportEmptiedSubGroups = useCallback((
    removed: ClassificationStoreConfigurationKeyGroupRelationDetail[]
  ): void => {
    if (!holdsWholeGroup) return

    const removedKeyIds = new Set(removed.map((relation) => relation.keyId))
    const remaining = relations.filter((relation) => !removedKeyIds.has(relation.keyId))

    for (const identifier of new Set(removed.map(subGroupOf))) {
      if (identifier === null) continue
      if (remaining.some((relation) => subGroupOf(relation) === identifier)) continue

      void messageApi.info(t('classification-store.sub-group-unused', {
        name: subGroupNames.get(identifier) ?? identifier
      }))
    }
  }, [holdsWholeGroup, relations, subGroupNames, messageApi, t])

  // One create-or-upsert per key, carrying nothing but the pair and the sub group. Failures are
  // collected into one message: trackError would collapse identical server messages into a
  // single modal that names no key at all.
  const applySubGroup = useCallback(async (
    targets: ClassificationStoreConfigurationKeyGroupRelationDetail[],
    subGroup: string | null
  ): Promise<void> => {
    if (targets.length === 0) return
    // Two batches in flight over the same keys would decide the assignment by whichever
    // response landed last, so a second one is refused while the first is still settling. The
    // check reads a ref rather than the state so a second call in the same tick still sees it.
    if (isAssigningRef.current) return

    isAssigningRef.current = true
    setIsAssigning(true)

    const failedNames: string[] = []
    const failedKeyIds = new Set<number>()

    const reportProgress = (done: number): void => {
      void messageApi.open({
        key: ASSIGN_PROGRESS_KEY,
        type: 'loading',
        content: t('classification-store.assign-sub-group-progress', { done, total: targets.length }),
        duration: 0
      })
    }

    reportProgress(0)

    // The upserts are issued together rather than one after another — the same way adding
    // several keys at once already does below — and the progress message advances as each one
    // settles. Waiting for each request before sending the next made the whole assignment as
    // slow as the sum of its round trips.
    let completed = 0

    const responses = await Promise.all(targets.map(async (relation) => {
      // sorter and mandatory are deliberately omitted: KeyGroupRelationCreate leaves an absent
      // property at its stored value, so sending the pair and the sub group alone is enough and
      // the assignment can no longer write back a sorter or mandatory captured before an edit
      // that is still in flight.
      const payload: ClassificationStoreConfigurationKeyGroupRelationCreate = {
        keyId: relation.keyId,
        groupId: relation.groupId,
        subGroup
      }

      const response = await createRelation({ classificationStoreConfigurationKeyGroupRelationCreate: payload })

      completed += 1
      reportProgress(completed)

      return response
    }))

    // Read back in the order the keys were selected in, so the failure message names them in
    // that order rather than in whichever order the server answered.
    for (const [index, response] of responses.entries()) {
      if ('error' in response) {
        const relation = targets[index]

        failedNames.push(relation.keyName ?? String(relation.keyId))
        failedKeyIds.add(relation.keyId)
      }
    }

    messageApi.destroy(ASSIGN_PROGRESS_KEY)
    isAssigningRef.current = false
    setIsAssigning(false)

    if (failedNames.length > 0) {
      void messageApi.error(t('classification-store.assign-sub-group-failed', { keyNames: failedNames.join(', ') }))
    } else {
      // Nothing failed, so there is nothing left to retry with the same selection.
      setSelectedRowsBySection({})
    }

    if (subGroup === null) {
      reportEmptiedSubGroups(targets.filter((relation) => !failedKeyIds.has(relation.keyId)))
    }
  }, [createRelation, messageApi, reportEmptiedSubGroups, t])

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
          return
        }

        reportEmptiedSubGroups([relation])
      }
    })
  }, [modal, deleteRelation, reportEmptiedSubGroups, t])

  const handleMandatoryChange = useCallback(async (
    relation: ClassificationStoreConfigurationKeyGroupRelationDetail,
    mandatory: boolean
  ): Promise<void> => {
    // subGroup and sorter are deliberately omitted: a cell edit must never clear the assignment,
    // and re-sending the sorter the row happened to carry would undo a sorter edit of the same
    // row that has not come back yet. An absent property keeps its stored value.
    const response = await createRelation({
      classificationStoreConfigurationKeyGroupRelationCreate: {
        keyId: relation.keyId,
        groupId: relation.groupId,
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
    // subGroup and mandatory are deliberately omitted, for the same reason as above.
    const response = await createRelation({
      classificationStoreConfigurationKeyGroupRelationCreate: {
        keyId: relation.keyId,
        groupId: relation.groupId,
        sorter
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

  const handleAssign = useCallback(async (
    subGroup: ClassificationStoreConfigurationSubGroupDetail
  ): Promise<void> => {
    await applySubGroup(selectedRelations, subGroup.identifier)
    setSubGroupDialogOpen(false)
  }, [applySubGroup, selectedRelations])

  const handleUnassignSelection = useCallback((): void => {
    void applySubGroup(selectedRelations, null)
  }, [applySubGroup, selectedRelations])

  const handleUnassignUsage = useCallback((usage: SubGroupUsage): void => {
    void modal.confirm({
      title: t('classification-store.unassign-sub-group-keys'),
      content: t('classification-store.unassign-sub-group-confirm', { name: usage.name, count: usage.count }),
      onOk: async () => {
        await applySubGroup(relations.filter((relation) => subGroupOf(relation) === usage.identifier), null)
      }
    })
  }, [modal, applySubGroup, relations, t])

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
    // Its size is the floor this column may shrink to, so the table fits panes narrower than its preferred width.
    columnHelper.accessor('keyDescription', {
      header: t('classification-store.columns.description'),
      size: 80,
      meta: { type: 'input', autoWidth: true }
    }),
    // Not editable while a batch of upserts is in flight: an edit of a row the batch also
    // carries would be decided by whichever response landed last.
    columnHelper.accessor('mandatory', {
      header: t('classification-store.columns.mandatory'),
      size: 100,
      meta: { type: 'boolean', editable: !isAssigning, config: { align: 'center' } }
    }),
    columnHelper.accessor('sorter', {
      header: t('classification-store.columns.sorter'),
      size: 100,
      meta: { type: 'number', editable: !isAssigning }
    }),
    columnHelper.display({
      id: 'actions',
      header: t('classification-store.columns.actions'),
      size: 60,
      cell: (info) => (
        <IconButton
          // Deleting a relation the batch is still upserting would recreate it, because the
          // upsert creates what it cannot find.
          disabled={ isAssigning }
          icon={ { value: 'trash' } }
          onClick={ () => { handleRemove(info.row.original) } }
          tooltip={ { title: t('delete') } }
        />
      )
    })
  ], [t, handleRemove, columnHelper, isAssigning])

  // Stable array — only recomputed when relations change
  const excludedKeyIds = useMemo(() => relations.map((r) => r.keyId), [relations])

  const headerTitle = groupId !== undefined
    ? t('classification-store.relations-title', { name: groupName ?? String(groupId) })
    : t('classification-store.select-group-hint')

  // While a batch of upserts is settling every action that could write the same relations is
  // held: the batch's own buttons, the per-row delete, the inline cells and the strip's
  // unassign. The hint says which of the two is holding them.
  const actionsBlocked = selectedRelations.length === 0 || isAssigning

  const blockedHint = isAssigning
    ? t('classification-store.assign-sub-group-running')
    : selectedRelations.length === 0
      ? t('classification-store.select-keys-hint')
      : ''

  // One empty section keeps the loading and the empty state of the grid visible.
  const renderedSections = sections.length > 0 ? sections : [{ identifier: null, items: [] }]
  // A single section of keys that carry no sub group needs no heading of its own.
  const withHeadings = renderedSections.length > 1 || renderedSections[0].identifier !== null

  const headingOf = (identifier: string | null): string | undefined => {
    if (!withHeadings) return undefined
    if (identifier === null) return t('classification-store.no-sub-group')

    return subGroupNames.get(identifier) ?? identifier
  }

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
          style={ { padding: `${token.paddingXS}px ${token.padding}px` } }
        >
          <Header title={ headerTitle } />
          { groupId !== undefined && (
            <Flex
              align="center"
              gap="small"
            >
              <IconTextButton
                icon={ { value: 'new' } }
                onClick={ () => { setKeyDialogOpen(true) } }
              >
                {t('classification-store.add-key')}
              </IconTextButton>
              <Tooltip title={ blockedHint }>
                <IconTextButton
                  disabled={ actionsBlocked }
                  icon={ { value: 'group-alt' } }
                  onClick={ () => { setSubGroupDialogOpen(true) } }
                >
                  {t('classification-store.assign-sub-group')}
                </IconTextButton>
              </Tooltip>
              <Tooltip title={ blockedHint }>
                <IconTextButton
                  disabled={ actionsBlocked }
                  icon={ { value: 'close' } }
                  onClick={ handleUnassignSelection }
                >
                  {t('classification-store.unassign-sub-group')}
                </IconTextButton>
              </Tooltip>
            </Flex>
          ) }
        </Flex>
      }
    >
      <Flex
        style={ { height: '100%', padding: '0 16px' } }
        vertical
      >
        { groupId !== undefined && (
          <SubGroupStrip
            onShowSubGroups={ onShowSubGroups }
            onUnassign={ handleUnassignUsage }
            unassignDisabled={ isAssigning }
            unassignedCount={ unassignedCount }
            usages={ usages }
          />
        ) }

        { renderedSections.map((section) => (
          <KeyRelationsSection
            columns={ columns }
            heading={ headingOf(section.identifier) }
            isLoading={ isLoading || isFetching }
            key={ section.identifier ?? '' }
            onSelectedRowsChange={ (rows) => { handleSectionSelection(section.identifier, rows) } }
            onUpdateCellData={ ({ columnId, value, rowData }) => {
              const typedRow = rowData as ClassificationStoreConfigurationKeyGroupRelationDetail
              if (columnId === 'mandatory') {
                void handleMandatoryChange(typedRow, value as boolean)
              } else if (columnId === 'sorter' && value !== null) {
                void handleSorterChange(typedRow, value as number)
              }
            } }
            relations={ section.items }
            selectedRows={ selectedRowsBySection[section.identifier ?? ''] ?? {} }
          />
        )) }
      </Flex>

      <KeySelectionDialog
        excludedKeyIds={ excludedKeyIds }
        onCancel={ () => { setKeyDialogOpen(false) } }
        onConfirm={ (keys) => { void handleAddKey(keys) } }
        open={ keyDialogOpen }
        storeId={ storeId }
      />

      <SubGroupSelectionDialog
        confirmLoading={ isAssigning }
        onCancel={ () => { setSubGroupDialogOpen(false) } }
        onConfirm={ (subGroup) => { void handleAssign(subGroup) } }
        open={ subGroupDialogOpen }
        storeId={ storeId }
      />
    </ContentLayout>
  )
}
