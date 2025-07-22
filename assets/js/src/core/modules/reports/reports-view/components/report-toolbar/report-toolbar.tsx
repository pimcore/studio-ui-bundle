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
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/modules/reports/components/pagination/pagination'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { useCustomReportExportCsvMutation } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { useGridFilterContext } from '@Pimcore/modules/reports/reports-view/context/grid-filter-context'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob as createDownloadCSVJob } from '@Pimcore/modules/execution-engine/jobs/download/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useStyles } from '@Pimcore/modules/reports/reports-view/reports-view.styles'

interface IReportToolbarProps {
  currentReport: string | null
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  totalItems: number
}

export const ReportToolbar = ({ currentReport, page, setPage, pageSize, setPageSize, totalItems }: IReportToolbarProps): React.JSX.Element | null => {
  const [fetchExportCSV, { isError, error }] = useCustomReportExportCsvMutation()

  const { addJob } = useJobs()
  const { filters } = useGridFilterContext()

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleExportCSV = ({ includeHeaders }: { includeHeaders: boolean }): void => {
    addJob(createDownloadCSVJob({
      title: t('jobs.csv-job.title', { title: currentReport }),
      topics: [topics['csv-download-ready'], ...defaultTopics],
      downloadUrl: '/pimcore-studio/api/export/download/csv/{jobRunId}',
      action: async (): Promise<number> => {
        const response = await fetchExportCSV({ body: { name: currentReport, filters, includeHeaders } }).unwrap()

        return response as unknown as number
      }
    }))
  }

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  const renderDropdownLabel = (translationKey: string): React.JSX.Element => (
    <Flex
      align={ 'center' }
      className={ styles.dropdownLabel }
      gap="extra-small"
    >
      <Icon value={ 'export' } />
      {t(translationKey)}
    </Flex>
  )

  const dropdownItems = [
    {
      key: 'csv-export-with-headers',
      label: renderDropdownLabel('reports.csv-export-with-headers'),
      onClick: () => { handleExportCSV({ includeHeaders: true }) }
    }
  ]

  return (
    <Toolbar
      justify="space-between"
      theme="secondary"
    >
      <Dropdown menu={ { items: dropdownItems } }>
        <DropdownButton onClick={ () => { handleExportCSV({ includeHeaders: false }) } }>
          {renderDropdownLabel('reports.csv-export')}
        </DropdownButton>
      </Dropdown>
      <Pagination
        page={ page }
        pageSize={ pageSize }
        setPage={ setPage }
        setPageSize={ setPageSize }
        totalItems={ totalItems }
      />
    </Toolbar>
  )
}
