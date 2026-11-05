/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IJsonModel, Model, type TabNode } from 'flexlayout-react'
import { createContextMenuItems } from './context-menu'

jest.mock('i18next', () => ({ t: (key: string) => key }))

jest.mock('@Pimcore/app/depency-injection', () => ({ container: { get: jest.fn() } }))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))

const tabset = (id: string, tabIds: string[], extra: object = {}): object => ({
  type: 'tabset', id, ...extra, children: tabIds.map((tabId) => ({ type: 'tab', id: tabId, component: 'element' }))
})

const layout = (...children: object[]): Model => Model.fromJson({ global: {}, layout: { type: 'row', id: 'main', children } } as unknown as IJsonModel)

const openMenu = (model: Model, tabId: string): { visibleKeys: unknown[], closeContextMenu: jest.Mock, expandMainWidget: jest.Mock, click: (key: string) => void } => {
  const closeContextMenu = jest.fn()
  const expandMainWidget = jest.fn()
  const items = createContextMenuItems({
    contextMenuState: { x: 0, y: 0, tabNode: model.getNodeById(tabId) as TabNode },
    closeContextMenu,
    model,
    closeWidget: jest.fn(),
    expandMainWidget
  }) ?? []

  return {
    visibleKeys: items.filter((item) => (item as { hidden?: boolean } | null)?.hidden !== true).map((item) => item?.key),
    closeContextMenu,
    expandMainWidget,
    click: (key) => { (items.find((item) => item?.key === key) as unknown as { onClick: () => void }).onClick() }
  }
}

describe('createContextMenuItems', () => {
  it('offers Use Full Space beside an empty half and expands the tab group', () => {
    const menu = openMenu(layout(tabset('main_tabset', [], { enableDeleteWhenEmpty: false }), tabset('bike_tabset', ['bike'])), 'bike')

    expect(menu.visibleKeys).toEqual(['close-tab', 'close-others', 'close-unmodified', 'close-all', 'use-full-space-divider', 'use-full-space'])

    menu.click('use-full-space')

    expect(menu.expandMainWidget).toHaveBeenCalledWith('bike')
    expect(menu.closeContextMenu).toHaveBeenCalled()
  })

  it.each([
    ['without a split', layout(tabset('main_tabset', ['car']))],
    ['with tabs on both sides', layout(tabset('main_tabset', ['car']), tabset('bike_tabset', ['bike']))]
  ])('hides Use Full Space %s', (_, model) => {
    expect(openMenu(model, 'car').visibleKeys).toEqual(['close-tab', 'close-others', 'close-unmodified', 'close-all'])
  })
})
