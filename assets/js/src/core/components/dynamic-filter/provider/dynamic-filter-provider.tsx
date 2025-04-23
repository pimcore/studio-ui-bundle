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

import React, { createContext, useEffect, useMemo, useState } from 'react'

export interface IDynamicFilter {
  id: string
  type: string
  data: any
  frontendType?: string
  config?: any
}

export interface DynamicFilterData extends IDynamicFilter {
  setData: (data: any) => void
}

export type DynamicFilterContextProps = DynamicFilterData | undefined

export const DynamicFilterContext = createContext<DynamicFilterContextProps>(undefined)

export interface DynamicFilterProviderProps extends Omit<DynamicFilterData, 'setData'> {
  onChange?: (data: any) => void
  children: React.ReactNode
}

export const DynamicFilterProvider = ({ children, id, type, data, onChange, frontendType, config }: DynamicFilterProviderProps): React.JSX.Element => {
  const [_data, _setData] = useState<DynamicFilterData['data']>(data)

  useEffect(() => {
    _setData(data)
  }, [data])

  const setData = (data: any): void => {
    _setData(data)
    if (onChange !== undefined) {
      onChange(data)
    }
  }

  return useMemo(() => (
    <DynamicFilterContext.Provider value={ { id, type, data: _data, setData, frontendType, config } }>
      {children}
    </DynamicFilterContext.Provider>
  ), [id, type, _data, frontendType, config, children])
}
