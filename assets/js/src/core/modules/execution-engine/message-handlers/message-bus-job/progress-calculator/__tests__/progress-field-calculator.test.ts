/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ProgressFieldCalculator } from '../progress-field-calculator'
import { PROGRESS_NO_UPDATE, type ProgressCalculatorContext } from '../progress-calculator.interface'

const context = (totalSteps?: number): ProgressCalculatorContext => ({
  currentStep: 1,
  totalSteps,
  lastProgressValue: -1
})

describe('ProgressFieldCalculator', () => {
  it('returns PROGRESS_NO_UPDATE when the message has no progress field', () => {
    const calculator = new ProgressFieldCalculator()
    expect(calculator.calculateProgress({}, context())).toBe(PROGRESS_NO_UPDATE)
    expect(calculator.calculateProgress({ status: 'running' }, context())).toBe(PROGRESS_NO_UPDATE)
  })

  it('rounds repeating fractional sub-step progress to two decimal places', () => {
    const calculator = new ProgressFieldCalculator()

    // step 1 of 3 at 47% → ((1 - 1) / 3) * 100 + 47 / 3 = 15.666666666666668
    const result = calculator.calculateProgress(
      { progress: 47, currentStep: 1, totalSteps: 3 },
      context(2)
    )

    expect(result).toBe(15.67)
  })

  it('combines handler steps with backend sub-steps', () => {
    const calculator = new ProgressFieldCalculator()

    // step 2 of 4 at 50% → ((2 - 1) / 4) * 100 + 50 / 4 = 37.5
    const result = calculator.calculateProgress(
      { progress: 50, currentStep: 2, totalSteps: 4 },
      context(2)
    )

    expect(result).toBe(37.5)
  })

  it('rounds direct fractional progress to two decimal places', () => {
    const calculator = new ProgressFieldCalculator()
    expect(calculator.calculateProgress({ progress: 33.333333333333336 }, context())).toBe(33.33)
  })

  it('clamps negative progress to zero', () => {
    const calculator = new ProgressFieldCalculator()
    expect(calculator.calculateProgress({ progress: -5 }, context())).toBe(0)
  })

  it('returns 100 when gradual progress precedes completion', () => {
    const calculator = new ProgressFieldCalculator()
    calculator.calculateProgress({ progress: 40 }, context())
    expect(calculator.calculateProgress({ progress: 100 }, context())).toBe(100)
  })

  it('returns null (spinner) for an instant step reporting only 100', () => {
    const calculator = new ProgressFieldCalculator()
    expect(calculator.calculateProgress({ progress: 100 }, context())).toBeNull()
  })

  it('resets gradual-progress tracking on step change', () => {
    const calculator = new ProgressFieldCalculator()
    calculator.calculateProgress({ progress: 40 }, context())
    calculator.onStepChange()
    expect(calculator.calculateProgress({ progress: 100 }, context())).toBeNull()
  })
})
