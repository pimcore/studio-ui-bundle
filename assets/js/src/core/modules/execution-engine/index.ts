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
import { NotificationJobContainer as DefaultJobContainer } from './jobs/default/notification-job-container'
import { NotificationJobContainer as MessageBusJobContainer } from './jobs/default/notification-job-container-message-bus'
import { NotificationJobContainer as ZipUploadJobContainer } from './jobs/zip-upload/notification-job-container'

export const executionEngineModule: AbstractModule = {
  onInit () {
    const jobComponentRegistry = container.get<JobComponentRegistry>(serviceIds['ExecutionEngine/JobComponentRegistry'])

    jobComponentRegistry.registerComponent('default', DefaultJobContainer)
    jobComponentRegistry.registerComponent('default-message-bus', MessageBusJobContainer)
    jobComponentRegistry.registerComponent('zip-upload', ZipUploadJobContainer)
  }
}

moduleSystem.registerModule(executionEngineModule)
