/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { JobRunPolling, type JobStatusUpdateData } from '../job-run-polling'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { type JobRun } from '@Pimcore/modules/execution-engine/execution-engine-api-slice.gen'
import { store } from '@Pimcore/app/store'

jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: jest.fn() }
}))

jest.mock('@Pimcore/modules/execution-engine/execution-engine-api-slice-enhanced', () => ({
  api: { endpoints: { executionEngineListJobs: { initiate: jest.fn((args: unknown) => args) } } }
}))

const INITIAL_DELAY = 10000

function jobRunFixture (overrides: Partial<JobRun> = {}): JobRun {
  return {
    id: 1,
    jobName: 'test_job',
    state: 'running',
    jobRunChildId: null,
    ownerId: null,
    executionContext: '',
    totalElements: 120,
    currentMessage: '',
    currentStep: 0,
    totalSteps: 1,
    creationDate: 1000,
    modificationDate: 1000,
    ...overrides
  }
}

function respondWith (jobRun: JobRun): void {
  const response: unknown = { data: { items: [jobRun] } }
  jest.mocked(store.dispatch).mockResolvedValue(response as never)
}

async function advance (ms: number): Promise<void> {
  await jest.advanceTimersByTimeAsync(ms)
}

function setup (): { polling: JobRunPolling, updates: JobStatusUpdateData[] } {
  const updates: JobStatusUpdateData[] = []
  const polling = new JobRunPolling(1, {
    onStatusUpdate: (data) => { updates.push(data) }
  })
  return { polling, updates }
}

beforeEach(() => {
  jest.useFakeTimers()
  jest.mocked(store.dispatch).mockReset()
})

afterEach(() => {
  jest.useRealTimers()
})

describe('poll delay after Mercure activity', () => {
  it('polls INITIAL_DELAY after the last Mercure update, however many updates came in before', async () => {
    respondWith(jobRunFixture())
    const { polling } = setup()
    polling.start()

    // one Mercure update per processed element: a long job sends hundreds of them
    for (let i = 0; i < 60; i++) {
      polling.notifyUpdate()
    }

    await advance(INITIAL_DELAY - 1)
    expect(store.dispatch).not.toHaveBeenCalled()

    await advance(1)
    expect(store.dispatch).toHaveBeenCalledTimes(1)

    polling.destroy()
  })
})

describe('poll delay while the job does not change', () => {
  it('never waits longer than one minute between polls', async () => {
    respondWith(jobRunFixture())
    const { polling } = setup()
    const pollTimes: number[] = []
    jest.mocked(store.dispatch).mockImplementation((async () => {
      pollTimes.push(Date.now())
      return { data: { items: [jobRunFixture()] } }
    }) as never)
    polling.start()

    // half an hour without any change in the job run
    await advance(30 * 60 * 1000)

    const gaps = pollTimes.slice(1).map((time, index) => time - pollTimes[index])
    expect(pollTimes.length).toBeGreaterThan(10)
    expect(Math.max(...gaps)).toBeLessThanOrEqual(60000)

    polling.destroy()
  })
})

describe('status reported for a running job', () => {
  it('reports queued while nothing has moved since the first poll', async () => {
    respondWith(jobRunFixture({ modificationDate: 1000 }))
    const { polling, updates } = setup()
    polling.start()

    await advance(INITIAL_DELAY)
    await advance(60000)

    expect(updates.length).toBeGreaterThan(1)
    expect(new Set(updates.map(u => u.status))).toEqual(new Set([JobStatus.QUEUED]))
    polling.destroy()
  })

  it('reports running as soon as the job run has been modified, although currentStep is still 0', async () => {
    respondWith(jobRunFixture({ modificationDate: 1000 }))
    const { polling, updates } = setup()
    polling.start()
    await advance(INITIAL_DELAY)

    // an element has been processed: the engine bumps the modification date, the step stays 0
    respondWith(jobRunFixture({ modificationDate: 1007 }))
    await advance(60000)

    const statuses = updates.map(u => u.status)
    expect(statuses[0]).toBe(JobStatus.QUEUED)
    expect(statuses.at(-1)).toBe(JobStatus.RUNNING)
    expect(statuses.indexOf(JobStatus.RUNNING)).toBeGreaterThan(0)
    polling.destroy()
  })

  it('reports running when the very first poll already finds a job run that was modified long after its creation', async () => {
    // processing began before the first poll and nothing changes between polls (one slow element)
    respondWith(jobRunFixture({ creationDate: 1000, modificationDate: 1040 }))
    const { polling, updates } = setup()
    polling.start()

    await advance(INITIAL_DELAY)

    expect(updates.map(u => u.status)).toEqual([JobStatus.RUNNING])
    polling.destroy()
  })

  it('reports running when the first poll already finds the job on a later step', async () => {
    respondWith(jobRunFixture({ currentStep: 1, totalSteps: 3 }))
    const { polling, updates } = setup()
    polling.start()

    await advance(INITIAL_DELAY)

    expect(updates.map(u => u.status)).toEqual([JobStatus.RUNNING])
    polling.destroy()
  })

  it('reports the terminal state as is', async () => {
    respondWith(jobRunFixture({ state: 'finished', currentStep: null, totalSteps: null }))
    const { polling, updates } = setup()
    polling.start()

    await advance(INITIAL_DELAY)

    expect(updates.map(u => u.status)).toEqual(['finished'])
    polling.destroy()
  })
})
