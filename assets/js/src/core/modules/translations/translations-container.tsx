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
import { Box, IconTextButton, SearchInput } from '@sdk/components'
import trackError, { ApiError, GeneralError } from '../app/error-handler'
import { uuid } from '@sdk/utils'
import { isUndefined } from 'lodash'
import { TranslationGetCollectionApiArg, useTranslationGetCollectionQuery } from '../app/translations/translations-api-slice.gen'
import { useTranslation } from './hooks/use-translation'

export type TranslationRow = { 
  locale: string
  key: string
  value: string
  rowId: string }

export const PredefinedPropertiesContainer = (): React.JSX.Element => {
  const { createNewTranslation, createLoading } = useTranslation()

  // const [filter, setFilter] = useState<string>('')

  const queryArgs: TranslationGetCollectionApiArg = { translation: {locale: "en", keys: [], useFallback: false} }

  const { data, isLoading: translationsLoading, isFetching: translationsFetching, error } = useTranslationGetCollectionQuery(queryArgs)

  const [translationRows, setTranslationRows] = useState<TranslationRow[]>([])

  const locale = data?.locale
  const keys = data?.keys

  console.log("data", data);
  
  const sortedRows = [...translationRows].sort((a, b) => a.key.localeCompare(b.key, "en", { sensitivity: 'base' }))

  // useEffect(() => {
  //     setTranslationRows(
  //       data.keys.map(translation => ({ locale: data.locale, key: translation.key, rowId: uuid() }))
  //     )
  //   }
  // }, [predefinedProperties])

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const onCreateTranslation = async (): Promise<void> => {
    const { success, data } = await createNewTranslation()
    if (success && data !== undefined) {
      setTranslationRows(prev =>
        [
          { ...data, rowId: uuid() },
          ...prev
        ]
      )
    }
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme="secondary">
          <IconButton
            disabled={ translationsFetching }
            icon={ { value: 'refresh' } }
            onClick={ () => alert("refetch") }
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
              disabled={ translationsLoading || createLoading }
              icon={ { value: 'new' } }
              loading={ createLoading }
              onClick={ onCreateTranslation }
            >{t('predefined-properties.new')}</IconTextButton>
          </Flex>
          <SearchInput
            loading={ translationsFetching }
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
        loading={ translationsLoading || translationsFetching }
        margin={ {
          x: 'extra-small',
          y: 'none'
        } }
        none={ isUndefined(data) || data.keys.length === 0 }
      >
        <Box
          margin={ {
            x: 'extra-small',
            y: 'none'
          } }
        >
          {/* <Table
            translationRows={ sortedRows }
            setTranslationRows={ setTranslationRows }
          /> */}
        </Box>
      </Content>
    </ContentLayout>
  )
}
