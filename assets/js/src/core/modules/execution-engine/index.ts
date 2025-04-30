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
import { NotificationJobContainer as DownloadJobContainer } from './jobs/download/notification-job-container'
import { NotificationJobContainer as ZipUploadJobContainer } from './jobs/zip-upload/notification-job-container'
import { NotificationJobContainer as BatchEditJobContainer } from './jobs/batch-edit/notification-job-container'
import { NotificationJobContainer as DeleteJobContainer } from './jobs/delete/notification-job-container'
import { NotificationJobContainer as CloneJobContainer } from './jobs/clone/notification-job-container'
import { NotificationJobContainer as TagAssignJobContainer } from './jobs/tag-assign/notification-job-container'

export const executionEngineModule: AbstractModule = {
  onInit () {
    const jobComponentRegistry = container.get<JobComponentRegistry>(serviceIds['ExecutionEngine/JobComponentRegistry'])

    jobComponentRegistry.registerComponent('default', DefaultJobContainer)
    jobComponentRegistry.registerComponent('download', DownloadJobContainer)
    jobComponentRegistry.registerComponent('batch-edit', BatchEditJobContainer)
    jobComponentRegistry.registerComponent('zip-upload', ZipUploadJobContainer)
    jobComponentRegistry.registerComponent('delete', DeleteJobContainer)
    jobComponentRegistry.registerComponent('clone', CloneJobContainer)
    jobComponentRegistry.registerComponent('tag-assign', TagAssignJobContainer)
  }
}

moduleSystem.registerModule(executionEngineModule)
