/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type JobStatus, type AbstractJob } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { type JobButtonCustomizationContext } from './message-bus-job-notification'
import { type ProgressStrategy } from './strategies/progress-strategy'

export interface MessageBusJob extends AbstractJob {
  progress?: number
  indeterminate?: boolean
  currentStep?: number
  totalSteps?: number
  stepDescriptionKey?: string
  onRetry?: () => void | Promise<void>
  onCustomizeButtons?: (context: JobButtonCustomizationContext) => void
  messages?: string[]
  jobRunId: number
}

export interface JobCompletionData {
  isSuccessful: boolean
  isFinished: boolean
  isFailed: boolean
  status: JobStatus
  payload: any
}

export interface MessageBusJobHandlerOptions {
  jobRunId: number
  title: string | ((job: MessageBusJob) => string)
  totalSteps?: number
  stepDescriptions?: Record<number, string>
  progressStrategy?: ProgressStrategy
  onJobCompletion?: (data: JobCompletionData) => void | Promise<void>
  onRetry?: () => void | Promise<void>
  onCustomizeButtons?: (context: JobButtonCustomizationContext) => void
}
