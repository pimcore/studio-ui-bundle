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
import { useClassObjectBrickObjectLayoutQuery } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'

export type IObjectBrickContext = ReturnType<typeof useClassObjectBrickObjectLayoutQuery> | null

export const ObjectBrickContext = createContext<IObjectBrickContext>(null)

export interface IObjectBrickProviderProps {
  children: React.ReactNode
}

export const ObjectBrickProvider = ({ children }: IObjectBrickProviderProps): React.JSX.Element => {
  const { id } = useElementContext()
  const objectBrickResult = useClassObjectBrickObjectLayoutQuery({ objectId: id })

  return useMemo(() => (
    <ObjectBrickContext.Provider value={ objectBrickResult }>
      { children }
    </ObjectBrickContext.Provider>
  ), [objectBrickResult, children])
}
