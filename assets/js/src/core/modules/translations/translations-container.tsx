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
import { Box, Button, Form, IconTextButton, Input, ModalFooter, SearchInput, useModal } from '@sdk/components'
import trackError, { GeneralError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { useTranslationGetCollectionMutation, type Translation } from '../app/translations/translations-api-slice.gen'
import { useTranslation } from './hooks/use-translation'
import { Table } from './table/table'
import { keyframes } from 'antd-style'

export type TranslationDataItem = {
  key: string
  type: string
  creationDate?: number
  modificationDate?: number
} & {
  [localeKey: `_${string}`]: string
}

export type TranslationRow = TranslationDataItem & { 
  rowId: string
}

export type TranslationCollectionResponse = {
  data: TranslationDataItem[]
  success: boolean
  total: number
}

const getAvailableLocales = (rows: TranslationRow[]): string[] => {
  if (rows.length === 0) return []
  
  // Get all keys from the first row that start with underscore (locale keys)
  const localeKeys = Object.keys(rows[0]).filter(key => key.startsWith('_'))
  
  // Remove the underscore prefix to get clean locale codes
  return localeKeys.map(key => key.substring(1))
}

// Helper function to convert Translation to TranslationRow(s)
// This handles both current and future backend response formats
const translationToRows = (translation: Translation | TranslationCollectionResponse | TranslationDataItem): TranslationRow[] => {
  // Check if this is already a TranslationDataItem (from createNewTranslation)
  if ('key' in translation && 'type' in translation && 'rowId' in translation) {
    // It's already a TranslationRow, just return it as an array
    return [translation as TranslationRow]
  }
  
  // Check if this is a TranslationDataItem (from createNewTranslation)
  if ('key' in translation && 'type' in translation && !('locale' in translation)) {
    // Convert TranslationDataItem to TranslationRow
    return [{
      ...translation as TranslationDataItem,
      rowId: uuid()
    }]
  }
  
  // Check if this is the new collection response format
  if ('totalItems' in translation) {
    console.log("new data shape");
  }
  
  // Cast to Translation for the remaining checks
  const translationObj = translation as Translation
  
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
  
  // Fallback for unexpected structure
  return []
}

interface FormValues {
  translationKey: string
}

export const TranslationsContainer = (): React.JSX.Element => {
    const [form] = Form.useForm<FormValues>()

  const { createNewTranslation, createLoading } = useTranslation()

  // const [filter, setFilter] = useState<string>('')

  const [fetchTranslations, { isLoading: translationsLoading }] = useTranslationGetCollectionMutation()
  const [translationRows, setTranslationRows] = useState<TranslationRow[]>([])

  const loadTranslations = async (): Promise<void> => {
    try {
      const response = await fetchTranslations({ 
        translation: { locale: "en", keys: ["actions", "bla", 'blub'], useFallback: true } 
      }).unwrap()

      if (response) {
        const rows = translationToRows(response)
        setTranslationRows(rows)
      }
    } catch (error) {
      console.error('Error loading translations', error)
      trackError(new GeneralError('Error loading translations'))
    }
  }

  useEffect(() => {
    loadTranslations()
  }, [])

  // Extract available locales from the translation data
  const availableLocales = getAvailableLocales(translationRows)

  console.log("availableLocales", availableLocales);
  

  console.log("translationRows", translationRows)
  
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
    form.resetFields()
    }
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
            onClick={ loadTranslations }
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
            <Title>{t('widget.translations')}</Title>
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
                    {t('translation.new')}
                  </IconTextButton>
                </Form.Item>
              </Flex>
            </Form>
          </Flex>
          <SearchInput
            loading={ translationsLoading }
            onSearch={ (value) => {
              console.log({value})
            } }
            placeholder="Search"
            withPrefix={ false }
            withoutAddon={ false }
          />
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
          />
          {errorModals}
        </Box>
      </Content>
    </ContentLayout>
  )
}
