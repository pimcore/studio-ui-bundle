/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { collectAssetUpdateData, hasAssetUpdateData, type AssetUpdateDraftData } from './collect-asset-update-data'

jest.mock('@Pimcore/modules/asset/hooks/use-asset-draft', () => ({}))

const draftData = (overrides: Partial<AssetUpdateDraftData> = {}): AssetUpdateDraftData => ({
  properties: undefined,
  customMetadata: undefined,
  customSettings: undefined,
  imageSettings: undefined,
  textData: undefined,
  ...overrides
})

describe('collectAssetUpdateData', () => {
  it('returns an empty update without tracked changes', () => {
    const result = collectAssetUpdateData({}, draftData({ properties: [], customMetadata: [] }))

    expect(result.updateData).toEqual({})
    expect(result.collectedTypes).toEqual([])
    expect(hasAssetUpdateData(result.updateData)).toBe(false)
  })

  it('collects only the flagged sections', () => {
    const result = collectAssetUpdateData(
      { customSettings: true },
      draftData({
        customSettings: [{ key: 'a', value: 'b' }] as unknown as AssetUpdateDraftData['customSettings'],
        textData: { data: 'text' } as unknown as AssetUpdateDraftData['textData']
      })
    )

    expect(result.updateData).toEqual({ customSettings: [{ key: 'a', value: 'b' }] })
    expect(result.collectedTypes).toEqual(['customSettings'])
  })

  it('omits a flagged section whose draft data is undefined', () => {
    const result = collectAssetUpdateData(
      { properties: true, customMetadata: true, customSettings: true, imageSettings: true, textData: true },
      draftData()
    )

    expect(result.updateData).toEqual({})
    expect(Object.keys(result.updateData)).toEqual([])
    expect(result.collectedTypes).toEqual([])
    expect(hasAssetUpdateData(result.updateData)).toBe(false)
  })

  it('keeps a flagged section whose draft data is an empty list', () => {
    const result = collectAssetUpdateData({ properties: true }, draftData({ properties: [] }))

    expect(result.updateData).toEqual({ properties: [] })
    expect(result.collectedTypes).toEqual(['properties'])
    expect(hasAssetUpdateData(result.updateData)).toBe(true)
  })

  it('strips the row id, resolves object data and drops inherited properties', () => {
    const result = collectAssetUpdateData(
      { properties: true },
      draftData({
        properties: [
          { rowId: 1, key: 'own', type: 'text', data: 'value', inherited: false },
          { rowId: 2, key: 'relation', type: 'asset', data: { id: 7, type: 'asset' }, inherited: false },
          { rowId: 3, key: 'inherited', type: 'text', data: 'parent', inherited: true }
        ] as unknown as AssetUpdateDraftData['properties']
      })
    )

    expect(result.updateData.properties).toEqual([
      { key: 'own', type: 'text', data: 'value', inherited: false },
      { key: 'relation', type: 'asset', data: 7, inherited: false }
    ])
  })

  it('normalizes custom metadata types and null values', () => {
    const result = collectAssetUpdateData(
      { customMetadata: true },
      draftData({
        customMetadata: [
          { rowId: 1, name: 'a', type: 'metadata.input', data: null },
          { rowId: 2, name: 'b', type: 'checkbox', data: null },
          { rowId: 3, name: 'c', type: 'asset', data: null }
        ] as unknown as AssetUpdateDraftData['customMetadata']
      })
    )

    expect(result.updateData.metadata).toEqual([
      { name: 'a', type: 'input', data: '' },
      { name: 'b', type: 'checkbox', data: false },
      { name: 'c', type: 'asset', data: null }
    ])
    expect(result.collectedTypes).toEqual(['customMetadata'])
  })

  it('maps the image settings and text data to their api sections', () => {
    const result = collectAssetUpdateData(
      { imageSettings: true, textData: true },
      draftData({
        imageSettings: { focalPoint: { x: 1, y: 2 } } as unknown as AssetUpdateDraftData['imageSettings'],
        textData: 'content' as unknown as AssetUpdateDraftData['textData']
      })
    )

    expect(result.updateData).toEqual({ image: { focalPoint: { x: 1, y: 2 } }, data: 'content' })
    expect(result.collectedTypes).toEqual(['imageSettings', 'textData'])
  })
})

describe('hasAssetUpdateData', () => {
  it('ignores sections that are explicitly undefined', () => {
    expect(hasAssetUpdateData({ metadata: undefined })).toBe(false)
  })

  it('counts any defined section, also falsy ones', () => {
    expect(hasAssetUpdateData({ data: '' })).toBe(true)
  })
})
