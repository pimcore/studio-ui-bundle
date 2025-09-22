/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DefaultJobHandler, type BaseJobConfig } from './abstract-job-handler'

/**
 * Progress job handler that converts step-based progress (currentStep/totalSteps) to percentage
 */
export class StepBasedProgressJobHandler<TConfig extends BaseJobConfig> extends DefaultJobHandler<TConfig> {
  protected calculateProgress (data: any): number | null {
    if (data?.currentStep !== undefined && data?.totalSteps !== undefined) {
      if (data.totalSteps <= 0 || data.currentStep < 1 || data.currentStep > data.totalSteps) {
        return null
      }

      return Math.round(((data.currentStep - 1) / data.totalSteps) * 100)
    }
    return super.calculateProgress(data)
  }
}
