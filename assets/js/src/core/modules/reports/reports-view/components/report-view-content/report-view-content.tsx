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
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Refetch } from '@Pimcore/modules/reports/components/refetch/refetch'
import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { ReportSidebar } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/report-sidebar'
import { ReportToolbar } from '@Pimcore/modules/reports/reports-view/components/report-toolbar/report-toolbar'
import { ReportTopBar } from '@Pimcore/modules/reports/reports-view/components/report-top-bar/report-top-bar'
import { Content } from '@Pimcore/components/content/content'
import { ReportDetail } from '@Pimcore/modules/reports/reports-view/components/report-detail/report-detail'
import { Flex } from '@Pimcore/components/flex/flex'
import { Text } from '@Pimcore/components/text/text'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import type { DefaultOptionType } from 'antd/es/select'

interface IReportViewContentProps {
  currentReport: string | null
  setCurrentReport: (report: string) => void
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  reportsTreeOptions: DefaultOptionType[] | undefined
}

export const ReportViewContent = ({ currentReport, setCurrentReport, reportsTreeOptions, page, setPage, pageSize, setPageSize }: IReportViewContentProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { isLoading, isFetching, reportDetailData, chartDetailData, refetchAll } = useReportDataContext()

  const isCurrentReportSelected = !isEmptyValue(currentReport)
  const isLoadingReportsData = isLoading || isFetching

  const renderMainContent = (): React.JSX.Element => (
    <Content
      centered={ !isCurrentReportSelected }
      padded
      padding={ { top: 'none', right: 'extra-small', bottom: 'extra-small', left: 'extra-small' } }
    >
      {isCurrentReportSelected
        ? (
          <ReportDetail
            chartDetailData={ chartDetailData }
            currentReport={ currentReport }
            isLoading={ isLoadingReportsData }
            reportDetailData={ reportDetailData }
          />
          )
        : (
          <Flex
            align="center"
            justify="center"
          >
            <Text>{t('reports.select-report-name')}</Text>
          </Flex>
          )
    }
    </Content>
  )

  const renderContent = (): React.JSX.Element => (
    <ContentLayout
      renderSidebar={ !isEmpty(reportDetailData) && (
        <ReportSidebar />
      ) }
      renderToolbar={ !isEmpty(chartDetailData?.items) && !isFetching && (
        <ReportToolbar
          currentReport={ currentReport }
          page={ page }
          pageSize={ pageSize }
          setPage={ setPage }
          setPageSize={ setPageSize }
          totalItems={ chartDetailData?.totalItems ?? 0 }
        />
      ) }
      renderTopBar={ (
        <ReportTopBar
          currentReport={ currentReport }
          reportsTreeOptions={ reportsTreeOptions }
          setCurrentReport={ setCurrentReport }
        />
      ) }
    >
      {renderMainContent()}
    </ContentLayout>
  )

  return (
    <TabsToolbarView
      renderTabbar={ renderContent() }
      renderToolbar={ (
        <Toolbar>
          <Refetch
            isFetching={ isLoadingReportsData }
            refetch={ refetchAll }
          />
        </Toolbar>
      ) }
    />
  )
}
