/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
import { useTranslation } from 'react-i18next'

export const withClassDefinitionSelectionLayer = (Component: AbstractDecoratorProps['ConfigurationComponent'], config: ClassDefinitionSelectionDecoratorConfig): AbstractDecoratorProps['ConfigurationComponent'] => {
  const ClassDefinitionSelectionConfigurationComponent = (): React.JSX.Element => {
    const { ViewComponent } = useSettings()
    const { selectedClassDefinition } = useClassDefinitionSelection()
    const { t } = useTranslation()

    if (config.showConfigLayer === true && selectedClassDefinition === undefined) {
      return (
        <Content padded>
          <Flex
            align='center'
            gap={ 'extra-small' }
          >
            <Text>{t('data-object.select-class-to-display')}</Text>
            <ClassDefinitionSelect />
          </Flex>
        </Content>
      )
    }

    if (config.showConfigLayer === true && selectedClassDefinition === undefined) {
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
