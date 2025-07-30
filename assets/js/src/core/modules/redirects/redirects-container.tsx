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
import { Title } from '@Pimcore/components/title/title'
import { t } from 'i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Content } from '@Pimcore/components/content/content'
import { Table } from './table/table'
import { Box, IconTextButton, SearchInput, Pagination, Modal } from '@sdk/components'
import { Upload, Button } from 'antd'
import { api, useBundleSeoRedirectsGetCollectionQuery, useBundleSeoRedirectsExportQuery, useBundleSeoRedirectsImportMutation } from './seo-api-slice-enhanced'
import trackError, { ApiError, GeneralError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { type RedirectRow, useRedirects } from './hooks/use-redirects'
import { isUndefined } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@sdk/api'
import { BeginnerRedirectModal } from './beginner-redirect-modal/beginner-redirect-modal'

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
  const [exportLoading, setExportLoading] = useState<boolean>(false)

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

  const [redirectRows, setRedirectRows] = useState<RedirectRow[]>([])

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
      
      const result = await dispatch(api.endpoints.bundleSeoRedirectsExport.initiate()).unwrap()
      
      console.log('Export result received:', result instanceof Blob ? 'Blob' : typeof result)
      
      if (result instanceof Blob) {
        console.log('Blob size:', result.size, 'bytes')
        
        const url = window.URL.createObjectURL(result)
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
        throw new Error('Export failed: No blob data received')
      }
    } catch (error) {
      trackError(new GeneralError('Failed to export redirects'))
    } finally {
      setExportLoading(false)
    }
  }

  const handleImport = async (file: File): Promise<void> => {
    try {
      await importRedirects({ body: { file } }).unwrap()
      setIsImportModalOpen(false)
      reload()
    } catch (error) {
      trackError(new GeneralError('Failed to import redirects'))
    }
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <Flex justify='space-between'>
          <div><IconTextButton
            disabled={ redirectRows.length < 1 || cleanupLoading }
            icon={ { value: 'trash' } }
            loading={ cleanupLoading }
            onClick={ handleCleanup }
            type={'link'}
          >{t('redirects.clean-up')}</IconTextButton>
          <IconTextButton
            disabled={ redirectsFetching || exportLoading }
            icon={ { value: 'download' } }
            loading={ exportLoading }
            onClick={ handleExport }
            type={'link'}
          >{t('redirects.csv-export')}</IconTextButton>
          <IconTextButton
            disabled={ redirectsFetching || importLoading }
            icon={ { value: 'upload' } }
            loading={ importLoading }
            onClick={ () => { setIsImportModalOpen(true) } }
            type={'link'}
          >{t('redirects.csv-import')}</IconTextButton>
          </div>
          <IconButton
            disabled={ redirectsFetching }
            icon={ { value: 'refresh' } }
            onClick={ reload }
          />
          </Flex>
          <Pagination
            current={ currentPage }
            onChange={ (page, pageSize) => {
              setCurrentPage(page)
              setPageSize(pageSize)
            } }
            showSizeChanger
            showTotal={ (total) => t('pagination.show-total', { total }) }
            total={ data?.totalItems ?? 0 }
          />
        </Toolbar> }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          } }
          theme='secondary'
        >
          <Flex gap={ 'small' }>
            <Title>{t('widget.redirects')}</Title>
            <IconTextButton
              icon={ { value: 'new' } }
              onClick={ () => { setIsBeginnerModalOpen(true) } }
            >{t('redirects.beginner')}</IconTextButton>
            <IconTextButton
              disabled={ redirectsLoading || createLoading }
              icon={ { value: 'new' } }
              loading={ createLoading }
              onClick={ () => { handleCreateRedirect() } }
            >{t('redirects.expert')}</IconTextButton>
          </Flex>
          <SearchInput
            loading={ redirectsFetching }
            onSearch={ handleSearch }
            placeholder="Search"
            withPrefix={ false }
            withoutAddon={ false }
          />
        </Toolbar>
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
        open={ isBeginnerModalOpen }
        setOpen={ setIsBeginnerModalOpen }
        createRedirect={ handleCreateRedirect }
      />

      <Modal
        title={t('redirects.csv-import')}
        open={isImportModalOpen}
        onCancel={() => { setIsImportModalOpen(false) }}
        footer={null}
        size="M"
      >
        <Upload.Dragger
          accept=".csv"
          beforeUpload={(file) => {
            handleImport(file)
            return false // Prevent default upload
          }}
          multiple={false}
          showUploadList={false}
        >
          <p>{t('redirects.import-drag-drop')}</p>
          <Button>{t('redirects.import-select-file')}</Button>
        </Upload.Dragger>
      </Modal>
    </ContentLayout>
  )
}
