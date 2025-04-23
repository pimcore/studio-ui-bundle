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

import React, { createContext, useMemo } from 'react'

export interface SelectedGridConfigIdData {
  id: number | undefined
  setId: (id: number | undefined) => void
}

export type SelectedGridConfigIdContextProps = SelectedGridConfigIdData | undefined

export const SelectedGridConfigIdContext = createContext<SelectedGridConfigIdContextProps>(undefined)

export interface SelectedGridConfigIdProviderProps {
  children: React.ReactNode
}

export const SelectedGridConfigIdProvider = ({ children }: SelectedGridConfigIdProviderProps): React.JSX.Element => {
  const [id, setId] = React.useState<number | undefined>(undefined)

  return useMemo(() => (
    <SelectedGridConfigIdContext.Provider value={ { id, setId } }>
      {children}
    </SelectedGridConfigIdContext.Provider>
  ), [id])
}
