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
}

export type SortingContextProps = SortingData | undefined

export const SortingContext = createContext<SortingContextProps>(undefined)

export interface SortingProviderProps {
  children: React.ReactNode
}

export const SortingProvider = (props: SortingProviderProps): React.JSX.Element => {
  const [sorting, setSorting] = useState<SortingData['sorting']>([])
  return useMemo(() => (
    <SortingContext.Provider value={ { sorting, setSorting } }>
      {props.children}
    </SortingContext.Provider>
  ), [sorting, props.children])
}
