/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState } from 'react'
import { Title } from '@Pimcore/components/title/title'
import { t } from 'i18next'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Content } from '@Pimcore/components/content/content'
import { Box, Button, Form, IconTextButton, Input, ModalFooter, SearchInput, useModal, Select } from '@sdk/components'
import trackError, { GeneralError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { Translations, useTranslationGetListQuery, useTranslationGetDomainsQuery, type Translation } from '../app/translations/translations-api-slice.gen'
import { useTranslation } from './hooks/use-translation'
import { Table } from './table/table'
import { useSettings } from '@Pimcore/modules/app/settings/hooks/use-settings'

export type TranslationDataItem = {
  key: string
  type: string
} & {
  [localeKey: `_${string}`]: string
}

export type TranslationRow = TranslationDataItem & { 
  rowId: string
}

const getAvailableLocales = (translations: Translations[]): string[] => {
  if (translations.length === 0) return []
  
  const localeSet = new Set<string>()
  
  // Extract all unique locales from the translations object
  translations.forEach(translation => {
    if (translation.translations && typeof translation.translations === 'object') {
      // translations is now an object with locale keys as properties
      Object.keys(translation.translations).forEach(locale => {
        localeSet.add(locale)
      })
    }
  })
  
  return Array.from(localeSet).sort()
}

// Helper function to convert API response to TranslationRow format
const translationsToRows = (translations: Translations[]): TranslationRow[] => {
  return translations.map(translation => {
    const row: TranslationRow = {
      key: translation.key,
      type: translation.type,
      rowId: uuid()
    }
    
    // Convert the translations object to locale-specific properties
    if (translation.translations && typeof translation.translations === 'object') {
      Object.entries(translation.translations).forEach(([locale, value]) => {
        row[`_${locale}`] = String(value || '')
      })
    }
    
    return row
  })
}

// Helper function to convert new API response to TranslationRow format (legacy support)
const translationToRows = (translationObj: any): TranslationRow[] => {
  // Handle array of translation objects (new expected backend format)
  if (Array.isArray(translationObj)) {
    return translationObj.map(item => ({
      ...item,
      rowId: uuid()
    }))
  }
  
  // Handle single TranslationDataItem (from createNewTranslation)
  if ('key' in translationObj && 'type' in translationObj && !('locale' in translationObj)) {
    return [{
      ...translationObj as TranslationDataItem,
      rowId: uuid()
    }]
  }
  
  // Current API response structure: { locale: "en", keys: { "key1": "value1", "key2": "value2", ... } }
  if ('locale' in translationObj && 'keys' in translationObj && typeof translationObj.keys === 'object' && !Array.isArray(translationObj.keys)) {
    const locale = translationObj.locale
    const keysObject = translationObj.keys as Record<string, string>
    
    return Object.entries(keysObject).map(([key, value]) => ({
      key,
      type: 'simple', // Default type
      [`_${locale}`]: value || '', // Use the locale from the response
      rowId: uuid()
    }))
  }
  
  return []
}

const translationDataToRow = (data: TranslationDataItem): TranslationRow => {
  return {
    ...data,
    rowId: uuid()
  }
}

interface FormValues {
  translationKey: string
}

export const TranslationsContainer = (): React.JSX.Element => {
  const [form] = Form.useForm<FormValues>()
  const { createNewTranslation, createLoading } = useTranslation()
  const settings = useSettings()

  // Domain state
  const [selectedDomain, setSelectedDomain] = useState<string>('admin')
  
  // Fetch available domains
  const { data: domainsData, isLoading: domainsLoading } = useTranslationGetDomainsQuery()
  const availableDomains = domainsData?.domains || []

  // Set default domain when domains are loaded
  useEffect(() => {
    if (availableDomains.length > 0 && !availableDomains.includes(selectedDomain)) {
      setSelectedDomain(availableDomains[0])
    }
  }, [availableDomains, selectedDomain])

  // const [filter, setFilter] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize] = useState<number>(50)

  const { data, isLoading: translationsLoading, refetch } = useTranslationGetListQuery({
    domain: selectedDomain,
    body: {
      filters: {
        page: currentPage,
        pageSize: pageSize,
        columnFilters: [],
        sortFilter: {
          key: 'de',
          direction: 'ASC'
        }
      }
    }
  })
  
  const [translationRows, setTranslationRows] = useState<TranslationRow[]>([])
  const [totalItems, setTotalItems] = useState<number>(0)

  useEffect(() => {
    if (data) {
      const rows = translationsToRows(data.items)
      setTranslationRows(rows)
      setTotalItems(data.totalItems)
    }
  }, [data])

    useEffect(() => {
    refetch()
  }, [currentPage, searchTerm, selectedDomain, refetch])

  // Extract available locales from the translation data
  const availableLocales = getAvailableLocales(data?.items || [])
  
  // State for managing visible locales
  const [visibleLocales, setVisibleLocales] = useState<string[]>([])
  
  // Initialize visible locales when available locales change
  useEffect(() => {
    if (availableLocales.length > 0 && visibleLocales.length === 0) {
      setVisibleLocales(availableLocales)
    }
  }, [availableLocales, visibleLocales.length])

  console.log("availableLocales", availableLocales)
  console.log("visibleLocales", visibleLocales)
  console.log("translationRows", translationRows)
  console.log("totalItems", totalItems)
  
  const sortedRows = [...translationRows].sort((a, b) => a.key.localeCompare(b.key, "en", { sensitivity: 'base' }))

  const onCreateTranslation = async (translationKey: string): Promise<void> => {
    const isValidKeyInput = translationKey !== '' && translationKey !== undefined

    if (!isValidKeyInput) {
      showMandatoryModal()
      return
    }

    const { success, data } = await createNewTranslation(translationKey)
    if (success && data !== undefined) {
      const newRows = translationToRows(data)
      setTranslationRows(prev => [
        ...newRows,
        ...prev
      ])
      setTotalItems(prev => prev + 1)
      form.resetFields()
    }
  }

    const handleSearch = (value: string): void => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

    const { showModal: showMandatoryModal, closeModal: closeMandatoryModal, renderModal: MandatoryModal } = useModal({
    type: 'error'
  })

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
            onClick={ () => refetch() }
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
              placeholder={t('translations.show-hide-locale')}
              style={{ minWidth: 120 }}
              value={selectedDomain}
              loading={domainsLoading}
              onChange={(value: string) => {
                setSelectedDomain(value)
                setCurrentPage(1) // Reset pagination when domain changes
              }}
              options={availableDomains.map(domain => ({
                value: domain,
                label: domain
              }))}
            />
          </Flex>
          <Flex gap="small">
            <SearchInput
              loading={ translationsLoading }
              onSearch={ (value) => {
                handleSearch(value)
              } }
              placeholder="Search"
              withPrefix={ false }
              withoutAddon={ false }
            />
            <Select
              mode="multiple"
              placeholder={t('translations.select-languages')}
              style={{ minWidth: 220 }}
              value={ visibleLocales }
              disabled={ !settings || availableLocales.length === 0 }
              onChange={ (selectedLocales: string[]) => {
                // Ensure at least one locale is always selected
                if (selectedLocales.length > 0) {
                  setVisibleLocales(selectedLocales)
                }
              } }
              options={ availableLocales.map(locale => {
                // Find the display name for this locale
                const languageInfo = settings?.availableAdminLanguages?.find(lang => lang.language === locale)
                return {
                  value: locale,
                  label: languageInfo?.display ? `${languageInfo.display} (${locale})` : locale.toUpperCase()
                }
              }) }
              showSearch={true}
              filterOption={(input, option) => {
                const label = option?.label?.toString() || ''
                return label.toLowerCase().includes(input.toLowerCase())
              }}
              maxTagCount="responsive"
              allowClear={false}
              dropdownMatchSelectWidth={false}
              dropdownStyle={{ minWidth: 250 }}
            />
            <Button
              size="small"
              onClick={ () => setVisibleLocales(availableLocales) }
              disabled={ !settings || visibleLocales.length === availableLocales.length || availableLocales.length === 0 }
              type="link"
            >
              {t('translations.show-all-languages')}
            </Button>
            <Button
              size="small"
              onClick={ () => {
                // Keep at least one language selected (first available)
                if (availableLocales.length > 0) {
                  setVisibleLocales([availableLocales[0]])
                }
              } }
              disabled={ !settings || visibleLocales.length <= 1 || availableLocales.length === 0 }
              type="link"
            >
              {t('translations.show-minimal-languages')}
            </Button>
          </Flex>
        </Toolbar>
        }
    >
      <Content
        loading={ translationsLoading }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ translationRows.length === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          <Table
            translationRows={ sortedRows }
            setTranslationRows={ setTranslationRows }
            visibleLocales={ visibleLocales }
          />
          {errorModals}
        </Box>
      </Content>
    </ContentLayout>
  )
}
