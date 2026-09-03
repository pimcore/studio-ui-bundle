/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { transformApiDataToNode } from './transform-api-data-to-node'
import { type Unknown } from '../../asset-api-slice.gen'

jest.mock('@Pimcore/app/router/router', () => ({ baseUrl: '' }))

jest.mock('@Pimcore/modules/element/element-helper', () => ({
  ...jest.requireActual('@Pimcore/modules/element/element-helper'),
  getElementIcon: jest.fn(() => ({ type: 'name', value: 'unknown' }))
}))

const buildAssetNode = (overrides: Partial<Unknown>): Unknown => {
  return {
    id: 1,
    filename: 'original-filename',
    type: 'unknown',
    parentId: 0,
    fullPath: '/original-filename',
    hasChildren: false,
    locked: null,
    isLocked: false,
    permissions: undefined,
    customAttributes: {
      icon: null,
      tooltip: null,
      additionalIcons: [],
      key: null,
      additionalCssClasses: []
    },
    ...overrides
  } as unknown as Unknown
}

describe('transformApiDataToNode (asset)', () => {
  it('uses the custom attribute key as the tree label when it is set', () => {
    const assetNode = buildAssetNode({
      filename: 'original-filename',
      customAttributes: {
        icon: null,
        tooltip: null,
        additionalIcons: [],
        key: 'custom-key',
        additionalCssClasses: []
      }
    })

    const node = transformApiDataToNode(assetNode, { id: '0', internalKey: 'root' })

    expect(node.label).toBe('custom-key')
  })

  it('falls back to the filename as the tree label when no custom attribute key is set', () => {
    const assetNode = buildAssetNode({ filename: 'original-filename' })

    const node = transformApiDataToNode(assetNode, { id: '0', internalKey: 'root' })

    expect(node.label).toBe('original-filename')
  })
})
