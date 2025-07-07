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
import { isUndefined } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { ReportChart } from '@Pimcore/modules/reports/components/report-chart/report-chart'
import { type CustomReportChartData } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Grid } from '@Pimcore/components/grid/grid'
import { useReportData } from '@Pimcore/modules/reports/reports-view/hooks/useReportData'
import { type AccessorKeyColumnDef, createColumnHelper } from '@tanstack/react-table'

interface IReportDetailProps {
  currentReport: string
  page: number
  pageSize: number
}

export const ReportDetail = ({ currentReport, page, pageSize }: IReportDetailProps): React.JSX.Element => {
  const { isLoading, isFetching, reportDetailData, chartDetailData } = useReportData({ name: currentReport, page, pageSize })

  const columnHelper = createColumnHelper()

  if (isLoading || isFetching) {
    return <Content loading />
  }

  const isShowChart = !isEmptyValue(reportDetailData?.chartType)
  const chartData =
      !isUndefined(chartDetailData) && 'data' in chartDetailData
        ? chartDetailData.data as CustomReportChartData[]
        : undefined

  const columns: Array<AccessorKeyColumnDef<unknown, never>> = []

  reportDetailData?.columnConfigurations?.forEach((item, index) => {
    columns.push(
      columnHelper.accessor(item?.name ?? `id-${index}`, {
        header: item?.label ?? ''
      })
    )
  })

  return (
    <Flex
      gap="large"
      vertical
    >
      {isShowChart && !isUndefined(chartData) && (
        <>
          <ReportChart
            chartData={ chartData }
            reportData={ reportDetailData }
          />
          <Grid
            autoWidth
            columns={ columns }
            data={ chartData }
          />
        </>
      )}
    </Flex>
  )
}
