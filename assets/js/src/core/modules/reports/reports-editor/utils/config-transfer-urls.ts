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

export const getReportImportUrl = (): string =>
  `${getPrefix()}/bundle/custom-reports/config/import`

export const getReportExportFileName = (reportName: string): string =>
  `custom_report_${reportName}_export.json`
