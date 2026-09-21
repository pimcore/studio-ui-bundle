/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { getPrefix } from '@Pimcore/app/api/pimcore/route'

export const getReportExportUrl = (reportName: string): string =>
  `${getPrefix()}/bundle/custom-reports/config/${encodeURIComponent(reportName)}/export`

export const getReportImportUrl = (): string =>
  `${getPrefix()}/bundle/custom-reports/config/import`

export const downloadReportExport = (reportName: string): void => {
  const link = document.createElement('a')
  link.href = getReportExportUrl(reportName)
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  link.remove()
}
