/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AbstractJobHandler } from './abstract-job-handler'
import { type BaseJobConfig } from "./abstract-job-handler"

/**
 * Progress job handler that converts step-based progress (currentStep/totalSteps) to percentage
 * Falls back to direct progress value if step data is not available
 */
export abstract class StepBasedProgressJobHandler<TConfig extends BaseJobConfig> extends AbstractJobHandler<TConfig> {
  protected calculateProgress (data: any): number | null {
    // Try step-based progress first
    if (data?.currentStep !== undefined && data?.totalSteps !== undefined) {
      // Validate step data
      if (data.totalSteps <= 0 || data.currentStep < 1 || data.currentStep > data.totalSteps) {
        return null
      }

      // Calculate percentage based on currentStep/totalSteps
      return Math.round(((data.currentStep - 1) / data.totalSteps) * 100)
    }

    // Fall back to direct progress value
    if (data?.progress !== undefined) {
      return Math.max(0, Math.min(100, data.progress as number))
    }

    return null
  }
}
