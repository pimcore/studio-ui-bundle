/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import trackError from '@Pimcore/modules/app/error-handler'
import { api } from '@Pimcore/modules/index-sync/index-sync-api-slice.gen'
import { MessageBusJobHandler } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler'
import { IndexSyncJob } from '@Pimcore/modules/execution-engine/jobs/index-sync/index-sync-job'
import { type JobRunOptions } from '@Pimcore/modules/execution-engine/jobs/job-interface'
import { type JobRunList } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'

jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: jest.fn() }
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError { constructor (readonly errorData: unknown) {} },
  GeneralError: class GeneralError { constructor (readonly content: string) {} }
}))

jest.mock('@Pimcore/modules/index-sync/index-sync-api-slice.gen', () => ({
  api: { endpoints: { indexSyncStart: { initiate: jest.fn(() => 'indexSyncStart-action') } } }
}))

jest.mock('@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation((options: unknown) => ({ options }))
}))

jest.mock('i18next', () => ({ t: (key: string) => key }))

const JOB_RUN_ID = 17

const dispatchMock = store.dispatch as unknown as jest.Mock
const HandlerMock = MessageBusJobHandler as jest.MockedClass<typeof MessageBusJobHandler>
const registerHandler = jest.fn()
const runOptions = { messageBus: { registerHandler } } as unknown as JobRunOptions

describe('IndexSyncJob', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('starts the synchronization and tracks the created job run', async () => {
    dispatchMock.mockResolvedValue({ data: { jobRunId: JOB_RUN_ID } })

    await new IndexSyncJob().run(runOptions)

    expect(dispatchMock).toHaveBeenCalledWith('indexSyncStart-action')
    expect(api.endpoints.indexSyncStart.initiate).toHaveBeenCalledTimes(1)
    expect(HandlerMock).toHaveBeenCalledWith({ jobRunId: JOB_RUN_ID, title: 'index-sync.job.title' })
    expect(registerHandler).toHaveBeenCalledTimes(1)
    expect(trackError).not.toHaveBeenCalled()
  })

  it('reports the error and tracks no job run when the request fails', async () => {
    dispatchMock.mockResolvedValue({ error: { status: 403 } })

    await new IndexSyncJob().run(runOptions)

    expect(trackError).toHaveBeenCalledTimes(1)
    expect(registerHandler).not.toHaveBeenCalled()
  })

  it('lets an unexpected failure propagate so that the caller reports it once', async () => {
    dispatchMock.mockRejectedValue(new Error('network down'))

    await expect(new IndexSyncJob().run(runOptions)).rejects.toThrow('network down')

    expect(trackError).not.toHaveBeenCalled()
    expect(registerHandler).not.toHaveBeenCalled()
  })

  it('lets a failing handler registration propagate', async () => {
    dispatchMock.mockResolvedValue({ data: { jobRunId: JOB_RUN_ID } })
    registerHandler.mockImplementationOnce(() => { throw new Error('no message bus') })

    await expect(new IndexSyncJob().run(runOptions)).rejects.toThrow('no message bus')

    expect(trackError).not.toHaveBeenCalled()
  })

  it('rebuilds the handler of a running job run after a reload', () => {
    const jobRuns = [{ id: JOB_RUN_ID, state: 'running' }] as unknown as JobRunList

    IndexSyncJob.rehydrate(jobRuns)

    expect(HandlerMock).toHaveBeenCalledWith({ jobRunId: JOB_RUN_ID, title: 'index-sync.job.title' })
  })

  it('is registered for the job name the backend creates', () => {
    expect(IndexSyncJob.jobNames).toEqual(['studio_ee_job_index_sync'])
  })
})
