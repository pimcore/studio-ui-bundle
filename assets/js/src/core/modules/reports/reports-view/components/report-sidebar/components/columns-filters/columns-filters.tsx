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
import { useTranslation } from 'react-i18next'
import { Empty } from 'antd'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import { Flex } from '@Pimcore/components/flex/flex'
import { Title } from '@Pimcore/components/title/title'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { ColumnPickerPopover } from '@Pimcore/components/column-picker/column-picker-popover'
import { FieldFilters } from '@Pimcore/components/field-filters/field-filters'
import { useFilterQuery } from '@Pimcore/components/filters'
import { type BundleCustomReportsColumnConfiguration } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { useGridFilterContext } from '@Pimcore/modules/reports/reports-view/context/grid-filter-context'
import {
  reportsFilterAdapter,
  useReportsDraftFilters
} from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/filters/reports-filters'
import { PAGE_INITIAL, useReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'
import { useFieldFilterEditor } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/columns-filters/use-field-filter-editor'

export const ColumnsFilters = (): React.JSX.Element => {
  const { filters, setFilters } = useGridFilterContext()
  const draftStore = useReportsDraftFilters()
  const buildQuery = useFilterQuery(reportsFilterAdapter, draftStore.values)
  const { setPage } = useReportDataContext()
  const { fieldFilters, onFilterChange, columnGroups, handleColumnClick } = useFieldFilterEditor()

  const { t } = useTranslation()

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
          <ColumnPickerPopover<BundleCustomReportsColumnConfiguration>
            data-testid="report-filters-add"
            flat
            groups={ columnGroups }
            onSelect={ (item) => { handleColumnClick(item.meta!) } }
            placement="leftBottom"
          >
            <IconTextButton
              data-testid="report-filters-add-column-button"
              icon={ { value: 'new' } }
              type='default'
            >
              { t('reports.grid-config.add-column') }
            </IconTextButton>
          </ColumnPickerPopover>

          <Flex gap='extra-small'>
            <IconTextButton
              data-testid="report-filters-clear-button"
              icon={ { value: 'close' } }
              onClick={ handleClearFilters }
              type='link'
            >
              {t('sidebar.clear-all-filters')}
            </IconTextButton>

            <Button
              data-testid="report-filters-apply-button"
              onClick={ handleApplyFilters }
              type='primary'
            >
              {t('button.apply')}
            </Button>
          </Flex>
        </Toolbar>
      }
    >
      <Content padded>
        <Title>{t('reports.field-filters')}</Title>

        { fieldFilters.length === 0
          ? <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } />
          : (
            <FieldFilters
              data={ fieldFilters }
              onChange={ onFilterChange }
            />
            ) }
      </Content>
    </ContentLayout>
  )
}
