/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/* eslint-disable max-lines */

import React, { useEffect, useMemo, useState } from 'react'
import { Title } from '@Pimcore/components/title/title'
import { t } from 'i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Content } from '@Pimcore/components/content/content'
import { Box, Form, IconTextButton, Input, SearchInput, useModal, Select, Pagination } from '@sdk/components'
import { Divider } from 'antd'
import trackError, { ApiError } from '../app/error-handler'
import { useTranslationGetListQuery, useTranslationGetDomainsQuery, api } from '../app/translations/translations-api-slice-enhanced'
import { useTranslation } from './hooks/use-translation'
import { Table } from './table/table'
import { useWebsiteTranslationLanguages, useAdminTranslationLanguages } from './hooks/use-translation-languages'
import {
  translationsToRows,
  translationDataToRow,
  type TranslationRow
} from './helpers/translation-helpers'
import { isUndefined } from 'lodash'
import { useAppDispatch } from '@sdk/app'
import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useTranslationDomain } from './hooks/translation-domain-provider'
import { type SortingState } from '@tanstack/react-table'
import { TranslationErrorModals } from './components/translation-error-modals'
import { ExportTranslationsButton } from './components/export-translations-button'
import { ImportTranslationsButton } from './components/import-translations-button'
import { CleanupTranslationsButton } from './components/cleanup-translations-button'
import { useStyle } from './translations-container.styles'

const TESTID_PREFIX = 'translations'

interface FormValues {
  translationKey: string
}

export interface TranslationsContainerProps {
  initialSearchTerm?: string
}

export const TranslationsContainer = ({ initialSearchTerm }: TranslationsContainerProps): React.JSX.Element => {
  const { styles } = useStyle()
  const [form] = Form.useForm<FormValues>()
  const dispatch = useAppDispatch()
  const { showModal: showMandatoryModal, closeModal: closeMandatoryModal, renderModal: MandatoryModal } = useModal({
    type: 'error'
  })
  const { createNewTranslation, createLoading } = useTranslation()
  const { domain, setDomain } = useTranslationDomain()
  const [visibleLocales, setVisibleLocales] = useState<string[] | null>(null)
  const [translationRows, setTranslationRows] = useState<TranslationRow[]>([])
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm ?? '')

  useEffect(() => {
    if (initialSearchTerm !== undefined) {
      setSearchTerm(initialSearchTerm)
      setCurrentPage(1)
    }
  }, [initialSearchTerm])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [sorting, setSorting] = useState<SortingState>([{ id: 'key', desc: false }])
  const { data: domainsData, isLoading: domainsLoading, error: domainError } = useTranslationGetDomainsQuery()
  const availableDomains = domainsData ?? []

  const currentDomainInfo = availableDomains.find(d => d.domain === domain)
  const isFrontendDomain = currentDomainInfo?.isFrontendDomain ?? false

  const websiteLanguages = useWebsiteTranslationLanguages()
  const adminLanguages = useAdminTranslationLanguages()
  const { languages: domainLanguages, isLoading: languagesLoading } = isFrontendDomain ? websiteLanguages : adminLanguages

  const queryArgs = useMemo(() => ({
    domain,
    body: {
      filters: {
        page: currentPage,
        pageSize,
        columnFilters:
          searchTerm.length > 0
            ? [{
                type: 'search',
                filterValue: searchTerm
              }]
            : undefined,
        sortFilter: sorting.length > 0
          ? {
              key: sorting[0].id.startsWith('_') ? sorting[0].id.substring(1) : sorting[0].id,
              direction: sorting[0].desc ? 'DESC' : 'ASC'
            }
          : undefined
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
    if (availableDomains.length > 0 && !availableDomains.some(d => d.domain === domain)) {
      setDomain(availableDomains[0].domain)
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

  const viewableLanguages = domainLanguages.filter(lang => lang.canView)
  const editableLanguages = domainLanguages.filter(lang => lang.canEdit)

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

  return (
    <ContentLayout
      className={ styles.translationsContainer }
      renderToolbar={
        <Toolbar theme="secondary">
          <Flex gap="extra-small">
            <CleanupTranslationsButton
              domain={ domain }
              onSuccess={ reload }
            />
            <ExportTranslationsButton
              domain={ domain }
              filters={ {
                columnFilters: searchTerm.length > 0
                  ? [{ type: 'search', filterValue: searchTerm }]
                  : [],
                sortFilter: sorting.length > 0
                  ? {
                      key: sorting[0].id.startsWith('_') ? sorting[0].id.substring(1) : sorting[0].id,
                      direction: sorting[0].desc ? 'DESC' : 'ASC'
                    }
                  : {}
              } }
            />
            <ImportTranslationsButton
              domain={ domain }
              onSuccess={ reload }
            />
          </Flex>
          <Flex
            align="center"
          >
            <IconButton
              data-testid={ `${TESTID_PREFIX}-refresh-button` }
              disabled={ translationsLoading }
              icon={ { value: 'refresh' } }
              onClick={ reload }
            />
            <Divider
              style={ { height: 24 } }
              type="vertical"
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
          </Flex>
        </Toolbar> }
      renderTopBar={
        <Toolbar
          justify='space-between'
          padding={ {
            left: 'small',
            right: 'extra-small'
          } }
          theme='secondary'
        >
          <Flex
            align="center"
            gap={ 'extra-small' }
          >
            <Title>{t('translations.new-translation')}</Title>
            <Form
              form={ form }
              layout="inline"
              onFinish={ ({ translationKey }) => {
                void onCreateTranslation(translationKey)
              } }
            >
              <Form.Item
                name="translationKey"
              >
                <Input
                  className="translations-key-input"
                  data-testid={ `${TESTID_PREFIX}-key-input` }
                  placeholder={ t('translations.add-translation.key') }
                />
              </Form.Item>
              <Form.Item>
                <IconTextButton
                  data-testid={ `${TESTID_PREFIX}-add-button` }
                  htmlType="submit"
                  icon={ { value: 'new' } }
                  loading={ createLoading }
                >
                  {t('translations.new')}
                </IconTextButton>
              </Form.Item>            </Form>
          </Flex>
          <Flex gap="small">
            <Select
              className="translations-domain-select"
              data-testid={ `${TESTID_PREFIX}-domain-select` }
              loading={ domainsLoading }
              onChange={ (value: string) => {
                setDomain(value)
                setCurrentPage(1)
              } }
              options={ availableDomains.map(domainInfo => ({
                value: domainInfo.domain,
                label: t(`translations.domain.${domainInfo.domain}`, { defaultValue: domainInfo.domain })
              })) }
              placeholder={ t('translations.select-domain') }
              value={ domain }
            />
            <Select
              allowClear
              className="translations-locale-select"
              data-testid={ `${TESTID_PREFIX}-locale-select` }
              disabled={ viewableLanguages.length === 0 || languagesLoading }
              dropdownStyle={ { minWidth: 250 } }
              filterOption={ (input, option) => {
                const label = option?.label?.toString() ?? ''
                return label.toLowerCase().includes(input.toLowerCase())
              } }
              loading={ languagesLoading }
              maxTagCount="responsive"
              mode="multiple"
              onChange={ (selectedLocales: string[]) => {
                setVisibleLocales(selectedLocales.length > 0 ? selectedLocales : null)
              } }
              options={ viewableLanguages.map(lang => ({
                value: lang.locale,
                label: lang.displayName
              })) }
              placeholder={ t('translations.show-hide-locale') }
              showSearch
              value={ visibleLocales ?? [] }
            />
            <SearchInput
              className="translations-search-input"
              data-testid={ `${TESTID_PREFIX}-search-input` }
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
        loading={ translationsLoading || translationsFetching || languagesLoading }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ !translationsLoading && !languagesLoading && translationRows.length === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            domainLanguages={ domainLanguages }
            editableLocales={ editableLanguages.map(lang => lang.locale) }
            onSortingChange={ handleSortingChange }
            setTranslationRows={ setTranslationRows }
            sorting={ sorting }
            translationRows={ translationRows }
            visibleLocales={ visibleLocales ?? viewableLanguages.map(lang => lang.locale) }
          />
          <TranslationErrorModals
            MandatoryModal={ MandatoryModal }
            closeMandatoryModal={ closeMandatoryModal }
          />
        </Box>
      </Content>
    </ContentLayout>
  )
}
