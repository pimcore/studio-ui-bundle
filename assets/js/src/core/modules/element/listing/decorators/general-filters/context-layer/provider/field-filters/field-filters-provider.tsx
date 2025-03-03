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

export interface FieldFilter {
  key: string
  type: string
  filterValue: any
}

export interface FieldFiltersData {
  fieldFilters: FieldFilter[]
  setFieldFilters: (fieldFilters: FieldFilter[]) => void
}

export type FieldFiltersContextProps = FieldFiltersData | undefined

export const FieldFiltersContext = createContext<FieldFiltersContextProps>(undefined)

export interface FieldFiltersProviderProps {
  children: React.ReactNode
}

export const FieldFiltersProvider = (props: FieldFiltersProviderProps): React.JSX.Element => {
  const [fieldFilters, setFieldFilters] = useState<FieldFilter[]>([])

  return useMemo(() => (
    <FieldFiltersContext.Provider value={ { fieldFilters, setFieldFilters } }>
      {props.children}
    </FieldFiltersContext.Provider>
  ), [fieldFilters])
}
