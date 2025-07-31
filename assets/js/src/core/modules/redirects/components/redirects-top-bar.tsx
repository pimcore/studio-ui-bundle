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
import { t } from 'i18next'

interface RedirectsTopBarProps {
  redirectsLoading: boolean
  createLoading: boolean
  redirectsFetching: boolean
  onBeginnerClick: () => void
  onExpertClick: () => Promise<void>
  onSearch: (value: string) => void
}

export const RedirectsTopBar = ({
  redirectsLoading,
  createLoading,
  redirectsFetching,
  onBeginnerClick,
  onExpertClick,
  onSearch
}: RedirectsTopBarProps): React.JSX.Element => {
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
          icon={ { value: 'new' } }
          onClick={ onBeginnerClick }
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
        placeholder="Search"
        withPrefix={ false }
        withoutAddon={ false }
      />
    </Toolbar>
  )
}
