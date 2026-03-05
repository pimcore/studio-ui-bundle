/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { GeneralSettingsForm } from '@Pimcore/modules/field-definitions/components/editor/items/detail/content/general-settings-form'
import { LayoutForm } from '@Pimcore/modules/field-definitions/components/editor/items/detail/content/layout-form'
import { useItems } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import { useSettings } from '@Pimcore/modules/field-definitions/components/editor/settings-provider'
import { Content } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const DetailContent = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { useLayout } = useSettings()
  const { currentFieldDefinitionId } = useLayout()
  const { detailView } = useItems()

  return (
    <>
      {detailView === 'general'
        ? (
          <GeneralSettingsForm />
          )
        : null}

      {detailView === 'layout' && currentFieldDefinitionId === null
        ? (
          <Content
            centered
            padded
          >
            {t('field-definitions.select-field-message')}
          </Content>
          )
        : null}

      {detailView === 'layout' && currentFieldDefinitionId !== null
        ? (
          <LayoutForm />
          )
        : null}
    </>
  )
}
