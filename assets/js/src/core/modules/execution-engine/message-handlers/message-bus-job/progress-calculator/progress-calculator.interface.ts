/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * Sentinel value returned by a ProgressCalculator to signal that the progress
 * bar should not be updated at all (e.g. no relevant data in the message).
 *
 * Distinct from `null` which signals an indeterminate (spinner) state.
 */
export const PROGRESS_NO_UPDATE = Symbol('progress-no-update')

/**
 * The result of a progress calculation:
 *
 * - `number`             – determinate progress value (0–100)
 * - `null`               – indeterminate state (show spinner)
 * - `PROGRESS_NO_UPDATE` – skip update entirely, leave bar as-is
 */
export type ProgressResult = number | null | typeof PROGRESS_NO_UPDATE

export interface ProgressCalculatorContext {
  /** Current step as tracked by the step tracker */
  currentStep: number
  /** Total steps if known */
  totalSteps?: number
  /** Last progress value successfully applied (-1 if none yet) */
  lastProgressValue: number
}

export interface ProgressCalculator {
  /**
   * Calculate the progress result from a raw SSE message payload.
   *
   * @param data    Raw message payload from the backend
   * @param context Current handler state
   */
  calculateProgress: (data: any, context: ProgressCalculatorContext) => ProgressResult

  /**
   * Called when the step advances (same-job step change or child job transition).
   * Calculators that maintain internal state should reset it here.
   */
  onStepChange?: () => void
}
