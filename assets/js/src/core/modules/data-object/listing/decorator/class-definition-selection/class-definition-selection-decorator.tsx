/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
