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

import {
  api,
  type AssetGetGridApiArg,
  type AssetGetGridApiResponse,
  type AssetPatchByIdApiArg,
  type GridFilter,
  useAssetGetGridMutation,
  useAssetPatchByIdMutation
} from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { encodeColumnIdentifier, GridContainer } from './grid-container'
import { GridToolbarContainer } from './toolbar/grid-toolbar-container'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { SidebarContainer } from './sidebar/sidebar-container'
import {
  useListColumns,
  useListFilterOptions,
  useListGridConfig,
  useListPage,
  useListPageSize,
  useListSelectedRows,
  useListSorting,
  useListGridAvailableColumns
} from './hooks/use-list'
import { useAppDispatch } from '@Pimcore/app/store'
import { type GridProps, type OnUpdateCellDataEvent } from '@Pimcore/components/grid/grid'
import { ListDataProvider } from './list-provider'
import {
  ContentToolbarSidebarLayout
} from '@Pimcore/components/content-toolbar-sidebar-layout/content-toolbar-sidebar-layout'
import { Content } from '@Pimcore/components/content/content'
import { eventBus } from '@Pimcore/lib/event-bus'

interface DataPatch {
  columnId: string
  rowIndex: number
  value: any
}

export const ListContainerInner = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const dispatch = useAppDispatch()
  const { page, setPage } = useListPage()
  const { pageSize, setPageSize } = useListPageSize()
  const { setSelectedRows } = useListSelectedRows()
  const { filterOptions } = useListFilterOptions()
  const { columns, setGridColumns } = useListColumns()
  const { setGridConfig } = useListGridConfig()
  const { availableColumns, setAvailableColumns } = useListGridAvailableColumns()
  const assetId = assetContext.id
  const [data, setData] = useState<AssetGetGridApiResponse | undefined>()
  const [fetchListing] = useAssetGetGridMutation()
  const [patchAsset] = useAssetPatchByIdMutation()
  const [modifiedCells, setModifiedCells] = useState<GridProps['modifiedCells']>([])
  const [, setDataPatches] = useState<DataPatch[]>([])
  const { sorting } = useListSorting()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setSelectedRows({})
  }, [sorting, page, pageSize, filterOptions])

  useEffect(() => {
    prepareAndFetchListing()?.catch((error) => {
      console.log(error)
    })

    const subscriber = eventBus.subscribe({ type: 'asset:listing:refresh', id: assetId }, () => {
      prepareAndFetchListing()?.catch((error) => {
        console.log(error)
      })
    })

    return () => {
      eventBus.unsubscribe(subscriber)
    }
  }, [columns, filterOptions, page, pageSize, sorting])

  useEffect(() => {
    async function fetchGridConfiguration (): Promise<void> {
      const availableGridConfigPromise = dispatch(api.endpoints.assetGetAvailableGridColumns.initiate())
      const initialGridConfigPromise = dispatch(api.endpoints.assetGetGridConfigurationByFolderId.initiate({ folderId: assetId }))

      Promise.all([availableGridConfigPromise, initialGridConfigPromise]).then(([availableGridConfig, initialGridConfig]) => {
        setAvailableColumns(availableGridConfig.data?.columns)
        setGridConfig(initialGridConfig.data)

        const initialColumns = initialGridConfig.data!.columns!.map((column) => {
          const availableColumn = availableGridConfig.data?.columns?.find((availableColumn) => availableColumn.key === column.key)

          if (availableColumn === undefined) {
            throw new Error(`Column with key ${column.key} is not available`)
          }

          return availableColumn
        })

        setGridColumns(initialColumns)
      }).then(() => {
        setIsLoading(false)
      }).catch((error) => {
        console.error(error)
      })
    }

    fetchGridConfiguration().catch((error) => {
      console.error(error)
    })
  }, [])

  return useMemo(() => (
    <ListDataProvider data={ data }>
      <Content loading={ isLoading }>
        <ContentToolbarSidebarLayout
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
            modifiedCells={ modifiedCells }
            onUpdateCellData={ onUpdateCellData }
          />
        </ContentToolbarSidebarLayout>
      </Content>
    </ListDataProvider>
  ), [data, page, pageSize, modifiedCells, isLoading])

  function onPagerChange (page: number, pageSize: number): void {
    setPage(page)
    setPageSize(pageSize)
  }

  function onUpdateCellData ({ value, columnId, rowData }: OnUpdateCellDataEvent): void {
    const columnIdentifier = encodeColumnIdentifier(columnId)
    const column = columns.find((column) => column.key === columnIdentifier.key && column.locale === columnIdentifier.locale)

    if (column === undefined) {
      return
    }

    setDataPatches((oldPatches) => {
      return [
        ...oldPatches,
        {
          columnId: columnIdentifier.key,
          rowIndex: rowData.id,
          value
        }
      ]
    })

    setModifiedCells((oldModified) => [
      ...oldModified ?? [],
      {
        columnId,
        rowIndex: rowData.id
      }
    ])

    updateData()

    const backendType = column.type.split('.')

    if (backendType[0] !== 'metadata') {
      throw new Error('Only metadata columns are supported for now')
    }

    const update: AssetPatchByIdApiArg = {
      body: {
        data: [
          {
            id: rowData.id,
            metadata: [
              {
                name: columnIdentifier.key,
                language: columnIdentifier.locale,
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
      prepareAndFetchListing()?.finally(() => {
        setModifiedCells((oldModified) => {
          return oldModified?.filter((item) => !(item.columnId === columnId && item.rowIndex === rowData.id))
        })

        setDataPatches((oldPatches) => {
          return oldPatches.filter((patch) => !(patch.columnId === columnIdentifier.key && patch.rowIndex === rowData.id))
        })
      }).catch((error) => {
        console.error(error)
      })
    }).catch((error) => {
      console.error(error)
    })
  }

  function prepareAndFetchListing (): Promise<any> | undefined {
    if (columns.length === 0) {
      return
    }

    const requestData = getQueryArgs()

    return fetchListing({
      ...requestData
    }).then((data: any) => {
      const _data = data.data as AssetGetGridApiResponse
      updateData(_data)
    }).catch((error) => {
      console.error(error)
    })
  }

  function getQueryArgs (): AssetGetGridApiArg {
    const columnsToRequest = [...columns]
    const hasIdColumn = columns.some((column) => column.key === 'id')

    if (!hasIdColumn) {
      const idColumn = availableColumns!.find((column) => column.key === 'id')!
      columnsToRequest.push(idColumn)
    }

    let sortFilter: GridFilter['sortFilter'] = {}

    if (sorting.length > 0) {
      const currentSorting = sorting[0]
      const identifier = encodeColumnIdentifier(currentSorting.id)

      sortFilter = {
        key: identifier.key,
        locale: identifier.locale,
        direction: currentSorting.desc ? 'DESC' : 'ASC'
      }
    }

    return {
      body: {
        folderId: assetId,
        columns: columnsToRequest.map((column) => ({
          config: [],
          key: column.key,
          type: column.type,
          locale: column.locale
        })),
        filters: {
          page,
          pageSize: parseInt(pageSize.toString()),
          ...filterOptions,
          sortFilter
        }
      }
    }
  }

  function updateData (dataUpdate: AssetGetGridApiResponse | undefined = undefined): void {
    setDataPatches((currentDataPatches) => {
      setData((currentData) => {
        const currentDataModel = dataUpdate ?? currentData

        const items = currentDataModel?.items.map((item) => {
          const itemId = item.columns!.find((column) => column.key === 'id')?.value
          const hasPatch = currentDataPatches.some((patch) => patch.rowIndex === itemId)

          if (!hasPatch) {
            return item
          }

          const patchedColumns = item.columns!.map((column) => {
            const patch = currentDataPatches.find((patch) => patch.rowIndex === itemId && patch.columnId === column.key)

            if (patch === undefined) {
              return column
            }

            return {
              ...column,
              value: patch.value
            }
          })

          return {
            ...item,
            columns: patchedColumns
          }
        })

        return {
          items: items ?? [],
          totalItems: currentDataModel?.totalItems ?? 0
        }
      })

      return currentDataPatches
    })
  }
}
