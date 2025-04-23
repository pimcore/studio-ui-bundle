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
import { type SettingsContextProps } from '../../../settings/settings-provider'

export type DataLoadingState = 'initial' | 'config-changed' | 'data-available' | 'data-loading' | 'data-error'

export interface DataContextProps {
  dataQueryResult: ReturnType<SettingsContextProps['useDataQuery']> | undefined
  setDataQueryResult: (data: any) => void
  data: any
  setData: (data: any) => void
  dataLoadingState: DataLoadingState
  setDataLoadingState: (data: DataLoadingState) => void
}

export const DataContext = createContext<DataContextProps | null>(null)

export interface DataProviderProps {
  children: React.ReactNode
}

export const DataProvider = ({ children }: DataProviderProps): React.JSX.Element => {
  const [dataQueryResult, setDataQueryResult] = useState<DataContextProps['dataQueryResult']>()
  const [data, setData] = useState<DataContextProps['data']>()
  const [dataLoadingState, setDataLoadingState] = useState<DataContextProps['dataLoadingState']>('initial')

  return useMemo(() => (
    <DataContext.Provider value={ { dataQueryResult, setDataQueryResult, data, setData, dataLoadingState, setDataLoadingState } }>
      {children}
    </DataContext.Provider>
  ), [dataQueryResult, data, dataLoadingState])
}
