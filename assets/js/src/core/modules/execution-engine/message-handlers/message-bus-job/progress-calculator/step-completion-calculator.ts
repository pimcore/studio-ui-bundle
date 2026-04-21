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
import { PROGRESS_NO_UPDATE, type ProgressCalculator, type ProgressCalculatorContext, type ProgressResult } from './progress-calculator.interface'

/**
 * Calculates progress from completed steps: step N done = N / totalSteps * 100%.
 *
 * Each step is considered complete when the backend sends progress: 100.
 * While a step is still running (progress < 100), the bar holds at the
 * previous step boundary.
 *
 *   step 1/7 completes → 14%
 *   step 2/7 completes → 29%
 *   step 7/7 completes → 100%
 *
 * Falls back to the raw progress field for single-step jobs (totalSteps === 1
 * or totalSteps unknown).
 *
 * Used for: delete, batch-delete — one step per element, instant completion.
 */
export class StepCompletionCalculator implements ProgressCalculator {
  calculateProgress (data: any, context: ProgressCalculatorContext): ProgressResult {
    const hasSteps = !isNil(data?.currentStep) && !isNil(data?.totalSteps) &&
      (data.totalSteps as number) > 1

    if (hasSteps) {
      const currentStep = data.currentStep as number
      const totalSteps = data.totalSteps as number
      const stepProgress = !isNil(data?.progress) ? (data.progress as number) : 100

      if (stepProgress >= 100) {
        return Math.round((currentStep / totalSteps) * 100)
      }

      return Math.round(((currentStep - 1) / totalSteps) * 100)
    }

    if (!isNil(data?.progress)) {
      return Math.max(0, Math.min(100, data.progress as number))
    }

    return PROGRESS_NO_UPDATE
  }
}
