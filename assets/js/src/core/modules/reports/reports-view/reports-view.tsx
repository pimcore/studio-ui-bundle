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
import { isEmpty, isNull, isUndefined } from 'lodash'
import cn from 'classnames'
import { type DefaultOptionType } from 'antd/es/select'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { useCustomReportsGetTreeQuery } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { Icon } from '@Pimcore/components/icon/icon'
import { useGridFilterContext } from '@Pimcore/modules/reports/reports-view/context/grid-filter-context'
import { ReportDataProvider } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import { ReportViewContent } from '@Pimcore/modules/reports/reports-view/components/report-view-content/report-view-content'
import { useStyles } from './reports-view.styles'

const PAGE_INITIAL = 1
const PAGE_SIZE_INITIAL = 10

export const ReportsView = (): React.JSX.Element => {
  const [currentReport, setCurrentReport] = useState<string | null>(null)

  const [page, setPage] = useState(PAGE_INITIAL)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_INITIAL)

  const { resetFilters } = useGridFilterContext()

  const { isLoading: isReportsTreeLoading, data: reportsTreeData } = useCustomReportsGetTreeQuery({ page: 1, pageSize: 9999 })

  const { styles } = useStyles()

  useEffect(() => {
    if (!isNull(currentReport)) {
      setPage(PAGE_INITIAL)
      setPageSize(PAGE_SIZE_INITIAL)
      resetFilters()

      setCurrentReport(currentReport)
    }
  }, [currentReport])

  const renderOptionLabel = (iconClass: string, value: any): React.JSX.Element => (
    <Flex
      align="center"
      gap="mini"
    >
      {!isEmptyValue(iconClass) && <Icon value={ iconClass } />}
      {value}
    </Flex>
  )

  const reportsTreeOptions: DefaultOptionType[] | undefined = useMemo(() => {
    if (!isUndefined(reportsTreeData?.items)) {
      const groupedOptions: Record<string, DefaultOptionType> = {}
      const ungroupedOptions: DefaultOptionType[] = []

      reportsTreeData.items?.forEach(item => {
        if (isEmptyValue(item.group)) {
          ungroupedOptions.push({
            label: renderOptionLabel(item.iconClass, item.niceName),
            value: item.name
          })

          return
        }

        if (isUndefined(groupedOptions[item.group])) {
          groupedOptions[item.group] = {
            label: renderOptionLabel(item.groupIconClass, item.group),
            title: item.group,
            options: []
          }
        }

        groupedOptions[item.group].options.push({
          label: renderOptionLabel(item.iconClass, item.niceName),
          value: item.name
        })
      })

      const hasUngroupedOptions = ungroupedOptions.length > 0

      Object.keys(groupedOptions).forEach((groupKey, index) => {
        const title = groupedOptions[groupKey].label
        const withDivider = hasUngroupedOptions || index > 0

        groupedOptions[groupKey].label = (
          <div className={ cn(styles.selectReportGroupLabel, { [styles.withDivider]: withDivider }) }>
            {title}
          </div>
        )
      })

      return [...ungroupedOptions, ...Object.values(groupedOptions)]
    }

    return []
  }, [reportsTreeData])

  const isLoadingReportsTree = isReportsTreeLoading && isEmpty(reportsTreeOptions)

  return (
    <Content loading={ isLoadingReportsTree }>
      <ReportDataProvider
        name={ currentReport ?? '' }
        page={ page }
        pageSize={ pageSize }
      >
        <ReportViewContent
          currentReport={ currentReport }
          page={ page }
          pageSize={ pageSize }
          reportsTreeOptions={ reportsTreeOptions }
          setCurrentReport={ setCurrentReport }
          setPage={ setPage }
          setPageSize={ setPageSize }
        />
      </ReportDataProvider>
    </Content>
  )
}
