/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

const mockRegisterHandler = jest.fn()
let mockCompletion: ((data: { isFinished: boolean, status: string }) => Promise<void>) | undefined

jest.mock('../../message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation((options: { onJobCompletion?: typeof mockCompletion }) => {
    mockCompletion = options.onJobCompletion
    return {}
  })
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class GeneralError extends Error {}
}))

jest.mock('i18next', () => ({ t: (key: string) => key }))

// eslint-disable-next-line import/first
import { AbstractBatchDeleteJob, type AbstractBatchDeleteJobOptions } from './abstract-batch-delete-job'

class TestBatchDeleteJob extends AbstractBatchDeleteJob {
  constructor (options: AbstractBatchDeleteJobOptions, private readonly request: () => Promise<number | null>) {
    super(options)
  }

  protected async executeDeleteRequest (): Promise<number | null> {
    return await this.request()
  }
}

const run = async (job: AbstractBatchDeleteJob): Promise<void> => {
  await job.run({ messageBus: { registerHandler: mockRegisterHandler } } as unknown as Parameters<AbstractBatchDeleteJob['run']>[0])
}

describe('AbstractBatchDeleteJob', () => {
  let consoleError: jest.SpyInstance

  beforeEach(() => {
    mockCompletion = undefined
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleError.mockRestore()
  })

  it('calls onFinish, not onFailure, when the job finishes', async () => {
    const onFinish = jest.fn(async () => {})
    const onFailure = jest.fn(async () => {})
    await run(new TestBatchDeleteJob({ itemIds: [1], onFinish, onFailure }, async () => 7))

    await mockCompletion!({ isFinished: true, status: 'finished' })

    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(onFailure).not.toHaveBeenCalled()
  })

  it('calls onFailure when the request returns no job run', async () => {
    const onFailure = jest.fn(async () => {})
    await run(new TestBatchDeleteJob({ itemIds: [1], onFailure }, async () => null))

    expect(onFailure).toHaveBeenCalledTimes(1)
  })

  it('calls onFailure when the request throws', async () => {
    const onFailure = jest.fn(async () => {})
    await run(new TestBatchDeleteJob({ itemIds: [1], onFailure }, async () => { throw new Error('network') }))

    expect(onFailure).toHaveBeenCalledTimes(1)
  })

  it('calls onFailure when the job ends as failed', async () => {
    const onFinish = jest.fn(async () => {})
    const onFailure = jest.fn(async () => {})
    await run(new TestBatchDeleteJob({ itemIds: [1], onFinish, onFailure }, async () => 7))

    await mockCompletion!({ isFinished: false, status: 'failed' })

    expect(onFailure).toHaveBeenCalledTimes(1)
    expect(onFinish).not.toHaveBeenCalled()
  })

  it('works without an onFailure callback', async () => {
    await expect(run(new TestBatchDeleteJob({ itemIds: [1] }, async () => null))).resolves.toBeUndefined()
  })
})
