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
import { Toolbar as BaseToolbar } from '@Pimcore/components/toolbar/toolbar'
import { SlotRenderer } from '@Pimcore/modules/app/component-registry/slot-renderer'
import { componentConfig } from '@sdk/modules/app'
import { Space } from '@sdk/components'

export const ToolbarInner = (): React.JSX.Element => {
  return (
    <BaseToolbar theme='secondary'>
      <Space size="small">
        <SlotRenderer slot={ componentConfig.asset.listing.toolbar.left.name } />
      </Space>

      <Space size="small">
        <SlotRenderer slot={ componentConfig.asset.listing.toolbar.right.name } />
      </Space>
    </BaseToolbar>
  )
}
