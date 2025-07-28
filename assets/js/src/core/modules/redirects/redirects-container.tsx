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
import { useBundleSeoRedirectsGetCollectionQuery } from './seo-api-slice.gen'
import trackError, { ApiError, GeneralError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { type RedirectRow, useRedirects } from './hooks/use-redirects'
import { isUndefined } from 'lodash'

export const RedirectsContainer = (): React.JSX.Element => {
  const { createNewRedirect, createLoading } = useRedirects()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [filter, setFilter] = useState<string>('')

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
    error, 
    refetch 
  } = useBundleSeoRedirectsGetCollectionQuery(queryArgs)

  const handleRefetch = (): void => {
    void refetch().catch(() => {
      trackError(new GeneralError('Error while reloading'))
    })
  }

  useEffect(() => {
    handleRefetch()
  }, [])

  const [redirectRows, setRedirectRows] = useState<RedirectRow[]>([])

  const redirects = data?.items

  const sortedRows = [...redirectRows].sort((a, b) => {
    const aDate = a.creationDate ?? 0
    const bDate = b.creationDate ?? 0
    return bDate - aDate
  })

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
            onClick={ handleRefetch }
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
              disabled={ redirectsLoading || createLoading }
              icon={ { value: 'new' } }
              loading={ createLoading }
              onClick={ onCreateRedirect }
            >{t('redirects.new')}</IconTextButton>
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
    </ContentLayout>
  )
}