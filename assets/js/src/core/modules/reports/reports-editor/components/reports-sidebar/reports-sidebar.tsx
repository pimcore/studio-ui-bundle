/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { isNil, isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Icon } from '@Pimcore/components/icon/icon'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Toolbar } from '@Pimcore/modules/reports/reports-editor/components/reports-sidebar/components/toolbar/toolbar'
import {
  type BundleCustomReportsConfigurationTreeNode,
  type CustomReportsConfigGetTreeApiResponse
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { useReportActions } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-actions'
import { useStyles } from '@Pimcore/modules/reports/reports-editor/reports-editor.styles'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { loadReportsMenuItems } from '@Pimcore/modules/reports/utils/reports-loader'
import { isFolder } from '@Pimcore/modules/reports/reports-editor/components/helpers'
import { TreeElement, type TreeDataItem } from '@Pimcore/components/tree-element/tree-element'

interface IReportsSidebarProps {
  isLoading: boolean
  isFetching: boolean
  refetch: () => Promise<{ data?: CustomReportsConfigGetTreeApiResponse }>
  reportsList?: CustomReportsConfigGetTreeApiResponse
  handleOpenReport: (report: BundleCustomReportsConfigurationTreeNode) => void
  handleCloseReport: (id: BundleCustomReportsConfigurationTreeNode['id']) => void
}

export const ReportsSidebar = ({ isLoading, refetch, isFetching, reportsList, handleOpenReport, handleCloseReport }: IReportsSidebarProps): React.JSX.Element => {
  const [reportsListData, setReportsListData] = useState<CustomReportsConfigGetTreeApiResponse['items']>([])

  const flattenItems = (items: CustomReportsConfigGetTreeApiResponse['items']): BundleCustomReportsConfigurationTreeNode[] =>
    items.flatMap(item => isFolder(item) ? item.children : [item])

  const findReportById = (items: CustomReportsConfigGetTreeApiResponse['items'] | undefined, id: string): BundleCustomReportsConfigurationTreeNode | undefined =>
    flattenItems(items ?? []).find(report => report.id === id)

  useEffect(() => {
    if (!isNil(reportsList?.items)) {
      setReportsListData(reportsList.items)
    }
  }, [reportsList])

  const { styles } = useStyles()
  const { t } = useTranslation()

  const modal = useFormModal()
  const { addReport, cloneReport, deleteReport } = useReportActions()

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

        const addedReport = findReportById(updatedData?.items, value)

        !isUndefined(addedReport) && handleOpenReport(addedReport)
      }
    })
  }

  const handleReportClone = (report: BundleCustomReportsConfigurationTreeNode): void => {
    modal.input({
      label: t('reports.editor.clone.content'),
      rule: {
        pattern: /^[a-zA-Z0-9_-]+$/,
        message: t('reports.editor.content.validation.message')
      },
      onOk: async (value: string) => {
        await cloneReport({ name: report.id, bundleCustomReportClone: { newName: value } })

        const { data: updatedData } = await refetch()
        void loadReportsMenuItems()

        const clonedReport = findReportById(updatedData?.items, value)

        !isUndefined(clonedReport) && handleOpenReport(clonedReport)
      }
    })
  }

  const handleReportDelete = (report: BundleCustomReportsConfigurationTreeNode): void => {
    modal.confirm({
      title: t('delete'),
      content: t('reports.editor.delete.content', { reportName: report.text }),
      onOk: async () => {
        void deleteReport({ name: report.id }).then(() => {
          handleCloseReport(report.id)
          void loadReportsMenuItems()
        })
      }
    })
  }

  const handleSearch = (value: string): void => {
    if (isEmptyValue(value)) {
      setReportsListData(reportsList?.items ?? [])
      return
    }

    const lowerValue = value.toLowerCase()

    const filteredItems = (reportsList?.items ?? []).reduce<CustomReportsConfigGetTreeApiResponse['items']>((acc, item) => {
      if (isFolder(item)) {
        const matchingChildren = item.children.filter(child =>
          child.text.toLowerCase().includes(lowerValue)
        )

        if (matchingChildren.length > 0) {
          acc.push({ ...item, children: matchingChildren })
        }
      } else if (item.text.toLowerCase().includes(lowerValue)) {
        acc.push(item)
      }

      return acc
    }, [])

    setReportsListData(filteredItems)
  }

  const reportActions = [
    { key: 'clone', icon: 'copy-03', translationKey: 'clone' },
    { key: 'delete', icon: 'trash', translationKey: 'delete' }
  ]

  const buildTreeData = (): TreeDataItem[] =>
    reportsListData.map(item => {
      if (isFolder(item)) {
        return {
          key: item.group,
          title: item.group,
          icon: <Icon value="folder" />,
          selectable: false,
          children: item.children.map(child => ({
            key: child.id,
            title: child.text,
            icon: <Icon value="chart-scatter" />,
            isLeaf: true,
            actions: reportActions,
            meta: { report: child }
          }))
        } satisfies TreeDataItem
      }

      return {
        key: item.id,
        title: item.text,
        icon: <Icon value="chart-scatter" />,
        isLeaf: true,
        actions: reportActions,
        meta: { report: item }
      } satisfies TreeDataItem
    })

  const handleActionsClick = (key: string, action: string, node: TreeDataItem): void => {
    const report = node.meta?.report as BundleCustomReportsConfigurationTreeNode | undefined

    if (isNil(report)) return

    if (action === 'clone') {
      handleReportClone(report)
    }

    if (action === 'delete') {
      handleReportDelete(report)
    }
  }

  return (
    <ContentLayout renderToolbar={ (
      <Toolbar
        handleReportAdd={ handleReportAdd }
        isFetching={ isFetching }
        refetch={ refetch }
      />
    ) }
    >
      <Content
        loading={ isLoading }
        padded
      >
        <SearchInput
          onChange={ (e) => { handleSearch(e.target.value) } }
          placeholder={ t('search') }
          withoutAddon
        />

        <Content loading={ isFetching }>
          <TreeElement
            className={ styles.tree }
            hasRoot
            onActionsClick={ handleActionsClick }
            onSelected={ (_key, node) => {
              const report = node.meta?.report as BundleCustomReportsConfigurationTreeNode | undefined

              if (!isNil(report)) {
                handleOpenReport(report)
              }
            } }
            treeData={ buildTreeData() }
            withCustomSwitcherIcon
          />
        </Content>
      </Content>
    </ContentLayout>
  )
}
