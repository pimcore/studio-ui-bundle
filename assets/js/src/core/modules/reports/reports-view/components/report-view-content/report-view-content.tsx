/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty, isNull, isUndefined } from 'lodash'
import type { DefaultOptionType } from 'antd/es/select'
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
import type { ISourceDefinition } from '@Pimcore/modules/reports/reports-editor/types'
import { container } from '@Pimcore/app/depency-injection'
import type {
  DynamicTypeCustomReportDefinitionRegistry
} from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'

interface IReportViewContentProps {
  currentReport: string | null
  setCurrentReport: (report: string) => void
  reportsTreeOptions: DefaultOptionType[] | undefined
}

export const ReportViewContent = ({ currentReport, setCurrentReport, reportsTreeOptions }: IReportViewContentProps): React.JSX.Element => {
  const { t } = useTranslation()

  const { isLoading, isFetching, reportDetailData, chartDetailData, refetchAll, page, setPage, pageSize, setPageSize } = useReportDataContext()

  const isCurrentReportSelected = !isEmptyValue(currentReport)
  const isLoadingReportsData = isLoading || isFetching

  const currentSourceDefinition = (reportDetailData?.dataSourceConfig as ISourceDefinition)?.type

  const isEmptySourceDefinitionConfig = isUndefined(currentSourceDefinition)

  const sourceDefinitionService = container.get<DynamicTypeCustomReportDefinitionRegistry>(serviceIds['DynamicTypes/CustomReportDefinitionRegistry'])
  const currentAdapter = !isEmptySourceDefinitionConfig ? sourceDefinitionService.getDynamicType(currentSourceDefinition) : undefined

  const showPagination = useMemo(() => {
    if (isNull(currentReport)) {
      return false
    }

    return currentAdapter?.getPagination() ?? false
  }, [currentReport, currentAdapter])

  const renderMainContent = (): React.JSX.Element => (
    <Content
      centered={ !isCurrentReportSelected }
      className="h-full"
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
          showPagination={ showPagination }
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
