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

import { type SelectedColumn } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/selected-columns-provider'
import { useSelectedColumns } from '@Pimcore/modules/element/listing/abstract/configuration-layer/provider/selected-columns/use-selected-columns'
import { type GridProps } from '@Pimcore/modules/element/listing/abstract/view-layer/components/grid/hooks/use-grid-options'
import React, { createContext, useMemo, useState } from 'react'

export interface SortingFilter {
  key: SelectedColumn['key']
  locale: SelectedColumn['locale']
  direction: 'asc' | 'desc'
}

export interface SortingData {
  sorting: GridProps['sorting']
  setSorting: (sorting: GridProps['sorting']) => void
  getDataQueryArg: () => SortingFilter | undefined
}

export type SortingContextProps = SortingData | undefined

export const SortingContext = createContext<SortingContextProps>(undefined)

export interface SortingProviderProps {
  children: React.ReactNode
}

export const SortingProvider = (props: SortingProviderProps): React.JSX.Element => {
  const [sorting, setSorting] = useState<SortingData['sorting']>([])
  const { decodeColumnIdentifier } = useSelectedColumns()

  const getDataQueryArg: SortingData['getDataQueryArg'] = () => {
    if (sorting === undefined || sorting.length === 0) {
      return undefined
    }

    const sortingColumnDef = sorting[0]
    const selectedColumn = decodeColumnIdentifier(sortingColumnDef.id)

    if (selectedColumn === undefined) {
      return undefined
    }

    const sortingFilter: SortingFilter = {
      key: selectedColumn.key,
      locale: selectedColumn.locale,
      direction: sortingColumnDef.desc ? 'desc' : 'asc'
    }

    return sortingFilter
  }

  return useMemo(() => (
    <SortingContext.Provider value={ { sorting, setSorting, getDataQueryArg } }>
      {props.children}
    </SortingContext.Provider>
  ), [sorting])
}
