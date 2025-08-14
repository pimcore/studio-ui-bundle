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
import { useTranslation } from './hooks/use-translation'
import { Table } from './table/table'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'
import {
  getAvailableLocales,
  translationsToRows,
  translationDataToRow,
  type TranslationRow
} from './helpers/translation-helpers'
import { isUndefined } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useTranslationDomain } from './hooks/translation-domain-provider'
import { type SortingState } from '@tanstack/react-table'

interface FormValues {
  translationKey: string
}

export const TranslationsContainer = (): React.JSX.Element => {
  const [form] = Form.useForm<FormValues>()
  const dispatch = useAppDispatch()
  const { showModal: showMandatoryModal, closeModal: closeMandatoryModal, renderModal: MandatoryModal } = useModal({
    type: 'error'
  })
  const { createNewTranslation, createLoading } = useTranslation()
  const { domain, setDomain } = useTranslationDomain()
  const settings = useSettings()
  const [visibleLocales, setVisibleLocales] = useState<string[] | null>(null)
  const [translationRows, setTranslationRows] = useState<TranslationRow[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [sorting, setSorting] = useState<SortingState>([{ id: 'key', desc: false }])
  const { data: domainsData, isLoading: domainsLoading, error: domainError } = useTranslationGetDomainsQuery()
  const availableDomains = domainsData?.domains ?? []

  const queryArgs = useMemo(() => ({
    domain,
    body: {
      filters: {
        page: currentPage,
        pageSize,
        columnFilters:
          searchTerm.length >= 0
            ? [{
                type: 'search',
                filterValue: searchTerm
              }]
            : [],
        sortFilter: sorting.length > 0
          ? {
              key: sorting[0].id.startsWith('_') ? sorting[0].id.substring(1) : sorting[0].id,
              direction: sorting[0].desc ? 'DESC' : 'ASC'
            }
          : []
      }
    }
  }), [domain, currentPage, pageSize, searchTerm, sorting])

  const {
    data,
    isLoading: translationsLoading,
    isFetching: translationsFetching,
    error: translationListError
  } = useTranslationGetListQuery(queryArgs, {
    refetchOnMountOrArgChange: true
  })

  useEffect(() => {
    if (availableDomains.length > 0 && !availableDomains.includes(domain)) {
      setDomain(availableDomains[0])
    }
  }, [availableDomains, domain])

  useEffect(() => {
    if (data !== undefined) {
      const rows = translationsToRows(data.items)
      setTranslationRows(rows)
    }
  }, [data])

  useEffect(() => {
    if (!isUndefined(domainError)) {
      trackError(new ApiError(domainError))
    }
  }, [domainError])

  useEffect(() => {
    if (!isUndefined(translationListError)) {
      trackError(new ApiError(translationListError))
    }
  }, [translationListError])

  const reload = (): void => {
    dispatch(api.util.invalidateTags(invalidatingTags.DOMAIN_TRANSLATIONS()))
  }

  const availableLocales = getAvailableLocales(data?.items ?? [])

  const onCreateTranslation = async (translationKey: string): Promise<void> => {
    const isValidKeyInput = translationKey !== '' && translationKey !== undefined

    if (!isValidKeyInput) {
      showMandatoryModal()
      return
    }

    const { success, data } = await createNewTranslation(translationKey)
    if (success && data !== undefined) {
      const newRow = translationDataToRow(data)
      setTranslationRows(prev => [
        newRow,
        ...prev
      ])
      form.resetFields()
    }
  }

  const handleSearch = (value: string): void => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleSortingChange = (newSorting: SortingState): void => {
    setSorting(newSorting)
    setCurrentPage(1)
  }

  const errorModals = (
    <MandatoryModal
      footer={ <ModalFooter>
        <Button
          onClick={ closeMandatoryModal }
          type='primary'
        >{t('button.ok')}</Button>
      </ModalFooter> }
      title={ t('translations.add-translation-mandatory-field-missing.title') }
    >
      {t('translations.add-translation-mandatory-field-missing.error')}
    </MandatoryModal>
  )

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            disabled={ translationsLoading }
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
            <Title>{t('translations.new-translation')}</Title>
            <Form
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
            </Form>
            <Select
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
            />
          </Flex>
          <Flex gap="small">
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

          </Flex>
        </Toolbar>
        }
    >
      <Content
        loading={ translationsLoading || translationsFetching }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ !translationsLoading && translationRows.length === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            onSortingChange={ handleSortingChange }
            setTranslationRows={ setTranslationRows }
            sorting={ sorting }
            translationRows={ translationRows }
            visibleLocales={ visibleLocales ?? availableLocales }
          />
          {errorModals}
        </Box>
      </Content>
    </ContentLayout>
  )
}
