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
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApplicationLogger } from './application-logger'
import { useBundleApplicationLoggerGetCollectionQuery } from './application-logger-api-slice.gen'
import { useFilter } from './components/sidebar/tabs/filter/provider/filter-provider/use-filter'
import { Box } from '@Pimcore/components/box/box'
import { Flex } from '@Pimcore/components/flex/flex'
import { Select } from '@Pimcore/components/select/select'
import { Divider } from '@Pimcore/components/divider/divider'
import { isNil } from 'lodash'
import { CreatableSelect } from '@sdk/components'

export const ApplicationLoggerContainerInner = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [refreshInterval, setRefreshInterval] = useState<string | undefined>(undefined)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
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

  const refreshData = useCallback((): void => {
    dispatch(
      api.util.invalidateTags(
        invalidatingTags.APPLICATION_LOGGER()
      )
    )
  }, [dispatch])

  const handleRefreshIntervalChange = (value: string): void => {
    setRefreshInterval(value)
  }

  // Set up periodic refresh based on selected interval
  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Set up new interval if value is selected and not disabled
    if (!isNil(refreshInterval) && refreshInterval !== 'disabled') {
      const intervalMs = parseInt(refreshInterval, 10) * 1000
      intervalRef.current = setInterval(() => {
        refreshData()
      }, intervalMs)
    }

    // Cleanup function
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [refreshInterval, refreshData])

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
          <Flex gap={8} align="center">
            {!isNil(refreshInterval) && (
              <span>{t('application-logger.refresh-interval')}</span>
            )}
            <CreatableSelect
              allowClear
              onChange={handleRefreshIntervalChange}
              placeholder={t('application-logger.refresh-interval.select')}
              value={refreshInterval}
              options={[
                { value: '5', label: t('application-logger.refresh-interval.5-seconds') },
                { value: '10', label: t('application-logger.refresh-interval.10-seconds') },
                { value: '60', label: t('application-logger.refresh-interval.1-minute') }
              ]}
            />
          </Flex>
          <Flex>
            <IconButton
              disabled={isLoading || isRTKFetching}
              icon={{ value: 'refresh' }}
              onClick={() => {
                setIsLoading(true)
                refreshData()
                setIsLoading(false)
              }}
            />
            {total > 0 && (
              <>
                <Divider
                  size="small"
                  type="vertical"
                />
                <Pagination
                  current={currentPage}
                  defaultPageSize={pageSize}
                  onChange={onPagerChange}
                  showSizeChanger
                  showTotal={(total) => t('pagination.show-total', { total })}
                  total={total}
                />
              </>
            )}
          </Flex>
        </Toolbar>
      }
      renderTopBar={
        <Toolbar
          justify='space-between'
          margin={{
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
        loading={isLoading}
      >
        <Box
          className='h-full'
          margin={{
            x: 'extra-small',
            y: 'none'
          }}
        >
          <ApplicationLogger items={data?.items ?? []} />
        </Box>
      </Content>
    </ContentLayout>
  )
}
