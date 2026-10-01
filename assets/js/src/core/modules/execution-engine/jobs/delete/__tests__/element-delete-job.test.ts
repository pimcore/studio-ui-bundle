/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { markNodeDeleting } from '@Pimcore/components/element-tree/element-tree-slice'
import { api as elementApi } from '@Pimcore/modules/element/element-api-slice.gen'
import { MessageBusJobHandler, type JobCompletionData } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler'
import { DeleteJob } from '@Pimcore/modules/execution-engine/jobs/delete/element-delete-job'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { type JobRunOptions } from '@Pimcore/modules/execution-engine/jobs/job-interface'

jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: jest.fn((action) => action) }
}))

jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  setNodeFetching: jest.fn((payload: unknown) => ({ type: 'setNodeFetching', payload })),
  refreshNodeChildren: jest.fn((payload: unknown) => ({ type: 'refreshNodeChildren', payload })),
  markNodeDeleting: jest.fn((payload: unknown) => ({ type: 'markNodeDeleting', payload }))
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError { constructor (readonly errorData: unknown) {} },
  GeneralError: class GeneralError { constructor (readonly content: string) {} }
}))

jest.mock('@Pimcore/modules/element/element-api-slice.gen', () => ({
  api: { endpoints: { elementDelete: { initiate: jest.fn() } } }
}))

jest.mock('@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation((options: unknown) => ({ options }))
}))

jest.mock('i18next', () => ({ t: (key: string) => key }))

const initiateMock = elementApi.endpoints.elementDelete.initiate as unknown as jest.Mock
const trackErrorMock = trackError as unknown as jest.Mock
const HandlerMock = MessageBusJobHandler as jest.MockedClass<typeof MessageBusJobHandler>

const runOptions = { messageBus: { registerHandler: jest.fn() } } as unknown as JobRunOptions

function buildJob (onSuccess: jest.Mock, onFinished: jest.Mock = jest.fn()): DeleteJob {
  return new DeleteJob({
    elementId: 42,
    elementType: 'data-object',
    treeId: 'tree-1',
    nodeId: '42',
    parentFolderId: 1,
    onSuccess,
    onFinished
  })
}

function completion (status: JobStatus): JobCompletionData {
  const isSuccessful = status === JobStatus.SUCCESS

  return {
    isSuccessful,
    // MessageBusJobHandler treats both "finished" and "finished_with_errors" as finished.
    isFinished: isSuccessful || status === JobStatus.FINISHED_WITH_ERRORS,
    isFailed: !isSuccessful,
    status,
    payload: null
  }
}

/** The onJobCompletion callback the job handed to its MessageBusJobHandler. */
function capturedOnJobCompletion (): (data: JobCompletionData) => Promise<void> {
  return HandlerMock.mock.calls.at(-1)![0].onJobCompletion! as (data: JobCompletionData) => Promise<void>
}

beforeEach(() => {
  jest.clearAllMocks()
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('DeleteJob rejected delete request', () => {
  beforeEach(() => {
    initiateMock.mockReturnValue(Promise.resolve({
      error: { status: 500, data: { message: 'This object cannot be deleted.' } }
    }))
  })

  it('does not report success when the backend rejects the delete', async () => {
    const onSuccess = jest.fn()

    await buildJob(onSuccess).run(runOptions)

    expect(onSuccess).not.toHaveBeenCalled()
  })

  it('surfaces the API error exactly once', async () => {
    await buildJob(jest.fn()).run(runOptions)

    expect(trackErrorMock).toHaveBeenCalledTimes(1)
    expect(trackErrorMock.mock.calls[0][0]).toBeInstanceOf(ApiError)
    expect(trackErrorMock.mock.calls[0][0]).not.toBeInstanceOf(GeneralError)
  })

  it('clears the deleting flag on the tree node', async () => {
    await buildJob(jest.fn()).run(runOptions)

    expect(markNodeDeleting).toHaveBeenLastCalledWith(
      expect.objectContaining({ nodeId: '42', isDeleting: false })
    )
  })

  it('does not register a message bus handler', async () => {
    await buildJob(jest.fn()).run(runOptions)

    expect(HandlerMock).not.toHaveBeenCalled()
  })

  it('still reports the job as finished so callers can release their busy state', async () => {
    const onFinished = jest.fn()

    await buildJob(jest.fn(), onFinished).run(runOptions)

    expect(onFinished).toHaveBeenCalledTimes(1)
  })
})

describe('DeleteJob successful delete', () => {
  it('reports success when the element was deleted synchronously', async () => {
    initiateMock.mockReturnValue(Promise.resolve({ data: {} }))
    const onSuccess = jest.fn()

    await buildJob(onSuccess).run(runOptions)

    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(trackErrorMock).not.toHaveBeenCalled()
  })

  it('defers success until an asynchronous job run finishes', async () => {
    initiateMock.mockReturnValue(Promise.resolve({ data: { jobRunId: 7 } }))
    const onSuccess = jest.fn()

    await buildJob(onSuccess).run(runOptions)

    expect(onSuccess).not.toHaveBeenCalled()

    await capturedOnJobCompletion()(completion(JobStatus.SUCCESS))

    expect(onSuccess).toHaveBeenCalledTimes(1)
  })

  it('does not report success when an asynchronous job run finishes with errors', async () => {
    initiateMock.mockReturnValue(Promise.resolve({ data: { jobRunId: 7 } }))
    const onSuccess = jest.fn()

    await buildJob(onSuccess).run(runOptions)
    await capturedOnJobCompletion()(completion(JobStatus.FINISHED_WITH_ERRORS))

    expect(onSuccess).not.toHaveBeenCalled()
  })

  it('still clears the deleting flag when an asynchronous job run finishes with errors', async () => {
    initiateMock.mockReturnValue(Promise.resolve({ data: { jobRunId: 7 } }))

    await buildJob(jest.fn()).run(runOptions)
    await capturedOnJobCompletion()(completion(JobStatus.FINISHED_WITH_ERRORS))

    expect(markNodeDeleting).toHaveBeenLastCalledWith(
      expect.objectContaining({ nodeId: '42', isDeleting: false })
    )
  })

  it('does not report success when an asynchronous job run fails', async () => {
    initiateMock.mockReturnValue(Promise.resolve({ data: { jobRunId: 7 } }))
    const onSuccess = jest.fn()
    const onFinished = jest.fn()

    await buildJob(onSuccess, onFinished).run(runOptions)
    await capturedOnJobCompletion()(completion(JobStatus.FAILED))

    expect(onSuccess).not.toHaveBeenCalled()
    expect(onFinished).toHaveBeenCalledTimes(1)
  })
})

describe('DeleteJob duplicate terminal updates', () => {
  // Mercure and the polling fallback can both deliver the terminal update, and neither cancels the other.
  it('runs the completion callbacks only once', async () => {
    initiateMock.mockReturnValue(Promise.resolve({ data: { jobRunId: 7 } }))
    const onSuccess = jest.fn()
    const onFinished = jest.fn()

    await buildJob(onSuccess, onFinished).run(runOptions)

    const onJobCompletion = capturedOnJobCompletion()
    await onJobCompletion(completion(JobStatus.SUCCESS))
    await onJobCompletion(completion(JobStatus.SUCCESS))

    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(onFinished).toHaveBeenCalledTimes(1)
  })

  it('arms the callbacks again when the job is retried', async () => {
    initiateMock.mockReturnValue(Promise.resolve({ data: {} }))
    const onSuccess = jest.fn()

    const job = buildJob(onSuccess)
    await job.run(runOptions)
    await job.run(runOptions)

    expect(onSuccess).toHaveBeenCalledTimes(2)
  })
})
