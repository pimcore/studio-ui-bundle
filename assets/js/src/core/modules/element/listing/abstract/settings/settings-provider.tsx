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

import React, { createContext, useMemo, type ElementType } from 'react'
import { type BaseQueryFn, type TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'
import { type useGridOptions } from '../view-layer/components/grid/hooks/use-grid-options'
import { type useSidebarOptions } from '../view-layer/components/sidebar/hooks/use-sidebar-options'
import { type DataContextProps } from '../data-layer/provider/data/data-provider'

export interface UseQueryHelperReturn {
  hasRequiredArgs: () => boolean
  getArgs: () => Record<string, any>
  dataLoadingState: DataContextProps['dataLoadingState']
  setDataLoadingState: DataContextProps['setDataLoadingState']
}

export interface UseElementIdReturn {
  getId: () => number
}

export interface SettingsContextProps {
  ContextComponent: ElementType
  ConfigurationComponent: ElementType
  DataComponent: ElementType
  ViewComponent: ElementType
  useDataQueryHelper: () => UseQueryHelperReturn
  useDataQuery: (...props: unknown[]) => TypedUseQueryHookResult<any, unknown, BaseQueryFn>
  useGridOptions: typeof useGridOptions
  useSidebarOptions: typeof useSidebarOptions
  useElementId: () => UseElementIdReturn
}

export const SettingsContext = createContext<SettingsContextProps | null>(null)

export interface SettingsProviderProps extends SettingsContextProps {
  children: React.ReactNode
}

export const SettingsProvider = (props: SettingsProviderProps): React.JSX.Element => {
  const { children, ...contextProps } = props

  return useMemo(() => (
    <SettingsContext.Provider value={ contextProps }>
      {children}
    </SettingsContext.Provider>
  ), [props])
}
