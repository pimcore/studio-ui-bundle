/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactElement } from 'react'
import { DynamicTypeCustomReportDefinitionAbstract } from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-abstract'
import { hasCustomReportDashboardView } from './get-custom-report-definition-adapter'

jest.mock('@Pimcore/app/depency-injection', () => ({ container: { get: jest.fn() } }))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))

class PlainAdapter extends DynamicTypeCustomReportDefinitionAbstract {
  id = 'plain'
  getLabel (): ReactElement { return <></> }
  getPagination (): boolean { return true }
  getCustomReportData (): ReactElement { return <></> }
}

class DashboardAdapter extends PlainAdapter {
  providesCustomReportDashboardView (): boolean { return true }
}

describe('hasCustomReportDashboardView', () => {
  it('is false for an undefined adapter', () => {
    expect(hasCustomReportDashboardView(undefined)).toBe(false)
  })

  it('is false for an adapter that keeps the defaults', () => {
    const adapter = new PlainAdapter()
    expect(hasCustomReportDashboardView(adapter)).toBe(false)
    expect(adapter.getCustomReportDashboardView({ reportName: 'r', visualization: 'table', showLegend: false })).toBeNull()
  })

  it('is true for an adapter that provides a dashboard view', () => {
    expect(hasCustomReportDashboardView(new DashboardAdapter())).toBe(true)
  })

  it('tolerates an adapter built against an older SDK', () => {
    const legacy = { id: 'legacy' } as unknown as DynamicTypeCustomReportDefinitionAbstract
    expect(hasCustomReportDashboardView(legacy)).toBe(false)
  })
})
