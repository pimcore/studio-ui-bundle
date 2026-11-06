/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { RecycleBinRestoreJob } from '@Pimcore/modules/execution-engine/jobs/recycle-bin/recycle-bin-restore-job'
import { MessageBusJobHandler } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler'
import { type JobCompletionData } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler-types'
import { JobStatus } from '@Pimcore/modules/execution-engine/jobs/abstact-job'
import { type JobRunOptions } from '@Pimcore/modules/execution-engine/jobs/job-interface'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'
import { store } from '@Pimcore/app/store'

jest.mock('@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation(() => ({}))
}))
jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: jest.fn() }
}))
jest.mock('@Pimcore/modules/recycle-bin/recycle-bin-api-slice-enhanced', () => ({
  api: {
    endpoints: { recycleBinRestoreItems: { initiate: jest.fn((args: unknown) => args) } },
    util: { invalidateTags: jest.fn(() => ({ type: 'invalidate' })) }
  }
}))
jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  refreshTreeByElementType: jest.fn(() => ({ type: 'refresh' }))
}))
jest.mock('@Pimcore/app/api/pimcore/tags', () => ({
  invalidatingTags: { RECYCLING_BIN: jest.fn(() => []) }
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

const runOptions = (): JobRunOptions => {
  const messageBus: unknown = { registerHandler: jest.fn() }
  return { messageBus: messageBus as GlobalMessageBus }
}

const runJob = async (onRelocated: jest.Mock, onFinish: jest.Mock = jest.fn()): Promise<void> => {
  await new RecycleBinRestoreJob({
    itemIds: [1],
    elementTypes: ['data-object'],
    onFinish,
    onRelocated
  }).run(runOptions())
}

const completion = (status: JobStatus, messages?: string[]): JobCompletionData => ({
  isSuccessful: status === JobStatus.SUCCESS,
  isFinished: status === JobStatus.SUCCESS || status === JobStatus.FINISHED_WITH_ERRORS,
  isFailed: status === JobStatus.FAILED,
  status,
  payload: { messages }
})

const completeJobRun = async (data: JobCompletionData): Promise<void> => {
  const options = HandlerMock.mock.calls[0][0]
  await options.onJobCompletion?.(data)
}

beforeEach(() => {
  HandlerMock.mockClear()
  dispatchMock.mockReset()
})

describe('RecycleBinRestoreJob relocations', () => {
  describe('when a single item is restored directly', () => {
    it('reports the one moved element', async () => {
      dispatchMock.mockResolvedValueOnce({ data: { items: [{ id: 83, elementType: 'data-object', path: '/__restored/my-car' }] } })
      const onRelocated = jest.fn()
      const onFinish = jest.fn()

      await runJob(onRelocated, onFinish)

      expect(onRelocated).toHaveBeenCalledWith(1)
      expect(onFinish).toHaveBeenCalledTimes(1)
      expect(HandlerMock).not.toHaveBeenCalled()
    })

    it('reports the number of moved elements', async () => {
      dispatchMock.mockResolvedValueOnce({
        data: {
          items: [
            { id: 83, elementType: 'data-object', path: '/__restored/a' },
            { id: 84, elementType: 'data-object', path: '/__restored/b' }
          ]
        }
      })
      const onRelocated = jest.fn()

      await runJob(onRelocated)

      expect(onRelocated).toHaveBeenCalledWith(2)
    })

    it.each([
      ['no element was moved', { data: { items: [] } }],
      ['the backend answers without a body', { data: null }],
      ['the request fails', { error: { status: 500 } }]
    ])('reports nothing when %s', async (_case, response) => {
      dispatchMock.mockResolvedValueOnce(response)
      const onRelocated = jest.fn()
      const onFinish = jest.fn()

      await runJob(onRelocated, onFinish)

      expect(onRelocated).not.toHaveBeenCalled()
      expect(onFinish).toHaveBeenCalledTimes(1)
    })
  })

  describe('when the items are restored by a job run', () => {
    beforeEach(() => {
      dispatchMock.mockResolvedValueOnce({ data: { jobRunId: 7 } })
    })

    it('reports the number of moved elements once the run succeeded', async () => {
      const onRelocated = jest.fn()
      await runJob(onRelocated)

      expect(onRelocated).not.toHaveBeenCalled()
      await completeJobRun(completion(JobStatus.SUCCESS, ['moved a', 'moved b']))

      expect(onRelocated).toHaveBeenCalledWith(2)
    })

    it.each([
      ['succeeded without moving an element', completion(JobStatus.SUCCESS, [])],
      ['succeeded and the finish was polled, which carries no messages', completion(JobStatus.SUCCESS)],
      ['finished with errors', completion(JobStatus.FINISHED_WITH_ERRORS, ['Item could not be restored'])],
      ['failed', completion(JobStatus.FAILED, ['Item could not be restored'])]
    ])('reports nothing when the run %s', async (_case, data) => {
      const onRelocated = jest.fn()
      const onFinish = jest.fn()
      await runJob(onRelocated, onFinish)

      await completeJobRun(data)

      expect(onRelocated).not.toHaveBeenCalled()
      expect(onFinish).toHaveBeenCalledTimes(1)
    })
  })
})
