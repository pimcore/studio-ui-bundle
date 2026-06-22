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

export interface UnreferencedFilterData {
  onlyUnreferenced: boolean
  setOnlyUnreferenced: (onlyUnreferenced: boolean) => void
}

export type UnreferencedFilterContextProps = UnreferencedFilterData | undefined

export const UnreferencedFilterContext = createContext<UnreferencedFilterContextProps>(undefined)

export interface UnreferencedFilterProviderProps {
  children: React.ReactNode
}

export const UnreferencedFilterProvider = (props: UnreferencedFilterProviderProps): React.JSX.Element => {
  const [onlyUnreferenced, setOnlyUnreferenced] = useState<boolean>(false)

  return useMemo(() => (
    <UnreferencedFilterContext.Provider value={ { onlyUnreferenced, setOnlyUnreferenced } }>
      {props.children}
    </UnreferencedFilterContext.Provider>
  ), [onlyUnreferenced])
}
