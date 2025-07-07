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
import { useTranslation } from 'react-i18next'
import { isEmpty, isUndefined } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import {
  type CustomReportChartData,
  useCustomReportsGetTreeQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Select } from '@Pimcore/components/select/select'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ReportDetail } from '@Pimcore/modules/reports/reports-view/components/report-detail/report-detail'
import { Text } from '@Pimcore/components/text/text'
import { TabsToolbarView } from '@Pimcore/modules/element/editor/layouts/tabs-toolbar-view'
import { useStyles } from './reports-view.styles'
import { Refetch } from '@Pimcore/modules/reports/components/refetch/refetch'
import { useReportData } from '@Pimcore/modules/reports/reports-view/hooks/useReportData'
import { Pagination } from '@Pimcore/modules/reports/components/pagination/pagination'

export const ReportsView = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const [currentReport, setCurrentReport] = useState<string | null>(null)
  const [reportsTreeOptions, setReportsTreeOptions] = useState<Array<{ label: string, value: string }> | undefined>(undefined)

  // TODO: need to update logic for using page/pageSize
  const { isLoading: isReportsTreeLoading, data: reportsTreeData } = useCustomReportsGetTreeQuery({ page: 1, pageSize: 10 })
  const { page, setPage, pageSize, setPageSize, refetchAll, isFetching, chartDetailData } = useReportData({
    name: currentReport ?? ''
  })

  const isCurrentReportSelected = !isEmptyValue(currentReport)
  const chartData =
      !isUndefined(chartDetailData) && 'data' in chartDetailData
        ? chartDetailData.data as CustomReportChartData[]
        : undefined

  useEffect(() => {
    if (!isEmpty(reportsTreeData)) {
      const options = reportsTreeData?.items?.map((item) => ({
        label: item.niceName,
        value: item.name
      }))

      setReportsTreeOptions(options)
    }
  }, [reportsTreeData])

  const renderContent = (): React.JSX.Element => (
    <ContentLayout
      renderToolbar={ !isEmpty(chartData) && !isFetching && (
        <Toolbar
          justify="flex-end"
          theme="secondary"
        >
          <Pagination
            page={ page }
            pageSize={ pageSize }
            setPage={ setPage }
            setPageSize={ setPageSize }
            totalItems={ chartData!.length }
          />
        </Toolbar>
      ) }
      renderTopBar={
        <Content
          padded
          padding={ { top: 'extra-small', right: 'extra-small', bottom: 'extra-small', left: 'extra-small' } }
        >
          <Toolbar
            padding={ { top: 'extra-small', bottom: 'extra-small', left: 'extra-small', right: 'extra-small' } }
            position='top'
            size='auto'
            theme='secondary'
          >
            <Flex
              align="center"
              gap="extra-small"
            >
              <Text className={ styles.selectReportLabel }>{t('reports.report-name')}</Text>
              <Select
                className='min-w-200'
                onChange={ (value: string) => { setCurrentReport(value) } }
                options={ reportsTreeOptions }
                placeholder={ t('reports.select-report') }
                value={ currentReport }
              />
            </Flex>
          </Toolbar>
        </Content>
          }
    >
      <Content
        centered={ !isCurrentReportSelected }
        padded
        padding={ { top: 'extra-small', right: 'extra-small', bottom: 'extra-small', left: 'extra-small' } }
      >
        {isCurrentReportSelected
          ? (
            <ReportDetail currentReport={ currentReport! } />
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
    </ContentLayout>
  )

  return (
    <Content loading={ isReportsTreeLoading && isEmpty(reportsTreeOptions) }>
      <TabsToolbarView
        renderTabbar={ renderContent() }
        renderToolbar={ (
          <Toolbar>
            <Refetch
              isFetching={ isFetching }
              refetch={ refetchAll }
            />
          </Toolbar>
        ) }
      />
    </Content>
  )
}
