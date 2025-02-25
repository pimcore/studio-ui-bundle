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
import { useClassObjectBrickObjectLayoutQuery } from '@Pimcore/modules/class-definition/class-definition-slice.gen'
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
