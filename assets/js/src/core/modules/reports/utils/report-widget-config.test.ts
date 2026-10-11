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

/* eslint-disable import/first */
import { type Reducer, type UnknownAction } from '@reduxjs/toolkit'
import { Model } from 'flexlayout-react'
import { injectSliceWithState } from '@sdk/app'
import {
  initialState,
  openMainWidget,
  type WidgetManagerState
} from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { buildReportWidgetConfig } from './report-widget-config'
/* eslint-enable import/first */

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
      tabs.push({ id: node.getId(), title: (node as any).getConfig().label })
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
