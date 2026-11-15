/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DataObjectBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/data-object-batch-edit-job'
import { DataObjectFolderBatchEditJob } from '@Pimcore/modules/execution-engine/jobs/batch-edit/data-object-folder-batch-edit-job'
import { type JobRunOptions } from '@Pimcore/modules/execution-engine/jobs/job-interface'

jest.mock('@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation(() => ({}))
}))
jest.mock('i18next', () => ({ t: (key: string) => key }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  default: jest.fn(),
  GeneralError: class {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))

const messageBus: Pick<JobRunOptions['messageBus'], 'registerHandler'> = { registerHandler: jest.fn() }
const noop = async (): Promise<void> => {}

/**
 * Regression test for PEES-1831 / studio-ui-bundle#3181:
 * "published" is a system field handled by the backend PublishAdapter, which reads it from the
 * top level of a patch item. Nested inside editableData it is silently ignored, so batch
 * publishing/unpublishing did nothing.
 */
describe('DataObjectBatchEditJob: published is sent as a top-level patch field', () => {
  const runWithValues = async (values: Record<string, unknown>): Promise<any> => {
    const patchObjectsByIds = jest.fn().mockResolvedValue({ data: { jobRunId: 7 } })
    const job = new DataObjectBatchEditJob({
      patchObjectsByIds,
      selectedRowsIds: [303, 304],
      values,
      assetContextId: 1,
      refreshGrid: noop
    })
    await job.run({ messageBus: messageBus as any })
    return patchObjectsByIds.mock.calls[0][0].body.data
  }

  it('hoists published=true out of editableData for every selected object', async () => {
    const data = await runWithValues({ published: true, name: 'Isetta' })

    expect(data).toEqual([
      { id: 303, published: true, editableData: { name: 'Isetta' } },
      { id: 304, published: true, editableData: { name: 'Isetta' } }
    ])
  })

  it('hoists published=false so objects can be unpublished', async () => {
    const data = await runWithValues({ published: false })

    expect(data).toEqual([
      { id: 303, published: false, editableData: {} },
      { id: 304, published: false, editableData: {} }
    ])
  })

  it('does not add a published key when it was not part of the batch edit', async () => {
    const data = await runWithValues({ name: 'Isetta' })

    expect(data).toEqual([
      { id: 303, editableData: { name: 'Isetta' } },
      { id: 304, editableData: { name: 'Isetta' } }
    ])
  })
})

describe('DataObjectFolderBatchEditJob: published is sent as a top-level patch field', () => {
  const runWithValues = async (values: Record<string, unknown>): Promise<any> => {
    const patchObjectsInFolder = jest.fn().mockResolvedValue({ data: { jobRunId: 7 } })
    const job = new DataObjectFolderBatchEditJob({
      patchObjectsInFolder,
      folderId: 5,
      values,
      filters: { includeDescendants: true },
      classId: 'CAR',
      assetContextId: 5,
      refreshGrid: noop
    })
    await job.run({ messageBus: messageBus as any })
    return patchObjectsInFolder.mock.calls[0][0].body.data
  }

  it('hoists published out of editableData', async () => {
    const data = await runWithValues({ published: true, name: 'Isetta' })

    expect(data).toEqual({ published: true, editableData: { name: 'Isetta' } })
  })

  it('does not add a published key when it was not part of the batch edit', async () => {
    const data = await runWithValues({ name: 'Isetta' })

    expect(data).toEqual({ editableData: { name: 'Isetta' } })
  })
})
