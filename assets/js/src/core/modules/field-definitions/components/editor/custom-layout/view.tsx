/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DetailRenderer } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/items/detail/detail-renderer'
import { ItemsTopBar } from '@Pimcore/modules/field-definitions/components/editor/custom-layout/items/top-bar'
import { AddModalProvider } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar/add-modal'
import { SidebarModalHolder } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar/modal-holder'
import { Content, ContentLayout } from '@sdk/components'
import React from 'react'

export const CustomLayoutView = (): React.JSX.Element => {
  return (
    <AddModalProvider>
      <ContentLayout
        renderTopBar={ <ItemsTopBar /> }
      >
        <Content
          style={ { height: '60vh' } }
        >
          <SidebarModalHolder />
          <DetailRenderer />
        </Content>
      </ContentLayout>
    </AddModalProvider>
  )
}
