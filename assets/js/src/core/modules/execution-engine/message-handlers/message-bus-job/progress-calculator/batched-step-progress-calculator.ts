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
 * Progress for jobs the backend splits into equally-weighted steps that each
 * stream progress 0 → 100 (delete / batch-delete run in chunks of 500). Spreads
 * the steps across the bar so it climbs smoothly instead of resetting per batch:
 *
 *   ((currentStep - 1) + progress / 100) / totalSteps, rounded to whole percent
 *
 * Single-step jobs fall back to the raw progress field, with a lone 100 (no prior
 * gradual progress) treated as an instant step → spinner.
 */
export class BatchedStepProgressCalculator implements ProgressCalculator {
  private hadGradualProgress: boolean = false

  calculateProgress (data: any, _context: ProgressCalculatorContext): ProgressResult {
    if (isNil(data?.progress)) {
      return PROGRESS_NO_UPDATE
    }

    const progress = data.progress as number

    const hasMultipleSteps = !isNil(data?.currentStep) && !isNil(data?.totalSteps) &&
      (data.totalSteps as number) > 1

    if (hasMultipleSteps) {
      const step = data.currentStep as number
      const total = data.totalSteps as number
      const combined = ((step - 1) / total) * 100 + progress / total
      this.hadGradualProgress = true
      // Round, else a fractional step shows e.g. 48.5% (step 1/2 at 97%).
      return Math.round(Math.max(0, Math.min(100, combined)))
    }

    if (progress < 100) {
      this.hadGradualProgress = true
      return Math.max(0, Math.min(100, progress))
    }

    if (progress === 100 && this.hadGradualProgress) {
      return 100
    }

    // progress === 100 with no prior gradual progress → instant step → spinner
    return null
  }

  onStepChange (): void {
    this.hadGradualProgress = false
  }
}
