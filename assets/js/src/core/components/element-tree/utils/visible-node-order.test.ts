/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { buildVisibleNodeOrder } from './visible-node-order'

interface RenderedNode {
  internalKey: string
  children?: RenderedNode[]
}

/**
 * Rebuilds the markup the tree produces: a node renders its own row and, when
 * expanded, a list holding its children as siblings of that row.
 */
const render = (nodes: RenderedNode[], parent: HTMLElement): Record<string, { el: HTMLElement }> => {
  let refs: Record<string, { el: HTMLElement }> = {}

  nodes.forEach(node => {
    const nodeElement = document.createElement('div')
    nodeElement.className = 'tree-node'
    parent.appendChild(nodeElement)

    const row = document.createElement('div')
    row.className = 'tree-node__content-inner'
    nodeElement.appendChild(row)

    refs[node.internalKey] = { el: row }

    if (node.children !== undefined) {
      const list = document.createElement('div')
      list.className = 'tree-list'
      nodeElement.appendChild(list)

      refs = { ...refs, ...render(node.children, list) }
    }
  })

  return refs
}

describe('buildVisibleNodeOrder', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('follows the rendered order, not the order of the internal keys', () => {
    // Internal keys are paths of element ids, so the displayed order and the key
    // order disagree as soon as the server sorts children by anything but id.
    const refs = render([
      { internalKey: '0-1-83-940' },
      { internalKey: '0-1-83-7' },
      { internalKey: '0-1-83-125' },
      { internalKey: '0-1-83-1201' },
      { internalKey: '0-1-83-44' },
      { internalKey: '0-1-83-802' }
    ], document.body)

    expect(buildVisibleNodeOrder(refs)).toEqual([
      '0-1-83-940',
      '0-1-83-7',
      '0-1-83-125',
      '0-1-83-1201',
      '0-1-83-44',
      '0-1-83-802'
    ])
  })

  it('places children of an expanded node between it and its next sibling', () => {
    const refs = render([
      {
        internalKey: '0-1-83',
        children: [
          { internalKey: '0-1-83-940' },
          { internalKey: '0-1-83-7' }
        ]
      },
      { internalKey: '0-1-12' }
    ], document.body)

    expect(buildVisibleNodeOrder(refs)).toEqual([
      '0-1-83',
      '0-1-83-940',
      '0-1-83-7',
      '0-1-12'
    ])
  })

  it('keeps nested levels in visible order', () => {
    const refs = render([
      {
        internalKey: '0-1',
        children: [
          {
            internalKey: '0-1-83',
            children: [{ internalKey: '0-1-83-940' }]
          },
          { internalKey: '0-1-12' }
        ]
      }
    ], document.body)

    expect(buildVisibleNodeOrder(refs)).toEqual([
      '0-1',
      '0-1-83',
      '0-1-83-940',
      '0-1-12'
    ])
  })

  it('ignores refs without an element and refs that left the document', () => {
    const refs: Record<string, { el?: HTMLElement } | undefined> = {
      ...render([{ internalKey: '0-1-83' }], document.body),
      '0-1-detached': { el: document.createElement('div') },
      '0-1-empty': {},
      '0-1-missing': undefined
    }

    expect(buildVisibleNodeOrder(refs)).toEqual(['0-1-83'])
  })
})
