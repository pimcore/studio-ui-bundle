/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type BackgroundProcessor } from '@Pimcore/modules/background-processor/services/background-processor'
import { type BackgroundJobProcess } from '@Pimcore/modules/background-processor/process/background-job-process'
import { type BackgroundJobRegistry } from '@Pimcore/modules/background-processor/services/background-job-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'

// Export the generic background job system
export { BackgroundJobRegistry } from './services/background-job-registry'
export { BackgroundJobProcess } from './process/background-job-process'
export { AbstractBackgroundJobHandler } from './handlers/abstract-background-job-handler'
export { AbstractJobRunIdHandler } from './handlers/abstract-job-run-id-handler'

// Export example concrete handlers
export { DocumentCloneJobHandler } from './handlers/document-clone-job-handler'
export { MessageTypeHandler } from './handlers/message-type-handler'

moduleSystem.registerModule({
  onInit: () => {
    // Register the generic background job process
    const backgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)
    const globalProcess = container.get<BackgroundJobProcess>(serviceIds.backgroundJobProcess)
    
    backgroundProcessor.registerProcess(globalProcess)

    // Start the subscription directly in the module
    const jobRegistry = container.get<BackgroundJobRegistry>(serviceIds.backgroundJobRegistry)
    jobRegistry.startGlobalSubscription()
  }
})
