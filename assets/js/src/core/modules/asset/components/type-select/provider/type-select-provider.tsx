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
import { type TypeSelectProps } from '../type-select'

export interface TypeSelectData extends Omit<TypeSelectProps, 'onChange'> {
  setValue: (value: string | null) => void
};

export type TypeSelectContextProps = TypeSelectData | undefined

export const TypeSelectContext = createContext<TypeSelectContextProps>(undefined)

export interface TypeSelectProviderProps extends Omit<TypeSelectProps, 'value' | 'onChange'> {
  children: React.ReactNode
}

export const TypeSelectProvider = (props: TypeSelectProviderProps): React.JSX.Element => {
  const [value, setValue] = React.useState<string | null>(props.initialValue ?? null)
  const { children, ...restProps } = props

  return useMemo(() => (
    <TypeSelectContext.Provider value={ { ...restProps, value, setValue } }>
      { children }
    </TypeSelectContext.Provider>
  ), [props, children, value, setValue])
}
