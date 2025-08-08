/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type BundleCustomReportsConfigurationTreeNode } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'

interface IReportConfigurationProps {
  report: BundleCustomReportsConfigurationTreeNode
}

export const ReportConfiguration = ({ report }: IReportConfigurationProps): React.JSX.Element => {
  return <div>{report.text}</div>
}
