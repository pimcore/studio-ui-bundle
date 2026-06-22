/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ItemDetail } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/items/detail'
import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { Content } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const DetailRenderer = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { activeConfiguration } = useItems()
  const { AddModal } = useSettings()
  const canCreate = AddModal !== undefined

  if (activeConfiguration === undefined) {
    return (
      <Content centered>
        {canCreate
          ? t('custom-layout.empty-state.create-or-edit')
          : t('custom-layout.empty-state.edit')}
      </Content>
    )
  }

  return (
    <ItemDetail key={ String(activeConfiguration.id) } />
  )
}
