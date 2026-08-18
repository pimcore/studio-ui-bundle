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
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem, type AbstractModule } from '@Pimcore/app/module-system/module-system'
import { type AppLoaderRegistry } from '@Pimcore/modules/app/app-loader/services/app-loader-registry'
import { telemetryDrainLoader } from './app-loader/telemetry-drain-loader'

/**
 * Headless module: registers a post-login loader that drains the telemetry spool from the browser
 * and forwards it to the first-party relay. Renders no UI. See {@link telemetryDrainLoader}.
 */
export const telemetryModule: AbstractModule = {
  onInit () {
    const appLoaderRegistry = container.get<AppLoaderRegistry>(serviceIds['AppLoader/Registry'])
    appLoaderRegistry.registerLoader(telemetryDrainLoader)
  }
}

moduleSystem.registerModule(telemetryModule)
