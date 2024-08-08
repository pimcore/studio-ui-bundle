/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useGetAssetGridMutation, type GridFilter, api, type GetAssetGridApiResponse, usePatchAssetByIdMutation, type PatchAssetByIdApiArg } from '@Pimcore/modules/asset/asset-api-slice.gen'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { GridContainer } from './grid-container'
import { GridToolbarContainer } from './grid-toolbar-container'
import { ContentToolbarSidebarView } from '@Pimcore/modules/element/editor/tab-manager/layouts/content-toolbar-sidebar-view'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { SidebarContainer } from './sidebar-container'
import { useListColumns, useListFilterOptions, useListGridConfig, useListPage, useListPageSize, useListSelectedRows, useListSorting } from './hooks/use-list'
import { useAppDispatch } from '@Pimcore/app/store'
import { type OnUpdateCellDataEvent } from '@Pimcore/components/grid/grid'

export const ListContainerInner = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const dispatch = useAppDispatch()
  const { page, setPage } = useListPage()
  const { pageSize, setPageSize } = useListPageSize()
  const { setSelectedRows } = useListSelectedRows()
  const { filterOptions } = useListFilterOptions()
  const { columns, setGridColumns } = useListColumns()
  const { gridConfig, setGridConfig } = useListGridConfig()
  const assetId = assetContext.id!
  const [data, setData] = useState<GetAssetGridApiResponse | undefined>()
  const [fetchListing, { data: apiData }] = useGetAssetGridMutation()
  const [patchAsset] = usePatchAssetByIdMutation()
  const { sorting } = useListSorting()

  useEffect(() => {
    setSelectedRows({})
  }, [sorting, page, pageSize, filterOptions])

  useEffect(() => {
    prepareAndFetchListing()
  }, [columns, filterOptions, page, pageSize])

  useEffect(() => {
    if (apiData !== undefined) {
      setData(apiData)
    }
  }, [apiData])

  useEffect(() => {
    async function fetchGridConfiguration (): Promise<void> {
      const availableGridCOnfigPromise = dispatch(api.endpoints.getAvailableAssetGridConfiguration.initiate())
      const initialGridConfigPromise = dispatch(api.endpoints.getAssetGridConfiguration.initiate({ folderId: assetId }))

      Promise.all([availableGridCOnfigPromise, initialGridConfigPromise]).then(([availableGridConfig, initialGridConfig]) => {
        setGridConfig(availableGridConfig.data?.columns)
        setGridColumns(initialGridConfig.data!.columns!)
      }).catch((error) => {
        console.error(error)
      })
    }

    fetchGridConfiguration().catch((error) => {
      console.error(error)
    })
  }, [])

  useEffect(() => {
    if (apiData !== undefined) {
      setData(apiData)
    }
  }, [apiData])

  return useMemo(() => (
    <ContentToolbarSidebarView
      renderSidebar={ <SidebarContainer /> }

      renderToolbar={
        <GridToolbarContainer
          pager={ {
            current: page,
            total: data?.totalItems ?? 0,
            pageSize,
            onChange: onPagerChange
          } }
        />
      }
    >
      <GridContainer
        assets={ data }
        onUpdateCellData={ onUpdateCellData }
      />
    </ContentToolbarSidebarView>
  ), [data, page, pageSize])

  function onPagerChange (page: number, pageSize: number): void {
    setPage(page)
    setPageSize(pageSize)
  }

  function onUpdateCellData ({ value, columnId, rowData }: OnUpdateCellDataEvent): void {
    const column = columns.find((column) => column.key === columnId)

    if (column === undefined) {
      return
    }

    const backendType = column.type.split('.')

    if (backendType[0] !== 'metadata') {
      throw new Error('Only metadata columns are supported for now')
    }

    const update: PatchAssetByIdApiArg = {
      body: {
        data: [
          {
            id: rowData.id,
            metadata: [
              {
                name: column.key,
                data: value
              }
            ]
          }
        ]
      }
    }

    patchAsset(update).catch((error) => {
      console.error(error)
    }).then(() => {
      prepareAndFetchListing()
    }).catch((error) => {
      console.error(error)
    })
  }

  function prepareAndFetchListing (): void {
    if (columns.length === 0) {
      return
    }

    const columnsToRequest = [...columns]
    const hasIdColumn = columns.some((column) => column.key === 'id')

    if (!hasIdColumn) {
      const idColumn = gridConfig!.find((column) => column.key === 'id')!
      columnsToRequest.push(idColumn)
    }

    let sortFilter: GridFilter['sortFilter'] = {}

    if (sorting.length > 0) {
      const currentSorting = sorting[0]
      sortFilter = {
        key: currentSorting.id,
        direction: currentSorting.desc ? 'DESC' : 'ASC'
      }
    }

    fetchListing({
      body: {
        folderId: assetId,
        columns: columnsToRequest.map((column) => ({
          config: [],
          key: column.key,
          type: column.type
        })),
        filters: {
          page,
          pageSize: parseInt(pageSize.toString()),
          ...filterOptions,
          sortFilter
        }
      }
    }).catch((error) => {
      console.error(error)
    })
  }
}
