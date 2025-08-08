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
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { Text } from '@Pimcore/components/text/text'
import {
  type BundleCustomReportsConfigurationTreeNode,
  type CustomReportsConfigGetTreeApiResponse
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

interface IReportsSidebarProps {
  reportsList?: CustomReportsConfigGetTreeApiResponse
  handleOpenReport: (report: BundleCustomReportsConfigurationTreeNode) => void
}

export const ReportsSidebar = ({ reportsList, handleOpenReport }: IReportsSidebarProps): React.JSX.Element => {
  return (
    <Flex
      gap="mini"
      vertical
    >
      {reportsList?.items?.map((item) => (
        <Flex
          align="center"
          gap="mini"
          key={ item.id }
          onClick={ () => { handleOpenReport(item) } }
        >
          <Icon value={ 'chart-scatter' } />
          <Text>{item.text}</Text>
        </Flex>
      ))}
    </Flex>
  )
}
