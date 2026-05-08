/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

// ─── Mocks ───────────────────────────────────────────────────────────────────

// ─── Imports ─────────────────────────────────────────────────────────────────

import { MessageBusJobHandler } from '../message-bus-job-handler'
import { jobUpdated } from '@Pimcore/modules/execution-engine/execution-engine-slice'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { type JobRun } from '@Pimcore/modules/execution-engine/execution-engine-api-slice.gen'
import { type JobStatusUpdateData } from '../job-run-polling'
import { type AbstractMercureMessage } from '@Pimcore/modules/background-processor/process/abstract-mercure-process'
import { store } from '@Pimcore/app/store'
import { type JobCompletionData } from '../message-bus-job-handler'
import { ChildJobStepTracker } from '../step-tracker/child-job-step-tracker'
import { DefaultStepTracker } from '../step-tracker/default-step-tracker'

jest.mock('@Pimcore/modules/global-message-bus/message-handlers/abstract-message-handler', () => ({
  AbstractMessageHandler: class AbstractMessageHandler {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: jest.fn((action) => action) }
}))

jest.mock('@Pimcore/modules/execution-engine/execution-engine-slice', () => ({
  jobReceived: jest.fn((payload: unknown) => ({ type: 'execution-engine/jobReceived', payload })),
  jobUpdated: jest.fn((payload: unknown) => ({ type: 'execution-engine/jobUpdated', payload }))
}))

jest.mock('@Pimcore/modules/execution-engine/jobs/factory-helper', () => ({
  getUniqueId: jest.fn(() => 42)
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { globalMessageBus: 'GlobalMessageBus' }
}))

// Capture the onStatusUpdate callback each time a new JobRunPolling is created.
// transitionToChildJob creates a second instance (for the child id), so the last
// captured value will be for the child handler — which is fine; in these tests we
// trigger the callback exactly once per scenario, always before any transition
// starts a second instance.
let capturedOnStatusUpdate: ((data: any) => Promise<void>) | undefined

jest.mock('../job-run-polling', () => ({
  JobRunPolling: jest.fn().mockImplementation((_id: number, callbacks: { onStatusUpdate: (data: any) => Promise<void> }) => {
    capturedOnStatusUpdate = callbacks.onStatusUpdate
    return { start: jest.fn(), destroy: jest.fn(), notifyUpdate: jest.fn() }
  })
}))

const mockMessageBus = {
  registerHandler: jest.fn(),
  unregisterHandler: jest.fn()
}

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: jest.fn(() => mockMessageBus) }
}))

// ─── Helpers ─────────────────────────────────────────────────────────────────

const mockJobUpdated = jest.mocked(jobUpdated)

/** Build a minimal JobRun for use inside JobStatusUpdateData.jobRun */
function jobRunFixture (overrides: Partial<JobRun> = {}): JobRun {
  return {
    id: 1,
    jobName: 'test_job',
    state: 'running',
    jobRunChildId: null,
    ownerId: null,
    executionContext: '',
    totalElements: 0,
    currentMessage: '',
    currentStep: null,
    totalSteps: null,
    creationDate: null,
    modificationDate: null,
    ...overrides
  }
}

/** Create a handler and call onRegister(), then clear all mocks so tests start clean. */
function makeHandler (opts: { jobRunId?: number, onJobCompletion?: (data: JobCompletionData) => Promise<void> } = {}): MessageBusJobHandler {
  capturedOnStatusUpdate = undefined
  const handler = new MessageBusJobHandler({ jobRunId: opts.jobRunId ?? 1, title: 'Test', onJobCompletion: opts.onJobCompletion })
  handler.onRegister()
  // Clear dispatch calls from onRegister (jobReceived)
  jest.mocked(store.dispatch).mockClear()
  mockJobUpdated.mockClear()
  mockMessageBus.registerHandler.mockClear()
  mockMessageBus.unregisterHandler.mockClear()
  return handler
}

/** Send a Mercure-style update message. */
async function sendMercureUpdate (handler: MessageBusJobHandler, payload: Record<string, unknown>): Promise<void> {
  await handler.handleMessage({ type: 'update', payload } as unknown as AbstractMercureMessage)
}

/** Send a polling status update via the captured callback. */
async function sendPollingUpdate (data: JobStatusUpdateData): Promise<void> {
  await capturedOnStatusUpdate!(data)
}

/** Create a handler with DefaultStepTracker (showStepLabel=true) for step-tracking tests. */
function makeStepHandler (): MessageBusJobHandler {
  capturedOnStatusUpdate = undefined
  const handler = new MessageBusJobHandler({
    jobRunId: 1,
    title: 'Test',
    stepTracker: new DefaultStepTracker({ showStepLabel: true }),
    stepDescriptions: { 1: 'step.one', 2: 'step.two' }
  })
  handler.onRegister()
  mockJobUpdated.mockClear()
  return handler
}

// ─── Tests ───────────────────────────────────────────────────────────────────

beforeEach(() => {
  mockJobUpdated.mockClear()
  mockMessageBus.registerHandler.mockClear()
  mockMessageBus.unregisterHandler.mockClear()
})

// ─── Status: running ──────────────────────────────────────────────────────────

describe('status=running', () => {
  it('Mercure update dispatches jobUpdated with RUNNING status', async () => {
    const handler = makeHandler()
    await sendMercureUpdate(handler, { status: 'running' })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ status: JobStatus.RUNNING })
    }))
  })

  it('polling update dispatches jobUpdated with RUNNING status', async () => {
    makeHandler()
    await sendPollingUpdate({ status: 'running', jobRun: jobRunFixture() })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ status: JobStatus.RUNNING })
    }))
  })

  it('Mercure and polling produce identical jobUpdated arguments', async () => {
    const h1 = makeHandler()
    await sendMercureUpdate(h1, { status: 'running' })
    const mercureCall = mockJobUpdated.mock.calls.at(-1)

    mockJobUpdated.mockClear()
    makeHandler()
    await sendPollingUpdate({ status: 'running', jobRun: jobRunFixture() })
    const pollingCall = mockJobUpdated.mock.calls.at(-1)

    expect(pollingCall).toEqual(mercureCall)
  })
})

// ─── Status: finished (success) ───────────────────────────────────────────────

describe('status=finished', () => {
  it('Mercure update dispatches jobUpdated with SUCCESS status', async () => {
    const handler = makeHandler()
    await sendMercureUpdate(handler, { status: 'finished' })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ status: JobStatus.SUCCESS })
    }))
  })

  it('polling update dispatches jobUpdated with SUCCESS status', async () => {
    makeHandler()
    await sendPollingUpdate({ status: 'finished', jobRun: jobRunFixture({ state: 'finished' }) })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ status: JobStatus.SUCCESS })
    }))
  })

  it('Mercure update calls onJobCompletion with isSuccessful=true', async () => {
    const onJobCompletion = jest.fn()
    const handler = makeHandler({ onJobCompletion })
    await sendMercureUpdate(handler, { status: 'finished' })
    expect(onJobCompletion).toHaveBeenCalledWith(expect.objectContaining({
      isSuccessful: true,
      isFinished: true,
      isFailed: false,
      status: JobStatus.SUCCESS
    }))
  })

  it('polling update calls onJobCompletion with isSuccessful=true', async () => {
    const onJobCompletion = jest.fn()
    makeHandler({ onJobCompletion })
    await sendPollingUpdate({ status: 'finished', jobRun: jobRunFixture({ state: 'finished' }) })
    expect(onJobCompletion).toHaveBeenCalledWith(expect.objectContaining({
      isSuccessful: true,
      isFinished: true,
      isFailed: false,
      status: JobStatus.SUCCESS
    }))
  })

  it('Mercure update unregisters the handler', async () => {
    const handler = makeHandler()
    await sendMercureUpdate(handler, { status: 'finished' })
    expect(mockMessageBus.unregisterHandler).toHaveBeenCalledWith(1)
  })

  it('polling update unregisters the handler', async () => {
    makeHandler()
    await sendPollingUpdate({ status: 'finished', jobRun: jobRunFixture({ state: 'finished' }) })
    expect(mockMessageBus.unregisterHandler).toHaveBeenCalledWith(1)
  })
})

// ─── Status: finished_with_errors ─────────────────────────────────────────────

describe('status=finished_with_errors', () => {
  it('Mercure update dispatches jobUpdated with FINISHED_WITH_ERRORS status', async () => {
    const handler = makeHandler()
    await sendMercureUpdate(handler, { status: 'finished_with_errors' })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ status: JobStatus.FINISHED_WITH_ERRORS })
    }))
  })

  it('polling update dispatches jobUpdated with FINISHED_WITH_ERRORS status', async () => {
    makeHandler()
    await sendPollingUpdate({ status: 'finished_with_errors', jobRun: jobRunFixture({ state: 'finished_with_errors' }) })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ status: JobStatus.FINISHED_WITH_ERRORS })
    }))
  })

  it('polling update calls onJobCompletion with isFinished=true, isFailed=false', async () => {
    const onJobCompletion = jest.fn()
    makeHandler({ onJobCompletion })
    await sendPollingUpdate({ status: 'finished_with_errors', jobRun: jobRunFixture({ state: 'finished_with_errors' }) })
    expect(onJobCompletion).toHaveBeenCalledWith(expect.objectContaining({
      isFinished: true,
      isFailed: false,
      status: JobStatus.FINISHED_WITH_ERRORS
    }))
  })
})

// ─── Status: failed ───────────────────────────────────────────────────────────

describe('status=failed', () => {
  it('Mercure update dispatches jobUpdated with FAILED status', async () => {
    const handler = makeHandler()
    await sendMercureUpdate(handler, { status: 'failed' })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ status: JobStatus.FAILED })
    }))
  })

  it('polling update dispatches jobUpdated with FAILED status', async () => {
    makeHandler()
    await sendPollingUpdate({ status: 'failed', jobRun: jobRunFixture({ state: 'failed' }) })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ status: JobStatus.FAILED })
    }))
  })

  it('polling update calls onJobCompletion with isFailed=true', async () => {
    const onJobCompletion = jest.fn()
    makeHandler({ onJobCompletion })
    await sendPollingUpdate({ status: 'failed', jobRun: jobRunFixture({ state: 'failed' }) })
    expect(onJobCompletion).toHaveBeenCalledWith(expect.objectContaining({
      isSuccessful: false,
      isFinished: false,
      isFailed: true,
      status: JobStatus.FAILED
    }))
  })
})

// ─── Child job transition ─────────────────────────────────────────────────────
//
// This is the critical path: a parent job finishes and spawns a child run.
// The handler must detect the child ID and re-register itself under the new ID
// regardless of whether the signal arrives via Mercure or polling.
//
// Mercure carries the child ID inside data.messages.jobRunChildId;
// polling carries it at data.jobRun.jobRunChildId (mapped to top-level jobRunChildId
// by handlePolledStatusUpdate).

describe('child job transition', () => {
  it('Mercure: finished + messages.jobRunChildId triggers unregister(old) then registerHandler', async () => {
    const handler = makeHandler({ jobRunId: 1 })
    await sendMercureUpdate(handler, { status: 'finished', messages: { jobRunChildId: 99 } })
    expect(mockMessageBus.unregisterHandler).toHaveBeenCalledWith(1)
    expect(mockMessageBus.registerHandler).toHaveBeenCalledWith(handler)
  })

  it('polling: finished + jobRun.jobRunChildId triggers unregister(old) then registerHandler', async () => {
    const handler = makeHandler({ jobRunId: 1 })
    await sendPollingUpdate({
      status: 'finished',
      jobRun: jobRunFixture({ state: 'finished', jobRunChildId: 99 })
    })
    expect(mockMessageBus.unregisterHandler).toHaveBeenCalledWith(1)
    expect(mockMessageBus.registerHandler).toHaveBeenCalledWith(handler)
  })

  it('Mercure and polling produce identical unregisterHandler / registerHandler call sequences', async () => {
    const h1 = makeHandler({ jobRunId: 1 })
    await sendMercureUpdate(h1, { status: 'finished', messages: { jobRunChildId: 99 } })
    const mercureUnregister = mockMessageBus.unregisterHandler.mock.calls.slice()
    const mercureRegister = mockMessageBus.registerHandler.mock.calls.map((c: unknown[]) => ({ handlerId: (c[0] as MessageBusJobHandler).getId() }))

    mockMessageBus.unregisterHandler.mockClear()
    mockMessageBus.registerHandler.mockClear()

    makeHandler({ jobRunId: 1 })
    await sendPollingUpdate({
      status: 'finished',
      jobRun: jobRunFixture({ state: 'finished', jobRunChildId: 99 })
    })
    const pollingUnregister = mockMessageBus.unregisterHandler.mock.calls.slice()
    const pollingRegister = mockMessageBus.registerHandler.mock.calls.map((c: unknown[]) => ({ handlerId: (c[0] as MessageBusJobHandler).getId() }))

    expect(pollingUnregister).toEqual(mercureUnregister)
    expect(pollingRegister).toEqual(mercureRegister)
  })

  it('polling: no transition when jobRun.jobRunChildId is null', async () => {
    makeHandler({ jobRunId: 1 })
    await sendPollingUpdate({
      status: 'finished',
      jobRun: jobRunFixture({ state: 'finished', jobRunChildId: null })
    })
    // Regular finish — unregister but no re-register
    expect(mockMessageBus.unregisterHandler).toHaveBeenCalledWith(1)
    expect(mockMessageBus.registerHandler).not.toHaveBeenCalled()
  })

  it('handler getId() returns the child id after transition', async () => {
    const handler = makeHandler({ jobRunId: 1 })
    await sendPollingUpdate({
      status: 'finished',
      jobRun: jobRunFixture({ state: 'finished', jobRunChildId: 99 })
    })
    expect(handler.getId()).toBe(99)
  })

  it('polling: no second transition when childId already equals current jobRunId', async () => {
    // First transition: parent(1) → child(99)
    makeHandler({ jobRunId: 1 })
    await sendPollingUpdate({
      status: 'finished',
      jobRun: jobRunFixture({ state: 'finished', jobRunChildId: 99 })
    })
    // capturedOnStatusUpdate is now the child handler's callback (jobRunId=99)
    mockMessageBus.unregisterHandler.mockClear()
    mockMessageBus.registerHandler.mockClear()

    // Second poll on the child handler — same childId (99) equals current jobRunId (99)
    await sendPollingUpdate({
      status: 'finished',
      jobRun: jobRunFixture({ state: 'finished', jobRunChildId: 99 })
    })
    // Should be a normal finish (unregister 99), not another re-registration
    expect(mockMessageBus.registerHandler).not.toHaveBeenCalled()
    expect(mockMessageBus.unregisterHandler).toHaveBeenCalledWith(99)
  })
})

// ─── Step tracking: ChildJobStepTracker ───────────────────────────────────────
//
// ChildJobStepTracker intentionally ignores backend currentStep values (the child
// job resets to step 1 internally). Polling maps currentStep from the JobRun — that
// value must NOT overwrite the step counter that the handler owns.

describe('ChildJobStepTracker ignores backend currentStep from polling', () => {
  it('polling currentStep=1 on a child-step handler does not dispatch a currentStep update', async () => {
    capturedOnStatusUpdate = undefined
    const handler = new MessageBusJobHandler({
      jobRunId: 1,
      title: 'Test',
      stepTracker: new ChildJobStepTracker({ totalSteps: 2, startAtStep: 2 })
    })
    handler.onRegister()
    mockJobUpdated.mockClear()

    // Backend child job sends currentStep: 1 (reset inside the child run)
    await sendPollingUpdate({ status: 'running', currentStep: 1, jobRun: jobRunFixture({ currentStep: 1 }) })

    const stepUpdates = mockJobUpdated.mock.calls.filter((args: unknown[]) => {
      const payload = args[0] as { changes?: Record<string, unknown> }
      return 'currentStep' in (payload?.changes ?? {})
    })
    expect(stepUpdates).toHaveLength(0)
  })

  it('Mercure currentStep=1 on a child-step handler also does not dispatch a currentStep update', async () => {
    capturedOnStatusUpdate = undefined
    const handler = new MessageBusJobHandler({
      jobRunId: 1,
      title: 'Test',
      stepTracker: new ChildJobStepTracker({ totalSteps: 2, startAtStep: 2 })
    })
    handler.onRegister()
    mockJobUpdated.mockClear()

    await sendMercureUpdate(handler, { currentStep: 1 })

    const stepUpdates = mockJobUpdated.mock.calls.filter((args: unknown[]) => {
      const payload = args[0] as { changes?: Record<string, unknown> }
      return 'currentStep' in (payload?.changes ?? {})
    })
    expect(stepUpdates).toHaveLength(0)
  })
})

// ─── Step tracking: DefaultStepTracker (showStepLabel=true) ───────────────────
//
// For folder batch-edit jobs, step advancement must work via polling just as it
// does via Mercure. Polling maps JobRun.currentStep into polledData.currentStep.

describe('DefaultStepTracker advances step via polling currentStep', () => {
  it('polling currentStep=2 dispatches jobUpdated with currentStep: 2', async () => {
    makeStepHandler()
    await sendPollingUpdate({ status: 'running', currentStep: 2, jobRun: jobRunFixture({ currentStep: 2 }) })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ currentStep: 2 })
    }))
  })

  it('polling currentStep=2 includes the step description key', async () => {
    makeStepHandler()
    await sendPollingUpdate({ status: 'running', currentStep: 2, jobRun: jobRunFixture({ currentStep: 2 }) })
    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ stepDescriptionKey: 'step.two' })
    }))
  })

  it('Mercure and polling dispatch identical jobUpdated for step advancement', async () => {
    const h1 = makeStepHandler()
    await sendMercureUpdate(h1, { currentStep: 2 })
    const mercureCall = mockJobUpdated.mock.calls.find((args: unknown[]) => {
      const payload = args[0] as { changes?: Record<string, unknown> }
      return 'currentStep' in (payload?.changes ?? {})
    })

    mockJobUpdated.mockClear()
    makeStepHandler()
    await sendPollingUpdate({ status: 'running', currentStep: 2, jobRun: jobRunFixture({ currentStep: 2 }) })
    const pollingCall = mockJobUpdated.mock.calls.find((args: unknown[]) => {
      const payload = args[0] as { changes?: Record<string, unknown> }
      return 'currentStep' in (payload?.changes ?? {})
    })

    expect(pollingCall).toEqual(mercureCall)
  })

  it('backwards step from polling is ignored (no update dispatched)', async () => {
    const handler = makeStepHandler()
    // Advance to step 2 first
    await sendPollingUpdate({ status: 'running', currentStep: 2, jobRun: jobRunFixture({ currentStep: 2 }) })
    mockJobUpdated.mockClear()

    // Backwards step — must be ignored
    await sendPollingUpdate({ status: 'running', currentStep: 1, jobRun: jobRunFixture({ currentStep: 1 }) })
    const stepUpdates = mockJobUpdated.mock.calls.filter((args: unknown[]) => {
      const payload = args[0] as { changes?: Record<string, unknown> }
      return 'currentStep' in (payload?.changes ?? {})
    })
    expect(stepUpdates).toHaveLength(0)
    void handler
  })
})

// ─── totalSteps initialisation via polling ────────────────────────────────────
//
// DefaultStepTracker derives totalSteps from the first backend message that carries
// it. When that message arrives via polling (not Mercure) the handler must still
// dispatch jobUpdated({ totalSteps }) so the UI shows "Step X / Y".

describe('totalSteps initialised via polling', () => {
  it('polling totalSteps dispatches jobUpdated with totalSteps', async () => {
    capturedOnStatusUpdate = undefined
    const handler = new MessageBusJobHandler({
      jobRunId: 1,
      title: 'Test',
      stepTracker: new DefaultStepTracker({ showStepLabel: true })
    })
    handler.onRegister()
    mockJobUpdated.mockClear()

    await sendPollingUpdate({ status: 'running', totalSteps: 3, jobRun: jobRunFixture({ totalSteps: 3 }) })

    expect(mockJobUpdated).toHaveBeenCalledWith(expect.objectContaining({
      changes: expect.objectContaining({ totalSteps: 3 })
    }))
    void handler
  })

  it('totalSteps is only set once — subsequent polling with same value is a no-op', async () => {
    capturedOnStatusUpdate = undefined
    const handler = new MessageBusJobHandler({
      jobRunId: 1,
      title: 'Test',
      stepTracker: new DefaultStepTracker({ showStepLabel: true })
    })
    handler.onRegister()
    mockJobUpdated.mockClear()

    await sendPollingUpdate({ status: 'running', totalSteps: 3, jobRun: jobRunFixture({ totalSteps: 3 }) })
    const firstCallCount = mockJobUpdated.mock.calls.filter((args: unknown[]) => {
      const payload = args[0] as { changes?: Record<string, unknown> }
      return 'totalSteps' in (payload?.changes ?? {})
    }).length

    mockJobUpdated.mockClear()
    await sendPollingUpdate({ status: 'running', totalSteps: 3, jobRun: jobRunFixture({ totalSteps: 3 }) })
    const secondCallCount = mockJobUpdated.mock.calls.filter((args: unknown[]) => {
      const payload = args[0] as { changes?: Record<string, unknown> }
      return 'totalSteps' in (payload?.changes ?? {})
    }).length

    expect(firstCallCount).toBe(1)
    expect(secondCallCount).toBe(0)
    void handler
  })
})

// ─── Progress via polling ─────────────────────────────────────────────────────
//
// ProgressFieldCalculator reads data.progress. Polling's polledData does not
// include a progress field, so ProgressFieldCalculator returns PROGRESS_NO_UPDATE
// and no progress jobUpdated is dispatched. This is expected behaviour — progress
// granularity is only available via real-time Mercure messages.

describe('progress field absent from polling data', () => {
  it('polling update does not dispatch a progress jobUpdated', async () => {
    makeHandler()
    await sendPollingUpdate({ status: 'running', jobRun: jobRunFixture() })

    const progressUpdates = mockJobUpdated.mock.calls.filter((args: unknown[]) => {
      const payload = args[0] as { changes?: Record<string, unknown> }
      return 'progress' in (payload?.changes ?? {})
    })
    expect(progressUpdates).toHaveLength(0)
  })

  it('Mercure update with progress=50 does dispatch a progress jobUpdated', async () => {
    const handler = makeHandler()
    await sendMercureUpdate(handler, { progress: 50 })

    const progressUpdates = mockJobUpdated.mock.calls.filter((args: unknown[]) => {
      const payload = args[0] as { changes?: Record<string, unknown> }
      return 'progress' in (payload?.changes ?? {})
    })
    expect(progressUpdates.length).toBeGreaterThan(0)
  })
})
