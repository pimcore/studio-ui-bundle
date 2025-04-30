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
import { Content } from '@Pimcore/components/content/content'
import { Title } from '@Pimcore/components/title/title'
import { SelectionGrid } from './selection-grid'

export const SelectionOverview = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Content padded>
      <Title>{t('sidebar.selected_elements')}</Title>

      <SelectionGrid />
    </Content>
  )
}
