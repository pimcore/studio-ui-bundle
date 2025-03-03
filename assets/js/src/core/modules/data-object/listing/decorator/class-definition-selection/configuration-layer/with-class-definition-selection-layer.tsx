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

import React from 'react'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { useClassDefinitionSelection } from '../context-layer/provider/use-class-definition-selection'
import { useSettings } from '@Pimcore/modules/element/listing/abstract/settings/use-settings'

export const withClassDefinitionSelectionLayer = (Component: AbstractDecoratorProps['ConfigurationComponent']): AbstractDecoratorProps['ConfigurationComponent'] => {
  const ClassDefinitionSelectionConfigurationComponent = (): React.JSX.Element => {
    const { ViewComponent } = useSettings()
    const { selectedClassDefinition } = useClassDefinitionSelection()

    if (selectedClassDefinition === undefined) {
      return (
        <ViewComponent />
      )
    }

    return (
      <Component />
    )
  }

  return ClassDefinitionSelectionConfigurationComponent
}
