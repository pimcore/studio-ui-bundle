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

  it('exposes the real filename on the node even when a custom attribute key is set', () => {
    const assetNode = buildAssetNode({
      filename: 'original-key',
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
    expect(node.realKey).toBe('original-key')
  })

  it('keeps title, label and color of the workflow states for the tree dots', () => {
    const node = transformApiDataToNode(buildAssetNode({ workflowStates: [{ color: '#3572b0', colorInverted: true, title: 'todo', label: 'ToDo', layoutId: null, visibleInDetail: true }] }), { id: '0', internalKey: 'root' })

    expect(node.workflowStates).toEqual([{ title: 'todo', label: 'ToDo', color: '#3572b0' }])
  })

  it('leaves the workflow states unset when the API sends none', () => {
    const node = transformApiDataToNode(buildAssetNode({ workflowStates: null }), { id: '0', internalKey: 'root' })

    expect(node.workflowStates).toBeUndefined()
  })
})
