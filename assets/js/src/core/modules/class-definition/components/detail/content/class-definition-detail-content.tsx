/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useClassDefinitionLayout } from '@Pimcore/modules/class-definition/components/detail/class-definition-layout-provider'
import { FieldDefinition } from '@Pimcore/modules/class-definition/components/detail/content/field-defintion/field-definition'
import { Content } from '@sdk/components'
import React from 'react'

export const ClassDefinitionDetailContent = (): React.JSX.Element => {
  const { currentFieldDefinitionId } = useClassDefinitionLayout()

  return (
    <>
      {currentFieldDefinitionId === null
        ? (
          <Content padded>
            Please select a field from the tree to edit its properties.
          </Content>
          )
        : null}

      {currentFieldDefinitionId !== null
        ? (
          <FieldDefinition />
          )
        : null}
    </>
  )
}
