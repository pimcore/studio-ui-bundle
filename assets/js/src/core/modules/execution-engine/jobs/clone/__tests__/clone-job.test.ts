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
import { api } from '@Pimcore/modules/element/element-api-slice-enhanced'
import { tagNames } from '@Pimcore/app/api/pimcore/tags'
import { api as assetApi } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { api as dataObjectApi } from '@Pimcore/modules/data-object/data-object-api-slice.gen'
import { MessageBusJobHandler, type JobCompletionData } from '@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler'
import { AssetCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/asset-clone-job'
import { DataObjectCloneJob } from '@Pimcore/modules/execution-engine/jobs/clone/data-object-clone-job'
import { type JobRunOptions } from '@Pimcore/modules/execution-engine/jobs/job-interface'

jest.mock('@Pimcore/app/store', () => ({
  store: { dispatch: jest.fn((action) => action) }
}))

jest.mock('@Pimcore/components/element-tree/element-tree-slice', () => ({
  setNodeFetching: jest.fn((payload: unknown) => ({ type: 'setNodeFetching', payload })),
  refreshNodeChildren: jest.fn((payload: unknown) => ({ type: 'refreshNodeChildren', payload }))
}))

jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError { constructor (readonly errorData: unknown) {} },
  GeneralError: class GeneralError { constructor (readonly content: string) {} }
}))

jest.mock('@Pimcore/modules/asset/asset-api-slice.gen', () => ({
  api: { endpoints: { assetClone: { initiate: jest.fn() } } }
}))

jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({
  api: { endpoints: { dataObjectClone: { initiate: jest.fn() } } }
}))

jest.mock('@Pimcore/modules/execution-engine/message-handlers/message-bus-job/message-bus-job-handler', () => ({
  MessageBusJobHandler: jest.fn().mockImplementation((options: unknown) => ({ options }))
}))

jest.mock('i18next', () => ({ t: (key: string) => key }))

const TARGET_ID = 7

const dispatchMock = store.dispatch as unknown as jest.Mock
const HandlerMock = MessageBusJobHandler as jest.MockedClass<typeof MessageBusJobHandler>
const runOptions = { messageBus: { registerHandler: jest.fn() } } as unknown as JobRunOptions

/** The onJobCompletion callback the job handed to its MessageBusJobHandler. */
function capturedOnJobCompletion (): (data: JobCompletionData) => Promise<void> {
  return HandlerMock.mock.calls.at(-1)![0].onJobCompletion! as (data: JobCompletionData) => Promise<void>
}

const gridInvalidations = (): unknown[] => dispatchMock.mock.calls
  .map(([action]) => action)
  .filter((action) => api.util.invalidateTags.match(action))

beforeEach(() => {
  jest.clearAllMocks()
  ;(assetApi.endpoints.assetClone.initiate as unknown as jest.Mock).mockReturnValue(Promise.resolve({ data: { jobRunId: 1 } }))
  ;(dataObjectApi.endpoints.dataObjectClone.initiate as unknown as jest.Mock).mockReturnValue(Promise.resolve({ data: { jobRunId: 1 } }))
})

describe.each([
  ['data object', () => new DataObjectCloneJob({ sourceId: 12, targetId: TARGET_ID, parameters: { recursive: true, updateReferences: true } }), tagNames.DATA_OBJECT_GRID],
  ['asset', () => new AssetCloneJob({ sourceId: 12, targetId: TARGET_ID }), tagNames.ASSET_GRID]
])('%s clone job', (_, buildJob, gridTagType) => {
  it('does not refresh the target children grid while the clone is still running', async () => {
    await buildJob().run(runOptions)

    expect(gridInvalidations()).toEqual([])
  })

  it('refreshes the target children grid once the clone job completed', async () => {
    await buildJob().run(runOptions)
    await capturedOnJobCompletion()({ isSuccessful: true, isFinished: true, isFailed: false, status: 'finished', payload: null } as unknown as JobCompletionData)

    expect(gridInvalidations()).toEqual([api.util.invalidateTags([{ type: gridTagType, id: TARGET_ID }])])
  })
})
