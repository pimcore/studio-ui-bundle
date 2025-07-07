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
import { Box, Button, Form, IconTextButton, Input, ModalFooter, Pagination, SearchInput, Select, useModal } from '@sdk/components'
import trackError, { ApiError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { isUndefined } from 'lodash'
import { api, useWebsiteSettingsGetCollectionQuery, useWebsiteSettingsListTypesQuery, type WebsiteSetting, type WebsiteSettingsGetCollectionApiArg } from './website-settings-api-slice-enhanced'
import { Table } from './table/table'
import { useWebsiteSetting } from './hooks/use-website-settings'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@sdk/api'

export type WebsiteSettingRow = WebsiteSetting & { rowId: string }

export interface SelectOption {
  value: string
  label: string
}

  interface FormValues {
    name: string
    type: string
  }

export const WebsiteSettingsContainer = (): React.JSX.Element => {
  const [form] = Form.useForm<FormValues>()

  const [nameFilter, setNameFilter] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)

  const { data: settingTypes } = useWebsiteSettingsListTypesQuery()

  const websiteSettingTypes = settingTypes?.items

  const typeOptions: SelectOption[] = !isUndefined(websiteSettingTypes)
    ? websiteSettingTypes.map(setting => ({
      value: setting.key,
      label: setting.title
    }))
    : []

  const queryArgs: WebsiteSettingsGetCollectionApiArg = useMemo(() => ({
    body: {
      filters: {
        page,
        pageSize,
        columnFilters: [
          {
            key: 'name',
            type: 'like',
            filterValue: nameFilter
          }
        ]
      }
    }
  }), [nameFilter, page, pageSize])

  const { data, isLoading: websiteSettingsLoading, isFetching: websiteSettingsFetching, error } = useWebsiteSettingsGetCollectionQuery(queryArgs, {
    refetchOnMountOrArgChange: true
  })

  const { createNewSetting, createLoading } = useWebsiteSetting()

  const dispatch = useAppDispatch()

  const reload = (): void => {
    dispatch(api.util.invalidateTags(invalidatingTags.WEBSITE_SETTINGS()))
  }

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

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const {
    showModal: showDuplicateEntryModal,
    closeModal: closeDuplicateEntryModal,
    renderModal: DuplicateEntryModal
  } = useModal({
    type: 'error'
  })
  const { showModal: showMandatoryModal, closeModal: closeMandatoryModal, renderModal: MandatoryModal } = useModal({
    type: 'error'
  })

  const errorModals = (
    <><DuplicateEntryModal
      footer={ <ModalFooter>
        <Button
          onClick={ closeDuplicateEntryModal }
          type='primary'
        >{t('button.ok')}</Button>
      </ModalFooter> }
      title={ t('website-settings.website-settings-already-exist.title') }
      >
      {t('website-settings.website-settings-already-exist.error')}
    </DuplicateEntryModal>

      <MandatoryModal
        footer={ <ModalFooter>
          <Button
            onClick={ closeMandatoryModal }
            type='primary'
          >{t('button.ok')}</Button>
        </ModalFooter> }
        title={ t('website-settings.website-settings.add-entry-mandatory-fields-missing.title') }
      >
        {t('website-settings.website-settings.add-entry-mandatory-fields-missing.error')}
      </MandatoryModal>
    </>
  )

  const onCreateProperty = async (name: string, type: string): Promise<void> => {
    const isValidNameInput = name !== '' && name !== undefined
    const isValidTypeSelectValue = type !== undefined && type !== ''

    if (!isValidNameInput || !isValidTypeSelectValue) {
      showMandatoryModal()
      return
    }

    if (websiteSettingRows?.find((setting) => setting.name === name) !== undefined) {
      showDuplicateEntryModal()
      return
    }

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

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            disabled={ websiteSettingsFetching }
            icon={ { value: 'refresh' } }
            onClick={ reload }
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
            x: 'small'
          } }
          theme='secondary'
        >
          <Flex gap={ 'small' }>
            <Title>{t('widget.website-settings')}</Title>
            <Form
              form={ form }
              layout="inline"
              onFinish={ ({ name, type }) => {
                void onCreateProperty(name, type)
              } }
            >
              <Flex>
                <Form.Item
                  name="name"
                >
                  <Input placeholder={ t('properties.add-custom-property.key') } />
                </Form.Item>
                <Form.Item
                  name="type"
                >
                  <Select
                    className="min-w-100"
                    options={ typeOptions }
                    placeholder={ t('properties.add-custom-property.type') }
                  />
                </Form.Item>

                <Form.Item>
                  <IconTextButton
                    htmlType="submit"
                    icon={ { value: 'new' } }
                    loading={ createLoading }
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
              setNameFilter(value)
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
            setWebsiteSettingRows={ setWebsiteSettingRows }
            typeSelectOptions={ typeOptions }
            websiteSettingRows={ sortedSettings }
          />
          {errorModals}
        </Box>
      </Content>
    </ContentLayout>
  )
}
