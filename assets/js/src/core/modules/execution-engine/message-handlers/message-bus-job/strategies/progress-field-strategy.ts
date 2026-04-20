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
import { PROGRESS_NO_UPDATE, type ProgressResult, type ProgressStrategy, type ProgressStrategyContext } from './progress-strategy'

/**
 * Consumes the `progress` field (0–100) for smooth within-step progress.
 *
 * The step label (Step X/Y) is still driven by currentStep/totalSteps in the
 * handler — this strategy only controls the progress bar value.
 *
 * Handles mixed jobs where some steps are instant and some are gradual:
 *   - Gradual step: backend fires progress 0→100 → smooth bar
 *   - Instant step: backend fires only progress 100 with no ramp-up → spinner (null)
 *
 * When the handler owns a step count (totalSteps at construction) and the backend
 * additionally reports finer-grained sub-steps inside a child job (different
 * totalSteps value), both are combined into a single 0–100% value:
 *   combined = ((subStep - 1) / subTotal) * 100 + progress / subTotal
 *   e.g. sub-step 5 of 7 at 88% → (4/7)*100 + 88/7 ≈ 69.7%
 *
 * Internal gradual-progress state resets on every step transition via onStepTransition().
 */
export class ProgressFieldStrategy implements ProgressStrategy {
  private hadGradualProgress: boolean = false

  calculateProgress (data: any, context: ProgressStrategyContext): ProgressResult {
    const hasProgress = !isNil(data?.progress)

    if (!hasProgress) {
      return PROGRESS_NO_UPDATE
    }

    const progress = data.progress as number

    // Handler owns the step counter AND the backend reports internal sub-steps
    // within the child job — combine them into a unified 0–100% value.
    // Only applies when backend totalSteps differs from the handler-owned totalSteps,
    // meaning the backend is reporting a finer-grained step structure inside one
    // of the handler's own steps (not just echoing the same step count).
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

    // progress === 100 with no prior gradual progress → instant step, show indeterminate
    return null
  }

  onStepTransition (): void {
    this.hadGradualProgress = false
  }
}
