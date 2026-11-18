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
import { useElementApi } from './use-element-api'
import trackError from '@Pimcore/modules/app/error-handler'

const assetPatch = jest.fn()
const dataObjectPatch = jest.fn()
const documentUpdate = jest.fn()
const updateAsset = jest.fn()
const updateDataObject = jest.fn()
const updateDocument = jest.fn()

jest.mock('@Pimcore/modules/asset/asset-api-slice-enhanced', () => ({ useAssetPatchByIdMutation: () => [assetPatch] }))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice-enhanced', () => ({ useDataObjectPatchByIdMutation: () => [dataObjectPatch] }))
jest.mock('@Pimcore/modules/document/document-api-slice.gen', () => ({ useDocumentUpdateByIdMutation: () => [documentUpdate] }))
jest.mock('@Pimcore/modules/asset/asset-api-slice.gen', () => ({ api: {}, useAssetCloneMutation: () => [jest.fn()] }))
jest.mock('@Pimcore/modules/data-object/data-object-api-slice.gen', () => ({ api: {}, useDataObjectCloneMutation: () => [jest.fn()] }))
jest.mock('@sdk/app', () => ({ useAppDispatch: () => jest.fn() }))
jest.mock('@Pimcore/modules/app/error-handler', () => ({
  __esModule: true,
  default: jest.fn(),
  ApiError: class ApiError extends Error {},
  GeneralError: class GeneralError extends Error {}
}))
jest.mock('@Pimcore/modules/element/hooks/use-cache-update', () => ({
  useCacheUpdate: (type: string) => ({
    updateFieldValue: type === 'asset' ? updateAsset : type === 'data-object' ? updateDataObject : updateDocument
  })
}))

const args = { body: { data: [{ id: 5, key: 'new-name' }] } }

describe('useElementApi.elementPatch', () => {
  beforeEach(() => { jest.clearAllMocks() })

  it.each([
    ['asset', assetPatch, updateAsset, 'filename'],
    ['data-object', dataObjectPatch, updateDataObject, 'key'],
    ['document', documentUpdate, updateDocument, 'key']
  ] as const)('%s: updates the cache with the new key after a successful patch', async (type, patch, update, field) => {
    patch.mockResolvedValue({ data: {} })
    const { result } = renderHook(() => useElementApi(type))

    await expect(result.current.elementPatch(args)).resolves.toBe(true)
    expect(update).toHaveBeenCalledWith(5, field, 'new-name')
    expect(trackError).not.toHaveBeenCalled()
  })

  it.each([
    ['asset', assetPatch, updateAsset],
    ['data-object', dataObjectPatch, updateDataObject],
    ['document', documentUpdate, updateDocument]
  ] as const)('%s: a rejected patch returns false, tracks the error and leaves the cache alone', async (type, patch, update) => {
    patch.mockResolvedValue({ error: { status: 409 } })
    const { result } = renderHook(() => useElementApi(type))

    await expect(result.current.elementPatch(args)).resolves.toBe(false)
    expect(update).not.toHaveBeenCalled()
    expect(trackError).toHaveBeenCalledTimes(1)
  })

  it('returns false and tracks an error when the request throws', async () => {
    assetPatch.mockRejectedValue(new Error('network'))
    const { result } = renderHook(() => useElementApi('asset'))

    await expect(result.current.elementPatch(args)).resolves.toBe(false)
    expect(updateAsset).not.toHaveBeenCalled()
    expect(trackError).toHaveBeenCalledTimes(1)
  })
})
