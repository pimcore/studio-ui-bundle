/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ClassDefinition } from '@sdk/api/class-definition'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface IClassDefinitionDetailContext {
  classDefinition: ClassDefinition | undefined
}

export const ClassDefinitionDetailContext = createContext<IClassDefinitionDetailContext | undefined>(undefined)

export interface IClassDefinitionDetailProviderProps {
  classDefinition: ClassDefinition | undefined
  children: React.ReactNode
}

export const ClassDefinitionDetailProvider = (props: IClassDefinitionDetailProviderProps): React.JSX.Element => {
  const [classDefinition, setClassDefinition] = useState<ClassDefinition | undefined>(props.classDefinition)

  useEffect(() => {
    setClassDefinition(props.classDefinition)
  }, [props.classDefinition])

  return useMemo(() => (
    <ClassDefinitionDetailContext.Provider value={ { classDefinition } }>
      {props.children}
    </ClassDefinitionDetailContext.Provider>
  ), [classDefinition, props.children])
}

export const useClassDefinitionDetail = (): IClassDefinitionDetailContext => {
  const context = useContext(ClassDefinitionDetailContext)

  if (context === undefined) {
    throw new Error('useClassDefinitionDetail must be used within a ClassDefinitionDetailProvider')
  }

  return context
}
