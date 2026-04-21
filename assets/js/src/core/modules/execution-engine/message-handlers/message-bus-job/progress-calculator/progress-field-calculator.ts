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
 * Reads the backend `progress` field (0–100) directly.
 *
 * Distinguishes between gradual steps and instant steps:
 *   - Gradual step: backend sends progress 0 → 100 over multiple messages → smooth bar
 *   - Instant step: backend sends only progress 100 in one message → spinner (null)
 *
 * When the step tracker has a known totalSteps and the backend reports finer-grained
 * sub-steps within a child job (different totalSteps value), the two are combined:
 *   combined = ((subStep - 1) / subTotal) * 100 + progress / subTotal
 *
 * Internal gradual-progress state resets on every step change via onStepChange().
 *
 * Used for: batch-edit folder, zip-upload, CSV/XLSX export (all variants).
 */
export class ProgressFieldCalculator implements ProgressCalculator {
  private hadGradualProgress: boolean = false

  calculateProgress (data: any, context: ProgressCalculatorContext): ProgressResult {
    if (isNil(data?.progress)) {
      return PROGRESS_NO_UPDATE
    }

    const progress = data.progress as number

    // Combine handler-owned step counter with backend sub-steps inside a child job.
    // Only triggers when backend totalSteps differs from the handler-known totalSteps,
    // meaning the backend is reporting finer granularity inside one of our steps.
    if (!isNil(context.totalSteps)) {
      const hasSubSteps = !isNil(data?.currentStep) && !isNil(data?.totalSteps) &&
        (data.totalSteps as number) > 1 &&
        (data.totalSteps as number) !== context.totalSteps

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

    // progress === 100 with no prior gradual progress → instant step → spinner
    return null
  }

  onStepChange (): void {
    this.hadGradualProgress = false
  }
}
