/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type JobRun } from '@Pimcore/modules/execution-engine/execution-engine-api-slice.gen'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { resolveEffectiveStatus } from '../job-run-polling'

jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: jest.fn() }
}))

const jobRun = (state: string, currentStep: number): JobRun => ({
  id: 1,
  ownerId: 1,
  state,
  executionContext: 'studio_continue_on_error',
  totalElements: 0,
  currentMessage: '',
  jobRunChildId: null,
  currentStep,
  totalSteps: 3,
  creationDate: 0,
  modificationDate: 0,
  jobName: 'test'
} as unknown as JobRun)

// The panel derives "queued" from a run that has not left its first step; a run that already
// ended on that step must keep its terminal state, or the handler never completes it.
describe('resolveEffectiveStatus', () => {
  it('reports an active run on its first step as queued', () => {
    expect(resolveEffectiveStatus(jobRun('running', 0))).toBe(JobStatus.QUEUED)
  })

  it('keeps the state of an active run past its first step', () => {
    expect(resolveEffectiveStatus(jobRun('running', 2))).toBe('running')
  })

  it.each(['cancelled', 'failed', 'finished', 'finished_with_errors'])('keeps a %s run on its first step terminal', (state) => {
    expect(resolveEffectiveStatus(jobRun(state, 0))).toBe(state)
  })
})
