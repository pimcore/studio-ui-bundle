/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ItemsSidebar } from '@Pimcore/modules/field-definitions/components/editor/items/sidebar'
import { ItemsTabs } from '@Pimcore/modules/field-definitions/components/editor/items/tabs'
import { ConfigLayout } from '@sdk/components'
import React from 'react'

export const EditorView = (): React.JSX.Element => {
  return (
    <ConfigLayout
      leftItem={ {
        minSize: 250,
        maxSize: 350,
        size: 250,
        children: <ItemsSidebar />
      } }
      resizeAble
      rightItem={ {
        children: <ItemsTabs />
      } }
    />
  )
}
