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
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton, Pagination, Split } from '@sdk/components'
import { useTranslation } from 'react-i18next'
import { useRedirects } from '../hooks/use-redirects'
import { api, useBundleSeoRedirectsImportMutation } from '../seo-api-slice-enhanced'
import trackError, { GeneralError } from '@Pimcore/modules/app/error-handler'
import { useAppDispatch } from '@sdk/app'
import { CsvImportModal } from './csv-import-modal/csv-import-modal'
import { CsvImportResultsModal } from './csv-import-results-modal/csv-import-results-modal'
import { type BundleSeoRedirectsImportStatistics } from '../seo-api-slice.gen'

interface RedirectsToolbarProps {
  currentPage: number
  redirectRowsLength: number
  redirectsFetching: boolean
  totalItems: number
  onPageChange: (page: number, pageSize: number) => void
  onRefresh: () => void
}

export const RedirectsToolbar = ({
  currentPage,
  redirectRowsLength,
  redirectsFetching,
  totalItems,
  onPageChange,
  onRefresh
}: RedirectsToolbarProps): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false)
  const [isResultsModalOpen, setIsResultsModalOpen] = useState<boolean>(false)
  const [importResults, setImportResults] = useState<BundleSeoRedirectsImportStatistics | null>(null)
  const [exportLoading, setExportLoading] = useState<boolean>(false)

  const { cleanupRedirects, cleanupLoading } = useRedirects()
  const [importRedirects, { isLoading: importLoading }] = useBundleSeoRedirectsImportMutation()

  const handleCleanup = async (): Promise<void> => {
    const { success } = await cleanupRedirects()
    if (success) {
      onRefresh()
    }
  }

  const handleExport = async (): Promise<void> => {
    try {
      setExportLoading(true)

      const result = await dispatch(api.endpoints.bundleSeoRedirectsExport.initiate())

      if ('data' in result && result.data instanceof Blob) {
        const url = window.URL.createObjectURL(result.data)
        const link = document.createElement('a')
        link.href = url
        link.download = `redirects-export-${new Date().toISOString().split('T')[0]}.csv`
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } else {
        trackError(new GeneralError('Export failed: No blob data received'))
      }
    } catch {
      trackError(new GeneralError('Failed to export redirects'))
    } finally {
      setExportLoading(false)
    }
  }

  const handleImport = async (file: File): Promise<void> => {
    try {
      const result = await importRedirects({ body: { file } }).unwrap()
      setImportResults(result)
      setIsImportModalOpen(false)
      setIsResultsModalOpen(true)
      onRefresh()
    } catch (error) {
      trackError(new GeneralError('Failed to import redirects'))
    }
  }

  const handlePageChange = (page: number, newPageSize: number): void => {
    onPageChange(page, newPageSize)
  }

  return (
    <>
      <Toolbar theme="secondary">
        <Split>
          <Flex
            justify='space-between'
            style={ { width: '100%' } }
          >
            <div>
              <IconTextButton
                disabled={ redirectRowsLength < 1 || cleanupLoading || redirectsFetching }
                icon={ { value: 'trash' } }
                loading={ cleanupLoading }
                onClick={ handleCleanup }
                type={ 'link' }
              >
                {t('redirects.clean-up')}
              </IconTextButton>
              <IconTextButton
                disabled={ redirectsFetching || exportLoading }
                icon={ { value: 'download' } }
                loading={ exportLoading }
                onClick={ handleExport }
                type={ 'link' }
              >
                {t('redirects.csv-export')}
              </IconTextButton>
              <IconTextButton
                disabled={ redirectsFetching || importLoading }
                icon={ { value: 'import-csv' } }
                loading={ importLoading }
                onClick={ () => { setIsImportModalOpen(true) } }
                type={ 'link' }
              >
                {t('redirects.csv-import')}
              </IconTextButton>
            </div>
            <IconButton
              disabled={ redirectsFetching }
              icon={ { value: 'refresh' } }
              onClick={ onRefresh }
            />
          </Flex>
          <Pagination
            current={ currentPage }
            onChange={ handlePageChange }
            showSizeChanger
            showTotal={ (total) => t('pagination.show-total', { total }) }
            total={ totalItems }
          />
        </Split>
      </Toolbar>

      <CsvImportModal
        loading={ importLoading }
        onCancel={ () => { setIsImportModalOpen(false) } }
        onImport={ handleImport }
        open={ isImportModalOpen }
      />

      <CsvImportResultsModal
        onClose={ () => { setIsResultsModalOpen(false) } }
        open={ isResultsModalOpen }
        results={ importResults }
      />
    </>
  )
}
