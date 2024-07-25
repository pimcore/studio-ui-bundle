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

import { useGetAssetGridMutation, api, type GetAssetGridApiResponse } from '@Pimcore/modules/asset/asset-api-slice.gen'
import React, { useContext, useEffect, useState } from 'react'
import { GridContainer } from './grid-container'
import { GridToolbarContainer } from './grid-toolbar-container'
import { ContentToolbarSidebarView } from '@Pimcore/modules/element/editor/tab-manager/layouts/content-toolbar-sidebar-view'
import { AssetContext } from '@Pimcore/modules/asset/asset-provider'
import { SidebarContainer } from './sidebar-container'
import { useList } from './hooks/use-list'
import { useAppDispatch } from '@Pimcore/app/store'

export const ListContainerInner = (): React.JSX.Element => {
  const assetContext = useContext(AssetContext)
  const dispatch = useAppDispatch()
  const { page, pageSize, setPage, setPageSize, columns, gridConfig, setGridConfig } = useList()
  const assetId = assetContext.id!
  const [data, setData] = useState<GetAssetGridApiResponse | undefined>()
  const [fetchListing, { data: apiData }] = useGetAssetGridMutation()

  useEffect(() => {
    if (columns.length === 0) {
      return
    }

    const columnsToRequest = [...columns]
    const hasIdColumn = columns.some((column) => column.key === 'id')

    if (!hasIdColumn) {
      const idColumn = gridConfig!.find((column) => column.key === 'id')!
      columnsToRequest.push(idColumn)
    }

    fetchListing({
      body: {
        folderId: assetId,
        columns: columnsToRequest.map((column) => ({
          config: column.config,
          key: column.key,
          type: column.type
        }))
      }
    }).catch((error) => {
      console.error(error)
    })
  }, [columns, page, pageSize])

  useEffect(() => {
    async function fetchGridConfiguration (): Promise<void> {
      const { data } = await dispatch(api.endpoints.getAssetGridConfiguration.initiate())
      setGridConfig(data?.columns)
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

  function onPagerChange (page: number, pageSize: number): void {
    setPage(page)
    setPageSize(pageSize)
  }

  return (
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
      <GridContainer assets={ data } />
    </ContentToolbarSidebarView>
  )
}
