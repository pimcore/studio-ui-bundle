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
import { moduleSystem, type AbstractModule } from '@Pimcore/app/module-system/module-system'
import { type JobComponentRegistry } from './services/job-component-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { MessageBusJobNotification as MessageBusJobContainer } from './message-handlers/message-bus-job/message-bus-job-notification'
import { rehydrateJobsLoader } from './app-loader/rehydrate-jobs-loader'
import { type AppLoaderRegistry } from '@Pimcore/modules/app/app-loader/services/app-loader-registry'

export const executionEngineModule: AbstractModule = {
  onInit () {
    const jobComponentRegistry = container.get<JobComponentRegistry>(serviceIds['ExecutionEngine/JobComponentRegistry'])
    jobComponentRegistry.registerComponent('default-message-bus', MessageBusJobContainer)

    const appLoaderRegistry = container.get<AppLoaderRegistry>(serviceIds['AppLoader/Registry'])
    appLoaderRegistry.registerLoader(rehydrateJobsLoader)
  }
}

moduleSystem.registerModule(executionEngineModule)
