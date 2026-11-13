/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { renderHook } from '@testing-library/react'
import { useInlineEditApiUpdate } from './use-inline-edit-api-update'

const mockPatch = jest.fn().mockResolvedValue({})

jest.mock('@sdk/app', () => ({ useAppDispatch: () => jest.fn() }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError {} // eslint-disable-line @typescript-eslint/no-extraneous-class
}))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({
  api: { util: { updateQueryData: jest.fn() } },
  useDataObjectPatchByIdMutation: () => [mockPatch]
}))
jest.mock('@Pimcore/modules/element/listing/decorators/inline-edit/inline-edit-decorator', () => ({}))
jest.mock('../../../batch-actions/batch-append-mode/batch-append-mode', () => ({
  addBatchAppendMode: jest.fn(),
  BatchAppendMode: {},
  META_SUPPORTS_BATCH_APPEND_MODE: 'supportsBatchAppendMode'
}))
jest.mock('@Pimcore/components/language-selection', () => ({ useLanguageSelection: () => ({ currentLanguage: 'en' }) }))
jest.mock('@Pimcore/modules/element/listing/abstract/settings/use-settings', () => ({
  useSettings: () => ({ useColumnMapper: () => ({}) })
}))

describe('useInlineEditApiUpdate - classification store patch address', () => {
  const patchOf = async (config: Record<string, unknown>): Promise<any> => {
    mockPatch.mockClear()
    const { result } = renderHook(() => useInlineEditApiUpdate())

    await result.current.updateApiData({
      update: {
        id: 5,
        value: 'new',
        column: { key: 'attributes', type: 'dataobject.classificationstore', localizable: true, locale: 'de', config }
      }
    } as unknown as Parameters<ReturnType<typeof useInlineEditApiUpdate>['updateApiData']>[0])

    return mockPatch.mock.calls[0][0].body.data[0].editableData
  }

  it('addresses the key as <keyId>#<variant> for a variant column, keeping group and locale segments', async () => {
    expect(await patchOf({ keyId: 12, groupId: 3, variant: 'Metric' })).toEqual({ attributes: { 3: { de: { '12#Metric': 'new' } } } })
  })

  it('addresses the bare key id for the default slot', async () => {
    expect(await patchOf({ keyId: 12, groupId: 3 })).toEqual({ attributes: { 3: { de: { 12: 'new' } } } })
  })
})
