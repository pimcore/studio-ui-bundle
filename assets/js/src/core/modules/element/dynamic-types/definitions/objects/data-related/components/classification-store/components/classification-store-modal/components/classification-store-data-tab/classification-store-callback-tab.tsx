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
import { isUndefined } from 'lodash'
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
import { useClassificationStore } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/provider'
import { TabId } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/components/classification-store/types'
import {
  useLazyClassificationStoreGetLayoutByKeyQuery
} from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice-enhanced'
import type { ClassificationStoreCollection2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'
import { useClassificationStoreModal } from '../../../../provider/classifcation-store-modal-provider'

interface ClassificationStoreCallbackTabProps<T> {
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

export const ClassificationStoreCallbackTab = <T,>({ tabId, queryHook, queryArgs, columns }: ClassificationStoreCallbackTabProps<T>): React.JSX.Element => {
  const { getSearchValue, setSearchValue, closeModal } = useClassificationStore()
  const { fireUpdateEvent } = useClassificationStoreModal({})
  const { t } = useTranslation()

  const [searchTerm, setSearchTerm] = useState(getSearchValue(tabId))
  const [searchQuery, setSearchQuery] = useState(getSearchValue(tabId))
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [selectedItems, setSelectedItems] = useState<RowSelectionState | undefined>(undefined)
  const [isApplyingSelection, setIsApplyingSelection] = useState(false)

  const isGroupByKey = tabId === TabId.GroupByKey

  const { isLoading, data, isFetching, refetch } = queryHook(
    { ...queryArgs, page, pageSize, searchTerm },
    { refetchOnMountOrArgChange: true }
  )

  const [fetchLayoutByKey] = useLazyClassificationStoreGetLayoutByKeyQuery()

  const fetchLayoutDataByKey = async (keyId: string, groupId: number): Promise<ClassificationStoreCollection2> => {
    return await fetchLayoutByKey({
      fieldName: queryArgs.fieldName,
      keyId: parseInt(keyId),
      groupId
    }).unwrap()
  }

  const handleSearch = (value: string): void => {
    setSearchValue(tabId, value)
    setSearchTerm(value)
  }

  const handleApplySelectionClick = async (): Promise<void> => {
    const selectedKeys = Object.keys(selectedItems ?? {})
    const promisesList: Array<Promise<any>> = []

    for (const key of selectedKeys) {
      if (tabId === TabId.Collection) {
        throw new Error('Collections are not supported in callback version')
      }

      if (tabId === TabId.Group) {
        throw new Error('Groups are not supported in callback version')
      }

      if (tabId === TabId.GroupByKey) {
        const itemId = key.split('-')[1]
        const groupId = parseInt(key.split('-')[0])

        const promise = fetchLayoutDataByKey(itemId, groupId).then((itemData) => {
          return {
            ...itemData,
            groupId
          }
        })

        promisesList.push(promise)
      }
    }

    const data = await Promise.all(promisesList)
    fireUpdateEvent({
      type: tabId,
      data
    })

    setIsApplyingSelection(false)
    closeModal()
  }

  return (
    <Content loading={ isApplyingSelection }>
      <ContentLayout
        renderToolbar={
          <Toolbar
            borderStyle='primary'
            theme='secondary'
          >
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
            borderStyle='primary'
            padding={ { top: 'extra-small', bottom: 'extra-small', left: 'none', right: 'none' } }
            position='top'
            size='auto'
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
        <Box padding={ { top: 'small', bottom: 'small' } }>
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
