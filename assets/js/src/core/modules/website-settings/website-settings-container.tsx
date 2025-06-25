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
import { Box, Form, IconTextButton, Input, Pagination, SearchInput, Select, Space } from '@sdk/components'
import trackError, { ApiError, GeneralError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { isUndefined } from 'lodash'
import { useWebsiteSettingsGetCollectionQuery, useWebsiteSettingsListTypesQuery, WebsiteSetting, WebsiteSettingsGetCollectionApiArg, WebsiteSettingsType } from './website-settings-api-slice-enhanced'
import { Table } from './table/table'
import { useWebsiteSetting } from './hooks/use-website-settings'

export type WebsiteSettingRow = WebsiteSetting & { rowId: string }

export type SelectOption = {
  value: string;
  label: string;
};

export const WebsiteSettingsContainer = (): React.JSX.Element => {
  
  const [form] = Form.useForm()

  const [filter, setFilter] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

      const {data: settingTypes, isLoading: settingTypesLoading } = useWebsiteSettingsListTypesQuery()

      const websiteSettingTypes = settingTypes?.items

      const typeOptions: SelectOption[] = !isUndefined(websiteSettingTypes) ? websiteSettingTypes.map( setting => ({
  value: setting.key,
  label: setting.title,
})) : [];

    const queryArgs: WebsiteSettingsGetCollectionApiArg = useMemo(() => ( { body: {filters: {
      page, pageSize
    }} }), [filter, page, pageSize])

  const { data, isLoading: websiteSettingsLoading, isFetching: websiteSettingsFetching, isError, error, refetch } = useWebsiteSettingsGetCollectionQuery(queryArgs)
  
  const { createNewSetting, createLoading } = useWebsiteSetting()
  
    const handleRefetch = (): void => {
    void refetch().catch(() => {
      trackError(new GeneralError('Error while reloading'))
    })
  }

  useEffect(() => {
    handleRefetch()
  }, [])
  
  const [websiteSettingRows, setWebsiteSettingRows] = useState<WebsiteSettingRow[]>([])

  const websiteSettings = data?.items ?? []

  const sortedSettings = [...websiteSettingRows].sort((a, b) => {
  const nameA = a.name ?? ''
  const nameB = b.name ?? ''
  return nameA.localeCompare(nameB)
  })

  useEffect(() => {
    if (!isUndefined(websiteSettings)) {
      setWebsiteSettingRows(
        websiteSettings.map(item => ({ ...item, rowId: uuid() }))
      )
    }
  }, [websiteSettings])

  const onCreateProperty = async (name: string, type: string): Promise<void> => {
    const { success, data } = await createNewSetting(name, type)
    if (success && data !== undefined) {
      setWebsiteSettingRows(prev =>
        [
          { ...data, rowId: uuid() },
          ...prev
        ]
      )
      form.resetFields()
    }
  }

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
          <Pagination
                        current={ page }
                        onChange={ (page, pageSize) => {
                          setPage(page)
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
          padding={ {
            x: 'small',
          } }
          theme='secondary'
        >
          <Flex gap={ 'small' }>
            <Title>{t('widget.website-settings')}</Title>
  <Form
  form={form}
  layout="inline"
  onFinish={({ name, type }) => {
    void onCreateProperty(name, type)
  }}
>
  <Flex>
  <Form.Item
    name="name"
    rules={[{ required: true, message: t('validation.required') }]}
  >
    <Input placeholder={ t('properties.add-custom-property.key') } />
  </Form.Item>

  <Form.Item
    name="type"
    rules={[{ required: true, message: t('validation.required') }]}
  >
    <Select
      className="min-w-100"
      options={typeOptions}
      placeholder={ t('properties.add-custom-property.type') }
    />
  </Form.Item>

  <Form.Item>
    <IconTextButton
      icon={{ value: 'new' }}
      loading={ createLoading }
      htmlType="submit"
    >
      {t('website-settings.new')}
    </IconTextButton>
  </Form.Item>
  </Flex>
</Form>
          </Flex>
                    <SearchInput
                      loading={ websiteSettingsFetching }
                      onSearch={ (value) => {
                        setFilter(value)
                      } }
                      placeholder="Search"
                      withPrefix={ false }
                      withoutAddon={ false }
                    />
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
          <Table
            websiteSettingRows={ sortedSettings }
            setWebsiteSettingRows={ setWebsiteSettingRows }
            typeSelectOptions={ typeOptions }
          />
        </Box>
      </Content>
    </ContentLayout>
  )
}
