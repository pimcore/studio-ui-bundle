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

export const withClassDefinitionSelectionContext = (Component: AbstractDecoratorProps['ContextComponent'], config: ClassDefinitionSelectionDecoratorConfig): AbstractDecoratorProps['ContextComponent'] => {
  const ClassDefinitionSelectionContextComponent = (): React.JSX.Element => {
    return (
      <ClassDefinitionSelectionProvider config={ config }>
        <Component />
      </ClassDefinitionSelectionProvider>
    )
  }

  return ClassDefinitionSelectionContextComponent
}
