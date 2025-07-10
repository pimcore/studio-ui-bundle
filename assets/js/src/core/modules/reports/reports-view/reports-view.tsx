/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useCustomReportsGetTreeQuery } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ReportDetail } from '@Pimcore/modules/reports/reports-view/components/report-detail/report-detail'
import { Text } from '@Pimcore/components/text/text'
import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'
import { Refetch } from '@Pimcore/modules/reports/components/refetch/refetch'
import { useReportData } from '@Pimcore/modules/reports/reports-view/hooks/useReportData'
import { ReportToolbar } from '@Pimcore/modules/reports/reports-view/components/report-toolbar/report-toolbar'
import { ReportTopBar } from '@Pimcore/modules/reports/reports-view/components/report-top-bar/report-top-bar'

export const ReportsView = (): React.JSX.Element => {
  const { t } = useTranslation()

  const [currentReport, setCurrentReport] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)

  const { isLoading: isReportsTreeLoading, data: reportsTreeData } = useCustomReportsGetTreeQuery({ page: 1, pageSize: 9999 })
  const { refetchAll, isFetching, isLoading, chartDetailData, reportDetailData } = useReportData({
    name: currentReport ?? '',
    page,
    pageSize
  })

  useEffect(() => {
    setPage(1)
    setPageSize(10)
  }, [currentReport])

  const isCurrentReportSelected = !isEmptyValue(currentReport)

  const reportsTreeOptions = useMemo(() => {
    if (!isEmpty(reportsTreeData)) {
      return reportsTreeData?.items?.map((item) => ({
        label: item.niceName,
        value: item.name
      }))
    }

    return []
  }, [reportsTreeData])
  const isLoadingReportsTree = isReportsTreeLoading && isEmpty(reportsTreeOptions)

  const renderMainContent = (): React.JSX.Element => (
    <Content
      centered={ !isCurrentReportSelected }
      padded
      padding={ { top: 'extra-small', right: 'extra-small', bottom: 'extra-small', left: 'extra-small' } }
    >
      {isCurrentReportSelected
        ? (
          <ReportDetail
            chartDetailData={ chartDetailData }
            isLoading={ isLoading || isFetching }
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
      renderToolbar={ !isEmpty(chartDetailData?.items) && !isFetching && (
        <ReportToolbar
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
    <Content loading={ isLoadingReportsTree }>
      <TabsToolbarView
        renderTabbar={ renderContent() }
        renderToolbar={ (
          <Toolbar>
            <Refetch
              isFetching={ isFetching || isLoading }
              refetch={ refetchAll }
            />
          </Toolbar>
        ) }
      />
    </Content>
  )
}
