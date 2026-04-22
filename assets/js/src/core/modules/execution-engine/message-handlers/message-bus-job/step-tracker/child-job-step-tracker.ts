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

export interface ChildJobStepTrackerOptions {
  /**
   * Total number of steps if known upfront (e.g. 2 for jobs that always
   * spawn exactly one child job). When omitted the total is unknown and
   * the UI will show "Step 1", "Step 2" etc. without a fraction.
   */
  totalSteps?: number
}

/**
 * Step tracker for jobs that spawn child job runs via transitionToChildJob.
 *
 * Each child job transition advances the step counter by one. Backend step
 * messages from the child job (which reset to step 1) are intentionally
 * ignored — this tracker owns the step counter exclusively.
 *
 * Always shows the step label in the UI.
 *
 * Used for:
 *   - zip-upload: parent extracts (step 1) → child creates assets (step 2)
 *   - CSV/XLSX folder export: parent collects (step 1) → child creates file (step 2)
 *   - clone: may or may not spawn a child (totalSteps omitted when unknown)
 */
export class ChildJobStepTracker implements StepTracker {
  readonly showStepLabel = true
  private _state: StepTrackerState

  constructor (options: ChildJobStepTrackerOptions = {}) {
    this._state = { currentStep: 1, totalSteps: options.totalSteps }
  }

  get state (): StepTrackerState {
    return this._state
  }

  onBackendStep (_backendStep: number): StepTrackerState | null {
    // Intentionally ignored — this tracker owns the step counter.
    // Child jobs reset currentStep to 1 which must not overwrite our counter.
    return null
  }

  onChildJobTransition (): StepTrackerState {
    this._state = { ...this._state, currentStep: this._state.currentStep + 1 }
    return this._state
  }
}
