/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { MessageBusJobHandler } from './message-bus-job-handler'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'

/**
 * Job handler for jobs with multiple steps where some steps report granual within-step progress (0-100%)
 * while other steps complete instantly (only reporting progress: 100).
 *
 * Instant steps show an indeterminate animation. Once a step reports gradual progress (< 100),
 * the bar switches to determinate mode and displays the raw progress value (0-100%).
 */
export class CombinedProgressJobHandler extends MessageBusJobHandler {
  private hadGradualProgress: boolean = false

  protected override calculateProgress (data: any): number | null {
    const hasProgress = !isNil(data?.progress)

    if (!hasProgress) {
      return null
    }

    const progress = data.progress as number

    // When this handler owns the step counter and the backend reports sub-steps
    // within the child job, combine them into a single 0-100% value:
    //   ((subStep - 1) / subTotalSteps) * 100 + progress / subTotalSteps
    // e.g. sub-step 5/7 at 88% → (4/7)*100 + 88/7 ≈ 69.7%
    if (!isNil(this.totalSteps)) {
      const hasSubSteps = !isNil(data?.currentStep) && !isNil(data?.totalSteps) && (data.totalSteps as number) > 1
      if (hasSubSteps) {
        const subStep = data.currentStep as number
        const subTotal = data.totalSteps as number
        const combined = ((subStep - 1) / subTotal) * 100 + progress / subTotal
        this.hadGradualProgress = true
        return Math.max(0, Math.min(100, combined))
      }
    }

    if (progress < 100) {
      this.hadGradualProgress = true
      return Math.max(0, Math.min(100, progress))
    }

    if (progress === 100 && this.hadGradualProgress) {
      return 100
    }

    // progress === 100 without prior gradual progress = instant step completion
    return null
  }

  protected override transitionToChildJob (newJobRunId: number): void {
    this.hadGradualProgress = false
    super.transitionToChildJob(newJobRunId)
  }

  protected override async processUpdate (data: any): Promise<void> {
    // When this handler owns the step counter (totalSteps set at construction),
    // backend currentStep values are internal to the child job and must not
    // be used to detect a step transition — transitionToChildJob handles that.
    const isOwnedStep = !isNil(this.totalSteps)
    if (!isOwnedStep && !isNil(data?.currentStep) && data.currentStep !== this.currentStep) {
      this.hadGradualProgress = false
      this.lastProgressValue = -1
    }

    await super.processUpdate(data)

    if (this.hadGradualProgress) {
      this.updateJob({ indeterminate: false })
    } else if (!isNil(data?.progress)) {
      this.updateJob({
        indeterminate: true,
        status: JobStatus.RUNNING,
        stepDescriptionKey: this.stepDescriptions?.[this.currentStep]
      })
    }
  }
}
