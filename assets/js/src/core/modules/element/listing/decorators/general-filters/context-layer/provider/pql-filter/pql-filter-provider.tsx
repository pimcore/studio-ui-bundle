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

export const pqlFilterType = 'system.pql'

export interface PqlFilter {
  type: typeof pqlFilterType
  filterValue: string
}

export interface PqlFilterData {
  pqlQuery: PqlFilter['filterValue']
  setPqlQuery: (pqlQuery: PqlFilter['filterValue']) => void
  getDataQueryFilterArg: () => PqlFilter | undefined
}

export type PqlFilterContextProps = PqlFilterData | undefined

export const PqlFilterContext = createContext<PqlFilterContextProps>(undefined)

export interface PqlFilterProviderProps {
  children: React.ReactNode
}

export const PqlFilterProvider = (props: PqlFilterProviderProps): React.JSX.Element => {
  const [pqlQuery, setPqlQuery] = useState<PqlFilter['filterValue']>('')

  const getDataQueryFilterArg: PqlFilterData['getDataQueryFilterArg'] = () => {
    if (pqlQuery !== '') {
      return {
        type: pqlFilterType,
        filterValue: pqlQuery
      }
    }
  }

  return useMemo(() => (
    <PqlFilterContext.Provider value={ { pqlQuery, setPqlQuery, getDataQueryFilterArg } }>
      {props.children}
    </PqlFilterContext.Provider>
  ), [pqlQuery])
}
