/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractBatchEditJob, type AbstractBatchEditJobOptions, type BatchEditHandlerOptions } from './abstract-batch-edit-job'
import { MessageBusJobHandler } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { ProgressFieldCalculator } from '../../message-handlers/message-bus-job/progress-calculator/progress-field-calculator'
import { DefaultStepTracker } from '../../message-handlers/message-bus-job/step-tracker/default-step-tracker'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'

export type AbstractFolderBatchEditJobOptions = AbstractBatchEditJobOptions

export abstract class AbstractFolderBatchEditJob extends AbstractBatchEditJob {
  static override readonly jobNames = ['studio_ee_job_patch_folder_elements'] as const

  protected static override buildHandler (options: BatchEditHandlerOptions): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      title: t('batch-edit.job-title'),
      stepDescriptions: {
        1: 'jobs.job.step.batch-edit.preparing',
        2: 'jobs.job.step.batch-edit.applying'
      },
      stepTracker: new DefaultStepTracker({ showStepLabel: true }),
      progressCalculator: new ProgressFieldCalculator(),
      onJobCompletion: options.onJobCompletion,
      onRetry: options.onRetry,
      onCustomizeButtons: options.onCustomizeButtons
    })
  }

  static override rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    const [parent] = jobRuns
    return this.buildHandler({ jobRunId: parent.id })
  }
}

void (AbstractFolderBatchEditJob satisfies RehydratableJob)
