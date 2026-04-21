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
 * Consumes currentStep / totalSteps to derive progress as a completion percentage.
 *
 * Each step fires progress: 100 when it finishes. We advance the bar to
 * currentStep/totalSteps only once that completion signal arrives:
 *   step 1/7 completes (progress:100) → 14%
 *   step 2/7 completes (progress:100) → 29%
 *   step 7/7 completes (progress:100) → 100%
 *
 * While a step is still running (progress < 100), we hold at the previous
 * boundary so the bar never jumps forward prematurely.
 *
 * Falls back to the raw `progress` field for single-step jobs (totalSteps === 1).
 *
 * Used as the default strategy when none is specified.
 */
export class StepCountProgressStrategy implements ProgressStrategy {
  calculateProgress (data: any, _context: ProgressStrategyContext): ProgressResult {
    const hasSteps = !isNil(data?.currentStep) && !isNil(data?.totalSteps) && (data.totalSteps as number) > 1
    const hasProgress = !isNil(data?.progress)

    if (hasSteps) {
      const currentStep = data.currentStep as number
      const totalSteps = data.totalSteps as number
      const stepProgress = hasProgress ? (data.progress as number) : 100

      // Advance to currentStep/totalSteps only once the step reports completion.
      // While the step is in progress, hold at the previous boundary.
      if (stepProgress >= 100) {
        return Math.round((currentStep / totalSteps) * 100)
      }

      return Math.round(((currentStep - 1) / totalSteps) * 100)
    }

    if (hasProgress) {
      return Math.max(0, Math.min(100, data.progress as number))
    }

    return PROGRESS_NO_UPDATE
  }
}
