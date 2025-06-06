/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { has, isUndefined, uniqBy } from 'lodash'
import { type RowSelectionState } from '@tanstack/react-table'
import { Refetch } from '../refetch/refetch'
import { Pagination } from '../pagination/pagination'
import { Split } from '@Pimcore/components/split/split'
import { Box } from '@Pimcore/components/box/box'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Grid } from '@Pimcore/components/grid/grid'
import { Button } from '@Pimcore/components/button/button'
import {
  useClassificationStore
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider'
import {
  TabId
} from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import { useKeyedList } from '@Pimcore/components/form/keyed-list/provider/keyed-list/use-keyed-list'
import {
  useLazyClassificationStoreGetLayoutByCollectionQuery,
  useLazyClassificationStoreGetLayoutByGroupQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import {
  type ClassificationStoreGroupLayout
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

interface ClassificationStoreDataTabProps<T> {
  tabId: TabId
  queryHook: (args: any, options?: any) => {
    isLoading: boolean
    isFetching: boolean
    data?: { items: T[], totalItems: number }
    refetch: () => void
  }
  queryArgs: any
  columns: any[]
}

export const ClassificationStoreDataTab = <T,>({ tabId, queryHook, queryArgs, columns }: ClassificationStoreDataTabProps<T>): React.JSX.Element => {
  const { getSearchValue, setSearchValue, closeModal, currentLayoutData, updateCurrentLayoutData } = useClassificationStore()
  const { operations, values } = useKeyedList()
  const { activeGroups, groupCollectionMapping, ...activeGroupsData } = values
  const { t } = useTranslation()

  const [searchTerm, setSearchTerm] = useState(getSearchValue(tabId))
  const [searchQuery, setSearchQuery] = useState(getSearchValue(tabId))
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [selectedItems, setSelectedItems] = useState<RowSelectionState | undefined>(undefined)

  const isGroupByKey = tabId === TabId.GroupByKey

  const { isLoading, data, isFetching, refetch } = queryHook(
    { ...queryArgs, page, pageSize, searchTerm },
    { refetchOnMountOrArgChange: true }
  )
  const [fetchCollectionLayout] = useLazyClassificationStoreGetLayoutByCollectionQuery()
  const [fetchGroupLayout] = useLazyClassificationStoreGetLayoutByGroupQuery()

  const fetchCollectionLayoutData = async (collectionId: string): Promise<ClassificationStoreGroupLayout> => {
    return await fetchCollectionLayout({
      objectId: queryArgs.objectId,
      fieldName: queryArgs.fieldName,
      collectionId: parseInt(collectionId)
    }).unwrap()
  }

  const fetchGroupLayoutData = async (groupId: string): Promise<any> => {
    return await fetchGroupLayout({
      objectId: queryArgs.objectId,
      fieldName: queryArgs.fieldName,
      groupId: parseInt(groupId)
    }).unwrap()
  }

  const handleSearch = (value: string): void => {
    setSearchValue(tabId, value)
    setSearchTerm(value)
  }

  const handleApplySelectionClick = async (): Promise<void> => {
    const keys = Object.keys(selectedItems ?? {})

    const activeGroupsUpdate: Record<string, boolean> = {}
    const groupCollectionMappingUpdate: Record<string, number | null> = {}
    const promises: Array<Promise<any>> = []

    for (const key of keys) {
      if (tabId === TabId.Collection) {
        const promise = fetchCollectionLayoutData(key).then((collectionData) => {
          const groups = collectionData?.groups ?? []

          return groups.filter((groupItem) => {
            const isNewGroup = !has(activeGroupsData, String(groupItem.id))

            if (isNewGroup) {
              operations.add(String(groupItem?.id), {})

              activeGroupsUpdate[groupItem.id] = true
              groupCollectionMappingUpdate[groupItem.id] = parseInt(key)
            }

            return isNewGroup
          })
        })

        promises.push(promise)
      }

      if (tabId === TabId.Group) {
        const promise = fetchGroupLayoutData(key).then((groupData) => {
          if (has(activeGroupsData, String(groupData?.id))) return []

          operations.add(String(groupData?.id), {})

          activeGroupsUpdate[groupData?.id] = true
          groupCollectionMappingUpdate[groupData?.id] = null

          return [groupData]
        })

        promises.push(promise)
      }

      if (tabId === TabId.GroupByKey) {
        const groupId = key.split('-')[0]

        const promise = fetchGroupLayoutData(groupId).then((groupData) => {
          if (has(activeGroupsData, String(groupData?.id))) return []

          operations.add(String(groupData?.id), {})

          activeGroupsUpdate[groupData?.id] = true
          groupCollectionMappingUpdate[groupData?.id] = null

          return [groupData]
        })

        promises.push(promise)
      }
    }

    const results = await Promise.all(promises)
    const allGroups = results.flat()
    const uniqueGroups = uniqBy(allGroups, 'id')
    updateCurrentLayoutData([...currentLayoutData, ...uniqueGroups])

    const updatedActiveGroups = { ...values.activeGroups, ...activeGroupsUpdate }
    const updatedGroupCollectionMapping = { ...values.groupCollectionMapping, ...groupCollectionMappingUpdate }

    operations.update('activeGroups', updatedActiveGroups, false)
    operations.update('groupCollectionMapping', updatedGroupCollectionMapping, false)

    closeModal()
  }

  return (
    <Content>
      <ContentLayout
        renderToolbar={
          <Toolbar theme='secondary'>
            <Split size='extra-small'>
              <Refetch
                isFetching={ isFetching }
                refetch={ refetch }
              />
              <Pagination
                page={ page }
                pageSize={ pageSize }
                setPage={ setPage }
                setPageSize={ setPageSize }
                totalItems={ data?.totalItems ?? 0 }
              />
            </Split>
            <Button
              disabled={ isLoading }
              onClick={ handleApplySelectionClick }
              type="primary"
            >
              {t('common.apply-selection')}
            </Button>
          </Toolbar>
            }
        renderTopBar={
          <Toolbar
            padding={ { top: 'extra-small', bottom: 'extra-small', left: 'none', right: 'none' } }
            position='top'
            theme='secondary'
          >
            <SearchInput
              maxWidth='100%'
              onChange={ (event) => { setSearchQuery(event.target.value) } }
              onSearch={ handleSearch }
              value={ searchQuery }
            />
          </Toolbar>
            }
      >
        <Box padding={ { top: 'extra-small', bottom: 'extra-small' } }>
          <Grid
            columns={ columns }
            data={ data?.items ?? [] }
            enableMultipleRowSelection
            isLoading={ isLoading }
            onSelectedRowsChange={ (row: RowSelectionState) => { setSelectedItems(row) } }
            selectedRows={ selectedItems }
            setRowId={ (row) => isGroupByKey && !isUndefined(row.groupId) ? `${row.groupId}-${row.keyId}` : row.id }
          />
        </Box>
      </ContentLayout>
    </Content>
  )
}
