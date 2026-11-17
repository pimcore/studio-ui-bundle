/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

jest.mock('@Pimcore/app/api/pimcore/route', () => ({
  getPrefix: () => '/pimcore-studio/api'
}))

/* eslint-disable import/first */
import { getReportExportFileName, getReportImportUrl } from './config-transfer-urls'

describe('config transfer urls', () => {
  it('builds the import url below the api prefix', () => {
    expect(getReportImportUrl()).toBe('/pimcore-studio/api/bundle/custom-reports/config/import')
  })

  it('names the export file after the report', () => {
    expect(getReportExportFileName('sales_by_region')).toBe('custom_report_sales_by_region_export.json')
  })
})
