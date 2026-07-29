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
import { useAppDispatch } from '@Pimcore/app/store'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Pagination } from '@Pimcore/components/pagination/pagination'
import { SearchInput } from '@Pimcore/components/search-input/search-input'
import { Title } from '@Pimcore/components/title/title'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Header } from '@Pimcore/components/header/header'
import { api } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { useGdprSearchDataQuery } from '@Pimcore/modules/gdpr-data-extractor/gdpr-data-extractor-slice-enhanced'
import { isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type EmailLog, useEmailLogGetCollectionQuery } from '../emails-api-slice.gen'
import { EmailCard } from './components/email-card/email-card'

export const EmailLogContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const normalizedSearchTerm = searchTerm.trim()
  const { data, isLoading: isEmailLogLoading, isFetching: isEmailLogFetching } = useEmailLogGetCollectionQuery({
    page: currentPage,
    pageSize
  }, {
    skip: normalizedSearchTerm !== ''
  })
  const { data: searchData, isLoading: isSearchLoading, isFetching: isSearchFetching } = useGdprSearchDataQuery({
    provider: 'sent_mails',
    body: {
      filters: {
        page: currentPage,
        pageSize,
        columnFilters: [{ type: 'email', filterValue: normalizedSearchTerm }]
      }
    }
  }, {
    skip: normalizedSearchTerm === ''
  })
  const isRTKLoading = isEmailLogLoading || isSearchLoading
  const isFetching = isEmailLogFetching || isSearchFetching
  const emails: EmailLog[] | undefined = normalizedSearchTerm === ''
    ? data?.items
    : searchData?.items.map((item) => {
        const email = item.data as Omit<EmailLog, 'hasError'> & Partial<Pick<EmailLog, 'hasError'>>
        // ponytail: search results omit hasError; add it to the provider before restoring error theming here.
        return { ...email, hasError: email.hasError ?? false }
      })
  const total = normalizedSearchTerm === '' ? data?.totalItems ?? 0 : searchData?.totalItems ?? 0

  const onPagerChange = (page: number, pageSize: number): void => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false)
    }
  }, [isFetching])

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          justify='space-between'
          theme='secondary'
        >
          <IconButton
            data-testid="email-log-refresh-button"
            disabled={ isRTKLoading || isLoading }
            icon={ { value: 'refresh' } }
            onClick={ () => {
              setIsLoading(true)
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.EMAIL_LOG()
                )
              )
            } }
          />
          <Pagination
            current={ currentPage }
            defaultPageSize={ pageSize }
            onChange={ onPagerChange }
            showSizeChanger
            showTotal={ (total) => t('pagination.show-total', { total }) }
            total={ total }
          />
        </Toolbar>
      }
      renderTopBar={
        <Header
          position='top'
        >
          <Flex gap='extra-small'>
            <Title>
              {t('widget.email-log')}
            </Title>
          </Flex>
          <SearchInput
            data-testid="email-log-search-input"
            loading={ isRTKLoading || isFetching }
            onSearch={ (value) => {
              setSearchTerm(value)
              setCurrentPage(1)
            } }
            placeholder={ t('search') }
          />
        </Header>
      }
    >
      <Content
        data-testid="email-log-content"
        loading={ isRTKLoading || (isLoading && isFetching) }
        none={ isUndefined(emails) || emails.length === 0 }
        padded
      >
        {!isUndefined(emails) && <EmailCard emails={ emails } />}
      </Content>
    </ContentLayout>
  )
}
