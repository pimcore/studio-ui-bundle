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
import { type DynamicTypeThemeRegistry } from './registry/dynamic-type-theme-registry'
import { type DynamicTypeThemeStudioDefaultLight } from './definitions/studio-default-light/dynamic-type-theme-studio-default-light'
import { type DynamicTypeThemeStudioDefaultDark } from './definitions/studio-default-dark/dynamic-type-theme-studio-default-dark'

moduleSystem.registerModule({
  onInit: () => {
    const themeRegistry = container.get<DynamicTypeThemeRegistry>(serviceIds['DynamicTypes/ThemeRegistry'])

    themeRegistry.registerDynamicType(container.get<DynamicTypeThemeStudioDefaultLight>(serviceIds['DynamicTypes/Theme/StudioDefaultLight']))
    themeRegistry.registerDynamicType(container.get<DynamicTypeThemeStudioDefaultDark>(serviceIds['DynamicTypes/Theme/StudioDefaultDark']))
  }
})
