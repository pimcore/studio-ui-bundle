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

import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem, type AbstractModule } from '@Pimcore/app/module-system/module-system'
import { type JobComponentRegistry } from './services/job-component-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import { NotificationJobContainer as DefaultJobContainer } from './jobs/default/notification-job-container'
import { NotificationJobContainer as DownloadJobContainer } from './jobs/download/notification-job-container'

export const executionEngineModule: AbstractModule = {
  onInit () {
    const jobComponentRegistry = container.get<JobComponentRegistry>(serviceIds['ExecutionEngine/JobComponentRegistry'])

    jobComponentRegistry.registerComponent('default', DefaultJobContainer)
    jobComponentRegistry.registerComponent('download', DownloadJobContainer)
  }
}

moduleSystem.registerModule(executionEngineModule)
