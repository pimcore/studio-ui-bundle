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

import { type FormListFieldData, type FormListOperation } from 'antd/es/form'
import React, { useMemo } from 'react'

export interface IFormListContext {
  field: FormListFieldData
  operation: FormListOperation
  fieldSuffix?: string
}

export const FormListContext = React.createContext<IFormListContext | undefined>(undefined)

export interface FormListProviderProps extends IFormListContext {
  children: React.ReactNode
}

export const FormListProvider = ({ field, fieldSuffix, operation, children }: FormListProviderProps): React.JSX.Element => {
  return useMemo(() => {
    return (
      <FormListContext.Provider value={ { field, fieldSuffix, operation } }>
        { children }
      </FormListContext.Provider>
    )
  }, [field, operation, children])
}
