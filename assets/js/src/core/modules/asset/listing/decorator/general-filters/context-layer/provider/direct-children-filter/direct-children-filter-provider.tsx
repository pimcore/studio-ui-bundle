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

export interface DirectChildrenFilterData {
  onlyDirectChildren: boolean
  setOnlyDirectChildren: (onlyDirectChildren: boolean) => void
}

export type DirectChildrenFilterContextProps = DirectChildrenFilterData | undefined

export const DirectChildrenFilterContext = createContext<DirectChildrenFilterContextProps>(undefined)

export interface DirectChildrenFilterProviderProps {
  children: React.ReactNode
}

export const DirectChildrenFilterProvider = (props: DirectChildrenFilterProviderProps): React.JSX.Element => {
  const [onlyDirectChildren, setOnlyDirectChildren] = useState<boolean>(false)

  return useMemo(() => (
    <DirectChildrenFilterContext.Provider value={ { onlyDirectChildren, setOnlyDirectChildren } }>
      {props.children}
    </DirectChildrenFilterContext.Provider>
  ), [onlyDirectChildren])
}
