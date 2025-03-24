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

import React, { createContext, useMemo, useState } from 'react'
import { type ClassDefinitionSelectionDecoratorConfig } from '../../class-definition-selection-decorator'
import { type ClassDefinitionListItem } from '@Pimcore/modules/class-definition/class-definition-slice-enhanced'
import { useClassDefinitions } from '@Pimcore/modules/data-object/utils/provider/class-defintions/use-class-definitions'

export interface ClassDefinitionSelectionData {
  config: ClassDefinitionSelectionDecoratorConfig
  availableClassDefinitions: ClassDefinitionListItem[]
  selectedClassDefinition: ClassDefinitionListItem | undefined
  setSelectedClassDefinition: (classDefinition: ClassDefinitionListItem) => void
}

export type ClassDefinitionSelectionContextProps = ClassDefinitionSelectionData | undefined

export const ClassDefinitionSelectionContext = createContext<ClassDefinitionSelectionContextProps>(undefined)

export interface ClassDefinitionSelectionProviderProps {
  children: React.ReactNode
  config: ClassDefinitionSelectionDecoratorConfig
}

export const ClassDefinitionSelectionProvider = ({ children, config }: ClassDefinitionSelectionProviderProps): React.JSX.Element => {
  const { data } = useClassDefinitions()
  const [selectedClassDefinition, setSelectedClassDefinition] = useState<ClassDefinitionSelectionData['selectedClassDefinition']>(undefined)
  const availableClassDefinitions = useMemo(() => {
    if (data !== undefined) {
      return data.items
    }

    return []
  }, [data])

  return useMemo(() => (
    <ClassDefinitionSelectionContext.Provider value={ { config, availableClassDefinitions, selectedClassDefinition, setSelectedClassDefinition } }>
      {children}
    </ClassDefinitionSelectionContext.Provider>
  ), [config, availableClassDefinitions, selectedClassDefinition])
}
