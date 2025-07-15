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
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Grid } from '@Pimcore/components/grid/grid'
import { type IChartDetailData, type IReportDetailData } from '@Pimcore/modules/reports/reports-view/hooks/useReportData'

interface IReportDetailProps {
  isLoading: boolean
  reportDetailData: IReportDetailData
  chartDetailData: IChartDetailData
}

export const ReportDetail = ({ isLoading, reportDetailData, chartDetailData }: IReportDetailProps): React.JSX.Element => {
  if (isLoading) {
    return <Content loading />
  }

  const getColumns = (): Array<AccessorKeyColumnDef<unknown, never>> | undefined => (
    reportDetailData?.columnConfigurations?.map((item, index) => {
      if (item.display === true) {
        return columnHelper.accessor(item?.name ?? `id-${index}`, {
          header: !isEmptyValue(item.label) ? item.label : item.name
        })
      }

      return undefined
    }).filter((item => !isUndefined(item)))
  )

  const columnHelper = createColumnHelper()
  const columns = getColumns() ?? []

  const isShowChart = !isEmptyValue(reportDetailData?.chartType)
  const chartData = chartDetailData?.items?.map((item) => item.data)

  return (
    <Flex
      gap="large"
      vertical
    >
      {!isUndefined(chartData) && (
        <>
          {isShowChart && (
            <ReportChart
              chartData={ chartData }
              reportData={ reportDetailData }
            />
          )}
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
