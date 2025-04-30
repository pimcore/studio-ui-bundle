/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
