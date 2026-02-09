/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { AddModalTrigger } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/items/top-bar/add-modal-trigger'
import { TopBarItemSelect } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/items/top-bar/item-select'
import { Header, Split, Toolbar } from '@sdk/components'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const ItemsTopBar = (): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <Toolbar
      padding={ { x: 'none' } }
      position="content"
      theme="secondary"
    >
      <Header title={ t('field-definitions.custom-layout-title') }>
        <Split>
          <AddModalTrigger />
          <TopBarItemSelect />
        </Split>
      </Header>
    </Toolbar>
  )
}
