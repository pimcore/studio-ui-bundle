/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { Toolbar as BaseToolbar } from '@Pimcore/components/toolbar/toolbar'
import { Pagination } from '@Pimcore/modules/element/listing/decorators/filters/pagination/pagination'
import React from 'react'
import { Refetch } from '../refetch/refetch'
import { Split } from '@Pimcore/components/split/split'

export const Toolbar = (): React.JSX.Element => {
  return (
    <BaseToolbar theme='secondary'>
      <div />

      <Split size='small'>
        <Refetch />
        <Pagination />
      </Split>
    </BaseToolbar>
  )
}
