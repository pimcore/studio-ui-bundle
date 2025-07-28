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
import { Box, Button, Form, IconTextButton, Input, ModalFooter, SearchInput, useModal, Select, Pagination } from '@sdk/components'
import trackError, { ApiError } from '../app/error-handler'
import { useTranslationGetListQuery, useTranslationGetDomainsQuery, api } from '../app/translations/translations-api-slice-enhanced'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import { isUndefined } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'

interface FormValues {
  translationKey: string
}

export const RedirectsContainer = (): React.JSX.Element => {
 
  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
         <IconButton
            // disabled={ translationsLoading }
            icon={ { value: 'refresh' } }
            // onClick={ reload }
          />
          {/* <Pagination
            current={ currentPage }
            onChange={ (page, pageSize) => {
              setCurrentPage(page)
              setPageSize(pageSize)
            } }
            showSizeChanger
            showTotal={ (total) => t('pagination.show-total', { total }) }
            total={ data?.totalItems ?? 0 }
          />*/
          }
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
            <Title>{t('translations.new-translation')}</Title>
            {/* <Form
              form={ form }
              layout="inline"
              onFinish={ ({ translationKey }) => {
                void onCreateTranslation(translationKey)
              } }
            >
              <Flex>
                <Form.Item
                  name="translationKey"
                >
                  <Input placeholder={ t('translations.add-translation.key') } />
                </Form.Item>
                <Form.Item>
                  <IconTextButton
                    htmlType="submit"
                    icon={ { value: 'new' } }
                    loading={ createLoading }
                  >
                    {t('translations.new')}
                  </IconTextButton>
                </Form.Item>
              </Flex>
            </Form> */}
            {/* <Select
              loading={ domainsLoading }
              onChange={ (value: string) => {
                setDomain(value)
                setCurrentPage(1)
              } }
              options={ availableDomains.map(domain => ({
                value: domain,
                label: domain
              })) }
              placeholder={ t('translations.select-domain') }
              style={ { minWidth: 120 } }
              value={ domain }
            /> */}
          {/* </Flex> */}
          {/* <Flex gap="small">
            <Select
              allowClear
              disabled={ availableLocales.length === 0 }
              dropdownStyle={ { minWidth: 250 } }
              filterOption={ (input, option) => {
                const label = option?.label?.toString() ?? ''
                return label.toLowerCase().includes(input.toLowerCase())
              } }
              maxTagCount="responsive"
              mode="multiple"
              onChange={ (selectedLocales: string[]) => {
                setVisibleLocales(selectedLocales.length > 0 ? selectedLocales : null)
              } }
              options={ availableLocales.map(locale => {
                const languageInfo = settings?.availableAdminLanguages?.find(lang => lang.language === locale)
                const display = (languageInfo as { display?: string } | undefined)?.display

                return {
                  value: locale,
                  label: display !== undefined ? `${display} (${locale})` : locale.toUpperCase()
                }
              }) }
              placeholder={ t('translations.show-hide-locale') }
              showSearch
              style={ { minWidth: 220 } }
              value={ visibleLocales ?? [] }
            />
            <SearchInput
              loading={ translationsLoading }
              onSearch={ (value) => {
                handleSearch(value)
              } }
              placeholder="Search"
              withPrefix={ false }
              withoutAddon={ false }
            />
            */}

          </Flex>
        </Toolbar>
        }
    >
      <Content
        loading={ false }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ false }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
        </Box>
      </Content>
    </ContentLayout>
  )
}