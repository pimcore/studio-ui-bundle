/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type JobInterface, type JobRunOptions } from '../job-interface'
import { MessageBusJobHandler, type MessageBusJob, type JobCompletionData } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { ProgressFieldCalculator } from '../../message-handlers/message-bus-job/progress-calculator/progress-field-calculator'
import { ChildJobStepTracker } from '../../message-handlers/message-bus-job/step-tracker/child-job-step-tracker'
import { isNumber, isUndefined } from 'lodash'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { JobStatus } from '../abstact-job'
import { t } from 'i18next'
import { type RehydratableJob, type JobRunList } from '../../services/job-rehydration-registry'
import { resolveChildJobRunOptions } from '../rehydration-helpers'

export interface ZipUploadJobOptions {
  triggerUpload: (options: any) => void
  parentFolder: string
  onJobCompletion?: () => void | Promise<void>
}

export class ZipUploadJob implements JobInterface {
  constructor (private readonly options: ZipUploadJobOptions) {}

  async run (jobRunOptions: JobRunOptions): Promise<void> {
    const { messageBus } = jobRunOptions
    const { triggerUpload, parentFolder, onJobCompletion } = this.options

    await new Promise<void>((resolve) => {
      triggerUpload({
        action: `${getPrefix()}/assets/add-zip/${parentFolder}`,
        accept: '.zip, .rar, .7zip',
        name: 'zipFile',
        multiple: false,
        onSuccess: async (response: any): Promise<void> => {
          if (!Array.isArray(response) || response.length === 0 || response[0]?.response == null) {
            resolve()
            return
          }
          const jobRunId = response[0].response.jobRunId ?? undefined
          if (isNumber(jobRunId)) {
            const handler = ZipUploadJob.buildHandler({
              jobRunId: Number(jobRunId),
              onJobCompletion: async (data) => {
                if (data.isFinished && !isUndefined(onJobCompletion)) {
                  await onJobCompletion()
                }
              }
            })
            messageBus.registerHandler(handler)
          }
          resolve()
        },
        onError: (error: any) => {
          console.error(error)
          resolve()
        }
      })
    })
  }

  static readonly jobNames = ['studio_ee_job_upload_zip_file'] as const

  static rehydrate (jobRuns: JobRunList): MessageBusJobHandler {
    return this.buildHandler(resolveChildJobRunOptions(jobRuns))
  }

  private static buildHandler (options: {
    jobRunId: number
    ancestorJobRunIds?: number[]
    startAtStep?: number
    onJobCompletion?: (data: JobCompletionData) => Promise<void>
  }): MessageBusJobHandler {
    return new MessageBusJobHandler({
      jobRunId: options.jobRunId,
      ancestorJobRunIds: options.ancestorJobRunIds,
      title: (job: MessageBusJob) => {
        if (job.status === JobStatus.RUNNING) {
          if (job.currentStep === 1) return t('jobs.zip-upload-job.step1.title')
          if (job.currentStep === 2) return t('jobs.zip-upload-job.step2.title')
        }
        return t('jobs.zip-upload-job.title')
      },
      stepTracker: new ChildJobStepTracker({ totalSteps: 2, startAtStep: options.startAtStep }),
      progressCalculator: new ProgressFieldCalculator(),
      onJobCompletion: options.onJobCompletion
    })
  }
}

void (ZipUploadJob satisfies RehydratableJob)
