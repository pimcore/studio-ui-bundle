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

import React, { useMemo } from 'react'

export interface IFieldWidthContext {
  small: number
  medium: number
  large: number
}

export const defaultFieldWidthValues: IFieldWidthContext = {
  small: 200,
  medium: 300,
  large: 900
}

export const FieldWidthContext = React.createContext<IFieldWidthContext | undefined>(undefined)

export interface FieldWidthProviderProps {
  fieldWidthValues?: Partial<IFieldWidthContext>
  children: React.ReactNode
}

export const FieldWidthProvider = ({ children, ...props }: FieldWidthProviderProps): React.JSX.Element => {
  const fieldWidthValues = useMemo(() => ({
    ...defaultFieldWidthValues,
    ...props.fieldWidthValues
  }), [props.fieldWidthValues])

  return (
    <FieldWidthContext.Provider value={ fieldWidthValues }>
      { children }
    </FieldWidthContext.Provider>
  )
}
