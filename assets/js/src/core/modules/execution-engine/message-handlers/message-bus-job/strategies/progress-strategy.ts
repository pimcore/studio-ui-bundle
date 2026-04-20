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
 * Sentinel value returned by a ProgressStrategy to signal that the progress
 * bar should not be updated at all (e.g. no relevant data in the message).
 *
 * Distinct from `null` which signals an indeterminate (spinner) state.
 */
export const PROGRESS_NO_UPDATE = Symbol('progress-no-update')

/**
 * The result of a progress calculation:
 *
 * - `number`            – determinate progress value (0–100)
 * - `null`              – indeterminate state (show spinner)
 * - `PROGRESS_NO_UPDATE`– skip update entirely, leave bar as-is
 */
export type ProgressResult = number | null | typeof PROGRESS_NO_UPDATE

export interface ProgressStrategyContext {
  /** Current job step (1-based), as tracked by the handler */
  currentStep: number
  /**
   * Handler-owned total step count set at construction time.
   * Undefined when the handler does not own the step count
   * and instead derives it from backend messages.
   */
  totalSteps?: number
  /** Last progress value successfully applied (-1 if none yet) */
  lastProgressValue: number
}

export interface ProgressStrategy {
  /**
   * Calculate the progress result from a raw SSE message payload.
   *
   * @param data    Raw message payload from the backend
   * @param context Current handler state
   * @returns ProgressResult
   */
  calculateProgress: (data: any, context: ProgressStrategyContext) => ProgressResult

  /**
   * Called when the handler transitions to a child job (step change).
   * Strategies that maintain internal state should reset it here.
   */
  onStepTransition?: () => void
}
