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
import { api, useBundleSeoRedirectsGetCollectionQuery } from './seo-api-slice-enhanced'
import trackError, { ApiError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { type RedirectRow, useRedirects } from './hooks/use-redirects'
import { isUndefined } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@sdk/api'
import { RedirectsToolbar } from './components/redirects-toolbar'
import { RedirectsTopBar } from './components/redirects-top-bar'
import { BeginnerRedirectModal } from './components/beginner-redirect-modal'

export const RedirectsContainer = (): React.JSX.Element => {
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [filter, setFilter] = useState<string>('')
  const [isBeginnerModalOpen, setIsBeginnerModalOpen] = useState<boolean>(false)

  const {
    createNewRedirect,
    createLoading
  } = useRedirects()

  const [redirectRows, setRedirectRows] = useState<RedirectRow[]>([])

  const queryArgs = useMemo(() => ({
    body: {
      filters: {
        page: currentPage,
        pageSize,
        columnFilters: filter !== '' ? [{ type: 'search', filterValue: filter }] : []
      }
    }
  }), [currentPage, pageSize, filter])

  const {
    data,
    isLoading: redirectsLoading,
    isFetching: redirectsFetching,
    error
  } = useBundleSeoRedirectsGetCollectionQuery(queryArgs, {
    refetchOnMountOrArgChange: true
  })

  const redirects = data?.items

  const reload = (): void => {
    dispatch(api.util.invalidateTags(invalidatingTags.REDIRECTS()))
  }

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

    const { success, data } = await createNewRedirect(redirectData)

    if (success && !isUndefined(data)) {
      setRedirectRows(prev => prev.map(row =>
        row.rowId === tempId
          ? { ...data, rowId: uuid() }
          : row
      ))
    } else {
      setRedirectRows(prev => prev.filter(row => row.rowId !== tempId))
    }

    return success
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

  const handleSearch = (value: string): void => {
    setFilter(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number, newPageSize: number): void => {
    setCurrentPage(page)
    setPageSize(newPageSize)
  }

  const isDataLoading = redirectsLoading || redirectsFetching ||
    (!isUndefined(redirects) && redirectRows.length === 0 && redirects.length > 0)

  return (
    <ContentLayout
      renderToolbar={
        <RedirectsToolbar
          currentPage={ currentPage }
          onPageChange={ handlePageChange }
          onRefresh={ reload }
          redirectRowsLength={ redirectRows.length }
          redirectsFetching={ isDataLoading }
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
          redirectsFetching={ isDataLoading }
          redirectsLoading={ redirectsLoading }
        />
      }
    >
      <Content
        loading={ isDataLoading }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ !isDataLoading && (isUndefined(redirects) || redirects.length === 0) }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            redirectRows={ redirectRows }
            setRedirectRows={ setRedirectRows }
          />
        </Box>
      </Content>

      <BeginnerRedirectModal
        createRedirect={ handleCreateRedirect }
        open={ isBeginnerModalOpen }
        setOpen={ setIsBeginnerModalOpen }
      />
    </ContentLayout>
  )
}
