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
import { MessageBusJobHandler, type MessageBusJob } from '../../message-handlers/message-bus-job/message-bus-job-handler'
import { ProgressFieldCalculator } from '../../message-handlers/message-bus-job/progress-calculator/progress-field-calculator'
import { ChildJobStepTracker } from '../../message-handlers/message-bus-job/step-tracker/child-job-step-tracker'
import { isNumber, isUndefined } from 'lodash'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { JobStatus } from '../abstact-job'
import { t } from 'i18next'

export interface ZipUploadJobOptions {
  title: string
  triggerUpload: (options: any) => void
  parentFolder: string
  onJobCompletion?: () => void | Promise<void>
}

export class ZipUploadJob implements JobInterface {
  constructor (private readonly options: ZipUploadJobOptions) {}

  async run (options: JobRunOptions): Promise<void> {
    const { messageBus } = options
    const { triggerUpload, parentFolder, title, onJobCompletion } = this.options

    await new Promise<void>((resolve) => {
      triggerUpload({
        action: `${getPrefix()}/assets/add-zip/${parentFolder}`,
        accept: '.zip, .rar, .7zip',
        name: 'zipFile',
        multiple: false,
        onSuccess: async (response: any): Promise<void> => {
          const jobRunId = response[0].response.jobRunId ?? undefined
          if (isNumber(jobRunId)) {
            const handler = new MessageBusJobHandler({
              jobRunId: Number(jobRunId),
              
              stepTracker: new ChildJobStepTracker({ totalSteps: 2 }),
              progressCalculator: new ProgressFieldCalculator(),
              onJobCompletion: async (data) => {
                if (data.isFinished && !isUndefined(onJobCompletion)) {
                  await onJobCompletion()
                }
              },
              title: (job: MessageBusJob) => {
                if (job.status === JobStatus.RUNNING) {
                  if (job.currentStep === 1) {
                    return t('jobs.zip-upload-job.step1.title')
                  }
                  if (job.currentStep === 2) {
                    return t('jobs.zip-upload-job.step2.title')
                  }
                }
                return title
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
}
