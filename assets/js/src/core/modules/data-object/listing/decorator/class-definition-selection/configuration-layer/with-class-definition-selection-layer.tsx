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
import { type ClassDefinitionSelectionDecoratorConfig } from '../class-definition-selection-decorator'
import { Content } from '@Pimcore/components/content/content'
import { ClassDefinitionSelect } from '../components/class-definition-select/class-definition-select'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'

export const withClassDefinitionSelectionLayer = (Component: AbstractDecoratorProps['ConfigurationComponent'], config: ClassDefinitionSelectionDecoratorConfig): AbstractDecoratorProps['ConfigurationComponent'] => {
  const ClassDefinitionSelectionConfigurationComponent = (): React.JSX.Element => {
    const { ViewComponent } = useSettings()
    const { selectedClassDefinition } = useClassDefinitionSelection()

    if (config.showConfigLayer === true && selectedClassDefinition === undefined) {
      return (
        <Content padded>
          <Flex
            align='center'
            gap={ 'extra-small' }
          >
            <Text>Select a class to display</Text>
            <ClassDefinitionSelect />
          </Flex>
        </Content>
      )
    }

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
