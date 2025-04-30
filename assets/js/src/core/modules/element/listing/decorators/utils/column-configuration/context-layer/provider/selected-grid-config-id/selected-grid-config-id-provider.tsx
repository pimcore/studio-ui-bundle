/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
