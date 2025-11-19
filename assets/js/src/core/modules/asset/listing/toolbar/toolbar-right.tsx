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
import { Pagination } from '@Pimcore/modules/element/listing/decorators/paging/pagination/pagination'
import { Split } from '@Pimcore/components/split/split'
import { Refetch } from '@Pimcore/modules/element/listing/abstract/view-layer/components/refetch/refetch'

export const ToolbarRight = (): React.JSX.Element => {
  return (
    <Split size='extra-small'>
      <Refetch />
      <Pagination />
    </Split>
  )
}
