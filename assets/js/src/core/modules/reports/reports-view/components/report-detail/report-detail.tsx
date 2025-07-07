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
import { type AccessorKeyColumnDef, createColumnHelper } from '@tanstack/react-table'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { ReportChart } from '@Pimcore/modules/reports/reports-view/components/report-chart/report-chart'
import { type CustomReportChartData } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Grid } from '@Pimcore/components/grid/grid'
import { useReportData } from '@Pimcore/modules/reports/reports-view/hooks/useReportData'

interface IReportDetailProps {
  currentReport: string
}

export const ReportDetail = ({ currentReport }: IReportDetailProps): React.JSX.Element => {
  const { isLoading, isFetching, reportDetailData, chartDetailData } = useReportData({ name: currentReport })

  if (isLoading || isFetching) {
    return <Content loading />
  }

  const getColumns = (): Array<AccessorKeyColumnDef<unknown, never>> | undefined => (
    reportDetailData?.columnConfigurations?.map((item, index) => (
      columnHelper.accessor(item?.name ?? `id-${index}`, {
        header: item?.label ?? ''
      })
    )
    ))

  const columnHelper = createColumnHelper()
  const columns = getColumns() ?? []

  const isShowChart = !isEmptyValue(reportDetailData?.chartType)
  const chartData =
      !isUndefined(chartDetailData) && 'data' in chartDetailData
        ? chartDetailData.data as CustomReportChartData[]
        : undefined

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
