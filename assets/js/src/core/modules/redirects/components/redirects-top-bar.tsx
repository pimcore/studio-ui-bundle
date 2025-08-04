/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { Title } from '@Pimcore/components/title/title'
import { Flex } from '@Pimcore/components/flex/flex'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { IconTextButton, SearchInput } from '@sdk/components'
import { useTranslation } from 'react-i18next'
import { useRedirectsContext } from '../hooks/redirects-provider'

interface RedirectsTopBarProps {
  redirectsLoading: boolean
  createLoading: boolean
  redirectsFetching: boolean
  onExpertClick: () => Promise<void>
  onSearch: (value: string) => void
}

export const RedirectsTopBar = ({
  redirectsLoading,
  createLoading,
  redirectsFetching,
  onExpertClick,
  onSearch
}: RedirectsTopBarProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { setIsBeginnerModalOpen } = useRedirectsContext()
  return (
    <Toolbar
      justify='space-between'
      margin={ {
        x: 'mini',
        y: 'none'
      } }
      theme='secondary'
    >
      <Flex gap={ 'small' }>
        <Title>{t('widget.redirects')}</Title>
        <IconTextButton
          disabled={ redirectsLoading || createLoading }
          icon={ { value: 'new' } }
          onClick={ () => { setIsBeginnerModalOpen(true) } }
        >
          {t('redirects.beginner')}
        </IconTextButton>
        <IconTextButton
          disabled={ redirectsLoading || createLoading }
          icon={ { value: 'new' } }
          loading={ createLoading }
          onClick={ onExpertClick }
        >
          {t('redirects.expert')}
        </IconTextButton>
      </Flex>
      <SearchInput
        loading={ redirectsFetching }
        onSearch={ onSearch }
        placeholder={ t('redirects.search') }
        withPrefix={ false }
        withoutAddon={ false }
      />
    </Toolbar>
  )
}
