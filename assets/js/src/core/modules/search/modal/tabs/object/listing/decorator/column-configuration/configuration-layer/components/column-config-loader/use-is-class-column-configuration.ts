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
import { useTypeSelect } from '@Pimcore/modules/element/components/type-select/provider/use-type-select'
import { useInjection } from '@Pimcore/app/depency-injection'
import { type DynamicTypeObjectRegistry } from '@Pimcore/modules/element/dynamic-types/definitions/objects/dynamic-type-object-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

/**
 * Whether the listing shows the columns of one class definition (a class is selected and the
 * selected object type allows choosing one) rather than the static system columns.
 */
export const useIsClassColumnConfiguration = (): boolean => {
  const { selectedClassDefinition } = useClassDefinitionSelection()
  const { value } = useTypeSelect()
  const objectRegistry = useInjection<DynamicTypeObjectRegistry>(serviceIds['DynamicTypes/ObjectRegistry'])

  if (typeof value !== 'string' || !objectRegistry.hasDynamicType(value)) {
    return false
  }

  return objectRegistry.getDynamicType(value).allowClassSelectionInSearch && selectedClassDefinition?.id !== undefined
}
