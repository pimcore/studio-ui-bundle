/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { isNil, isNull, isUndefined } from 'lodash'
import { type AccessorFnColumnDef, createColumnHelper, type SortingState } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { ReportChart } from '@Pimcore/modules/reports/reports-view/components/report-chart/report-chart'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Grid } from '@Pimcore/components/grid/grid'
import { type IChartDetailData, type IReportDetailData } from '@Pimcore/modules/reports/reports-view/hooks/useReportData'
import { FilterDrillDown } from '@Pimcore/modules/reports/reports-view/types'
import { DrillDownSelect } from '@Pimcore/modules/reports/reports-view/components/report-detail/components/drill-down-select/drill-down-select'
import { useColumnsContext } from '@Pimcore/components/grid/contexts/columns-context'
import { useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import { useFullChartData } from '@Pimcore/modules/reports/reports-view/hooks/useFullChartData'
import { type BundleCustomReportsColumnConfiguration } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { getTypeByActionType, ReportActionType } from '@Pimcore/modules/reports/reports-view/helpers'
import { currentDomain } from '@Pimcore/app/config/app-config'
import { useStyles } from '@Pimcore/modules/reports/reports-view/reports-view.styles'

interface IReportDetailProps {
  currentReport: string | null
  isLoading: boolean
  reportDetailData: IReportDetailData
  chartDetailData: IChartDetailData
}

const columnHelper = createColumnHelper()

export const ReportDetail = ({ isLoading, currentReport, reportDetailData, chartDetailData }: IReportDetailProps): React.JSX.Element => {
  const [isShowLoading, setIsShowLoading] = useState(false)
  const prevReportRef = useRef<string | null>(null)

  const reportName = reportDetailData?.name ?? ''

  const { sorting, setSorting } = useReportDataContext()
  const { data: fullChartDataList } = useFullChartData({ name: reportName })

  useEffect(() => {
    if (currentReport !== prevReportRef.current) {
      prevReportRef.current = currentReport

      if (!isUndefined(currentReport) && !isNil(currentReport) && isLoading) {
        setIsShowLoading(true)
      }
    }
  }, [currentReport, isLoading])

  useEffect(() => {
    if (!isLoading) {
      setIsShowLoading(false)
    }
  }, [isLoading])

  const { columns, setColumns, setInitialColumns } = useColumnsContext()
  const { openElement } = useElementHelper()

  const { t } = useTranslation()
  const { styles } = useStyles()

  const sortingValue = useMemo(() => {
    return !isUndefined(sorting) ? [{ id: sorting.sortBy, desc: sorting.sortOrder === 'DESC' }] : []
  }, [sorting])

  const handleSortingChange = (updatedSorting: SortingState): void => {
    if (updatedSorting.length > 0) {
      const { id, desc } = updatedSorting[0]

      setSorting({
        sortBy: id,
        sortOrder: desc ? 'DESC' : 'ASC'
      })
    } else {
      setSorting(undefined)
    }
  }

  const handleElementOpen = ({ id, actionType }: { id: number, actionType?: ReportActionType }): void => {
    if (actionType === ReportActionType.OPEN_URL) {
      window.open(`${currentDomain}/pimcore-studio/${id}`, '_blank')
    } else {
      const type = getTypeByActionType(actionType)

      void openElement({ id: Number(id), type })
    }
  }

  const renderColumnActionCell = ({ id, actionType }: { id: string, actionType: ReportActionType | undefined }): React.JSX.Element => (
    <Flex
      align='center'
      justify='flex-start'
    >
      <IconButton
        icon={ { value: 'open-folder' } }
        onClick={ () => { handleElementOpen({ id: Number(id), actionType }) } }
        type="link"
      />
    </Flex>
  )

  const getColumns = (): Array<AccessorFnColumnDef<unknown, never>> | undefined => {
    const list: Array<AccessorFnColumnDef<unknown, never>> = []

    reportDetailData?.columnConfigurations?.forEach((item, index) => {
      const isShowColumn = item.display && item.filterDrilldown !== FilterDrillDown.ONLY_FILTER

      if (isShowColumn) {
        const columnId = !isEmptyValue(item?.name) ? item.name : `id-${index}`
        const columnType = !isEmptyValue(item.displayType) ? item.displayType! : 'text'

        if (item.displayType !== 'hide') {
          list.push(
            columnHelper.accessor(
              row => row?.[columnId],
              {
                id: columnId,
                header: !isEmptyValue(item.label) ? item.label : item.name,
                enableSorting: item.order,
                ...(!isNull(item.width) && { size: item.width }),
                meta: {
                  type: columnType,
                  ...(columnType === 'date' && { config: { showTime: true } }),
                  ...(columnType === 'text' && { config: { renderAsHtml: true } }),
                  ...(isNull(item.width) && { autoWidth: true })
                }
              }
            )
          )
        }

        if (!isEmptyValue(item.action)) {
          list.push(
            columnHelper.accessor(
              row => row?.[columnId],
              {
                id: `${columnId}-action`,
                header: t('actions.open'),
                enableSorting: false,
                size: 40,
                cell: (info) => {
                  const rowData = info.row.original as object
                  const id = rowData[columnId]

                  return renderColumnActionCell({ id, actionType: item.action as ReportActionType | undefined })
                }
              }
            )
          )
        }
      }

      return undefined
    })

    return list.filter(item => !isUndefined(item))
  }

  useEffect(() => {
    setColumns(getColumns() ?? [])
    setInitialColumns(getColumns() ?? [])
  }, [reportDetailData, setColumns])

  const getDrillDownSelectList = (): BundleCustomReportsColumnConfiguration[] | undefined => (
    reportDetailData?.columnConfigurations
      ?.filter((item) => !isEmptyValue(item.filterDrilldown))
      .map(item => item)
  )

  const drillDownFields = useMemo(() => getDrillDownSelectList(), [reportDetailData])

  const isShowChart = !isEmptyValue(reportDetailData?.chartType)
  const chartData = chartDetailData?.items?.map((item) => item.data)
  const fullChartData = fullChartDataList?.items?.map((item) => item.data)

  if (isLoading && isShowLoading) {
    return <Content loading />
  }

  return (
    <Flex
      className="h-full"
      data-testid="report-detail-container"
      gap="small"
      vertical
    >
      {!isUndefined(drillDownFields) && (
        <Flex
          data-testid="report-detail-drilldown-area"
          gap="small"
          wrap
        >
          {drillDownFields?.map(item => (
            <DrillDownSelect
              field={ item }
              key={ item.name }
              reportName={ reportName }
            />
          ))}
        </Flex>
      )}
      <Flex
        className="h-full"
        data-testid="report-detail-content"
        gap="small"
        justify="flex-start"
        vertical
      >
        {isShowChart && (
          <ReportChart
            chartData={ fullChartData }
            reportData={ reportDetailData }
          />
        )}
        {!isUndefined(chartData) && (
          <Grid
            allowMultipleAutoWidthColumns
            autoWidth
            className={ styles.gridTable }
            columns={ columns }
            data={ chartData }
            dataTestId="report-detail-grid"
            enableColumnVirtualizer
            enableSorting
            isLoading={ isLoading }
            manualSorting
            onSortingChange={ handleSortingChange }
            sorting={ sortingValue }
          />
        )}
      </Flex>
    </Flex>
  )
}
