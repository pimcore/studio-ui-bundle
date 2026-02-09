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
import { Content } from '@sdk/components'
import React from 'react'

export const DetailRenderer = (): React.JSX.Element => {
  const { activeConfiguration } = useItems()

  if (activeConfiguration === undefined) {
    return (
      <Content centered>
        Create a new Custom Layout or edit an existing one
      </Content>
    )
  }

  return (
    <ItemDetail key={ String(activeConfiguration.id) } />
  )
}
