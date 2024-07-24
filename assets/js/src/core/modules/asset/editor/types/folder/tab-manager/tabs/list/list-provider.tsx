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

import React, { createContext, useMemo, useState } from 'react'

import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice.gen'

export interface IListContext {
  gridConfig: GridColumnConfiguration[] | undefined
  setGridConfig: React.Dispatch<React.SetStateAction<GridColumnConfiguration[] | undefined>>
  columns: GridColumnConfiguration[]
  setColumns: React.Dispatch<React.SetStateAction<GridColumnConfiguration[]>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export const ListContext = createContext<IListContext>({
  gridConfig: undefined,
  setGridConfig: () => {},
  columns: [],
  setColumns: () => {},
  page: 1,
  setPage: () => {},
  pageSize: 20,
  setPageSize: () => {}
})

interface ListProviderProps {
  children: React.ReactNode
}

export const ListProvider = ({ children }: ListProviderProps): React.JSX.Element => {
  const [gridConfig, setGridConfig] = useState<GridColumnConfiguration[] | undefined>(undefined)
  const [columns, setColumns] = useState<GridColumnConfiguration[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  return useMemo(() => (
    <ListContext.Provider value={ {
      gridConfig,
      setGridConfig,
      columns,
      setColumns,
      page,
      setPage,
      pageSize,
      setPageSize
    } }
    >
      {children}
    </ListContext.Provider>
  ), [
    gridConfig,
    columns,
    page,
    pageSize,
    children
  ])
}
