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
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Table } from './table/table'
import { Box } from '@sdk/components'
import { api, useBundleSeoRedirectsGetCollectionQuery, useBundleSeoRedirectsImportMutation } from './seo-api-slice-enhanced'
import trackError, { ApiError, GeneralError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { type RedirectRow, useRedirects } from './hooks/use-redirects'
import { isUndefined } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@sdk/api'
import { type BundleSeoRedirectsImportStatistics } from './seo-api-slice.gen'
import { RedirectsToolbar } from './components/redirects-toolbar'
import { RedirectsTopBar } from './components/redirects-top-bar'
import { BeginnerRedirectModal } from './components/beginner-redirect-modal'
import { CsvImportModal } from './components/csv-import-modal/csv-import-modal'
import { CsvImportResultsModal } from './components/csv-import-results-modal/csv-import-results-modal'

export const RedirectsContainer = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const {
    createNewRedirect,
    createLoading,
    cleanupRedirects,
    cleanupLoading
  } = useRedirects()

  const [importRedirects, { isLoading: importLoading }] = useBundleSeoRedirectsImportMutation()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [filter, setFilter] = useState<string>('')
  const [isBeginnerModalOpen, setIsBeginnerModalOpen] = useState<boolean>(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false)
  const [isResultsModalOpen, setIsResultsModalOpen] = useState<boolean>(false)
  const [importResults, setImportResults] = useState<BundleSeoRedirectsImportStatistics | null>(null)
  const [exportLoading, setExportLoading] = useState<boolean>(false)
  const [redirectRows, setRedirectRows] = useState<RedirectRow[]>([])

  const queryArgs = useMemo(() => ({
    body: {
      filters: {
        page: currentPage,
        pageSize,
        columnFilters: filter !== '' ? { search: filter } : undefined
      }
    }
  }), [currentPage, pageSize, filter])

  const {
    data,
    isLoading: redirectsLoading,
    isFetching: redirectsFetching,
    error
  } = useBundleSeoRedirectsGetCollectionQuery(queryArgs)
  const redirects = data?.items
  
  const sortedRows = [...redirectRows].sort((a, b) => {
    const aDate = a.creationDate ?? 0
    const bDate = b.creationDate ?? 0
    return bDate - aDate
  })

  const reload = (): void => {
    dispatch(api.util.invalidateTags(invalidatingTags.REDIRECTS()))
  }

  useEffect(() => {
    if (!isUndefined(redirects)) {
      setRedirectRows(
        redirects.map(item => ({ ...item, rowId: uuid() }))
      )
    }
  }, [redirects])

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const handleCreateRedirect = async (redirectData?: { type: string, source: string, target: string }): Promise<boolean> => {
    const tempId = uuid()
    const optimisticRedirect: RedirectRow = {
      id: Date.now(),
      type: redirectData?.type ?? 'entire_uri',
      source: redirectData?.source ?? null,
      target: redirectData?.target ?? null,
      sourceSite: null,
      targetSite: null,
      statusCode: 301,
      priority: 1,
      regex: false,
      active: true,
      passThroughParameters: false,
      expiry: null,
      creationDate: Date.now(),
      modificationDate: Date.now(),
      userOwner: null,
      userModification: null,
      additionalAttributes: undefined,
      rowId: tempId
    }

    setRedirectRows(prev => [optimisticRedirect, ...prev])

    const { success } = await createNewRedirect(redirectData)

    if (!success) {
      setRedirectRows(prev => prev.filter(row => row.rowId !== tempId))
    }

    return success
  }

  const handleSearch = (value: string): void => {
    setFilter(value)
    setCurrentPage(1)
  }

  const handleCleanup = async (): Promise<void> => {
    const { success } = await cleanupRedirects()
    if (success) {
      reload()
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

        console.log('Download triggered successfully')
      } else {
        trackError(new GeneralError('Export failed: No blob data received'))
      }
    } catch (error) {
      trackError(new GeneralError('Failed to export redirects'))
    } finally {
      setExportLoading(false)
    }
  }

  const handleImport = async (file: File): Promise<void> => {
    try {
      const result = await importRedirects({ body: { file } }).unwrap()
      console.log('Import successful:', result)
      setImportResults(result)
      setIsImportModalOpen(false)
      setIsResultsModalOpen(true)
      reload()
    } catch (error) {
      console.error('Import error:', error)
      trackError(new GeneralError('Failed to import redirects'))
    }
  }

  return (
    <ContentLayout
      renderToolbar={
        <RedirectsToolbar
          cleanupLoading={ cleanupLoading }
          currentPage={ currentPage }
          exportLoading={ exportLoading }
          importLoading={ importLoading }
          onCleanup={ handleCleanup }
          onExport={ handleExport }
          onImport={ () => { setIsImportModalOpen(true) } }
          onPageChange={ (page, pageSize) => {
            setCurrentPage(page)
            setPageSize(pageSize)
          } }
          onRefresh={ reload }
          redirectRowsLength={ redirectRows.length }
          redirectsFetching={ redirectsFetching }
          totalItems={ data?.totalItems ?? 0 }
        />
      }
      renderTopBar={
        <RedirectsTopBar
          createLoading={ createLoading }
          onBeginnerClick={ () => { setIsBeginnerModalOpen(true) } }
          onExpertClick={ async () => {
            await handleCreateRedirect()
          } }
          onSearch={ handleSearch }
          redirectsFetching={ redirectsFetching }
          redirectsLoading={ redirectsLoading }
        />
      }
    >
      <Content
        loading={ redirectsLoading || redirectsFetching }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ isUndefined(redirects) || redirects.length === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            redirectRows={ sortedRows }
            setRedirectRows={ setRedirectRows }
          />
        </Box>
      </Content>

      <BeginnerRedirectModal
        createRedirect={ handleCreateRedirect }
        open={ isBeginnerModalOpen }
        setOpen={ setIsBeginnerModalOpen }
      />

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
    </ContentLayout>
  )
}
