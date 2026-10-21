/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { modalApi } from '@Pimcore/app/public-api/modal/modal-api'
import trackError from '@Pimcore/modules/app/error-handler'
import { IndexSyncJob } from '@Pimcore/modules/execution-engine/jobs/index-sync/index-sync-job'
import { confirmIndexSync, startIndexSync } from '../index-sync-actions'

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: { get: jest.fn() }
}))

jest.mock('@Pimcore/app/public-api/modal/modal-api', () => ({
  modalApi: { confirm: jest.fn() }
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  GeneralError: class GeneralError { constructor (readonly content: string) {} }
}))

jest.mock('@Pimcore/modules/execution-engine/jobs/index-sync/index-sync-job', () => ({
  IndexSyncJob: jest.fn()
}))

jest.mock('i18next', () => ({ t: (key: string) => key }))

const runJob = jest.fn()

describe('index sync actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(container.get as jest.Mock).mockReturnValue({ runJob })
  })

  it('asks for confirmation before anything is started', () => {
    confirmIndexSync()

    expect(modalApi.confirm).toHaveBeenCalledWith({
      title: 'index-sync.confirmation.title',
      content: 'index-sync.confirmation.text',
      okText: 'index-sync.confirmation.ok',
      onOk: startIndexSync
    })
    expect(runJob).not.toHaveBeenCalled()
  })

  it('runs the index sync job through the execution engine', async () => {
    runJob.mockResolvedValue(undefined)

    await startIndexSync()

    expect(IndexSyncJob).toHaveBeenCalledTimes(1)
    expect(runJob).toHaveBeenCalledWith((IndexSyncJob as unknown as jest.Mock).mock.instances[0])
    expect(trackError).not.toHaveBeenCalled()
  })

  it('reports a failure to start the job exactly once, even though trackError throws after showing the dialog', async () => {
    runJob.mockRejectedValue(new Error('boom'))
    ;(trackError as jest.Mock).mockImplementation(() => { throw new Error('Failed to start the search index synchronization') })

    await expect(startIndexSync()).resolves.toBeUndefined()

    expect(trackError).toHaveBeenCalledTimes(1)
  })
})
