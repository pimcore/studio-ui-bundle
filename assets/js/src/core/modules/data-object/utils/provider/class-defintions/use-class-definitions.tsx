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

import { useContext } from 'react'
import { ClassDefinitionContext, type ClassDefinitionsData } from './class-definitions-provider'
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice.gen'

export type UseClassDefinitionsReturn = ClassDefinitionsData & {
  getById: (id: string) => ClassDefinitionListItem | undefined
  getByName: (name: string) => ClassDefinitionListItem | undefined
}

export const useClassDefinitions = (): UseClassDefinitionsReturn => {
  const context = useContext(ClassDefinitionContext)

  if (context === undefined) {
    throw new Error('useClassDefinitions must be used within a ClassDefinitionsProvider')
  }

  const getById: UseClassDefinitionsReturn['getById'] = (id) => {
    return context.data?.items?.find((classDefinition) => classDefinition.id === id)
  }

  const getByName: UseClassDefinitionsReturn['getByName'] = (name) => {
    return context.data?.items?.find((classDefinition) => classDefinition.name === name)
  }

  return {
    ...context,
    getById,
    getByName
  }
}
