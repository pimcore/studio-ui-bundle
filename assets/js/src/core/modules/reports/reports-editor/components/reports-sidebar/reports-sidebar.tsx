/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { isNil } from 'lodash'
import { useTranslation } from 'react-i18next'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { Text } from '@Pimcore/components/text/text'
import { Dropdown, type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { Toolbar } from '@Pimcore/modules/reports/reports-editor/components/reports-sidebar/components/toolbar/toolbar'
import {
  type BundleCustomReportsConfigurationTreeNode,
  type CustomReportsConfigGetTreeApiResponse
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { useStyles } from '@Pimcore/modules/reports/reports-editor/reports-editor.styles'

interface IReportsSidebarProps {
  isLoading: boolean
  refetch: () => void
  reportsList?: CustomReportsConfigGetTreeApiResponse
  handleOpenReport: (report: BundleCustomReportsConfigurationTreeNode) => void
}

export const ReportsSidebar = ({ isLoading, refetch, reportsList, handleOpenReport }: IReportsSidebarProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()

  const [contextItem, setContextItem] = useState<any | null>(null)

  const reportsListData = reportsList?.items ?? []

  const handleReportAdd = (): void => {
    console.log('----- Add new report')
  }

  const handleReportClone = (): void => {
    console.log('----- Clone report: ', contextItem)
  }

  const handleReportDelete = (): void => {
    console.log('----- Delete report: ', contextItem)
  }

  const dropdownItems: DropdownProps['menu']['items'] = [
    {
      icon: <Icon value="copy-03" />,
      key: 'copy',
      label: t('clone'),
      onClick: handleReportClone
    },
    {
      icon: <Icon value="trash" />,
      key: 'delete',
      label: t('delete'),
      onClick: handleReportDelete
    }]

  return (
    <ContentLayout renderToolbar={ (
      <Toolbar
        handleReportAdd={ handleReportAdd }
        isFetching={ isLoading }
        refetch={ refetch }
      />
    ) }
    >
      <Content
        loading={ isLoading }
        padded
      >
        {/* ToDo: Need to implement search functionality here */}

        <Flex
          gap="mini"
          vertical
        >
          {reportsListData.map((item) => (
            <Dropdown
              disabled={ isNil(reportsListData) }
              key={ item.id }
              menu={ { items: dropdownItems } }
              onOpenChange={ (open) => {
                if (open) setContextItem(item)
              } }
              trigger={ ['contextMenu'] }
            >
              <Flex
                align="center"
                className={ styles.sidebarReportItem }
                gap="mini"
                onClick={ () => { handleOpenReport(item) } }
              >
                <Icon
                  className={ styles.sidebarReportItemIcon }
                  value={ 'chart-scatter' }
                />
                <Text className={ styles.sidebarReportItemTitle }>{item.text}</Text>
              </Flex>
            </Dropdown>
          ))}
        </Flex>
      </Content>
    </ContentLayout>
  )
}
