/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassDefinitionSelection } from '@Pimcore/modules/data-object/listing/decorator/class-definition-selection/context-layer/provider/use-class-definition-selection'
import { type AbstractDecoratorProps } from '@Pimcore/modules/element/listing/decorators/abstract-decorator'
import React from 'react'
import { StaticLoader } from './loader/static-loader'
import { ApiLoader } from './loader/api-loader'
import { useTypeSelect } from '@Pimcore/modules/element/components/type-select/provider/use-type-select'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/dynamic-type-object-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

export interface ColumnConfigLoaderProps {
  Component: AbstractDecoratorProps['ConfigurationComponent']
}

export const ColumnConfigLoader = ({ Component }: ColumnConfigLoaderProps): React.JSX.Element => {
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { value } = useTypeSelect()
  const objectRegistry = useInjection<DynamicTypeObjectRegistry>(serviceIds['DynamicTypes/ObjectRegistry'])
  let isValidClass = false

  const hasType = typeof value === 'string' && objectRegistry.hasDynamicType(value)

  if (hasType) {
    const type = objectRegistry.getDynamicType(value)
    isValidClass = type.allowClassSelectionInSearch && selectedClassDefinition?.id !== undefined
  }

  if (isValidClass) {
    return <ApiLoader Component={ Component } />
  }

  return <StaticLoader Component={ Component } />
}
