/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/app/router/router', () => ({ baseUrl: '' }))

jest.mock('@Pimcore/modules/element/element-helper', () => ({
  ...jest.requireActual('@Pimcore/modules/element/element-helper'),
  getElementIcon: jest.fn(() => ({ type: 'name', value: 'document' }))
}))

import { transformApiDataToNode } from './transform-api-data-to-node'
import { type Document } from '../../document-api-slice.gen'

const buildDocumentNode = (overrides: Partial<Document>): Document => {
  return {
    id: 1,
    key: 'original-key',
    type: 'page',
    parentId: 0,
    fullPath: '/original-key',
    hasChildren: false,
    locked: null,
    isLocked: false,
    published: true,
    isSite: false,
    permissions: undefined,
    customAttributes: {
      icon: null,
      tooltip: null,
      additionalIcons: [],
      key: null,
      additionalCssClasses: []
    },
    ...overrides
  } as unknown as Document
}

describe('transformApiDataToNode (document)', () => {
  it('uses the custom attribute key as the tree label when it is set', () => {
    const documentNode = buildDocumentNode({
      key: 'original-key',
      customAttributes: {
        icon: null,
        tooltip: null,
        additionalIcons: [],
        key: 'custom-key',
        additionalCssClasses: []
      }
    })

    const node = transformApiDataToNode(documentNode, { id: '0', internalKey: 'root' })

    expect(node.label).toBe('custom-key')
  })

  it('falls back to the document key as the tree label when no custom attribute key is set', () => {
    const documentNode = buildDocumentNode({ key: 'original-key' })

    const node = transformApiDataToNode(documentNode, { id: '0', internalKey: 'root' })

    expect(node.label).toBe('original-key')
  })
})
