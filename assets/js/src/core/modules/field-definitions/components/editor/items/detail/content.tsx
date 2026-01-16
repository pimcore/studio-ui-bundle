/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { LayoutForm } from '@Pimcore/modules/field-definitions/components/editor/items/detail/content/layout-form'
import { useLayout } from '@Pimcore/modules/field-definitions/components/editor/items/detail/layout-provider'
import { Content } from '@sdk/components'
import React from 'react'

export const DetailContent = (): React.JSX.Element => {
  const { currentFieldDefinitionId } = useLayout()

  return (
    <>
      {currentFieldDefinitionId === null
        ? (
          <Content
            centered
            padded
          >
            Please select a field from the tree to edit its properties.
          </Content>
          )
        : null}

      {currentFieldDefinitionId !== null
        ? (
          <LayoutForm />
          )
        : null}
    </>
  )
}
