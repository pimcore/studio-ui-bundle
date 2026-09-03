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
import { type DataObject } from '../../data-object-api-slice.gen'

jest.mock('@Pimcore/app/router/router', () => ({ baseUrl: '' }))

jest.mock('@Pimcore/modules/element/element-helper', () => ({
  ...jest.requireActual('@Pimcore/modules/element/element-helper'),
  getElementIcon: jest.fn(() => ({ type: 'name', value: 'data-object' }))
}))

const buildDataObjectNode = (overrides: Partial<DataObject>): DataObject => {
  return {
    id: 1,
    key: 'original-key',
    type: 'object',
    parentId: 0,
    fullPath: '/original-key',
    hasChildren: false,
    locked: null,
    isLocked: false,
    published: true,
    permissions: undefined,
    customAttributes: {
      icon: null,
      tooltip: null,
      additionalIcons: [],
      key: null,
      additionalCssClasses: []
    },
    ...overrides
  } as unknown as DataObject
}

describe('transformApiDataToNode (data object)', () => {
  it('uses the custom attribute key as the tree label when it is set', () => {
    const dataObjectNode = buildDataObjectNode({
      key: 'original-key',
      customAttributes: {
        icon: null,
        tooltip: null,
        additionalIcons: [],
        key: 'custom-key',
        additionalCssClasses: []
      }
    })

    const node = transformApiDataToNode(dataObjectNode, { id: '0', internalKey: 'root' })

    expect(node.label).toBe('custom-key')
  })

  it('falls back to the data object key as the tree label when no custom attribute key is set', () => {
    const dataObjectNode = buildDataObjectNode({ key: 'original-key' })

    const node = transformApiDataToNode(dataObjectNode, { id: '0', internalKey: 'root' })

    expect(node.label).toBe('original-key')
  })
})
