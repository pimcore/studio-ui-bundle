/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@sdk/app', () => ({
  injectSliceWithState: jest.fn()
}))

jest.mock('@Pimcore/modules/widget-manager/utils/widget-manager-outer-model', () => ({
  getInitialModelJson: () => ({ global: {}, layout: { type: 'row', children: [] } })
}))

jest.mock('@Pimcore/modules/widget-manager/utils/widget-manager-inner-model', () => ({
  getInitialModelJson: () => ({
    global: { enableUseVisibility: true },
    layout: {
      id: 'main',
      type: 'row',
      children: [{ type: 'tabset', id: 'main_tabset', enableDeleteWhenEmpty: false, selected: 0, children: [] }]
    }
  })
}))

jest.mock('@Pimcore/modules/widget-manager/widget-manager-persistence', () => ({
  createWidgetManagerPersistedReducer: (reducer: unknown) => reducer
}))

jest.mock('@Pimcore/app/depency-injection', () => ({
  container: {
    get: () => ({
      getMainNavItem: () => ({ path: 'Reporting/sales', widgetConfig: mockWidgetConfig() }),
      getMainNavItems: () => []
    })
  }
}))

jest.mock('@Pimcore/modules/auth/permission-helper', () => ({ isAllowed: () => true }))
jest.mock('@Pimcore/modules/perspectives/permission-checker', () => ({ isAllowedInPerspective: () => true }))

/* eslint-disable import/first */
import { type Reducer, type UnknownAction } from '@reduxjs/toolkit'
import { merge } from 'lodash'
import { Model, type TabNode, type TabSetNode } from 'flexlayout-react'
import { injectSliceWithState } from '@sdk/app'
import {
  initialState,
  migrateWidget,
  openMainWidget,
  type WidgetManagerState
} from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { MainNavWidgetRestorer } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-widget-restorer'
import { buildReportWidgetConfig, isLegacyReportWidget } from './report-widget-config'
/* eslint-enable import/first */

const mockWidgetConfig = (): unknown => buildReportWidgetConfig({ name: 'sales', niceName: 'Sales Report' })

interface SliceLike {
  name: string
  reducer: Reducer<WidgetManagerState>
}

const slice = (injectSliceWithState as unknown as jest.Mock).mock.calls
  .map((call: unknown[]) => call[0] as SliceLike)
  .find((registeredSlice) => registeredSlice.name === 'widget-manager')!

let state: WidgetManagerState = initialState

const openReport = (name: string, niceName?: string): void => {
  const action: UnknownAction = openMainWidget(buildReportWidgetConfig({ name, niceName }))
  state = slice.reducer(state, action)
}

const getReportTabs = (): Array<{ id: string, title: string }> => {
  const tabs: Array<{ id: string, title: string }> = []
  Model.fromJson(state.innerModel).visitNodes((node) => {
    if (node.getType() === 'tab' && node.getId().startsWith('dynamic-report-')) {
      tabs.push({ id: node.getId(), title: (node as TabNode).getConfig().label })
    }
  })
  return tabs
}

describe('buildReportWidgetConfig', () => {
  it('uses a stable per-report id and the nice name as title', () => {
    const config = buildReportWidgetConfig({ name: 'sales', niceName: 'Sales Report' })

    expect(config.id).toBe('dynamic-report-sales')
    expect(config.name).toBe('Sales Report')
    expect(config.config.label).toBe('Sales Report')
    expect(config.config.translationKey).toBeUndefined()
    expect(config.config.reportId).toBe('sales')
  })

  it('falls back to the report name without a nice name', () => {
    expect(buildReportWidgetConfig({ name: 'sales', niceName: '' }).config.label).toBe('sales')
    expect(buildReportWidgetConfig({ name: 'sales' }).config.label).toBe('sales')
  })
})

describe('opening reports', () => {
  it('opens the same report twice as one tab and two reports as two tabs', () => {
    openReport('sales', 'Sales Report')
    openReport('sales', 'Sales Report')
    expect(getReportTabs()).toEqual([{ id: 'dynamic-report-sales', title: 'Sales Report' }])

    openReport('stock')
    expect(getReportTabs()).toEqual([
      { id: 'dynamic-report-sales', title: 'Sales Report' },
      { id: 'dynamic-report-stock', title: 'stock' }
    ])
  })
})

describe('restoring legacy report tabs', () => {
  const legacy = {
    id: '#generated-by-flexlayout',
    name: 'All Reports',
    component: 'dynamic-report',
    config: { label: 'All Reports', mainNavPath: 'Reporting/sales' }
  }

  const restore = (persisted: typeof legacy): void => {
    const current = buildReportWidgetConfig({ name: 'sales', niceName: 'Sales Report' })
    const merged = merge({}, persisted, current)
    expect(isLegacyReportWidget(persisted, merged)).toBe(true)
    state = slice.reducer(state, migrateWidget({ originalId: persisted.id, config: merged }))
  }

  beforeEach(() => {
    state = slice.reducer(initialState, openMainWidget(legacy))
  })

  it('migrates the old tab to the stable id and title instead of leaving it behind', () => {
    restore(legacy)
    expect(getReportTabs()).toEqual([{ id: 'dynamic-report-sales', title: 'Sales Report' }])

    openReport('sales', 'Sales Report')
    expect(getReportTabs()).toHaveLength(1)
  })

  it('drops the old tab when the stable one already exists', () => {
    openReport('sales', 'Sales Report')
    restore(legacy)
    expect(getReportTabs()).toEqual([{ id: 'dynamic-report-sales', title: 'Sales Report' }])
  })

  it('does not treat current or other widgets as legacy', () => {
    const current = buildReportWidgetConfig({ name: 'sales' })
    expect(isLegacyReportWidget(current, current)).toBe(false)
    expect(isLegacyReportWidget({ ...legacy, component: 'other' }, current)).toBe(false)
  })
})

describe('MainNavWidgetRestorer with a legacy report tab', () => {
  it('migrates the persisted tab and keeps the selection on the stable tab', () => {
    const legacy = {
      id: '#generated-by-flexlayout',
      name: 'All Reports',
      component: 'dynamic-report',
      config: { label: 'All Reports', mainNavPath: 'Reporting/sales' }
    }
    state = slice.reducer(initialState, openMainWidget(mockWidgetConfig() as never))
    state = slice.reducer(state, openMainWidget(legacy))

    const dispatch = (action: UnknownAction): void => {
      state = slice.reducer(state, action)
    }
    const restored = new MainNavWidgetRestorer().restore(legacy, dispatch as never)

    expect(restored).toBe(true)
    expect(getReportTabs()).toEqual([{ id: 'dynamic-report-sales', title: 'Sales Report' }])
    const tabset = Model.fromJson(state.innerModel).getNodeById('main_tabset') as TabSetNode
    expect(tabset.getSelectedNode()?.getId()).toBe('dynamic-report-sales')
  })

  it('migrates a lone legacy tab in place', () => {
    const legacy = {
      id: '#generated-by-flexlayout',
      name: 'All Reports',
      component: 'dynamic-report',
      config: { label: 'All Reports', mainNavPath: 'Reporting/sales' }
    }
    state = slice.reducer(initialState, openMainWidget(legacy))
    new MainNavWidgetRestorer().restore(legacy, ((action: UnknownAction) => {
      state = slice.reducer(state, action)
    }) as never)

    expect(getReportTabs()).toEqual([{ id: 'dynamic-report-sales', title: 'Sales Report' }])
  })
})
