/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { SearchReplaceAssignmentsJob } from '@Pimcore/modules/execution-engine/jobs/search-replace-assignments/search-replace-assignments-job'
import { MessageBusJobHandler } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler'
import { type JobCompletionData } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler-types'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { type JobRunOptions } from '@Pimcore/modules/execution-engine/jobs/job-interface'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'
import { store } from '@Pimcore/app/store'
import trackError from '@Pimcore/modules/app/error-handler'

jest.mock('@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation(() => ({}))
}))
jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: jest.fn() }
}))
jest.mock('@Pimcore/modules/element/search-replace-assignments/usage-api-slice-enhanced', () => ({
  api: { endpoints: { elementUsageReplace: { initiate: jest.fn((args: unknown) => args) } } }
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class {}, // eslint-disable-line @typescript-eslint/no-extraneous-class
  GeneralError: class {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))
jest.mock('i18next', () => ({ t: (key: string) => key }))

const HandlerMock = MessageBusJobHandler as jest.MockedClass<typeof MessageBusJobHandler>
const dispatchMock = store.dispatch as jest.Mock
const trackErrorMock = trackError as jest.Mock

const runOptions = (): JobRunOptions & { registerHandler: jest.Mock } => {
  const registerHandler = jest.fn()
  const messageBus: unknown = { registerHandler }
  return { messageBus: messageBus as GlobalMessageBus, registerHandler }
}

const runJob = async (onFinish: jest.Mock): Promise<ReturnType<typeof runOptions>> => {
  const options = runOptions()
  await new SearchReplaceAssignmentsJob({
    sourceElementType: 'data-object',
    sourceElementId: 1,
    targetElementType: 'data-object',
    targetElementId: 2,
    onFinish
  }).run(options)

  return options
}

const completion = (status: JobStatus): JobCompletionData => ({
  isSuccessful: status === JobStatus.SUCCESS,
  isFinished: status === JobStatus.SUCCESS || status === JobStatus.FINISHED_WITH_ERRORS,
  isFailed: status === JobStatus.FAILED,
  status,
  payload: { messages: [`ended ${status}`] }
})

beforeEach(() => {
  HandlerMock.mockClear()
  dispatchMock.mockReset()
  trackErrorMock.mockClear()
})

describe('SearchReplaceAssignmentsJob onFinish', () => {
  describe('when the replace request returns a job run', () => {
    beforeEach(() => {
      dispatchMock.mockResolvedValue({ data: { jobRunId: 7 } })
    })

    it('registers a handler for that run and does not finish before it completes', async () => {
      const onFinish = jest.fn()
      const options = await runJob(onFinish)

      expect(HandlerMock).toHaveBeenCalledTimes(1)
      expect(HandlerMock.mock.calls[0][0].jobRunId).toBe(7)
      expect(options.registerHandler).toHaveBeenCalledTimes(1)
      expect(onFinish).not.toHaveBeenCalled()
    })

    it.each([
      JobStatus.SUCCESS,
      JobStatus.FINISHED_WITH_ERRORS,
      JobStatus.FAILED
    ])('forwards the handler\'s completion data unchanged for %s', async (status) => {
      const onFinish = jest.fn()
      await runJob(onFinish)

      const data = completion(status)
      await HandlerMock.mock.calls[0][0].onJobCompletion?.(data)

      expect(onFinish).toHaveBeenCalledTimes(1)
      // the same object, not a copy: consumers read isSuccessful, status and payload from it
      expect(onFinish.mock.calls[0][0]).toBe(data)
    })
  })

  describe('when the run never reaches the execution engine', () => {
    it('calls onFinish with no data when the request returns no job run id', async () => {
      dispatchMock.mockResolvedValue({ data: {} })
      const onFinish = jest.fn()
      const options = await runJob(onFinish)

      expect(onFinish).toHaveBeenCalledTimes(1)
      expect(onFinish.mock.calls[0]).toEqual([undefined])
      expect(HandlerMock).not.toHaveBeenCalled()
      expect(options.registerHandler).not.toHaveBeenCalled()
    })

    it('calls onFinish with no data and tracks the error when the request fails', async () => {
      dispatchMock.mockResolvedValue({ error: { status: 500 } })
      const onFinish = jest.fn()
      await runJob(onFinish)

      expect(onFinish).toHaveBeenCalledTimes(1)
      expect(onFinish.mock.calls[0]).toEqual([undefined])
      expect(trackErrorMock).toHaveBeenCalledTimes(1)
      expect(HandlerMock).not.toHaveBeenCalled()
    })
  })
})
