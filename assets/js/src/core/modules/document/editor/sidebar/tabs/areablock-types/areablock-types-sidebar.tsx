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
import { SidebarTitle } from '@Pimcore/components/sidebar/title'
import { AreablockTypesList } from './components/areablock-types-list/areablock-types-list'
import { Content } from '@sdk/components'

export const AreablockTypesSidebar = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Content>
      <SidebarTitle withBorder>
        {t('add-areas')}
      </SidebarTitle>
      <AreablockTypesList />
    </Content>
  )
}
