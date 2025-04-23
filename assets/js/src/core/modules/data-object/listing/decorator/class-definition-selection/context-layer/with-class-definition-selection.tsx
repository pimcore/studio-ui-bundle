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

import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React from 'react'
import { ClassDefinitionSelectionProvider } from './provider/class-definition-selection-provider'
import { type ClassDefinitionSelectionDecoratorConfig } from '../class-definition-selection-decorator'
import { ClassDefinitionsProvider } from '@Pimcore/modules/data-object/utils/provider/class-defintions/class-definitions-provider'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'

export const withClassDefinitionSelectionContext = (Component: AbstractDecoratorProps['ContextComponent'], config: ClassDefinitionSelectionDecoratorConfig): AbstractDecoratorProps['ContextComponent'] => {
  const ClassDefinitionSelectionContextComponent = (): React.JSX.Element => {
    const { useElementId } = useSettings()
    const { getId } = useElementId()

    return (
      <ClassDefinitionsProvider elementId={ getId() }>
        <ClassDefinitionSelectionProvider config={ config }>
          <Component />
        </ClassDefinitionSelectionProvider>
      </ClassDefinitionsProvider>
    )
  }

  return ClassDefinitionSelectionContextComponent
}
