/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import { FiltersRenderer, useFilterQuery } from '@Pimcore/components/filters'
import { useGridFilterContext } from '@Pimcore/modules/reports/reports-view/context/grid-filter-context'
import { useReportsDraftFilters } from '@Pimcore/modules/reports/reports-view/filters/reports-filter-store'
import { reportsFilterDescriptors } from '@Pimcore/modules/reports/reports-view/filters/descriptors'
import { reportsFilterAdapter, useReportsFilterContext } from '@Pimcore/modules/reports/reports-view/filters/reports-filter-adapter'
import { PAGE_INITIAL, useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import { useStyles } from '@Pimcore/modules/reports/reports-view/reports-view.styles'

export const ColumnsFilters = (): React.JSX.Element => {
  const { filters, setFilters } = useGridFilterContext()
  const draftStore = useReportsDraftFilters()
  const filterContext = useReportsFilterContext()
  const buildQuery = useFilterQuery(reportsFilterAdapter, draftStore.values)
  const { reportDetailData, setPage } = useReportDataContext()

  const { t } = useTranslation()
  const { styles } = useStyles()

  useEffect(() => {
    draftStore.reset()
  }, [reportDetailData, draftStore.reset])

  const handleApplyFilters = (): void => {
    setPage(PAGE_INITIAL)

    setFilters(buildQuery(filters))
  }

  const handleClearFilters = (): void => {
    draftStore.reset()

    setFilters({
      ...filters,
      columnFilters: []
    })
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <Button
            className={ styles.btnLink }
            data-testid="report-filters-clear-button"
            onClick={ handleClearFilters }
            type='link'
          >
            {t('sidebar.clear-all-filters')}
          </Button>

          <Button
            data-testid="report-filters-apply-button"
            onClick={ handleApplyFilters }
            type='primary'
          >
            {t('button.apply')}
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <FiltersRenderer
          context={ filterContext }
          descriptors={ reportsFilterDescriptors }
          store={ draftStore }
        />
      </Content>
    </ContentLayout>
  )
}
