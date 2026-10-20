/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Actions, DockLocation, type IJsonModel, Model, type TabSetNode } from 'flexlayout-react'
import { getInitialModelJson } from './widget-manager-inner-model'
import { restoreCollapsedRows } from './restore-collapsed-rows'

describe('restoreCollapsedRows', () => {
  it('restores the weight of a main tabset collapsed by a splitter drag once its sibling is closed', () => {
    const model = Model.fromJson(getInitialModelJson())
    model.doAction(Actions.addNode({ type: 'tab', id: 'car', component: 'element' }, 'main_tabset', DockLocation.CENTER, -1, true))
    model.doAction(Actions.moveNode('car', 'main_tabset', DockLocation.LEFT, -1))

    const carTabsetId = model.getNodeById('car')!.getParent()!.getId()
    // dragging the splitter fully to the right leaves the main tabset with weight 0
    model.doAction(Actions.adjustSplit({ node1Id: carTabsetId, weight1: 50, pixelWidth1: 1000, node2Id: 'main_tabset', weight2: 0, pixelWidth2: 0 }))
    model.doAction(Actions.deleteTab('car'))

    expect((model.getNodeById('main_tabset') as TabSetNode).getWeight()).toBe(0)

    const restored = Model.fromJson(restoreCollapsedRows(model.toJson()))

    expect((restored.getNodeById('main_tabset') as TabSetNode).getWeight()).toBeGreaterThan(0)
  })

  it('keeps a collapsed child when one of its siblings still has a weight', () => {
    const json: IJsonModel = {
      global: {},
      layout: {
        type: 'row',
        children: [
          { type: 'tabset', id: 'a', weight: 100, children: [] },
          { type: 'tabset', id: 'b', weight: 0, children: [] }
        ]
      }
    }

    expect(restoreCollapsedRows(json)).toBe(json)
  })

  it('restores collapsed children of nested rows', () => {
    const json: IJsonModel = {
      global: {},
      layout: {
        type: 'row',
        children: [
          {
            type: 'row',
            weight: 100,
            children: [
              { type: 'tabset', id: 'a', weight: 0, children: [] },
              { type: 'tabset', id: 'b', weight: 0, children: [] }
            ]
          }
        ]
      }
    }

    const nestedChildren = restoreCollapsedRows(json).layout.children[0].children ?? []

    expect(nestedChildren.map((child) => child.weight)).toEqual([100, 100])
  })
})
