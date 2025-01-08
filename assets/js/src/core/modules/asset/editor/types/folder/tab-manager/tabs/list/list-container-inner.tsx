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

import React, { useContext, useEffect, useMemo, useState } from 'react'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { isUndefined } from 'lodash'
import { api, type AssetGetGridApiResponse, type Column, type AssetPatchByIdApiArg, useAssetGetGridMutation, useAssetPatchByIdMutation } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type GridColumnConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { encodeColumnIdentifier, GridContainer } from './grid-container'
import { GridToolbarContainer } from './toolbar/grid-toolbar-container'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { SidebarContainer } from './sidebar/sidebar-container'
import {
  useListColumns,
  useListFilterOptions,
  useListGridConfig,
  useListSelectedRows,
  useListSorting,
  useListGridAvailableColumns,
  useListSelectedConfigId
} from './hooks/use-list'
import { useAppDispatch } from '@Pimcore/app/store'
import { type GridProps, type OnUpdateCellDataEvent } from '@Pimcore/types/components/types'
import { ListDataProvider } from './list-provider'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { eventBus } from '@Pimcore/lib/event-bus'
import { generateQueryArgsForGrid } from './helpers/gridHelpers'
import usePagination from '@Pimcore/utils/hooks/use-pagination'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'

interface DataPatch {
  columnId: string
  locale: string | null | undefined
  rowIndex: number
  value: any
}

export const ListContainerInner = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const dispatch = useAppDispatch()
  const { page, pageSize, handlePageChange } = usePagination()
  const { setSelectedRows } = useListSelectedRows()
  const { filterOptions } = useListFilterOptions()
  const { columns, setGridColumns } = useListColumns()
  const { setGridConfig } = useListGridConfig()
  const { availableColumns, setAvailableColumns } = useListGridAvailableColumns()
  const { selectedGridConfigId } = useListSelectedConfigId()
  const assetId = assetContext.id
  const [data, setData] = useState<AssetGetGridApiResponse | undefined>()
  const [fetchListing, fetchListingResult] = useAssetGetGridMutation()
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

  const getInitialColumns = ({ initialGridConfigData, availableGridConfigData }): GridColumnConfiguration[] => {
    return initialGridConfigData!.columns.map((column: Column) => {
      const availableColumn = availableGridConfigData?.columns?.find((availableColumn: GridColumnConfiguration) => availableColumn.key === column.key)

      if (isUndefined(availableColumn)) {
        trackError(new GeneralError(`Column with key ${column.key} is not available`))
      }

      return availableColumn
    }).filter((column: GridColumnConfiguration | undefined) => !isUndefined(column))
  }

  useEffect(() => {
    async function fetchGridConfiguration (): Promise<void> {
      const availableGridConfigPromise = dispatch(api.endpoints.assetGetAvailableGridColumns.initiate())
      const initialGridConfigPromise = dispatch(api.endpoints.assetGetGridConfigurationByFolderId.initiate({ folderId: assetId, configurationId: selectedGridConfigId }))

      Promise.all([availableGridConfigPromise, initialGridConfigPromise]).then(([availableGridConfig, initialGridConfig]) => {
        setAvailableColumns(availableGridConfig.data?.columns)
        setGridConfig(initialGridConfig.data)

        const initialColumns = getInitialColumns({
          initialGridConfigData: initialGridConfig.data,
          availableGridConfigData: availableGridConfig.data
        })

        setGridColumns(initialColumns)
        availableGridConfigPromise.unsubscribe()
        initialGridConfigPromise.unsubscribe()
      }).then(() => {
        setIsLoading(false)
      }).catch((error) => {
        console.error(error)
      })
    }

    fetchGridConfiguration().catch((error) => {
      console.error(error)
    })
  }, [selectedGridConfigId])

  const updateData = (dataUpdate: AssetGetGridApiResponse | undefined = undefined): void => {
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
            const patch = currentDataPatches.find((_patch) => {
              return _patch.rowIndex === itemId && _patch.columnId === column.key && _patch.locale === column.locale
            })

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

  const prepareAndFetchListing = (): Promise<any> | undefined => {
    if (columns.length === 0) return

    const requestData = generateQueryArgsForGrid({ columns, availableColumns, assetId, page, pageSize, sorting, filterOptions })

    return fetchListing({
      ...requestData
    }).then((data: any) => {
      const _data = data.data as AssetGetGridApiResponse
      updateData(_data)
    }).catch((error) => {
      console.error(error)
    })
  }

  const updateDataPatches = (columnIdentifier: any, rowIndex: any, value: any): void => {
    setDataPatches((oldPatches) => {
      return [
        ...oldPatches,
        {
          columnId: columnIdentifier.key,
          locale: columnIdentifier.locale,
          rowIndex,
          value
        }
      ]
    })
  }

  const updateModifiedCells = (columnId: string, rowIndex: any): void => {
    setModifiedCells((oldModified) => {
      return [
        ...(oldModified ?? []),
        {
          columnId,
          rowIndex
        }
      ]
    })
  }

  const replaceModifiedCells = (columnId: string, rowIndex: any): void => {
    setModifiedCells((oldModified) => {
      return oldModified?.filter((item) => !(item.columnId === columnId && item.rowIndex === rowIndex))
    })
  }

  const replaceDataPatches = (columnIdentifier: any, rowIndex: any, locale: string): void => {
    setDataPatches((oldPatches) => {
      return oldPatches.filter((patch) => !(patch.columnId === columnIdentifier.key && locale === columnIdentifier.locale && patch.rowIndex === rowIndex))
    })
  }

  const onUpdateCellData = ({ value, columnId, rowData }: OnUpdateCellDataEvent): void => {
    const columnIdentifier = encodeColumnIdentifier(columnId)
    const column = columns.find((column) => column.key === columnIdentifier.key && column.locale === columnIdentifier.locale)

    if (column === undefined) return

    updateDataPatches(columnIdentifier, rowData.id, value)
    updateModifiedCells(columnId, rowData.id)

    updateData()

    const backendType = column.type.split('.')

    if (backendType[0] !== 'metadata') {
      trackError(new GeneralError('Only metadata columns are supported for now'))
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
        replaceModifiedCells(columnId, rowData.id)
        replaceDataPatches(columnIdentifier, rowData.id, column.locale!)
      }).catch((error) => {
        console.error(error)
      })
    }).catch((error) => {
      console.error(error)
    })
  }

  return useMemo(() => (
    <ListDataProvider data={ data }>
      <Content loading={ isLoading }>
        <ContentLayout
          renderSidebar={ <SidebarContainer errorData={ fetchListingResult.error as FetchBaseQueryError } /> }
          renderToolbar={
            <GridToolbarContainer
              pager={ {
                current: page,
                total: data?.totalItems ?? 0,
                pageSize,
                onChange: handlePageChange
              } }
            />
          }
        >
          <GridContainer
            assets={ data }
            modifiedCells={ modifiedCells }
            onUpdateCellData={ onUpdateCellData }
          />
        </ContentLayout>
      </Content>
    </ListDataProvider>
  ), [data, page, pageSize, modifiedCells, isLoading])
}
