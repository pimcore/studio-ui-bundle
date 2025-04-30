/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
