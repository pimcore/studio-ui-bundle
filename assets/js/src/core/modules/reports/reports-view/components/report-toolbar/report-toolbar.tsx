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
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/modules/reports/components/pagination/pagination'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Icon } from '@Pimcore/components/icon/icon'
import { Flex } from '@Pimcore/components/flex/flex'
import { Modal } from '@Pimcore/components/modal/modal'
import { Checkbox } from '@Pimcore/components/checkbox/checkbox'
import { Input } from '@Pimcore/components/input/input'
import { useCustomReportExportCsvMutation } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { useGridFilterContext } from '@Pimcore/modules/reports/reports-view/context/grid-filter-context'
import { CsvDownloadJob } from '@Pimcore/modules/execution-engine/jobs/download/csv-download-job'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { useStyles } from '@Pimcore/modules/reports/reports-view/reports-view.styles'
import { useExecutionEngine } from '@Pimcore/modules/execution-engine/hooks/use-execution-engine'

interface IReportToolbarProps {
  currentReport: string | null
  showPagination: boolean
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
  totalItems: number
}

export const ReportToolbar = ({ currentReport, showPagination, page, setPage, pageSize, setPageSize, totalItems }: IReportToolbarProps): React.JSX.Element | null => {
  const [fetchExportCSV, { isError, error }] = useCustomReportExportCsvMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [includeHeaders, setIncludeHeaders] = useState(true)
  const [delimiter, setDelimiter] = useState(';')

  const executionEngine = useExecutionEngine()
  const { filters } = useGridFilterContext()

  const { t } = useTranslation()
  const { styles } = useStyles()

  const handleExportCSV = (): void => {
    const job = new CsvDownloadJob({
      action: async (): Promise<number> => {
        const response = await fetchExportCSV({
          body: {
            name: currentReport,
            filters,
            includeHeaders,
            delimiter
          }
        }).unwrap()

        return response as unknown as number
      }
    })
    void executionEngine.runJob(job)
    setIsModalOpen(false)
  }

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  const renderDropdownLabel = (translationKey: string, isShowIcon = true): React.JSX.Element => (
    <Flex
      align={ 'center' }
      className={ styles.dropdownLabel }
      gap="extra-small"
    >
      {isShowIcon && <Icon value={ 'export' } />}
      {t(translationKey)}
    </Flex>
  )

  const dropdownItems = [
    {
      key: 'csv-export',
      label: renderDropdownLabel('reports.csv-export'),
      onClick: () => { setIsModalOpen(true) }
    }
  ]

  return (
    <>
      <Toolbar
        justify="space-between"
        theme="secondary"
      >
        <Dropdown menu={ { items: dropdownItems } }>
          <DropdownButton data-testid="report-export-button">
            {renderDropdownLabel('reports.export', false)}
          </DropdownButton>
        </Dropdown>
        {showPagination && (
          <Pagination
            page={ page }
            pageSize={ pageSize }
            setPage={ setPage }
            setPageSize={ setPageSize }
            totalItems={ totalItems }
          />
        )}
      </Toolbar>

      <Modal
        onCancel={ () => { setIsModalOpen(false) } }
        onOk={ handleExportCSV }
        open={ isModalOpen }
        title={ t('reports.csv-export-modal.title') }
      >
        <Flex
          gap="small"
          vertical
        >
          <div>
            <Checkbox
              checked={ includeHeaders }
              onChange={ (e) => { setIncludeHeaders(e.target.checked) } }
            >
              {t('reports.csv-export-modal.include-headers')}
            </Checkbox>
          </div>

          <div>
            <div style={ { marginBottom: '8px' } }>
              <strong>{t('reports.csv-export-modal.delimiter-label')}:</strong>
            </div>
            <Input
              maxLength={ 1 }
              onChange={ (e) => { setDelimiter(e.target.value) } }
              placeholder={ t('reports.csv-export-modal.delimiter-placeholder') }
              style={ { width: '100%' } }
              value={ delimiter }
            />
          </div>
        </Flex>
      </Modal>
    </>
  )
}
