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
import { useClassDefinitionSelection } from '../../class-definition-selection/context-layer/provider/use-class-definition-selection'
import { Content } from '@Pimcore/components/content/content'
import { ClassDefinitionSelect } from '../../class-definition-selection/components/class-definition-select/class-definition-select'
import { ColumnConfigLoader } from './components/column-config-loader/column-config-loader'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'

export const WithColumnConfiguration = (Component: AbstractDecoratorProps['ConfigurationComponent']): AbstractDecoratorProps['ConfigurationComponent'] => {
  const availableColumnsConfigurationComponent = (): React.JSX.Element => {
    const { selectedClassDefinition } = useClassDefinitionSelection()

    if (selectedClassDefinition === undefined) {
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

    return (
      <ColumnConfigLoader Component={ Component } />
    )
  }

  return availableColumnsConfigurationComponent
}
