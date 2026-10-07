/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

if (module.hot !== undefined) {
  module.hot.accept()
}

export type { ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'
export { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'

export { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
export type { JobInterface, JobRunOptions } from '@Pimcore/modules/execution-engine/jobs/job-interface'

export { MessageBusJobHandler } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler'
export type {
  JobCompletionData,
  MessageBusJob,
  MessageBusJobHandlerOptions
} from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler-types'
export type { JobButtonCustomizationContext } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-notification'

export {
  PROGRESS_NO_UPDATE,
  type ProgressCalculator,
  type ProgressCalculatorContext,
  type ProgressResult
} from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/progress-calculator/progress-calculator.interface'
export { StepCompletionCalculator } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/progress-calculator/step-completion-calculator'
export type { StepTracker, StepTrackerState } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/step-tracker/step-tracker.interface'

export { JobRehydrationRegistry } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
export type { JobRunList, RehydratableJob } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
