/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IJsonModel, Model } from 'flexlayout-react'
import { createPersistedReduxReducer } from '../../utils/redux-state-persistence'
import { createWidgetManagerPersistedReducer } from './widget-manager-persistence'
import { type WidgetManagerState } from './widget-manager-slice'

jest.mock('../../utils/redux-state-persistence', () => ({
  createPersistedReduxReducer: jest.fn((reducer: unknown) => reducer)
}))

jest.mock('@sdk/app', () => ({
  store: { getState: () => ({}) }
}))

jest.mock('@Pimcore/modules/auth/user/user-slice', () => ({
  selectCurrentUser: () => undefined
}))

jest.mock('@Pimcore/app/config/services/service-ids', () => ({
  serviceIds: { widgetRestorerRegistry: 'widgetRestorerRegistry' }
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: () => ({ supports: () => true, cleanConfig: (config: unknown) => config })
  }
}))

const maximizedSplit: IJsonModel = {
  global: {},
  layout: {
    type: 'row',
    id: 'main',
    children: [
      { type: 'tabset', id: 'main_tabset', children: [{ type: 'tab', id: 'car', component: 'element' }] },
      { type: 'tabset', id: 'bike_tabset', maximized: true, children: [{ type: 'tab', id: 'bike', component: 'element' }] }
    ]
  }
}

describe('createWidgetManagerPersistedReducer', () => {
  it('never saves a maximized tabset, so a reload starts in the normal layout', () => {
    createWidgetManagerPersistedReducer((state) => state!)
    const selector = (createPersistedReduxReducer as jest.Mock).mock.calls[0][2] as (state: WidgetManagerState) => IJsonModel

    const saved = selector({ innerModel: maximizedSplit } as unknown as WidgetManagerState)

    expect(Model.fromJson(maximizedSplit).getMaximizedTabset()?.getId()).toBe('bike_tabset')
    expect(Model.fromJson(saved).getMaximizedTabset()).toBeUndefined()
    expect(Model.fromJson(saved).getNodeById('bike')).toBeDefined()
  })
})
