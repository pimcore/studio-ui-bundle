/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useAppDispatch } from '@Pimcore/app/store'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { api } from '@Pimcore/modules/email/emails-api-slice-enhanced'
import { invalidatingTags } from '@sdk/api'
import { Icon, Pagination } from '@sdk/components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEmailBlocklistGetCollectionQuery } from '../emails-api-slice.gen'
import { EmailCard } from './components/email-card/email-card'
import { useEmailBlocklist } from './hooks/use-email-blocklist'
import { isUndefined } from 'lodash'

export const EmailBlocklistContainer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { addNewEmail } = useEmailBlocklist()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(20)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { data, isLoading: isRTKLoading } = useEmailBlocklistGetCollectionQuery({
    page: currentPage,
    pageSize
  })
  const total = data?.totalItems ?? 0

  const onPagerChange = (page: number, pageSize: number): void => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar
          justify='space-between'
          theme='secondary'
        >
          <IconButton
            disabled={ isLoading || isRTKLoading }
            icon={ { value: 'refresh' } }
            onClick={ () => {
              setIsLoading(true)
              dispatch(
                api.util.invalidateTags(
                  invalidatingTags.EMAIL_BLOCKLIST()
                )
              )
              setIsLoading(false)
            }
            }
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
        <Toolbar
          justify='space-between'
          margin={ {
            x: 'mini',
            y: 'none'
          } }
          theme='secondary'
        >
          <Flex gap={ 'small' }>
            <Title
              icon={ <Icon value="users-x" /> }
            >
              {t('widget.email-blocklist')}
            </Title>
            <IconTextButton
              disabled={ isLoading || isRTKLoading }
              icon={ { value: 'new' } }
              onClick={ async () => {
                await addNewEmail(() => {
                  setIsLoading(false)
                })
              } }
            >{t('email-blocklist.add')}</IconTextButton>
          </Flex>
        </Toolbar>
      }
    >
      <Content
        loading={ isLoading }
        none={ isUndefined(data?.items) || data.items.length === 0 }
        padded
      >
        {data?.items !== undefined && data?.items?.length > 0
          ? (
              data.items.map((item) => (
                <EmailCard
                  entry={ item }
                  key={ item.email }
                />
              ))
            )
          : ''}
      </Content>
    </ContentLayout>
  )
}
