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
import { Content } from '@Pimcore/components/content/content'
import { FormKit } from '@Pimcore/components/form/form-kit'

interface IReportConfigurationProps {
  report: BundleCustomReportsConfigurationTreeNode
}

export const ReportConfiguration = ({ report }: IReportConfigurationProps): React.JSX.Element => {
  return (
    <Content
      padded
      padding={ { x: 'small', y: 'small' } }
    >
      <FormKit>
        {report.text}
      </FormKit>
    </Content>
  )
}
