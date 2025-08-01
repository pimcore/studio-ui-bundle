/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { Title } from '@Pimcore/components/title/title'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { api } from '@Pimcore/modules/application-logger/application-logger-api-slice-enhanced'
import { useAppDispatch } from '@sdk/app'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApplicationLogger } from './application-logger'
import { useBundleApplicationLoggerGetCollectionQuery } from './application-logger-api-slice.gen'
import { useFilter } from './components/sidebar/tabs/filter/provider/filter-provider/use-filter'
import { Box } from '@Pimcore/components/box/box'

export const ApplicationLoggerContainerInner = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { columnFilters, setIsLoading: setFilterLoading } = useFilter()

  const { data, isFetching: isRTKFetching } = useBundleApplicationLoggerGetCollectionQuery({
    body: {
      filters: {
        page: currentPage,
        pageSize,
        columnFilters
      }
    }
  })
  const total = data?.totalItems ?? 0

  const onPagerChange = (page: number, pageSize: number): void => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  useEffect(() => {
    setFilterLoading(isRTKFetching)
  }, [isRTKFetching])

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          justify='space-between'
          theme='secondary'
        >
          <IconButton
            disabled={ isLoading || isRTKFetching }
            icon={ { value: 'refresh' } }
            onClick={ () => {
              setIsLoading(true)
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.APPLICATION_LOGGER()
                )
              )
              setIsLoading(false)
            } }
          />
          <Pagination
            current={ currentPage }
            defaultPageSize={ pageSize }
            onChange={ onPagerChange }
            showSizeChanger
            showTotal={ (total) => t('pagination.show-total', { total }) }
            total={ total }
          />
        </Toolbar>
      }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          }
          }
          theme='secondary'
        >
          <Title>{t('application-logger.label')}</Title>
        </Toolbar>
      }
    >
      <Content
        loading={ isLoading }
      >
        <Box
          className='h-full'
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <ApplicationLogger items={ data?.items ?? [] } />
        </Box>
      </Content>
    </ContentLayout>
  )
}
