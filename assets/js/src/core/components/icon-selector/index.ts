/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { DynamicTypeIconSetPimcoreDefault } from './dynamic-types/definitions/pimcore-default-icons/dynamic-type-icon-set-pimcore-default'
import { DynamicTypeIconSetTwemoji } from './dynamic-types/definitions/pimcore-twemoji-icons/dynamic-type-icon-set-twemoji'
import { DynamicTypeIconSetRegistry } from './dynamic-types/registry/dynamic-type-icon-set-registry'

moduleSystem.registerModule({
  onInit: () => {
    const iconSetRegistry = container.get<DynamicTypeIconSetRegistry>(serviceIds['DynamicTypes/IconSetRegistry'])

    iconSetRegistry.registerDynamicType(container.get<DynamicTypeIconSetPimcoreDefault>(serviceIds['DynamicTypes/IconSet/PimcoreDefault']))
    iconSetRegistry.registerDynamicType(container.get<DynamicTypeIconSetTwemoji>(serviceIds['DynamicTypes/IconSet/Twemoji']))
  }
})
