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
import { useStyles } from '@Pimcore/modules/reports/reports-editor/reports-editor.styles'

interface IReportsSidebarProps {
  reportsList?: CustomReportsConfigGetTreeApiResponse
  handleOpenReport: (report: BundleCustomReportsConfigurationTreeNode) => void
}

export const ReportsSidebar = ({ reportsList, handleOpenReport }: IReportsSidebarProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Flex
      gap="mini"
      vertical
    >
      {reportsList?.items?.map((item) => (
        <Flex
          align="center"
          className={ styles.sidebarReportItem }
          gap="mini"
          key={ item.id }
          onClick={ () => { handleOpenReport(item) } }
        >
          <Icon
            className={ styles.sidebarReportItemIcon }
            value={ 'chart-scatter' }
          />
          <Text className={ styles.sidebarReportItemTitle }>{item.text}</Text>
        </Flex>
      ))}
    </Flex>
  )
}
