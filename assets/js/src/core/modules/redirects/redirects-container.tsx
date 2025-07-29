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
import { Box, IconTextButton, SearchInput, Pagination } from '@sdk/components'
import { api, useBundleSeoRedirectsGetCollectionQuery } from './seo-api-slice-enhanced'
import { type BundleSeoRedirect } from './seo-api-slice.gen'
import trackError, { ApiError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { type RedirectRow, useRedirects } from './hooks/use-redirects'
import { isUndefined } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@sdk/api'
import { BeginnerRedirectModal } from './beginner-redirect-modal/beginner-redirect-modal'

export const RedirectsContainer = (): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { createNewRedirect, createLoading } = useRedirects()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [filter, setFilter] = useState<string>('')
  const [isBeginnerModalOpen, setIsBeginnerModalOpen] = useState<boolean>(false)

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

  const onCreateRedirect = async (): Promise<void> => {
    const { success, data } = await createNewRedirect()
    if (success && data !== undefined) {
      setRedirectRows(prev =>
        [
          { ...data, rowId: uuid() },
          ...prev
        ]
      )
    }
  }

  const onBeginnerRedirectCreate = (formValues: { type: string, path: string, target: string }): string => {
    const tempId = uuid()
    const optimisticRedirect: RedirectRow = {
      id: Date.now(),
      type: formValues.type,
      source: formValues.path,
      target: formValues.target,
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
    return tempId
  }

  const onBeginnerRedirectSuccess = (redirect: BundleSeoRedirect, tempRowId: string): void => {
    setRedirectRows(prev =>
      prev.map(row => 
        row.rowId === tempRowId 
          ? { ...redirect, rowId: uuid() }
          : row
      )
    )
  }

  const onBeginnerRedirectError = (tempRowId: string): void => {
    setRedirectRows(prev => prev.filter(row => row.rowId !== tempRowId))
  }

  const handleSearch = (value: string): void => {
    setFilter(value)
    setCurrentPage(1)
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            disabled={ redirectsFetching }
            icon={ { value: 'refresh' } }
            onClick={ reload }
          />
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
              onClick={ onCreateRedirect }
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
        onCreate={ onBeginnerRedirectCreate }
        onSuccess={ onBeginnerRedirectSuccess }
        onError={ onBeginnerRedirectError }
      />
    </ContentLayout>
  )
}