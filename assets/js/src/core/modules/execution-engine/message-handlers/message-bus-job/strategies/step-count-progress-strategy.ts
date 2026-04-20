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
 * Consumes currentStep / totalSteps to derive progress.
 *
 * The bar advances at step boundaries:
 *   step 1 of 4 → 0%, step 2 of 4 → 25%, step 3 of 4 → 50%, step 4 of 4 → 75%
 *
 * Falls back to the raw `progress` field for single-step jobs (totalSteps === 1)
 * where no step-based calculation is possible.
 *
 * The `progress` field is otherwise ignored — suitable for jobs where each step
 * completes instantly or where within-step granularity is not meaningful.
 *
 * Used as the default strategy when none is specified.
 */
export class StepCountProgressStrategy implements ProgressStrategy {
  calculateProgress (data: any, _context: ProgressStrategyContext): ProgressResult {
    const hasSteps = !isNil(data?.currentStep) && !isNil(data?.totalSteps) && (data.totalSteps as number) > 1
    const hasProgress = !isNil(data?.progress)

    if (hasSteps) {
      return Math.max(0, Math.round(((data.currentStep - 1) / data.totalSteps) * 100))
    }

    if (hasProgress) {
      return Math.max(0, Math.min(100, data.progress as number))
    }

    return PROGRESS_NO_UPDATE
  }
}
