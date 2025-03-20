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

import { type AbstractDecorator } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import { withClassDefinitionSelectionContext } from './context-layer/with-class-definition-selection'
import { type IRelationAllowedTypesClassDefinition } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/helpers/relations/allowed-types'
import { withClassDefinitionSelectionLayer } from './configuration-layer/with-class-definition-selection-layer'

export interface ClassDefinitionSelectionDecoratorConfig {
  classRestriction?: IRelationAllowedTypesClassDefinition['classes']
  showConfigLayer?: boolean
}

export const defaultConfig: ClassDefinitionSelectionDecoratorConfig = {
  classRestriction: undefined,
  showConfigLayer: false
}

export const ClassDefinitionSelectionDecorator: AbstractDecorator<ClassDefinitionSelectionDecoratorConfig> = (props, config = defaultConfig) => {
  const { ContextComponent, ConfigurationComponent, ...baseProps } = props

  return {
    ...baseProps,
    ContextComponent: withClassDefinitionSelectionContext(ContextComponent, config),
    ConfigurationComponent: withClassDefinitionSelectionLayer(ConfigurationComponent, config)
  }
}
