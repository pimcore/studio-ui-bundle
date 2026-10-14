/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { MessageBusJobHandler } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler'
import { CsvDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/csv-download-job'
import { XlsxDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/xlsx-download-job'
import { type JobRun } from '@Pimcore/modules/execution-engine/execution-engine-api-slice.gen'
import { type GlobalMessageBus } from '@Pimcore/modules/global-message-bus/services/global-message-bus'

jest.mock('@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation(() => ({}))
}))
jest.mock('i18next', () => ({
  t: (key: string, options?: { name?: string }) => options?.name !== undefined ? `${key}[${options.name}]` : key
}))
jest.mock('@Pimcore/app/api/pimcore/route', () => ({ getPrefix: () => '' }))
jest.mock('@Pimcore/utils/files', () => ({
  downloadFromUrl: jest.fn(),
  downloadFromUrlWithCheck: jest.fn()
}))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  default: jest.fn(),
  GeneralError: class {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

const HandlerMock = MessageBusJobHandler as jest.MockedClass<typeof MessageBusJobHandler>

const messageBus = { registerHandler: jest.fn() } as unknown as GlobalMessageBus

const jobRun = (id: number, jobName: string): JobRun => ({
  id,
  jobName,
  state: 'running',
  jobRunChildId: null,
  ownerId: null,
  executionContext: '',
  totalElements: 0,
  currentMessage: '',
  currentStep: null,
  totalSteps: null,
  creationDate: null,
  modificationDate: null
})

beforeEach(() => {
  HandlerMock.mockClear()
})

describe.each([
  { name: 'CsvDownloadJob', create: (options: { action: () => Promise<number>, context?: string }) => new CsvDownloadJob(options), key: 'jobs.download-csv-job.title', rehydrate: () => CsvDownloadJob.rehydrate([jobRun(1, 'studio_ee_job_create_csv')]) },
  { name: 'XlsxDownloadJob', create: (options: { action: () => Promise<number>, context?: string }) => new XlsxDownloadJob(options), key: 'jobs.download-xlsx-job.title', rehydrate: () => XlsxDownloadJob.rehydrate([jobRun(1, 'studio_ee_job_create_xlsx')]) }
])('$name title', ({ create, key, rehydrate }) => {
  it('names the exported context in the title so parallel exports can be told apart', async () => {
    await create({ action: async () => 7, context: 'Brand Logos' }).run({ messageBus })

    expect(HandlerMock.mock.calls.at(-1)![0].title).toBe(`${key}-with-context[Brand Logos]`)
  })

  it('uses a different title for a different context', async () => {
    await create({ action: async () => 7, context: 'Car Images' }).run({ messageBus })

    expect(HandlerMock.mock.calls.at(-1)![0].title).toBe(`${key}-with-context[Car Images]`)
  })

  it('keeps the generic title without a context', async () => {
    await create({ action: async () => 7 }).run({ messageBus })

    expect(HandlerMock.mock.calls.at(-1)![0].title).toBe(key)
  })

  it('keeps the generic title for an empty context', async () => {
    await create({ action: async () => 7, context: '' }).run({ messageBus })

    expect(HandlerMock.mock.calls.at(-1)![0].title).toBe(key)
  })

  it('keeps the context when the job is retried', async () => {
    await create({ action: async () => 7, context: 'Brand Logos' }).run({ messageBus })
    const { onRetry } = HandlerMock.mock.calls.at(-1)![0]
    HandlerMock.mockClear()

    await onRetry?.()

    expect(HandlerMock.mock.calls.at(-1)![0].title).toBe(`${key}-with-context[Brand Logos]`)
  })

  it('falls back to the generic title when rehydrated after a page reload', () => {
    rehydrate()

    expect(HandlerMock.mock.calls.at(-1)![0].title).toBe(key)
  })
})
