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
import { providesCustomReportView } from './get-custom-report-definition-adapter'

jest.mock('@Pimcore/app/depency-injection', () => ({ container: { get: jest.fn() } }))
jest.mock('@Pimcore/app/config/services/service-ids', () => ({ serviceIds: {} }))

class PlainAdapter extends DynamicTypeCustomReportDefinitionAbstract {
  id = 'plain'
  getLabel (): ReactElement { return <></> }
  getPagination (): boolean { return true }
  getCustomReportData (): ReactElement { return <></> }
}

class ViewAdapter extends PlainAdapter {
  getCustomReportView (): ReactElement { return <></> }
}

describe('providesCustomReportView', () => {
  it('is false for an undefined adapter', () => {
    expect(providesCustomReportView(undefined)).toBe(false)
  })

  it('is false for an adapter that keeps the default view', () => {
    expect(providesCustomReportView(new PlainAdapter())).toBe(false)
  })

  it('is true for an adapter that overrides the view', () => {
    expect(providesCustomReportView(new ViewAdapter())).toBe(true)
  })

  it('tolerates an adapter built against an older SDK', () => {
    const legacy = { id: 'legacy' } as unknown as DynamicTypeCustomReportDefinitionAbstract
    expect(providesCustomReportView(legacy)).toBe(false)
  })
})
