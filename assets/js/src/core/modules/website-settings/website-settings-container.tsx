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
import { Box, IconTextButton } from '@sdk/components'
import { useAppDispatch } from '@sdk/app'
import trackError, { ApiError, GeneralError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { isUndefined } from 'lodash'
import { useWebsiteSettingsGetCollectionQuery, WebsiteSetting, WebsiteSettingsGetCollectionApiArg } from './website-settings-api-slice.gen'

export type WebsiteSettingRow = WebsiteSetting & { rowId: string }

export const WebsiteSettingsContainer = (): React.JSX.Element => {
  
  const dispatch = useAppDispatch()
  const [filter, setFilter] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

    const queryArgs: WebsiteSettingsGetCollectionApiArg = useMemo(() => ( { body: {filters: {
      page, pageSize
    }} }), [filter])

  const { data, isLoading: websiteSettingsLoading, isFetching: websiteSettingsFetching, isError, error, refetch } = useWebsiteSettingsGetCollectionQuery(queryArgs)

    const handleRefetch = (): void => {
    void refetch().catch(() => {
      trackError(new GeneralError('Error while reloading'))
    })
  }

  useEffect(() => {
    handleRefetch()
  }, [])
  
  const [websiteSettingRows, setWebsiteSettingRows] = useState<WebsiteSettingRow[]>([])

  const websiteSettings = data?.items

  // const sortedSettings = [...websiteSettings].sort((a, b) => b.creationDate - a.creationDate)

  useEffect(() => {
    if (!isUndefined(websiteSettings)) {
      setWebsiteSettingRows(
        websiteSettings.map(item => ({ ...item, rowId: uuid() }))
      )
    }
  }, [websiteSettings])

  // const onCreateProperty = async (): Promise<void> => {
  //   const { success, data } = await createNewProperty()
  //   if (success && data !== undefined) {
  //     setPredefinedPropertyRows(prev =>
  //       [
  //         { ...data, rowId: uuid() },
  //         ...prev
  //       ]
  //     )
  //   }
  // }

  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error))
    }
  }, [isError])

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            disabled={ websiteSettingsFetching }
            icon={ { value: 'refresh' } }
            onClick={ handleRefetch }
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
            <Title>{t('widget.predefined-properties')}</Title>
            <IconTextButton
              disabled={ websiteSettingsLoading }
              icon={ { value: 'new' } }
              loading={ false }
              onClick={ () => console.log("clicked") }
            >{t('predefined-properties.new')}</IconTextButton>
          </Flex>
        </Toolbar>
        }
    >
      <Content
        loading={ websiteSettingsLoading || websiteSettingsFetching }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ isUndefined(websiteSettings) || websiteSettings.length === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          {/* <Table
            predefinedPropertyRows={ sortedSettings }
            setPredefinedPropertyRows={ setWebsiteSettingRows }
          /> */}
        </Box>
      </Content>
    </ContentLayout>
  )
}
