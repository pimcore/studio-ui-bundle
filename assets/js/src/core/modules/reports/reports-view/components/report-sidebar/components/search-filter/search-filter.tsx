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
import { useTranslation } from 'react-i18next'
import { ContentLayout } from '@Pimcore/components/content-layout/content-layout'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/components/toolbar/toolbar'
import { Button } from '@Pimcore/components/button/button'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Title } from '@Pimcore/components/title/title'
import { Flex } from '@Pimcore/components/flex/flex'
import { Search } from '@Pimcore/modules/reports/reports-view/components/report-sidebar/components/search-filter/components/search/search'

export const SearchFilter = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar theme='secondary'>
          <IconTextButton
            icon={ { value: 'close' } }
            onClick={ () => {} }
            type='link'
          >
            {t('sidebar.clear-all-filters')}
          </IconTextButton>

          <Button
            onClick={ () => {} }
            type='primary'
          >
            {t('button.apply')}
          </Button>
        </Toolbar>
        }
    >
      <Content padded>
        <Title>{t('reports.grid-config.title-search-filter')}</Title>
        <Flex vertical>
          <Search />
        </Flex>
      </Content>
    </ContentLayout>
  )
}
