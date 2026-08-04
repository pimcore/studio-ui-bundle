/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type StepTracker, type StepTrackerState } from './step-tracker.interface'

export interface DefaultStepTrackerOptions {
  /**
   * Whether to show the step label (Step X/Y) in the UI.
   * Default: false.
   *
   * Set to true for jobs where the backend step structure is meaningful
   * to the user (e.g. batch-edit: preparing → applying).
   * Leave false for jobs where backend steps are an internal implementation
   * detail (e.g. delete: one step per element).
   */
  showStepLabel?: boolean
}

/**
 * Default step tracker. Follows the backend's currentStep value, accepting
 * only forward movement (ignores any step that would go backwards).
 *
 * totalSteps is derived from the first backend message that carries it —
 * no hardcoding required in the job definition.
 *
 * Used for:
 *   - Jobs with no child job transitions (single job run)
 *   - delete/batch-delete: showStepLabel=false (internal steps, no UI label)
 *   - batch-edit folder: showStepLabel=true (preparing → applying, shown in UI)
 */
export class DefaultStepTracker implements StepTracker {
  readonly showStepLabel: boolean
  private _state: StepTrackerState = { currentStep: 1 }

  constructor (options: DefaultStepTrackerOptions = {}) {
    this.showStepLabel = options.showStepLabel ?? false
  }

  get state (): StepTrackerState {
    return this._state
  }

  onBackendStep (backendStep: number): StepTrackerState | null {
    // Accept only forward movement
    if (backendStep <= this._state.currentStep) {
      return null
    }

    this._state = { ...this._state, currentStep: backendStep }
    return this._state
  }

  onChildJobTransition (): StepTrackerState {
    // Default tracker is not designed for child jobs, but handle gracefully
    this._state = { ...this._state, currentStep: this._state.currentStep + 1 }
    return this._state
  }

  onBackendTotalSteps (totalSteps: number): void {
    if (this._state.totalSteps === undefined) {
      this._state = { ...this._state, totalSteps }
    }
  }
}
