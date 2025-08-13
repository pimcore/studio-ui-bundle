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
import { isNil, isUndefined } from 'lodash'
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
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useReportActions } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-actions'
import { useStyles } from '@Pimcore/modules/reports/reports-editor/reports-editor.styles'

interface IReportsSidebarProps {
  isLoading: boolean
  refetch: () => Promise<any>
  reportsList?: CustomReportsConfigGetTreeApiResponse
  handleOpenReport: (report: BundleCustomReportsConfigurationTreeNode) => void
}

export const ReportsSidebar = ({ isLoading, refetch, reportsList, handleOpenReport }: IReportsSidebarProps): React.JSX.Element => {
  const [contextItem, setContextItem] = useState<BundleCustomReportsConfigurationTreeNode | null>(null)

  const { styles } = useStyles()
  const { t } = useTranslation()

  const modal = useFormModal()
  const { addReport, cloneReport, deleteReport } = useReportActions()

  const reportsListData = reportsList?.items ?? []

  const handleReportAdd = (): void => {
    modal.input({
      label: t('reports.editor.add.content'),
      rule: {
        pattern: /^[a-zA-Z0-9_-]+$/,
        message: t('reports.editor.content.validation.message')
      },
      onOk: async (value: string) => {
        await addReport({ bundleCustomReportAdd: { name: value } })

        const { data: updatedData } = await refetch()

        const addedReport: BundleCustomReportsConfigurationTreeNode | undefined = updatedData?.items?.find((item) => item.id === value)

        !isUndefined(addedReport) && handleOpenReport(addedReport)
      }
    })
  }

  const handleReportClone = (): void => {
    modal.input({
      label: t('reports.editor.clone.content'),
      rule: {
        pattern: /^[a-zA-Z0-9_-]+$/,
        message: t('reports.editor.content.validation.message')
      },
      onOk: async (value: string) => {
        await cloneReport({ name: contextItem!.id, bundleCustomReportClone: { newName: value } })

        const { data: updatedData } = await refetch()

        const clonedReport: BundleCustomReportsConfigurationTreeNode | undefined = updatedData?.items?.find((item) => item.id === value)

        !isUndefined(clonedReport) && handleOpenReport(clonedReport)
      }
    })
  }

  const handleReportDelete = (): void => {
    modal.confirm({
      title: t('delete'),
      content: t('reports.editor.delete.content', { reportName: contextItem?.text }),
      onOk: async () => {
        void deleteReport({ name: contextItem!.id })
      }
    })
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
        {/* Need to implement search functionality here */}

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
