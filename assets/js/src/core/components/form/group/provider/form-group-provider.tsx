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

import { type NamePath } from 'antd/es/form/interface'
import React, { createContext, useMemo } from 'react'
import { useFormGroupOptional } from './use-form-group-optional'
import { isArray } from 'lodash'

export interface FormGroupData {
  name: NamePath
}

export type FormGroupContextProps = FormGroupData | undefined

export const FormGroupContext = createContext<FormGroupContextProps>(undefined)

export interface FormGroupProviderProps {
  name: FormGroupData['name']
  children: React.ReactNode
}

export const FormGroupProvider = ({ name, children }: FormGroupProviderProps): React.JSX.Element => {
  const groupContext = useFormGroupOptional()
  let groupName = name

  if (groupContext !== undefined) {
    const { name: parentName } = groupContext
    groupName = [
      ...(isArray(parentName) ? parentName : [parentName]),
      ...(isArray(name) ? name : [name])
    ]
  }

  return useMemo(() => (
    <FormGroupContext.Provider value={ { name: groupName } }>
      {children}
    </FormGroupContext.Provider>
  ), [groupName, children])
}
