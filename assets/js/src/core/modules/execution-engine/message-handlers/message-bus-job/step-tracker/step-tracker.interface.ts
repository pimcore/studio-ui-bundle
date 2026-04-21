/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface StepTrackerState {
  /** Current step (1-based) */
  currentStep: number
  /** Total steps, if known */
  totalSteps?: number
}

export interface StepTracker {
  /**
   * Called on every incoming backend message that carries a currentStep value.
   * Returns the new StepTrackerState if it changed, or null if nothing changed.
   */
  onBackendStep: (backendStep: number) => StepTrackerState | null

  /**
   * Called when the handler transitions to a child job run.
   * Returns the new StepTrackerState.
   */
  onChildJobTransition: () => StepTrackerState

  /**
   * Whether to show the step label (Step X/Y) in the UI.
   */
  readonly showStepLabel: boolean

  /**
   * Current tracked state.
   */
  readonly state: StepTrackerState
}
