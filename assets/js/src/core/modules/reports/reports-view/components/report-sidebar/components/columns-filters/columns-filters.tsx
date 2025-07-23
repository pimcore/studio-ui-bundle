/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import type { BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { FieldFilters } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/components/field-filters/field-filters'
import { useGridFilterContext } from '@Pimcore/modules/reports/reports-view/context/grid-filter-context'
import { type IGridFilter } from '@Pimcore/modules/reports/reports-view/types'

export const ColumnsFilters = ({ reportData }: { reportData: BundleCustomReportsDetails }): React.JSX.Element => {
  const { t } = useTranslation()

  const { filters, setFilters } = useGridFilterContext()

  const [columnFilters, setColumnFilters] = useState<IGridFilter['columnFilters']>([])

  const handleApplyFilters = (): void => {
    setFilters({
      ...filters,
      columnFilters
    })
  }

  const handleClearFilters = (): void => {
    setColumnFilters([])
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
            onClick={ handleClearFilters }
            type='link'
          >
            {t('sidebar.clear-all-filters')}
          </Button>

          <Button
            onClick={ handleApplyFilters }
            type='primary'
          >
            {t('button.apply')}
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <FieldFilters
          columnFilters={ columnFilters }
          reportData={ reportData }
          setColumnFilters={ setColumnFilters }
        />
      </Content>
    </ContentLayout>
  )
}
